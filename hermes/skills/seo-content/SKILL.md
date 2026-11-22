---
name: seo-content
description: Write or improve a page so it ranks on Google and gets cited by AI answers, through Anaella — a content brief from the live top results (terms, subtopics, questions, length), the article written from it, structured data and internal links, published as a draft to the user's WordPress or Inkwire site after approval; or an existing page scored against the top pages with the exact edits to make. Use when the user asks to write an SEO article or blog post, a page for a keyword, a content brief or outline, to optimize, refresh or rewrite a page for a query, a content score, or why a competitor's page outranks theirs.
---

# SEO content with Anaella

Read the `anaella` skill first for the find → explain → do loop. For audits, reports and
strategy use `seo-report`; this skill writes and fixes pages.

The core tool is `seo.content.brief` (async, about $0.02-0.04): `keyword` alone gives the brief
from the top Google results; `keyword` + `url` also scores that page (0-100) and lists what it
lacks. Say the price before running several.

## 1. Pick the keyword (if the user has none)

- Their own data first: `gsc.opportunities.list` `pageTwo` and `lowCtr`, `gsc.topics.list` for
  topics with impressions and a weak position, `gsc.content.audit` for pages to refresh.
- New ground: `seo.keywords.ideas` on a seed (volume, difficulty, intent), `seo.domain.keywords`
  with `versus` a competitor for the keyword gap. One page per intent: never two pages for the
  same query (`gsc.opportunities.list` `cannibalized` shows where that already happened).

## 2. Write a new page

1. `seo.content.brief` with the keyword (and `market` when not US English).
2. Outline from it: H1 with the keyword, one H2 per `subtopics` entry readers expect, the
   `questions` answered in their own short sections (good FAQ material), the `terms` worked in
   where they belong. Aim for `targetWords.recommended`; length follows coverage, never padding.
3. Show the outline to the user and get a yes before writing the full text.
4. Write it like the best result, then better: the answer in the first lines, self-contained
   passages (one idea per section, quotable alone by AI answers), concrete examples, numbers
   with their source, who stands behind it. Use the user's own facts (`web.page.read` their
   site, their notes); never invent statistics, quotes, customers or results.
5. Title under 60 characters with the keyword near the start; meta description 120-155
   characters that promises what the page delivers; a short URL slug with the keyword.
6. Structured data: JSON-LD for the page (Article or BlogPosting with headline, author, dates;
   FAQPage only for questions actually answered on the page; BreadcrumbList for nested pages).
7. Internal links: `cms.content.list` (connected site) or `web.site.map` to find 3-5 related
   pages; link from them to the new page and from it to them, with descriptive anchor text
   (never "click here").
8. Publish only after the user approved the text: `cms.content.create` as a **draft** with
   title, slug, excerpt/description and content (see `site-editing`). Give the edit link.

## 3. Improve an existing page

1. `seo.content.brief` with the keyword and the page `url` (check the page's real position
   first with `gsc.rankings.list` when Search Console is connected).
2. Read `page`: `checks` that fail are quick fixes (keyword in title, H1, description, URL,
   first 100 words; one H1; lengths); `missingSubtopics` and `unansweredQuestions` are the
   sections to add; `missingTerms` are topics to cover, not words to stuff in; `words` against
   `targetWords`.
3. Propose the edits as a short list with the new text, get a yes, then apply them with
   `cms.content.update` (connected site) — it keeps a revision to undo.
4. Speed matters for the page too: `seo.page.speed` on it (mobile); poor LCP/INP/CLS in `field`
   goes to the backlog with `opportunities`.
5. After publishing: `indexnow.submit` / `bing.urls.submit` (after a yes) for Bing; Google picks
   it up from the sitemap. Offer a watch on `gsc.rankings.list` for the keyword (every 1d) so
   the user hears when it moves.

## Rules

- Never claim a ranking will follow: say what the top pages have that this one lacks.
- The brief's `terms` come from competitors' pages: cover the ideas, do not copy their text.
- Write in the user's language and voice; match the market of the keyword.
