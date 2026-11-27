---
name: launch-brief
description: Turn a one-line idea for a launch post or video into the creative brief its author would have written - one committed look, moves worth copying and numbered beats, each grounded in real references broken down with Anaella. Use when someone has only an idea or a vibe ("a launch video for our API, like Stripe", "something bold for our funding news") and wants a brief, a concept or a creative direction before making anything.
---

# Launch brief with Anaella

Read the `anaella` skill first. You turn the user's one-line idea into a full creative brief,
grounded in real references. Spend: `media.breakdown` is $0.10 a reference; this skill uses two
to six ($0.20 to $0.60). Say the total before the first one.

## 1. Start

Don't ask questions first: make the creative calls and show them at the end. Read what the
product is from their site (`web.page.read`) or their project, and take its real assets: logo,
screenshots, UI, footage (their media library: `media.list`). Its colours and fonts win over a
reference's palette and type. Leave news they haven't announced out of the post. Never invent
facts (an investor, an amount, a customer): name what is missing. When the idea leaves the medium
to you, make it a video only when it holds a transformation or a demo; a number or a statement is
a still.

## 2. Decode the look

If the idea names a style, a brand or a medium ("like Stripe", "clean and minimal",
"claymation"), say in a sentence what that word pictures: it fixes palette, type and material,
never layout, camera or the move. If the idea says nothing about the look, choose the most
striking look that could carry the subject, not the safest match.

## 3. Ground the look: up to five stills from one aesthetic

Find them (best first):
- the named brand's own posts and videos: a link the user gives, `web.search` for
  "<brand> launch video" or "<brand> announcement" (X, LinkedIn, YouTube, TikTok links), its
  site (`web.page.screenshot` with `url`) and link preview (`seo.page.audit` →
  `openGraph.image`), its Meta ads (`ads.competitors.list`, EU and UK, text only);
- the user's own best posts (`post-outliers`);
- `web.search` for the look itself;
- a posts.design gallery, when the user connected it as an MCP server (`mcp.<server>.*` in
  `find`).

Pick up to five that each do one job: overall look, palette, material or surface, composition,
one detail; fewer is fine. Never blend two aesthetics; if a second keeps winning, switch to it
wholesale. Run `media.breakdown` on each you keep (with `for` set to the idea): its `layout`,
`type`, `colour` and `borrow` are what you cite. Say when the stills are only loose fits.

## 4. Ground the motion (skip it for a still post)

Find up to three videos whose moves are worth copying, even on a different subject: the main
move, the turn, and the exit or camera. `media.breakdown` on a TikTok, Instagram, X or Facebook
video link or a video file gives timed `beats`, each with the stills it rests on: take an exact
time range from them. Its beat times are only as exact as `stillEverySeconds`; never claim to
have watched a video, cite a time no still shows, or describe a stretch nothing showed you
(`uncertainty` lists them). YouTube links can't be downloaded: ask for the file.

## 5. Write the brief

Every reference feeds a beat; cut any reference that feeds none. For a still, the beats are its
layers in reading order. For a video, include a turn: a reveal, a morph, a zoom out to a larger
whole, or one thing becoming another. If the idea already holds a transformation, that is the
turn: make it the biggest beat and add no second one. About five seconds carries one idea, so a
longer video takes one more beat for each five seconds, still with one turn; the action fills
each beat, with under a second of end hold.

Style the product's real assets, never a drawn stand-in; if one is needed and missing, say so in
one line above the brief and name what to supply.

Give three things:

1. **The brief, in a code block,** under about 150 words above its reference list: a first line
   naming the look; numbered beats, each the subject, its action and what it reveals or becomes,
   citing references inline (a1-a5 for stills, m1-m3 for motion); one line on camera and pace in
   plain words; aspect, length and background only where they aren't obvious. Describe the
   mechanism, not an adjective ("the old screen peels from a corner to show the new one
   underneath", not "a slick transition"). One hero element fills at least 40 % of the frame at
   its beat, and no text is smaller than 24 px at 1080p.
2. **Under the beats, each reference:** its job (look, palette, material, composition, detail or
   a move), the beat it feeds, what is taken ("m1 0.0-1.6 s, subject swapped for the
   dashboard") and its link.
3. **Outside the code block,** up to three creative calls you made, each with the one alternative
   worth considering.

Then offer the next step that fits: `launch-video-direction` for a timed plan, `launch-copy` for
the caption, `poster-design`, `og-image` or `x-header` for a still, `motion-video` to make the
film.

## Notes

- Adapted from posts.design's launch-brief skill (MIT), itself adapted from Stewdio's
  blank-page skill (MIT, Copyright (c) 2026 Cekura, Inc.); both notices are in
  THIRD_PARTY_NOTICES.md.
