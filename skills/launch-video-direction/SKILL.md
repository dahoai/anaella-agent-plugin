---
name: launch-video-direction
description: Direct a launch video beat by beat from real launch videos broken down with Anaella - the hook, each beat with what is on screen and its timing, type, colour and the end card. Use when someone is planning, scripting or storyboarding a launch video, product film, demo video, teaser or announcement video, or wants to know how a launch video they like is directed ("break down this video").
---

# Launch video direction with Anaella

Read the `anaella` skill first. You plan the user's launch video from real launch videos that fit
their product. `media.breakdown` is $0.10 a video; this skill uses two or three.

## 1. Start

You need the product (what it is, who it's for), the target length, and what they can film or
show: the product's UI, a person on camera, or neither. If something is missing, ask in one
message; if they'd rather you go ahead, say in one line what you assumed.

Only "break down this video"? Run `media.breakdown` on it and give its direction (summary, hook,
beats with times, type, colour, end card, borrow, uncertainty) with its stills' links, then offer
to plan their own.

## 2. Pick a shape

| Shape | When | Runtime | Beats |
|---|---|---|---|
| Teaser | before launch, a reveal to come | 6-15 s | hook, one glimpse, date |
| Feature launch | one new thing | 15-30 s | hook, problem in one shot, the feature working, the result, end card |
| Product film | the whole product, a big launch | 30-60 s | hook, claim, three proofs, the turn, brand, end card |
| Demo | it's easier to show than say | 20-45 s | the outcome first, then the steps fast, then the outcome again |
| Raise or milestone | funding, a number | 10-20 s | the number big, who it's for, what's next, end card |

When the user's length is under the shape's range, keep its beat order, compress it, and say so.

## 3. Find references

Their own earlier launch videos come first (`social.posts.list` for videos; `post-outliers` for
what did best). Then videos that fit: a link the user gives, `web.search` ("<category> launch
video", "<brand> introducing", X, TikTok, Instagram, LinkedIn links), a posts.design gallery when
connected as an MCP server. YouTube links can't be downloaded: ask for the file instead.

Run `media.breakdown` on the two or three closest, with `for` set to the user's video. Each
returns timed `beats` (what is on screen, the on-screen words, the stills each rests on), `hook`,
`type`, `colour`, `endCard`, moves to `borrow` and `uncertainty`. Its times are only as exact as
`stillEverySeconds`: never claim to have watched a video, and don't describe a stretch its
`uncertainty` names. When nothing close exists for part of the plan (say, a founder talking to
camera), say so rather than borrowing from a weak match.

## 4. The plan

Write the hook, the caption and the script first, then the beats:

- **Beat by beat, with timings:** what is on screen, any on-screen text, and what each beat is
  for (hook, proof, feature, call to action). The first second earns the second second.
- **Type, colour and background,** and **the end card:** the product name, the one line and
  where to go.
- **Borrowed moments:** for each idea taken from a reference, its time range and what changes
  ("0.0-1.6 s, the dashboard instead of the phone").

Keep it original rather than a copy of one reference. Check: the hook lands in the first two
seconds with the sound off; the moment they'd keep if the film were half as long comes early and
gets the most time; every word and interface detail it depends on reads at phone feed size; the
end card names the product, the line and where to go. Use their real product, footage or UI,
never a drawn stand-in, and list any fact you assumed for them to confirm.

Cite every reference with its link. To make it: `motion-video` (Anaella renders it from the
plan), or `content-to-video` for a narrated video over footage; `launch-copy` for the caption.

## Notes

- Adapted from posts.design's launch-video-direction skill (MIT, see THIRD_PARTY_NOTICES.md).
