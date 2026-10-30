---
name: ads-report
description: Audit, summarize and diagnose paid ads across the user's connected Meta (Facebook/Instagram) and Google Ads accounts through Anaella — spend, results, cost per result, best and worst campaigns, competitors' Meta ads and hooks, paid search overlapping organic rank, wasted search spend and negative keywords, kill/scale budget verdicts, anomalies (spend spikes, delivery drops, stopped conversions), and applying the agreed fixes (negatives, pauses, budgets, bidding, keywords, ad copy). Use when the user asks for an ads audit or account review, how their ads are doing, where budget goes or is wasted, what to pause or scale, to compare campaigns or platforms, what ads competitors run, or to make the recommended changes.
---

# Ads report with Anaella

Read the `anaella` skill first. Steps 1-5 only read; nothing changes in the ad accounts until
step 6, and only with the user's yes.

1. **Accounts.** `ads.meta.accounts.list` (live ad accounts of each Meta login) and
   `ads.google.accounts.list` (connected Google Ads customers). Several → ask which, or
   report each separately. Note each account's currency; never add spend across currencies.
2. **Meta** (`ads.meta.insights`): `level: "campaign"`, `datePreset: "last_30d"` (or the
   user's period), `fields: ["spend", "impressions", "clicks", "ctr", "actions",
   "action_values"]`. Results are in `metrics["actions.<type>"]` (e.g.
   `actions.purchase`, `actions.lead`); `ctr` is a percentage.
3. **Google Ads** (`ads.google.query`), same period:
   ```
   SELECT campaign.name, campaign.status, metrics.cost_micros, metrics.clicks,
          metrics.impressions, metrics.conversions, metrics.conversions_value
   FROM campaign WHERE segments.date DURING LAST_30_DAYS
   ORDER BY metrics.cost_micros DESC LIMIT 50
   ```
   Cost is `metrics.costMicros / 1 000 000` in the account currency; `ctr` is a 0-1 ratio.
4. **Diagnose** (free, model-free: the same data always gives the same verdicts; ask for the
   user's target CPA or ROAS first, else they are judged against the account's own average):
   - `ads.pulse` (Google or Meta account): anything broken right now? Spend spike, delivery
     drop, CPA up, conversions stopped, and on Google yesterday's changes made outside the API
     (someone in the web UI, auto-applied recommendations). Start here.
   - `ads.budget.review` (Google or Meta account, `targetCpa` / `targetRoas`): a verdict per
     campaign (kill, restart, no_delivery, raise_budget, reduce, fix_bidding, scale, hold,
     insufficient_data) with the reason and the exact change. Scale in 20% steps only.
   - `ads.google.wasted_spend` (Google): searches and 1-3 word phrases that cost money and
     converted nobody, with the campaigns to add them to as exact / phrase negatives. Brand
     searches are never proposed; pass `brandTerms` if the account name isn't the brand.
   - `ads.google.organic_overlap` (Google + a Search Console site): search terms you pay for
     while ranking for them organically. Only `strong_overlap` (organic top 3) is worth a
     test: pause paid for 2-4 weeks on a holdout and compare paid plus organic conversions,
     never a straight pause. `unknown` is not "you don't rank"; brand terms are never paused.
   - `ads.competitors` (no account needed): a competitor's live Meta ads from the public Ad
     Library, with each ad's hook and `daysLive` (30+ days running usually means it works) and
     hooks grouped by how they open. Search the brand name in `searchTerms`, then pass its
     `pageId` in `pageIds`. `countries` must be EU, EEA or UK markets: the archive has no
     ordinary ads elsewhere, so a US-only advertiser shows nothing. Spend is not published.
   - `ads.audit` (Google or Meta account): the full account audit (82 Google / 50 Meta
     controls) with a 0-100 score and a grade.
     The API-answerable controls come decided with evidence; the others are `JUDGE` with their
     criteria: decide those you can from what you know of the business (ask if needed), say
     which you left open, and never present the score as covering them (`coverage`). Pass
     `localBusiness` when the business serves a local area. Lead with `criticalIssues`, then
     `quickWins`.
5. **Report**: totals per account, a campaign table, then 3-5 actions in this order: tracking
   first (conversions stopped, or no conversion value), then waste (kill verdicts, negatives),
   then growth (raise_budget, scale). Recommend; don't change anything yet.
6. **Apply, only after a yes.** These act on live spend in the user's name: list the exact
   changes (campaign, old → new), get a yes to that list, run each with `dryRun: true` first
   (Google or Meta validates it and changes nothing), then for real. Keep each output's
   `before`: it is how to undo.
   - Google: `ads.google.negatives.update` (the wasted_spend negatives, on a campaign or a
     shared list), `ads.google.campaign.update` (status, daily budget in account currency,
     bidding strategy), `ads.google.keywords.update` (add, pause, enable, remove; prefer
     pause), `ads.google.ad.update` (pause, or new RSA copy), `ads.google.ad.create` (a new
     RSA, always created paused), `ads.google.conversion_goal.update` (what smart bidding
     counts; turning off a GOOGLE_HOSTED goal is one-way). Ids come from `ads.google.query`.
   - Meta: `ads.meta.update` with `level` campaign, adset or ad and its `id` (status, daily
     budget in minor units, never on an ad). Ids come from `ads.meta.insights` at that level.
   - Scale budgets in 20% steps at most; never add the business's own brand as a negative.
7. **Every morning**: offer an automation that runs `ads.pulse` daily and messages the user
   only when `anomalies` is not empty.

Every figure comes from a tool output; state the period and currency.

If the user keeps a tracking sheet, offer to log the per-account totals there with
`sheets.append` (one row per account and period, keyed by its column names). Show the rows first.
