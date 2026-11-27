---
name: launch-copy
description: Write the caption for a launch post - the first line, length, line breaks, mentions and link - from how real launch posts that fit the product are written, measured with Anaella. Use when someone asks for a launch tweet, announcement copy, a caption, a hook or a first line for a launch, feature or funding post, or wants their draft caption checked against real launches.
---

# Launch copy with Anaella

Read the `anaella` skill first. You write the user's launch caption from how real launch posts
that fit their product are written. Mostly free; `media.breakdown` ($0.10) only when a
reference's picture matters to the caption.

## 1. Start

You need the product, what is launching, and the facts the caption may state (names, numbers,
dates, the link). Read their site (`web.page.read`) for the product's own words and facts. If
something is missing, ask in one message; if they'd rather you go ahead, use a `[placeholder]`
for it, never an invented fact, and list the placeholders at the end. When their message and
their site disagree (a date, a name), go with the message and say so.

## 2. Find captions to learn from

- **Their own voice first**: `social.posts.list` (published posts) and `social.post.get` for the
  full text; their best ones from `post-outliers`. These set the voice.
- **Launches that fit**: `web.search` for launches of the same kind of thing ("<category> launch
  on X", "<competitor> introducing", "<feature> now available"), and read the posts it finds
  (`web.page.read`; X and LinkedIn often refuse automated readers, so the snippets and the
  brand's own blog or changelog may be all you get). Their Meta ads (`ads.competitors.list`,
  free, EU and UK) give each ad's body and opening line, grouped in `hooks`.
- A posts.design gallery, when connected as an MCP server, has captions with their facts.

Keep a caption only when it announces the same kind of thing for a similar customer, not when it
just shares a word. Aim for five to ten.

## 3. Read the pattern

Measure each caption: `media.breakdown` returns `captionFacts` when you pass `caption`, or count
yourself (characters, lines, first line, hashtags, mentions, emoji). Across the captions that
fit, say:

- **Length:** typical characters and lines, and the range ("most are 120-220 characters over two
  to four lines").
- **The first line:** what the hooks do (name the product, state the outcome, a number, a
  question, "Introducing"), with two or three real examples quoted with their brand.
- **What's in them:** how many tag someone or use emoji or hashtags.

With fewer than five captions that fit, say so first and describe them one by one rather than
calling it a pattern. A caption that stops mid-sentence was cut off: leave it out of the length.
Accounts differ in size: don't rank captions by views or claim a pattern performs better, except
the user's own posts measured against their own baseline (`post-outliers`).

## 4. Write

When they gave a draft, start there: check it against the pattern (first line, length, line
breaks, emoji, hashtags, mentions) and list the smallest edits.

Then give three captions, each with a different kind of first line, in their voice (their earlier
posts, else their own site copy) and never reusing a reference's wording. Mark each as a draft
with its character count, not counting the link; keep it within the pattern's length and the
network's limit (X 280, LinkedIn 3,000, Instagram 2,200, Threads 500, Bluesky 300), and say which
reference it borrows its shape from. Match the tense to the date ("coming" before launch, "now
live" after), and recommend one of the three in a line.

Cite each reference you quote or borrow a shape from with its link. When the post also needs an
image or a video, offer `poster-design`, `launch-references` or `launch-video-direction` next;
to post it, `social-publish` (preview first, publish only after a yes).

## Notes

- Adapted from posts.design's launch-copy skill (MIT, see THIRD_PARTY_NOTICES.md).
