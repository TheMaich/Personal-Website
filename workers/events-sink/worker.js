/**
 * Spritz Consulting first-party funnel events sink.
 *
 * Why this exists: six funnel events (form_start, form_submit, form_error,
 * cta_click, booking_click, resource_link_click) have been firing from the
 * page for weeks into Zaraz, which forwards nothing unless a destination is
 * configured in the dashboard. Nothing ever asserted an event landed, so the
 * data was silently zero. This Worker is that assertion: a same-origin sink
 * that stores each event AND a readback surface a human actually opens.
 *
 * Two routes:
 *
 *   POST /api/events
 *     Body: JSON { event, props?, page?, utm? }
 *     Ingests one event. Rejects anything that is not one of the six known
 *     names, caps the body, rate-limits per IP, strips PII, writes to the
 *     FUNNEL_EVENTS KV namespace with a 90-day TTL, and bumps a daily counter.
 *
 *   GET /api/events/export?days=7&event=<name>&format=json|csv
 *     Readback. Behind a shared secret (EXPORT_SECRET), passed as the
 *     X-Export-Secret header or a ?secret= query param. Returns a per-day
 *     summary plus the raw events. FAILS CLOSED: if EXPORT_SECRET is unset the
 *     endpoint returns 500 and never leaks data.
 *
 * PII policy (this is first-party precisely so we can keep it clean):
 *   - Stored: event name, timestamp, path with the query string REMOVED,
 *     UTM parameters, coarse Cloudflare country.
 *   - Never stored: IP address, full user agent, referrer (its query string
 *     can carry an email from a newsletter link), or raw query strings.
 *
 * Storage layout in FUNNEL_EVENTS:
 *   evt:<iso>:<uuid>      -> JSON event record (source of truth)
 *   count:<date>:<event>  -> integer daily rollup (cheap summary)
 *   rl:<ip>               -> integer rate-limit counter (short TTL)
 */

const KNOWN_EVENTS = new Set([
  'form_start',
  'form_submit',
  'form_error',
  'cta_click',
  'booking_click',
  'resource_link_click',
]);

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

const ALLOWED_ORIGINS = [
  'https://spritzconsulting.com',
  'https://www.spritzconsulting.com',
];

// 90 days covers the SPR-29 sixty-day window with room to spare. Applied to
// BOTH event records and daily counters so nothing accumulates forever.
const RETENTION_SECONDS = 90 * 24 * 60 * 60;

const MAX_BODY_BYTES = 4096;
const MAX_PROPS = 12;
const MAX_PROP_LEN = 120;
const MAX_PATH_LEN = 300;

// A public POST that writes to KV: assume abuse. A flood should degrade the
// data, not the namespace or the bill. 300 writes / 10 min / IP is generous
// for a real visitor and cheap to enforce (two KV ops).
const RATE_WINDOW_SECONDS = 600;
const EVENTS_PER_WINDOW = 300;

// Cap how many event records a single export reads, so a large namespace can
// never turn one export request into an unbounded KV bill. Surfaced in the
// response as `truncated` when hit.
const EXPORT_SCAN_LIMIT = 5000;

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function json(status, body, extraHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...(extraHeaders || {}) },
  });
}

function clip(value, max) {
  return String(value == null ? '' : value).slice(0, max);
}

// Path only, query string discarded. The query can carry UTMs (kept
// separately, sanitized) or, on referrer-style links, an email.
function cleanPath(page) {
  const raw = clip(page, MAX_PATH_LEN + 200);
  if (!raw) return '';
  let path = raw;
  const q = path.indexOf('?');
  if (q !== -1) path = path.slice(0, q);
  const h = path.indexOf('#');
  if (h !== -1) path = path.slice(0, h);
  return path.slice(0, MAX_PATH_LEN);
}

// Accept UTMs from an explicit object (first-touch capture on the page) and,
// as a backstop, from a query string left on `page`. Only the five canonical
// keys survive; values are clipped. Anything else is dropped.
function extractUtm(body) {
  const out = {};
  const src = body && typeof body.utm === 'object' && body.utm ? body.utm : {};
  for (const k of UTM_KEYS) {
    if (src[k]) out[k] = clip(src[k], MAX_PROP_LEN);
  }
  const page = body && typeof body.page === 'string' ? body.page : '';
  const q = page.indexOf('?');
  if (q !== -1) {
    let params;
    try {
      params = new URLSearchParams(page.slice(q + 1));
    } catch (err) {
      params = null;
    }
    if (params) {
      for (const k of UTM_KEYS) {
        if (!out[k] && params.get(k)) out[k] = clip(params.get(k), MAX_PROP_LEN);
      }
    }
  }
  return out;
}

// Developer-controlled small strings (placement, resource, error type). Keep
// them, but bound key count and value length, coerce to string, and drop
// `page` because the sanitized path is stored separately.
function sanitizeProps(props) {
  const out = {};
  if (!props || typeof props !== 'object') return out;
  let n = 0;
  for (const key of Object.keys(props)) {
    if (n >= MAX_PROPS) break;
    if (key === 'page') continue;
    const value = props[key];
    if (value == null || typeof value === 'object') continue;
    out[clip(key, 40)] = clip(value, MAX_PROP_LEN);
    n++;
  }
  return out;
}

