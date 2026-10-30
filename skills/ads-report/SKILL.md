---
name: ads-report
description: Summarize and diagnose paid ads across the user's connected Meta (Facebook/Instagram) and Google Ads accounts through Anaella — spend, results, cost per result, best and worst campaigns, wasted search spend and negative keywords, kill/scale budget verdicts, and anomalies (spend spikes, delivery drops, stopped conversions). Use when the user asks how their ads are doing, where budget goes or is wasted, what to pause or scale, or to compare campaigns or platforms.
---

# Ads report with Anaella

Read the `anaella` skill first. These tools only read; nothing is changed in the ad accounts.

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
5. **Report**: totals per account, a campaign table, then 3-5 actions in this order: tracking
   first (conversions stopped, or no conversion value), then waste (kill verdicts, negatives),
   then growth (raise_budget, scale). Recommend; don't change anything. Pausing or a budget
   change on Meta is `ads.meta.campaign.update`, only after the user says yes to that exact
   change; Google changes and negatives are made in Google Ads.
6. **Every morning**: offer an automation that runs `ads.pulse` daily and messages the user
   only when `anomalies` is not empty.

Every figure comes from a tool output; state the period and currency.

If the user keeps a tracking sheet, offer to log the per-account totals there with
`sheets.append` (one row per account and period, keyed by its column names). Show the rows first.
