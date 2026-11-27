---
name: remake
description: Remake a launch film the user likes, shot by shot, for their own product - its scenes, layout, motion and timing, with their words, logo, colours and fonts - by breaking the reference down with Anaella and rendering a new motion video. Also rebuilds the user's own video as an editable film (new words, colours, size or language). Use when someone wants a launch video "like this one", "in the style of" a brand's film, or asks to remake, recreate or closely copy a launch film, product film or teaser for their product, or to rebuild their own video. To plan from several references instead, use launch-video-direction.
---

# Remake with Anaella

Read the `anaella` skill and the `motion-video` skill first: the film is built and rendered with
`video.motion.*` exactly as there, and its hard rules hold (their assets untouched, honest
claims, words in `data`, nothing from the network). This skill decides what the film shows.
Spend: `media.breakdown` $0.10, each `video.motion.check` $0.01, the render $0.10. Say it first.

## 1. The brief

You need, in one message if anything is missing:

- **The film.** A TikTok, Instagram, X or Facebook link, or the video file (`media.upload`).
  YouTube links can't be downloaded: ask for the file.
- **The product, in facts.** What it does and for whom, and the numbers or claims they want in
  the film. Use only these: a remake copies the reference's shots, never its claims.
- **The brand.** Name, logo (SVG or a large PNG), colours, product shots and screenshots, through
  `video.motion.assets` as in `motion-video`.
- **How close.** By default every scene, its layout, moves and timing; they may ask for less
  ("just the pacing", "its opening only") or another length. Say in one line what you will keep.

**Someone else's film** gets remade for the user's product: its structure and moves, never its
logo, words, footage, images, music or characters. **The user's own film** (they made it or own
the rights) can be rebuilt as close as the engine allows, with their own assets, so they can change
its words, colours, format or language later with `video.motion.variants`.

## 2. Study the reference

`media.breakdown` on the film, with `for` set to "a remake for <product>". Read its `beats`
(each with its start, end, what is on screen, the on-screen words and the stills it rests on),
`hook`, `type`, `colour`, `endCard` and `uncertainty`, and look at the `stills` (download their
links if your tools show images). Beat times are only as exact as `stillEverySeconds`: for a move
you need more exactly, `media.video.frames` with up to 10 `timestamps` around it ($0.01) gives
stills there.

Write a beat list before any code: one row for every change you can see (a card or label
changing, a line appearing or being typed, a move starting or settling, a cut), with its time,
what is on screen and where, and what it becomes for the product. Count what fills the frame
(cards, lines, list items) and keep those counts. Note what each beat ends on.

Then the **meaning pass**, row by row: would this make sense to someone who knows the product? A
copied move that means nothing for it goes or changes: a cursor clicking something nobody would
click, the product speaking or acting where it never does, a feature, number or screen it
doesn't have. Show the user the beat list and carry on unless they change it.

## 3. Build

Follow `motion-video` from step 2 (assets) to the render, with these changes:

- **Format and length from the reference**: its shape (vertical, landscape, square, portrait)
  and its length rounded to 15, 20 or 30 s (say so when it changes; keep the beat order and
  compress or stretch the holds evenly).
- **Its timing, beat for beat**: every beat starts where the reference's does (scaled to the
  length), on the beat grid. Write lines to fit the reference's holds (about three words a
  second): shorten the words rather than hold them longer.
- **Its look in their brand**: the reference's layout, type traits (`type`: weight, case, size as
  a share of the frame) and colour roles, filled with their palette and the engine's fonts. The
  style closest to the reference (studio, premium, bold, tech) is the starting point.
- **Readable**: at most about 6 words on screen at once, nothing a viewer must read under 45 px
  at 1080 wide.

## 4. Compare and fix

`video.motion.check` with `at` set to the reference's key beat times: put each of your frames
beside the reference still of the same moment. Go down the beat list: does each beat start at its
time, end in the same state, with the same layout, sizes, positions, counts and move? List every
beat that is early, late, missing or extra, fix it, run the meaning pass again on what you see,
and check once more. Two rounds is the norm. Then storyboard approval and the render, as in
`motion-video`.

## Hand over

The film beside the reference's length, the beats you changed and why (meaning, readability,
length), and anything you assumed about the product for them to confirm. Name the reference with
its link. Never claim to have watched the reference: you read its stills. Post only after a yes
on the exact video and text (`social-publish`).

## Notes

- Adapted from posts.design's remake and rebuild skills (MIT, see THIRD_PARTY_NOTICES.md),
  built on Anaella's motion engine instead of HyperFrames.
