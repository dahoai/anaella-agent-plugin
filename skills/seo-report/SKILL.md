---
name: seo-report
description: SEO through Anaella — a performance report from the site's own Search Console and GA4 data, plus outside SEO data (keyword research, live Google results, competitor domains, backlinks, visibility in ChatGPT / AI Overviews) and a strategy method to turn it into a few actions. Use when the user asks how their site is doing in search, what to improve, how to rank for something, who their SEO competitors are, for keyword ideas or backlinks, or whether AI assistants mention them.
---

# SEO with Anaella

Read the `anaella` skill first for the find → explain → do loop.

Two kinds of data, never mixed up:
- **The site's own numbers** (exact, free): `gsc.sites.list`, `gsc.queries.list`,
  `gsc.url.inspect`, `analytics.properties.list`, `analytics.report`. Needs Search Console /
  GA4 connected.
- **Outside data** (third-party estimates, paid per call, any domain): `seo.keywords.ideas`,
  `seo.keywords.metrics`, `seo.serp`, `seo.domain.overview`, `seo.domain.keywords`,
  `seo.domain.tech`, `seo.backlinks.summary`, `seo.backlinks.list`, `seo.ai.answers`,
  `seo.ai.mentions`. Say the price before a run of several calls; prefer `limit` 20-50.
- Pages: `web.page.read` (content), `web.page.audit` (on-page SEO, schema, tech, headers).

## The method: diagnose, choose, act

Random fixes are not a strategy. Every analysis ends in three parts:
1. **Diagnosis**: one honest, evidence-based statement of the real problem and why it exists,
   tied to a business consequence ("ranks on page 3 for every commercial term; 78% of traffic
   is direct, so new customers never find the business"). Not "needs more traffic".
2. **Guiding policy**: one sentence choosing how to win, which also says what not to do
   ("own local intent before chasing national terms").
3. **Coherent actions**: 3-5 actions that serve that policy and reinforce each other, each
   tied to a query, page or competitor from the data.

Classify each finding, instead of critical/high/low:
- **Threat** (fix now): blocks crawling or harms the site: noindex or 404 on key pages, wrong
  canonicals, blocked resources, redirect loops, mixed content.
- **Gap** (plan): weak titles and descriptions, heading problems, missing schema or alt text,
  slow pages, thin internal links.
- **Opportunity** (choose strategically): topics competitors cover and the site doesn't,
  pages to expand or merge, keywords gaining traction, SERP features or AI answers to win.

Rank with **Impact = severity (1-5) × scale (1-5) × page importance (1-3)**; 40+ now, 20-39
within two weeks, below 10 is not worth the effort. Grade pages and dimensions as Strong /
Adequate / Weak / Missing, never invented 0-100 scores.

Think in **jobs to be done**: each query is someone solving a problem, seizing an
opportunity or looking for information, at a stage of their journey. Map each important
query to one page (and each page to one primary topic); a query with no page is a content
opportunity, a page with no query is a candidate to merge or rework.

A page that wins (and gets cited by AI answers) states its purpose in the first lines,
answers in self-contained passages, covers the follow-up questions people ask (People also
ask, the searches AI engines run), shows who stands behind it, and has clean structured data.

## Workflows

**How is my site doing / what should I improve** (own numbers):
1. Pick the site (`gsc.sites.list`, `analytics.properties.list`); missing → give the connect
   link it returns. Several → ask which.
2. `gsc.queries.list`, last 28 days vs the 28 before: totals (no `dimensions`), top queries
   (`dimensions: ["query"]`, `rowLimit: 25`), top pages (`["page"]`). Data lags ~2 days: end
   the range 2-3 days ago. `ctr` is a 0-1 ratio.
3. `analytics.report`, same periods: `sessions`, `totalUsers`, `conversions` by
   `sessionDefaultChannelGroup`, then `sessions` by `landingPage` filtered to Organic Search.
4. Opportunities: high impressions + position 5-20 + low CTR → title/description rewrites;
   pages losing clicks; `gsc.url.inspect` and `web.page.audit` on one or two key pages.
5. Report: totals with their change, the tables, then diagnosis → policy → 3-5 actions.

**How do I rank for X / keyword research**:
`seo.keywords.ideas` on the seed (volume, difficulty, intent) → `seo.serp` on the 2-3 best
terms to see who ranks, the People also ask questions and AI Overview sources →
`web.page.read` the top result to see what it covers → recommend the page to create or
improve, with its primary and secondary keywords and the questions it must answer. Check the
user's current position with `gsc.queries.list` first when Search Console is connected.

**Who are my competitors / what do they do better**:
`seo.serp` on the user's main terms gives the real search competitors (not always their
business ones) → `seo.domain.overview` for each (estimated visits, keywords by position, top
pages) → `seo.domain.keywords` on the strongest to find terms they rank for and the user
doesn't (compare with `gsc.queries.list`) → `seo.backlinks.summary` for both sides.

**Links**: `seo.backlinks.summary` (authority, referring domains, spam score), then
`seo.backlinks.list` with `view: "domains"` for a competitor: sites linking to them but not to
the user are outreach targets. `view: "anchors"` shows how others describe the site.

**Am I visible in ChatGPT / AI answers**:
`seo.ai.mentions` with the brand or domain and 2-4 `competitors` (share of mentions; Google AI
Overviews by default, `platform: "chatgpt"` for ChatGPT, US English only), `questions: true` to
see which questions mention them. Then `seo.ai.answers` with 2-3 questions a customer would
ask and `brand` set: whether each assistant names the user, and which pages it cites. Cited
pages are the ones to study and to earn mentions on.

## Rules

- Never invent numbers: every figure comes from a tool output. Say which dates and market.
- Call outside data "estimates"; the site's own Search Console figures win when both exist.
- Keep it to a few actions the user can do this month; the rest goes in a short backlog.
- If the user keeps a tracking sheet, offer to log totals with `sheets.append` (show the row
  first).