async function checkRateLimit(env, ip) {
  const key = 'rl:' + ip;
  const current = parseInt((await env.FUNNEL_EVENTS.get(key)) || '0', 10);
  if (current >= EVENTS_PER_WINDOW) return false;
  await env.FUNNEL_EVENTS.put(key, String(current + 1), { expirationTtl: RATE_WINDOW_SECONDS });
  return true;
}

async function ingest(request, env) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json(413, { ok: false, error: 'payload_too_large' });
  }
  let body;
  try {
    body = JSON.parse(raw || '{}');
  } catch (err) {
    return json(400, { ok: false, error: 'invalid_json' });
  }

  const event = clip(body.event, 60);
  if (!KNOWN_EVENTS.has(event)) {
    return json(422, { ok: false, error: 'unknown_event' });
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (!(await checkRateLimit(env, ip))) {
    return json(429, { ok: false, error: 'rate_limited' });
  }

  const receivedAt = new Date().toISOString();
  const date = receivedAt.slice(0, 10);
  const record = {
    event,
    receivedAt,
    path: cleanPath(body.page),
    utm: extractUtm(body),
    props: sanitizeProps(body.props),
    country: (request.cf && request.cf.country) || '',
  };

  const key = 'evt:' + receivedAt + ':' + crypto.randomUUID();
  await env.FUNNEL_EVENTS.put(key, JSON.stringify(record), { expirationTtl: RETENTION_SECONDS });

  // Daily rollup: read-modify-write is racy under load but a small undercount
  // on a marketing counter is acceptable; the evt: records remain exact and
  // are what export recomputes the summary from.
  const countKey = 'count:' + date + ':' + event;
  const currentCount = parseInt((await env.FUNNEL_EVENTS.get(countKey)) || '0', 10);
  await env.FUNNEL_EVENTS.put(countKey, String(currentCount + 1), { expirationTtl: RETENTION_SECONDS });

  return json(202, { ok: true });
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function toCsv(events) {
  const header = 'receivedAt,event,path,utm_source,utm_medium,utm_campaign,utm_term,utm_content,country';
  const esc = (v) => {
    const s = String(v == null ? '' : v);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const rows = events.map((e) =>
    [
      e.receivedAt,
      e.event,
      e.path,
      e.utm.utm_source || '',
      e.utm.utm_medium || '',
      e.utm.utm_campaign || '',
      e.utm.utm_term || '',
      e.utm.utm_content || '',
      e.country,
    ].map(esc).join(',')
  );
  return [header, ...rows].join('\n');
}

async function exportEvents(request, env) {
  // Fail closed. No secret configured means the endpoint must not answer.
  if (!env.EXPORT_SECRET) {
    return json(500, { ok: false, error: 'export_not_configured' });
  }
  const url = new URL(request.url);
  const provided = request.headers.get('X-Export-Secret') || url.searchParams.get('secret') || '';
  if (!provided || !timingSafeEqual(provided, env.EXPORT_SECRET)) {
    return json(401, { ok: false, error: 'unauthorized' });
  }

  let days = parseInt(url.searchParams.get('days') || '7', 10);
  if (!Number.isFinite(days) || days < 1) days = 7;
  if (days > 90) days = 90;
  const eventFilter = clip(url.searchParams.get('event'), 60);
  const format = url.searchParams.get('format') === 'csv' ? 'csv' : 'json';

  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const events = [];
  let cursor;
  let truncated = false;
  do {
    const list = await env.FUNNEL_EVENTS.list({ prefix: 'evt:', cursor, limit: 1000 });
    for (const k of list.keys) {
      // Key shape: evt:<iso>:<uuid> — the iso sorts and filters without a read.
      const iso = k.name.slice(4, 4 + 24);
      if (iso < cutoff) continue;
      const value = await env.FUNNEL_EVENTS.get(k.name);
      if (!value) continue;
      let rec;
      try {
        rec = JSON.parse(value);
      } catch (err) {
        continue;
      }
      if (eventFilter && rec.event !== eventFilter) continue;
      events.push(rec);
      if (events.length >= EXPORT_SCAN_LIMIT) {
        truncated = true;
        break;
      }
    }
    cursor = list.list_complete ? null : list.cursor;
  } while (cursor && !truncated);

  events.sort((a, b) => (a.receivedAt < b.receivedAt ? -1 : 1));

  if (format === 'csv') {
    return new Response(toCsv(events), {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="funnel-events.csv"',
        'Cache-Control': 'no-store',
      },
    });
  }

  const summary = {};
  for (const e of events) {
    const d = e.receivedAt.slice(0, 10);
    summary[d] = summary[d] || {};
    summary[d][e.event] = (summary[d][e.event] || 0) + 1;
  }

  return json(
    200,
    { ok: true, days, total: events.length, truncated, summary, events },
    { 'Cache-Control': 'no-store' }
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    if (url.pathname === '/api/events/export') {
      if (request.method !== 'GET') {
        return json(405, { ok: false, error: 'method_not_allowed' });
      }
      return exportEvents(request, env);
    }

    // Ingest route.
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'POST') {
      return json(405, { ok: false, error: 'method_not_allowed' }, corsHeaders(origin));
    }
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return json(403, { ok: false, error: 'origin_not_allowed' }, corsHeaders(origin));
    }
    const res = await ingest(request, env);
    // Reattach CORS on the ingest response (sendBeacon ignores it, but a
    // fetch fallback from the page needs it).
    const headers = corsHeaders(origin);
    for (const [k, v] of Object.entries(headers)) res.headers.set(k, v);
    return res;
  },
};
