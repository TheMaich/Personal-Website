# events-sink Worker

First-party funnel telemetry sink for spritzconsulting.com. It exists so the
six page events actually land somewhere a human can read them, instead of
firing into an empty Zaraz with nobody the wiser.

- **Ingest:** `POST /api/events` — one event per call, sent from the page by
  `navigator.sendBeacon` (see `track()` in `index.html`).
- **Readback:** `GET /api/events/export` — JSON or CSV, behind a shared secret.

## What it stores (and deliberately does not)

Per event: name, timestamp, path (**query string removed**), UTM parameters,
coarse Cloudflare country. That is all.

Never stored: IP address, user agent, referrer, or any raw query string. The
query is dropped precisely because newsletter links carry an email in it. This
is the payoff for keeping telemetry first-party.

Guards on the public POST: only the six known event names
(`form_start`, `form_submit`, `form_error`, `cta_click`, `booking_click`,
`resource_link_click`); a 4 KB body cap; a 300-per-10-minutes-per-IP rate
limit; a 90-day TTL on both event records and daily counters so nothing grows
forever. Its own KV namespace (`FUNNEL_EVENTS`) — never `CONTACT_SUBMISSIONS`.

## Deploy (owner, one time)

Everything below is `wrangler`; the agent env has no Cloudflare token, so this
is Miki's to run.

```bash
cd site/workers/events-sink

# 1. Create the KV namespace, paste the printed id into wrangler.toml.
npx wrangler kv namespace create FUNNEL_EVENTS

# 2. Set the export secret (any long random string). Until this exists the
#    export endpoint returns 500 and refuses to answer.
npx wrangler secret put EXPORT_SECRET

# 3. Deploy.
npx wrangler deploy
```

Optional and additive: in the Cloudflare dashboard, Zaraz > Tools, you can also
point the six custom events at this endpoint. Not required — the page posts to
`/api/events` directly via sendBeacon regardless of Zaraz config.

## Read the data back

This is the whole point. One URL, behind the secret.

```bash
SECRET=... # the EXPORT_SECRET you set above

# Last 7 days, JSON (summary + raw events):
curl -s -H "X-Export-Secret: $SECRET" \
  "https://spritzconsulting.com/api/events/export?days=7" | jq .

# Last 30 days as a spreadsheet:
curl -s -H "X-Export-Secret: $SECRET" \
  "https://spritzconsulting.com/api/events/export?days=30&format=csv" -o funnel.csv

# One event type:
curl -s -H "X-Export-Secret: $SECRET" \
  "https://spritzconsulting.com/api/events/export?days=7&event=form_submit" | jq .summary
```

Params: `days` (1–90, default 7), `event` (filter to one name), `format`
(`json` default, or `csv`). The secret may also be passed as `?secret=` if a
header is inconvenient. Responses are `Cache-Control: no-store`.

## Verify after deploy (end to end)

```bash
# Fire a test event:
curl -s -X POST https://spritzconsulting.com/api/events \
  -H "Content-Type: application/json" -H "Origin: https://spritzconsulting.com" \
  -d '{"event":"cta_click","props":{"placement":"test"},"page":"/","utm":{"utm_source":"verify"}}'
# -> {"ok":true}  (HTTP 202)

# Read it back through the human surface:
curl -s -H "X-Export-Secret: $SECRET" \
  "https://spritzconsulting.com/api/events/export?days=1" | jq '.summary'
# -> the cta_click you just fired appears.
```

If the fired event appears in the export, the acceptance criterion is met:
an event fired, then read back through the surface a human uses.

## Local logic test

No deploy needed to prove the ingest/export logic (in-memory KV mock,
20 assertions): see the test in this issue's run scratch / the SPR-82 thread.
`node --check worker.js` covers syntax.
