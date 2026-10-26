---
name: ads-report
description: Summarize paid ads performance across the user's connected Meta (Facebook/Instagram) and Google Ads accounts through Anaella — spend, results, cost per result, best and worst campaigns. Use when the user asks how their ads are doing, where budget goes, or to compare campaigns or platforms.
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
4. **Compare**: per campaign, spend, results, cost per result and ROAS where a value exists.
   Flag campaigns with spend and no results, and the best cost per result.
5. **Report**: totals per account, a campaign table, then 3-5 actions (shift budget, pause,
   check tracking). Recommend; don't change anything.

Every figure comes from a tool output; state the period and currency.

If the user keeps a tracking sheet, offer to log the per-account totals there with
`sheets.append` (one row per account and period, keyed by its column names). Show the rows first.
