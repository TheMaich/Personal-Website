# 301: publishing-recoup-calculator stub -> break-even (SPR-85 / SPR-84)

The old recoup calculator was consolidated into the break-even calculator. The
stub at

    /resources/tools/publishing-recoup-calculator.html

still returns **HTTP 200** from GitHub Pages (verified 31 Jul 2026) and Google is
indexing and serving it despite an on-page `<link rel="canonical">` and a
meta-refresh. Google has ignored both for three months, so a real server-side
**301** is required. GitHub Pages cannot issue a 301, so this is fixed at the
Cloudflare edge.

Target of the redirect:

    https://spritzconsulting.com/resources/tools/publishing-break-even-calculator.html

## Recommended fix: Cloudflare Single Redirect Rule (no Worker)

Dashboard: **spritzconsulting.com zone -> Rules -> Redirects -> Create rule ->
Single Redirect**. This costs zero Worker invocations and is the cleanest
signal-passing fix.

- Rule name: `301 recoup stub -> break-even`
- When incoming requests match (Custom filter expression):

      (http.host in {"spritzconsulting.com" "www.spritzconsulting.com"} and http.request.uri.path eq "/resources/tools/publishing-recoup-calculator.html")

- Then: **Static** redirect
  - Type: **301 (Permanent)**
  - URL: `https://spritzconsulting.com/resources/tools/publishing-break-even-calculator.html`
  - Preserve query string: **off** (the stub takes no params)

Equivalent via API (needs a token with `Zone.Redirect Rules` edit on the zone):

    curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_dynamic_redirect/entrypoint" \
      -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
      -d '{
        "rules": [{
          "action": "redirect",
          "expression": "(http.host in {\"spritzconsulting.com\" \"www.spritzconsulting.com\"} and http.request.uri.path eq \"/resources/tools/publishing-recoup-calculator.html\")",
          "action_parameters": {
            "from_value": {
              "status_code": 301,
              "target_url": { "value": "https://spritzconsulting.com/resources/tools/publishing-break-even-calculator.html" },
              "preserve_query_string": false
            }
          }
        }]
      }'

## Verify after applying

    curl -sI https://spritzconsulting.com/resources/tools/publishing-recoup-calculator.html

Expect:

    HTTP/2 301
    location: https://spritzconsulting.com/resources/tools/publishing-break-even-calculator.html

Then in Google Search Console: submit the stub URL for removal / request
re-indexing so the 10 impressions consolidate onto the break-even page.

## Worker fallback (only if a Redirect Rule is unavailable)

A one-path Worker does the same job but adds invocations and ops surface, so
prefer the rule above. If needed, deploy a Worker routed to the exact path
`spritzconsulting.com/resources/tools/publishing-recoup-calculator.html` that
returns:

    return Response.redirect(
      "https://spritzconsulting.com/resources/tools/publishing-break-even-calculator.html",
      301
    );

Do not route it zone-wide (that would collide with the edge-cache Worker's
route). A narrow single-path route has no interaction with the other Workers.
