---
name: alerts-automations
description: Set up standing jobs through Anaella — watches that report new emails, Slack messages, comments, reviews, files, sheet rows, payments or failed n8n runs, and automations where Anaella's agent acts on them or on a schedule (daily digests, drafted replies, weekly reports), with writes waiting for approval. Use when the user says "tell me when", "every morning", "every Monday", "whenever a new…", or wants something done automatically.
---

# Alerts and automations with Anaella

Read the `anaella` skill first.

**Just be told (watch).** `watch.create` with `capability` (a list tool: `email.list`,
`slack.messages.list`, `social.comments.list`, `reviews.list`, `drive.files.search`,
`sheets.read`, `calendar.events.list`, `stripe.payments.list`, `paypal.invoices.list`,
`n8n.executions.list`…), its `input` (e.g. `{ "query": "from:@acme.com" }`), a `name`, and
`every` (5m, 15m, 1h… only used when the provider has no push). Gmail, Outlook, Slack, Calendar,
Drive and Business Profile push new items within seconds. Then read `watch.events` with
`since`; you have no webhook URL in a chat, so check back.

**Act on it (automation).** `automation.create`:
- `source`: `{ capability, input, every }` for a new watch, `{ watchId }` for an existing one,
  or `{ schedule: { cron, timezone } }` (5-field cron in an IANA timezone, e.g.
  `{ "cron": "0 9 * * 1", "timezone": "Europe/Paris" }`, at least 15 minutes apart).
- `instructions`: what Anaella's agent should do with each item or run, in plain words.
- `tools`: the capability ids it may call, as few as the job needs. A scheduled run gets no
  items, so give it the read tools it needs (`email.list`, `calendar.events.list`…).
- `approval`: keep the default `"review"`, where every write waits for the user
  (`automation.actions.list`, `automation.action.decide`, or the app's Automations page).
  `"auto"` sends in their name with no check: only on explicit request.
- `maxRunsPerDay` (default 20). Runs are billed in AI credits.

Before creating one, show the user the trigger, instructions, tools and approval mode and get a
yes. Try it right away with `automation.test`. List or change them with `automation.list` and
`automation.update`.
