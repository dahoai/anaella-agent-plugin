---
name: seo-report
description: Build an SEO performance report for a site from its connected Google Search Console and Google Analytics 4 data through Anaella. Use when the user asks how their site is doing in search, for top queries or pages, traffic trends, or what to improve.
---

# SEO report with Anaella

Read the `anaella` skill first for the find → explain → do loop.

1. **Pick the site.** `gsc.sites.list` lists connected Search Console sites;
   `analytics.properties.list` lists GA4 properties. If either is missing, say which and
   give the connect link it returns. Several sites → ask which.
2. **Search performance** (`gsc.queries.list`), last 28 days vs the 28 before:
   - totals: no `dimensions`;
   - top queries: `dimensions: ["query"]`, `rowLimit: 25`;
   - top pages: `dimensions: ["page"]`, `rowLimit: 25`.
   Search Console data lags about 2 days; end the range 2-3 days ago. `ctr` is a 0-1 ratio.
3. **Traffic** (`analytics.report`), same periods: `metrics: ["sessions", "totalUsers",
   "conversions"]` by `sessionDefaultChannelGroup`, then `sessions` by `landingPage` for
   `sessionDefaultChannelGroup` = "Organic Search" (a `filters` entry).
4. **Opportunities**:
   - queries with high impressions, position 5-20 and low CTR → title/description rewrites;
   - pages losing clicks period over period;
   - for one or two key pages, `gsc.url.inspect` to confirm they are indexed, and
     `web.page.read` to check the title, headings and content against the queries.
5. **Report**: a short summary (clicks, impressions, CTR, position, organic sessions, with
   the change), the tables, then 3-5 concrete actions, each tied to a query or page.

Never invent numbers: every figure comes from a tool output. Say which dates you used.

If the user keeps a tracking sheet, offer to log the totals there with `sheets.append`
(one row per period, keyed by its column names). Show the row first.
