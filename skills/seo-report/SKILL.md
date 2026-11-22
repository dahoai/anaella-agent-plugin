---
name: seo-report
description: SEO through Anaella — a performance report from the site's own Search Console and GA4 data, rank tracking with alerts, a content audit (keep, improve, prune) and topic clusters, a technical crawl of the site (links, images, hreflang, social cards), Core Web Vitals, sitemap and schema audits, local SEO, outside SEO data (keyword research and gaps, live Google results, competitor domains, backlinks and link gaps, brand presence, visibility in ChatGPT / AI Overviews) and a strategy method to turn it into a few actions. Use when the user asks how their site is doing in search, what to improve, to track rankings or be alerted on drops, for a technical, speed, schema, sitemap or local SEO audit, which pages to prune or refresh, how to rank for something, who their SEO competitors are and what they rank for, for keyword ideas, backlinks or link-building prospects, or whether AI assistants can read or mention them. To write or optimize one page use `seo-content`.
---

# SEO with Anaella

Read the `anaella` skill first for the find → explain → do loop.

Two kinds of data, never mixed up:
- **The site's own numbers** (exact, free): `gsc.sites.list`, `gsc.opportunities.list`
  (measured quick wins and drops), `gsc.rankings.list` (rank tracking: daily positions of
  chosen keywords), `gsc.content.audit` (a verdict per page: refresh, push to page one,
  improve snippet, rework or merge, prune, keep), `gsc.topics.list` (queries grouped into
  topics, topical focus), `gsc.index.coverage.get` (which pages Google indexed and why
  not), `gsc.queries.list` (raw rows; `filters` for one query or page), `gsc.url.inspect`, `analytics.properties.list`,
  `analytics.report`. Needs Search Console / GA4 connected. Bing (also behind Yahoo,
  DuckDuckGo, Ecosia and ChatGPT search), once Bing Webmaster Tools is connected:
  `bing.sites.list`, `bing.queries.list`, `bing.crawl.issues`, `bing.url.inspect`.
- **Outside data** (third-party estimates, paid per call, any domain): `seo.keywords.ideas`,
  `seo.keywords.metrics`, `seo.serp.get`, `seo.rank.check` (live positions, any domain),
  `seo.domain.overview`, `seo.domain.keywords` (`versus` a competitor: the keyword gap),
  `seo.domain.tech`, `seo.backlinks.summary`, `seo.backlinks.list` (`view: "gap"`: link-building
  prospects), `seo.brand.presence` (Wikipedia, Wikidata, GitHub, social profiles),
  `seo.ai.answers`, `seo.ai.mentions`. Say the price before a run of several calls; prefer
  `limit` 20-50.
