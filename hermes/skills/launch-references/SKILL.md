---
name: launch-references
description: Find the closest real launch posts for a product and turn them into a direction for the user's own post, with each reference broken down by Anaella. Use when someone is planning a launch, announcement, feature or funding post (an image, carousel, video, OG image or X header) and wants examples, references, inspiration, a mood board or a direction. For a beat-by-beat plan of a video, use launch-video-direction.
---

# Launch references with Anaella

Read the `anaella` skill first. You find real launch posts that fit the user's product and turn
them into a direction for their post. Searching is free; `media.breakdown` is $0.10 a reference
(this skill uses two or three).

## 1. Start

You need the product (what it is, who it's for) and what is launching. Take the format from what
they say ("a launch video", "a carousel"). If something is missing, ask in one message; if they'd
rather you go ahead, say in one line what you assumed.

## 2. Search

Look in this order, and stop when you have five to eight candidates:

1. **Their own earlier launches**: `social.posts.list` / `social.post.get` (their media links
   are in `media`), and what did best from `post-outliers`. A product can post under its own name
   and its company's: check both accounts if both are connected.
2. **Brands in their field or that they name**: `web.search` with the brand and the format
   ("<brand> launch video", "<brand> carousel announcement", "<category> product launch X"),
   their Meta ads (`ads.competitors.list`, free, EU and UK, text only), their site
   (`web.page.screenshot` with `url`) and link preview (`seo.page.audit` → `openGraph.image`).
3. **The format itself**: `web.search` for the treatment ("3D product reveal launch video",
   "minimal type-only announcement post").
4. **A posts.design gallery** when the user connected it as an MCP server (`mcp.<server>.*`).

When a format has no good examples, say so rather than stretching a weak match.

## 3. Pick and break down

Pick three to five that fit the product and the format, preferring different brands and
treatments. Run `media.breakdown` on the two or three strongest (a video link from TikTok,
Instagram, X or Facebook, a video or image file `url`, or a `mediaId`; with `caption` when you
have it and `for` set to what the user is making). It returns the hook, beats or layers, layout,
type, colour (hex palette), end card, moves to `borrow`, what to `avoid` and `captionFacts`. Base
what you say on what it and you have seen; never claim to have watched a video. Save the ones
worth keeping to their library with `media.upload` (`url`) as a swipe file.

## 4. Direction

Give the user:

- **What the closest posts share:** format, hook (the first line or first second), visual style,
  colour, type, copy length (from `captionFacts`, not guesses).
- **Why the strongest one works,** in two or three sentences, tied to what is on screen. Accounts
  differ in size, so don't rank other brands' posts by views.
- **A direction for their post:** the format, the look, and a drafted first line and on-image
  text written for their product (marked as drafts), with the copy length to aim for. Make it
  theirs; say which ideas come from which reference, and what would read as copying (the
  breakdown's `avoid`).

Cite every reference with its link. Next: `launch-video-direction` for a video's beats and
timings, `poster-design` / `og-image` / `x-header` to make a still, `launch-copy` for the caption.

## Notes

- Adapted from posts.design's launch-references skill (MIT, see THIRD_PARTY_NOTICES.md).
