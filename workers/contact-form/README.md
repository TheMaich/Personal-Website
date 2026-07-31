# Spritz contact form Worker

Backend for the contact form on spritzconsulting.com. Accepts a JSON POST,
validates it, stores it in Workers KV, and emails a notification through the
Resend HTTP API.

## Endpoint

`POST /api/contact` with JSON body:

```json
{
  "name": "optional",
  "company": "optional",
  "email": "required, validated",
  "message": "required, non empty",
  "found_via": "optional, self-reported attribution slug (linkedin, search, referral, reddit, event, newsletter, other)",
  "page": "optional, path the form was on",
  "referrer": "optional, document.referrer",
  "website": "honeypot, must stay empty"
}
```

Responses: `200 {ok:true}` on success, `422` on invalid email or empty
message, `429` when rate limited (5 submissions per IP per 10 minutes),
`403` for foreign origins.

## Deploy steps

All commands run from this folder (`workers/contact-form/`).

1. Log in once:

   ```
   npx wrangler login
   ```

2. Create the KV namespace and copy its id:

   ```
   npx wrangler kv namespace create CONTACT_SUBMISSIONS
   ```

   Paste the returned id into `wrangler.toml` replacing
   `REPLACE_WITH_NAMESPACE_ID`.

3. Deploy:

   ```
   npx wrangler deploy
   ```

   The routes in `wrangler.toml` bind the Worker to
   `spritzconsulting.com/api/contact` and the `www` variant. Both patterns
   deploy automatically as long as the zone lives in the same Cloudflare
   account. To verify: Cloudflare dashboard, Workers & Pages, the
   `spritz-contact-form` Worker, Settings, Domains & Routes.

4. Test:

   ```
   curl -X POST https://spritzconsulting.com/api/contact \
     -H "Content-Type: application/json" \
     -H "Origin: https://spritzconsulting.com" \
     -d "{\"email\":\"test@example.com\",\"message\":\"hello\",\"page\":\"/\"}"
   ```

   Expect `{"ok":true}`.

## Reading submissions

```
npx wrangler kv key list --binding CONTACT_SUBMISSIONS --remote
npx wrangler kv key get "<key>" --binding CONTACT_SUBMISSIONS --remote
```

Keys look like `submission:2026-07-18T10:00:00.000Z:<uuid>` and sort by
timestamp. `rl:` keys are rate-limit counters and expire on their own.

## Email notification (required, free, first party)

The Worker sends a notification through the Resend HTTP API. Resend was chosen
over Cloudflare Email Routing because it verifies the sending domain with a DNS
TXT record only: the zone MX is untouched, so the existing Gmail inbox keeps
receiving normal mail. Notification is REQUIRED: if `RESEND_API_KEY` is missing
or Resend returns a non-2xx status, the Worker returns
`502 {"ok":false,"error":"notification_failed"}` instead of a silent 200. The
submission is written to KV first, so no lead is lost even on a 502; it stays
recoverable with the read commands above.

One-time setup (needed before mail arrives):

1. Create a Resend account (free tier covers ~3,000 emails/month) and add the
   `spritzconsulting.com` domain. Add the DNS records Resend shows (TXT/DKIM,
   and its Return-Path CNAME). These do not touch the MX record, so Gmail is
   unaffected. Wait for Resend to mark the domain Verified.
2. Create an API key in Resend, then store it as a Worker secret (never commit
   it):

   ```
   npx wrangler secret put RESEND_API_KEY
   ```

3. Set `NOTIFY_TO` in `wrangler.toml` to the inbox that should receive
   notifications (defaults to `hello@spritzconsulting.com`). The From address
   is `contact-form@spritzconsulting.com`; it must sit on the verified domain.
   `reply_to` is set to the visitor's address, so replying from the inbox goes
   straight back to them.
4. `npx wrangler deploy`.

Note: before deploying, replace `REPLACE_WITH_NAMESPACE_ID` in `wrangler.toml`
with the live `CONTACT_SUBMISSIONS` namespace id (run
`npx wrangler kv namespace list`), or the deploy binds an empty KV namespace.