- The site itself (free): `seo.site.audit` (crawls up to 100 pages: errors, broken links,
  noindex, canonicals, titles, descriptions, H1, thin pages, alt, orphans, sitemap gaps, weak
  internal links and anchors, image sizes and names, social cards, hreflang, mobile viewport,
  each labelled threat or gap), `seo.page.speed` (Core Web Vitals from real Chrome users +
  Lighthouse), `seo.sitemap.audit`, `seo.schema.audit` (structured data across key pages and
  the types each lacks), `seo.local.audit` (local business signals), `seo.ai.readiness` (AI
  crawlers allowed or blocked in robots.txt, llms.txt), `seo.page.audit` (one page in depth:
  schema, hreflang, headers), `seo.backlink.verify` (does a page really link to the site),
  `seo.domain.whois`, `web.page.read`.

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
2. `gsc.opportunities.list` (28 days vs the 28 before, already anchored on Google's latest data):
   `totals` for the change, then its lists. For top queries and pages add `gsc.queries.list`
   (`dimensions: ["query"]` or `["page"]`, `rowLimit: 25`). `ctr` is a 0-1 ratio.
3. `analytics.report`, same periods: `sessions`, `totalUsers`, `conversions` by
   `sessionDefaultChannelGroup`, then `sessions` by `landingPage` filtered to Organic Search.
4. Opportunities, from `gsc.opportunities.list` (each list is measured, never guess one yourself):
   `pageTwo` → strengthen that page for the query (content, internal links, title);
   `lowCtr` → rewrite the title and description to match the query; `cannibalized` → pick one
   page per query, merge or differentiate the others; `fallers`, `clickDrops`, `pageDrops` →
   read the page (`seo.page.audit`) and the results (`seo.serp.get`): who overtook it, did the
   page change; `newQueries` → demand you can serve on purpose. Empty movers with
   `comparable: false` mean "not measurable yet", not "nothing moved".
5. Report: totals with their change, the tables, then diagnosis → policy → 3-5 actions.

**Track rankings / tell me when something drops**:
`gsc.rankings.list` with the keywords that matter (1-50; take them from `gsc.queries.list` or
ask): daily history, this week against last, the ranking page, a band (top3, top10, top20,
top50, beyond). Real Google data and free, so prefer it to any live check; `seo.rank.check`
(paid) only for keywords with no impressions yet, competitors or other markets. To be told
instead of asking: `watch.create` on `gsc.rankings.list` (every `1d`: an item each time a
keyword changes band) and on `gsc.opportunities.list` (every `1d`: each new faller, click drop
or page drop once). Add an automation (`alerts-automations` skill) to email or Slack each one.

**Which pages to keep, improve or prune**:
`gsc.content.audit` (90 days against the 90 before, sitemap pages Google never showed
included): work down its order (refresh first). Never delete on its word: pruning is a 301 to
the stronger page or a noindex, decided with the user. `gsc.topics.list` shows the topics the
site is known for: low `focus` means content spread over too many subjects; a topic with
impressions and a weak position needs a hub page and internal links; queries in
`unclustered` with impressions are ideas for new pages.

**Technical health / site audit**:
`seo.site.audit` on the home page (`maxPages` 50-100; async, poll the job). Its `issues` are
already threats and gaps: rank them with the Impact formula (a broken link on a page with many
`inlinks` matters more than one on a deep page). Then, as the site needs: `seo.page.speed` on
the home page and the top landing page (mobile; `field` is what Google ranks on: LCP over
2.5 s, INP over 200 ms or CLS over 0.1 is a gap, SLOW is a threat), `seo.sitemap.audit` (a
sitemap listing redirects, errors or noindex pages wastes crawling), `seo.schema.audit` (write
the missing JSON-LD from the page's own content), `seo.local.audit` for a business serving a
place (it says when local SEO does not apply). `seo.page.audit` on the 1-2 most important
pages with problems for schema and headers. `partial: true` means a bigger site: say the
results cover the pages crawled, not the whole site. Cross-check with `gsc.url.inspect` before
calling a `noindex` or canonical a mistake.

**Is Google indexing my pages**:
`gsc.index.coverage.get` (async; sitemap URLs by default, or `urls` for the key pages). Fix per
`notIndexed` state: "URL is unknown to Google" → in the sitemap? linked from indexed pages?;
"Discovered - currently not indexed" → Google has not crawled it yet: add internal links from
strong pages, make it worth crawling; "Crawled - currently not indexed" → Google judged it not
worth indexing: thin or duplicate, improve or merge; "Excluded by 'noindex' tag" / "Alternate
page with proper canonical tag" → intended or not? `canonicalMismatch` → Google prefers
another URL: fix duplicates or the declared canonical. `sitemaps` with errors, or never
downloaded, come first. Google has no indexing API for ordinary pages (the owner requests it in
Search Console), but Bing does: after a yes, `bing.urls.submit` (Bing connected, up to 500 URLs,
daily quota) or `indexnow.submit` (Bing, Yandex, Naver, Seznam…; the site must serve its key
file) for new or changed pages only. `bing.crawl.issues` lists what Bing could not crawl and
the sitemaps it has; a missing one goes in with `bing.sitemaps.submit` (after a yes).

**How do I rank for X / keyword research**:
`seo.keywords.ideas` on the seed (volume, difficulty, intent) → `seo.serp.get` on the 2-3 best
terms to see who ranks, the People also ask questions and AI Overview sources →
`web.page.read` the top result to see what it covers → recommend the page to create or
improve, with its primary and secondary keywords and the questions it must answer.

**Write or optimize a page for a query**: follow the `seo-content` skill (`seo.content.brief`
with the keyword, and the page `url` to score it). `seo.keywords.ideas` with `patterns: true`
groups ideas into page templates (one word varies: "crm for {x}"): programmatic SEO, one page
per fill, only when each page can say something different.

**Who are my competitors / what do they do better**:
`seo.serp.get` on the user's main terms gives the real search competitors (not always their
business ones) → `seo.domain.overview` for each (estimated visits, keywords by position, top
pages) → `seo.domain.keywords` with `domain` the user's and `versus` the strongest competitor:
the keyword gap (they rank, the user does not), by volume; `only: "shared"` for the battles on
the same terms → `seo.backlinks.summary` for both sides.

**Links**: `seo.backlinks.summary` (authority, referring domains, spam score), then
`seo.backlinks.list` with `view: "gap"`, `target` the user's domain and 1-3 `competitors`: the
sites that link to all of them but not to the user, the outreach and digital PR prospects
(`view: "anchors"` shows how others describe the site). `seo.backlink.verify` confirms a
promised or bought link exists and is followed; `seo.domain.whois` shows a source's age.

**Am I visible in ChatGPT / AI answers**:
First `seo.ai.readiness`: a site that blocks the search and user agents
(OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User)
can't be read or cited by those assistants; blocking only training bots (GPTBot, ClaudeBot,
Google-Extended, CCBot) is a content-use choice, not a visibility fault; no llms.txt is a small gap. Then
`seo.ai.mentions` with the brand or domain and 2-4 `competitors` (share of mentions; Google AI
Overviews by default, `platform: "chatgpt"` for ChatGPT, US English only), `questions: true` to
see which questions mention them. Then `seo.ai.answers` with 2-3 questions a customer would
ask and `brand` set: whether each assistant names the user, and which pages it cites. Cited
pages are the ones to study and to earn mentions on. `seo.brand.presence` shows whether the
brand is an entity search engines and AI answers know: a Wikidata entity with the site as
official website, a Wikipedia article, profiles linked from the site (absent or unverified
ones are the gaps; add `sameAs` links to the Organization schema).

## Rules

- Never invent numbers: every figure comes from a tool output. Say which dates and market.
- Call outside data "estimates"; the site's own Search Console figures win when both exist.
- Keep it to a few actions the user can do this month; the rest goes in a short backlog.
- If the user keeps a tracking sheet, offer to log totals with `sheets.append` (show the row
  first).
