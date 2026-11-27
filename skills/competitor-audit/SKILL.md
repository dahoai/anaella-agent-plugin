---
name: competitor-audit
description: Audit how a brand launches and posts - its recurring formats, hooks, visual style and copy, what changed over time, and what to borrow without copying - from its public posts, ads and site, with Anaella. Use when someone asks how a competitor or a brand they admire launches, announces or posts, or wants to compare their launches with another brand's.
---

# Competitor audit with Anaella

Read the `anaella` skill first. You read one brand's public launches and report what they repeat,
what changed and what is worth borrowing. Anaella can't log into anyone else's social account:
the audit works from what is public. Searching is free; `media.breakdown` is $0.10 a post (two or
three a brand). For a comparison, audit up to three brands the same way and say the total first.

## 1. Start

You need the brand, by name, site or handle, and ideally what the user makes, so "what to borrow"
fits them. If they don't say, assume from context and say so in one line.

## 2. Collect the brand's launches

- **Its ads**: `ads.competitors.list` with `searchTerms` set to the brand (then its `pageIds`)
  and `countries` in the EU or UK: each ad's opening line, body, platforms, dates and `daysLive`
  (an ad still running after 30+ days is usually a winner), and `hooks` grouped by how they open.
  Free; US-only advertisers show nothing there.
- **Its posts and videos**: `web.search` for "<brand> launch", "<brand> introducing",
  "<brand> announces" and its handle on X, LinkedIn, TikTok, Instagram, YouTube; its blog or
  changelog (`web.page.read`), which usually lists every launch with dates.
- **Its look**: its site (`web.page.screenshot` with `url`) and link preview (`seo.page.audit` →
  `openGraph.image`).
- **A posts.design gallery**, when the user connected it as an MCP server: list the brand there.

Aim for 10 to 25 items with dates. Count patterns across them from what you read (formats, first
lines, copy length, how often they post).

## 3. Open a few

Run `media.breakdown` on two or three standouts: the newest, a distinctive one and an older one,
so the report can say what changed. Pass each post's `caption` when you have it. Base what you say
on what it and you have seen; never claim to have watched a video. Reach and views differ by
account and by the day they were read: use them to find the brand's big launches, never to rank
posts in the report.

## 4. Report

- **Recurring patterns:** formats, hooks, visual style, colour, type, copy length and tone, with
  counts ("dark backgrounds in 9 of 12").
- **What changed over time,** with dates.
- **What is worth borrowing** for the user, and **what would read as copying** this brand.

Cite every item with its link. Offer next: `launch-references` or `launch-brief` to turn it into
the user's own post, `ads-report` to compare with their own ads.

## Notes

- Adapted from posts.design's competitor-audit skill (MIT, see THIRD_PARTY_NOTICES.md).
