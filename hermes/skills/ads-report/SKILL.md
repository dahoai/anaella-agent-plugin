---
name: ads-report
description: Audit, summarize and diagnose paid ads across the user's connected Meta (Facebook/Instagram) and Google Ads accounts through Anaella — spend, results, cost per result, best and worst campaigns, competitors' Meta ads and hooks, paid search overlapping organic rank, wasted search spend and negative keywords, kill/scale budget verdicts, anomalies (spend spikes, delivery drops, stopped conversions), why an account is not serving, who changed what, real leads and calls behind the conversions, Google ad fatigue, A/B test winners, landing page audits, PPC maths (break-even CPA, LTV:CAC, forecasts, sample sizes), and applying the agreed fixes (negatives, pauses, budgets, bidding, keywords, ad copy). Use when the user asks for an ads audit or account review, how their ads are doing, where budget goes or is wasted, what to pause or scale, to compare campaigns or platforms, what ads competitors run, why ads stopped, whether a test has a winner, whether a landing page converts, or to make the recommended changes, or to create a new Google Search or Performance Max campaign or Meta ad.
---

# Ads report with Anaella

Read the `anaella` skill first. Steps 1-5 only read; nothing changes in the ad accounts until
step 6, and only with the user's yes.

1. **Accounts.** `ads.meta.accounts.list` (live ad accounts of each Meta login) and
   `ads.google.accounts.list` (connected Google Ads customers). Several → ask which, or
   report each separately. Note each account's currency; never add spend across currencies.
