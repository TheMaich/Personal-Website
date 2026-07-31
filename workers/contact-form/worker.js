/**
 * Spritz Consulting contact form backend.
 *
 * POST /api/contact
 * Body: JSON { name?, company?, email, message, found_via?, page?, referrer?, website? }
 *
 * - Validates email and message server side.
 * - Persists every valid submission to the CONTACT_SUBMISSIONS KV namespace.
 * - Honeypot: the hidden "website" field must stay empty. Bots that fill it
 *   get a fake 200 so they stop retrying, and nothing is stored.
 * - Rate limit: max SUBMISSIONS_PER_WINDOW per IP per RATE_WINDOW_SECONDS,
 *   tracked in the same KV namespace under rl: keys with a TTL.
 * - Notification email: sent through the Resend HTTP API (resend.com) using
 *   the RESEND_API_KEY secret. Cloudflare Email Routing is intentionally not
 *   used: Resend verifies the sending domain with a DNS TXT record only, so
 *   the zone MX stays on the existing Gmail inbox. If the key is missing or
 *   the send fails, the submission still lands in KV and the Worker returns a
 *   real error (502) instead of a silent 200.
 * - CORS: only the production origins may POST.
 */

const ALLOWED_ORIGINS = [
  'https://spritzconsulting.com',
  'https://www.spritzconsulting.com',
];

// Where notifications land. Overridable via the NOTIFY_TO var in wrangler.toml
// so the destination inbox can change without a code edit. The From address
// must sit on a domain verified in Resend (spritzconsulting.com); it is what
// Resend authenticates, not where replies go.
const DEFAULT_NOTIFY_TO = 'hello@spritzconsulting.com';
const NOTIFY_FROM = 'Spritz Contact Form <contact-form@spritzconsulting.com>';

const RATE_WINDOW_SECONDS = 600;
const SUBMISSIONS_PER_WINDOW = 5;
const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function json(status, body, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(origin),
    },
  });
}

function clip(value, max) {
  return String(value == null ? '' : value).slice(0, max).trim();
}

async function checkRateLimit(env, ip) {
  const key = 'rl:' + ip;
  const current = parseInt((await env.CONTACT_SUBMISSIONS.get(key)) || '0', 10);
  if (current >= SUBMISSIONS_PER_WINDOW) return false;
  // Two coarse KV ops per request keep this cheap; the TTL resets the window.
  await env.CONTACT_SUBMISSIONS.put(key, String(current + 1), {
    expirationTtl: RATE_WINDOW_SECONDS,
  });
  return true;
}

function buildNotificationText(submission) {
  return [
    'Name: ' + (submission.name || '(empty)'),
    'Company: ' + (submission.company || '(empty)'),
    'Email: ' + submission.email,
    'Found via: ' + (submission.foundVia || '(not answered)'),
    'Page: ' + (submission.page || '(unknown)'),
    'Referrer: ' + (submission.referrer || '(none)'),
    'Received: ' + submission.receivedAt,
    '',
    submission.message,
  ].join('\n');
}

// Throws on any delivery failure so the caller can surface a real error.
// KV already holds the submission before this runs, so a throw never loses
// the lead; it only tells the visitor (and our logs) that the notification
// did not go out, instead of the old silent 200.
//
// Uses Resend's HTTP API. reply_to is the visitor's address so a reply from
// the inbox goes straight back to them. A non-2xx response carries a JSON
// error body from Resend; we surface its status so logs show why it failed.
async function sendNotification(env, submission) {
  if (!env.RESEND_API_KEY) {
    throw new Error('resend_api_key_missing');
  }
  const to = env.NOTIFY_TO || DEFAULT_NOTIFY_TO;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + env.RESEND_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: [to],
      reply_to: submission.email,
      subject: 'New contact form submission',
      text: buildNotificationText(submission),
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error('resend_http_' + response.status + ': ' + detail.slice(0, 300));
  }
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'POST') {
      return json(405, { ok: false, error: 'method_not_allowed' }, origin);
    }
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return json(403, { ok: false, error: 'origin_not_allowed' }, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch (err) {
      return json(400, { ok: false, error: 'invalid_json' }, origin);
    }

    // Honeypot: silently accept and drop.
    if (clip(body.website, 50)) {
      return json(200, { ok: true }, origin);
    }

    const email = clip(body.email, MAX_FIELD_LENGTH);
    const message = clip(body.message, MAX_MESSAGE_LENGTH);
    if (!EMAIL_RE.test(email)) {
      return json(422, { ok: false, error: 'invalid_email' }, origin);
    }
    if (!message) {
      return json(422, { ok: false, error: 'empty_message' }, origin);
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!(await checkRateLimit(env, ip))) {
      return json(429, { ok: false, error: 'rate_limited' }, origin);
    }

    const receivedAt = new Date().toISOString();
    const key = 'submission:' + receivedAt + ':' + crypto.randomUUID();
    const submission = {
      key,
      receivedAt,
      name: clip(body.name, MAX_FIELD_LENGTH),
      company: clip(body.company, MAX_FIELD_LENGTH),
      email,
      message,
      // Optional self-reported attribution. Free-text-safe: clipped like any
      // other field. The site sends a fixed slug (linkedin, search, ...), but
      // the Worker does not enforce the vocabulary so the form can add options
      // without a Worker deploy.
      foundVia: clip(body.found_via, MAX_FIELD_LENGTH),
      page: clip(body.page, 500),
      referrer: clip(body.referrer, 500),
      ip,
      country: (request.cf && request.cf.country) || '',
    };

    // KV first: the lead is durably captured regardless of email outcome.
    await env.CONTACT_SUBMISSIONS.put(key, JSON.stringify(submission));

    // Notification is required, not best effort. If it fails we return a real
    // error (not 200) so the failure is visible instead of silently losing
    // the inquiry. The submission is still in KV and recoverable.
    try {
      await sendNotification(env, submission);
    } catch (err) {
      console.log('notification email failed: ' + (err && err.message));
      return json(502, { ok: false, error: 'notification_failed' }, origin);
    }

    return json(200, { ok: true }, origin);
  },
};
