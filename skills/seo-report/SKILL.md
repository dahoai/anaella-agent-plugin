---
name: seo-report
description: SEO through Anaella — a performance report from the site's own Search Console and GA4 data, a technical crawl of the site, outside SEO data (keyword research, live Google results, competitor domains, backlinks, visibility in ChatGPT / AI Overviews) and a strategy method to turn it into a few actions. Use when the user asks how their site is doing in search, what to improve, for a technical SEO audit, broken links or duplicate titles, how to rank for something, who their SEO competitors are, for keyword ideas or backlinks, or whether AI assistants can read or mention them.
---

# SEO with Anaella

Read the `anaella` skill first for the find → explain → do loop.

Two kinds of data, never mixed up:
- **The site's own numbers** (exact, free): `gsc.sites.list`, `gsc.opportunities`
  (measured quick wins and drops), `gsc.index.coverage` (which pages Google indexed and why
  not), `gsc.queries.list` (raw rows), `gsc.url.inspect`, `analytics.properties.list`,
  `analytics.report`. Needs Search Console / GA4 connected. Bing (also behind Yahoo,
  DuckDuckGo, Ecosia and ChatGPT search), once Bing Webmaster Tools is connected:
  `bing.sites.list`, `bing.queries.list`, `bing.crawl.issues`, `bing.url.inspect`.
- **Outside data** (third-party estimates, paid per call, any domain): `seo.keywords.ideas`,
  `seo.keywords.metrics`, `seo.serp`, `seo.domain.overview`, `seo.domain.keywords`,
  `seo.domain.tech`, `seo.backlinks.summary`, `seo.backlinks.list`, `seo.ai.answers`,
  `seo.ai.mentions`. Say the price before a run of several calls; prefer `limit` 20-50.
- The site itself (free): `seo.site.audit` (crawls up to 100 pages: errors, broken links,
  noindex, canonicals, titles, descriptions, H1, thin pages, alt, orphans, sitemap gaps, each
  labelled threat or gap), `seo.ai.readiness` (AI crawlers allowed or blocked in robots.txt,
  llms.txt), `seo.page.audit` (one page in depth: schema, hreflang, headers), `web.page.read`.

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
2. `gsc.opportunities` (28 days vs the 28 before, already anchored on Google's latest data):
   `totals` for the change, then its lists. For top queries and pages add `gsc.queries.list`
   (`dimensions: ["query"]` or `["page"]`, `rowLimit: 25`). `ctr` is a 0-1 ratio.
3. `analytics.report`, same periods: `sessions`, `totalUsers`, `conversions` by
   `sessionDefaultChannelGroup`, then `sessions` by `landingPage` filtered to Organic Search.
4. Opportunities, from `gsc.opportunities` (each list is measured, never guess one yourself):
   `pageTwo` → strengthen that page for the query (content, internal links, title);
   `lowCtr` → rewrite the title and description to match the query; `cannibalized` → pick one
   page per query, merge or differentiate the others; `fallers`, `clickDrops`, `pageDrops` →
   read the page (`seo.page.audit`) and the results (`seo.serp`): who overtook it, did the
   page change; `newQueries` → demand you can serve on purpose. Empty movers with
   `comparable: false` mean "not measurable yet", not "nothing moved".
5. Report: totals with their change, the tables, then diagnosis → policy → 3-5 actions.

**Technical health / site audit**:
`seo.site.audit` on the home page (`maxPages` 50-100; async, poll the job). Its `issues` are
already threats and gaps: rank them with the Impact formula (a broken link on a page with many
`inlinks` matters more than one on a deep page). `seo.page.audit` on the 1-2 most important
pages with problems for schema and headers. `partial: true` means a bigger site: say the
results cover the pages crawled, not the whole site. Cross-check with `gsc.url.inspect` before
calling a `noindex` or canonical a mistake.

**Is Google indexing my pages**:
`gsc.index.coverage` (async; sitemap URLs by default, or `urls` for the key pages). Fix per
`notIndexed` state: "URL is unknown to Google" → in the sitemap? linked from indexed pages?;
"Discovered - currently not indexed" → Google has not crawled it yet: add internal links from
strong pages, make it worth crawling; "Crawled - currently not indexed" → Google judged it not
worth indexing: thin or duplicate, improve or merge; "Excluded by 'noindex' tag" / "Alternate
page with proper canonical tag" → intended or not? `canonicalMismatch` → Google prefers
another URL: fix duplicates or the declared canonical. `sitemaps` with errors, or never
downloaded, come first. Google has no indexing API for ordinary pages (the owner requests it in
Search Console), but Bing does: after a yes, `bing.urls.submit` (Bing connected, up to 500 URLs,
daily quota) or `indexnow.submit` (Bing, Yandex, Naver, Seznam…; the site must serve its key
file) for new or changed pages only. `bing.crawl.issues` lists what Bing could not crawl.

**How do I rank for X / keyword research**:
`seo.keywords.ideas` on the seed (volume, difficulty, intent) → `seo.serp` on the 2-3 best
terms to see who ranks, the People also ask questions and AI Overview sources →
`web.page.read` the top result to see what it covers → recommend the page to create or
improve, with its primary and secondary keywords and the questions it must answer.

**Optimize an existing page for a query**: `seo.serp` on the query, `web.page.read` on the
user's page and the top 3 organic results, then compare: headings and the subtopics they cover,
length, the People also ask questions each answers, and what the AI Overview cites. The gaps
are the edits: missing subtopics and questions, a title and H1 that match the intent. Check the
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
First `seo.ai.readiness`: a site that blocks the search and user agents
(OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User)
can't be read or cited by those assistants; blocking only training bots (GPTBot, ClaudeBot,
Google-Extended, CCBot) is a content-use choice, not a visibility fault; no llms.txt is a small gap. Then
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