2. **Meta** (`ads.meta.insights.get`): `level: "campaign"`, `datePreset: "last_30d"` (or the
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
   - `ads.pulse.get` (Google or Meta account): anything broken right now? Spend spike, delivery
     drop, CPA up, conversions stopped, and on Google yesterday's changes made outside the API
     (someone in the web UI, auto-applied recommendations). Start here.
   - `ads.budget.review` (Google or Meta account, `targetCpa` / `targetRoas`): a verdict per
     campaign (kill, restart, no_delivery, raise_budget, reduce, fix_bidding, scale, hold,
     insufficient_data) with the reason and the exact change. Scale in 20% steps only.
     On Meta it also gives a verdict per delivering ad (`ads`): turn_off, rotate, keep,
     insufficient_data, with `hookRate`, `frequency` and CTR week over week. The CPA here is
     cost per conversion: leads that never become customers still look cheap, so ask what a
     qualified lead costs and pass that as `targetCpa`. Never turn off an ad without a
     replacement ready, except a failed hook; rotate means a new execution of the same
     concept. Thresholds are defaults for cold audiences, not benchmarks.
   - `ads.google.wasted_spend` (Google): searches and 1-3 word phrases that cost money and
     converted nobody, with the campaigns to add them to as exact / phrase negatives. Brand
     searches are never proposed; pass `brandTerms` if the account name isn't the brand.
   - `ads.google.organic_overlap` (Google + a Search Console site): search terms you pay for
     while ranking for them organically. Only `strong_overlap` (organic top 3) is worth a
     test: pause paid for 2-4 weeks on a holdout and compare paid plus organic conversions,
     never a straight pause. `unknown` is not "you don't rank"; brand terms are never paused.
   - `ads.competitors.list` (no account needed): a competitor's live Meta ads from the public Ad
     Library, with each ad's hook and `daysLive` (30+ days running usually means it works) and
     hooks grouped by how they open. Search the brand name in `searchTerms`, then pass its
     `pageId` in `pageIds`. `countries` must be EU, EEA or UK markets: the archive has no
     ordinary ads elsewhere, so a US-only advertiser shows nothing. Spend is not published.
   - `ads.account.status` (Google or Meta account): can it deliver right now, and if not why
     (billing, spend cap, unsettled balance, disapproved ads, campaigns that cannot serve).
     Start here when spend is zero. Card declines are not in the API: say so (`notAvailable`).
   - `ads.changes.list` (`days` 1-30): who changed what in the account and when; API changes
     (Anaella's own) are left out unless `includeApi`. Use it when performance moved overnight.
   - `ads.conversions.list` (`days`): the Local Services leads and call-ad calls behind
     Google's conversion count (numbers masked to the last 4 digits, longest call per lead,
     repeat callers), the conversion actions with all versus biddable conversions (a big gap
     means bidding optimizes for map taps, not calls), and on Meta the call ladder (placed,
     confirmed, 20 s, 60 s).
   - `ads.google.creative.review` (`days` 14-90): a verdict per ad against the account's own
     median CTR (fatigued, underperforming, healthy, thin_data, not_serving) and responsive
     search ad structure per ad group (headlines, descriptions, ad strength, too many ads).
   - `ads.test.evaluate` (`controlAdId`, `variantAdId`, `since`, `metric`): two-proportion test
     with the sample each arm still needs. Only `standing: "decided"` names a winner; a
     significant lead under the sample is still `collecting`, never call it early.
   - `ads.landing.audit` (`url`, plus `adHeadline` / `adDescription` / `keyword` for message
     match; no account needed, async): 31 landing page controls (message match, speed, mobile,
     trust, form), scored, with the page evidence; decide the `JUDGE` ones from that evidence
     (the headline against the ad, the offer, the trust signals) and say which stay open.
   - `ads.math.calculate` (no account): break_even (max CPA from AOV and margin), ltv_cac,
     impression_share (what lost share is worth), forecast (budget → conversions), sample_size,
     significance. Use it instead of doing the arithmetic yourself.
   - `ads.audit.run` (Google or Meta account): the full account audit (82 Google / 50 Meta
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
   - New Google Search campaign: `ads.google.campaign.create` builds budget, campaign,
     locations, languages, one ad group with its keywords, negatives and a responsive search ad
     in one atomic change, the campaign PAUSED. Before proposing it, ask the offer, the area
     served, the daily budget and the landing page; check the page with `ads.landing.audit`, and
     write 10-15 headlines and 4 descriptions. Look up `locationIds` with the
     `geo_target_constant` query in its description. Default bidding MAXIMIZE_CLICKS on a new
     account (no conversion data yet); start keywords in PHRASE or EXACT. Run it with
     `dryRun: true`, show the plan, then for real; it starts only with
     `ads.google.campaign.update` status ENABLED, after a second yes.
   - New Performance Max campaign: `ads.google.pmax.create` builds budget, targeting, brand
     (`businessName`, `logo`) and one asset group (headlines, long headlines, descriptions,
     images, optional YouTube videos, call to action, search themes) in one atomic change,
     PAUSED. It needs conversion tracking: check `ads.conversions.list` first, and say plainly
     that PMax without conversions spends blind. Images: use the user's own (media library
     `resourceId`, or a public `url`; `media.upload` puts a file there) or make them with
     `media.image.generate`, and show them before using them. One picture is enough per idea:
     Anaella crops it to landscape and square (portrait with `portraitImages`), so pick images
     whose subject sits in the middle. A video must already be on YouTube: publish it unlisted
     with `social.post.create` on the user's YouTube channel (or use one they have), else
     Google generates one from the images. Same steps after: `dryRun: true`, show the plan,
     create, start with `ads.google.campaign.update` after a second yes.
   - Google: `ads.google.negatives.update` (the wasted_spend negatives, on a campaign or a
     shared list), `ads.google.campaign.update` (status, daily budget in account currency,
     bidding strategy), `ads.google.keywords.update` (add, pause, enable, remove; prefer
     pause), `ads.google.ad.update` (pause, or new RSA copy), `ads.google.ad.create` (a new
     RSA, always created paused), `ads.google.conversion_goal.update` (what smart bidding
     counts; turning off a GOOGLE_HOSTED goal is one-way), `ads.google.audiences.update`
     (add or remove remarketing / customer lists on a campaign; a Search campaign takes only
     lists eligible for search). Ids come from `ads.google.query`.
   - Meta: `ads.meta.entity.update` with `level` campaign, adset or ad and its `id` (status, daily
     budget in minor units, never on an ad). Ids come from `ads.meta.insights.get` at that level.
     `ads.meta.ad.create` builds a new ad, always paused: an image or video, a promoted post, or
     a lead ad (`objective: "leads"` with an existing `leadFormId`). Reels usually beat
     carousels on a small cold budget. Ask whether the ad is about housing, jobs or credit:
     `specialCategory` is mandatory for those, and rules out age targeting.
   - Scale budgets in 20% steps at most; never add the business's own brand as a negative.
   - Meta: re-read the object before proposing a change (it may already be paused), and leave
     a new ad 7 days before judging it: every significant edit restarts learning. Up to 75%
     over the daily budget in one day is normal; the week stays within 7x.
7. **Every morning**: offer a watch on `ads.pulse.get` (one event per anomaly per day), or an
   automation on it that messages the user only then. `ads.conversions.list` and
   `ads.changes.list` can be watched too: a new lead or call, a change someone made.

Every figure comes from a tool output; state the period and currency.

If the user keeps a tracking sheet, offer to log the per-account totals there with
`sheets.append` (one row per account and period, keyed by its column names). Show the rows first.
