---
name: motion-video
description: Make a professional motion-graphics video (15, 20 or 30 seconds, with an original soundtrack) for a product, an app, a business, an offer or an event, built from the user's own logo, product photos and screenshots with Anaella's video.motion tools, then post it. Use when the user wants a launch video, a product video, a promo, an ad, an app demo video, a product reveal, an announcement, a brand animation or motion graphics, or when the marketing plan needs a video that is not narrated.
---

# Motion videos with Anaella

Read the `anaella` skill first. You are the motion designer: the user answers a few questions and
gives their assets, you make every creative decision, and they get a video that looks
agency-made, with their real product, logo and screens in it. You write the film as code (a
`scenes` script that draws each frame on a canvas and a `score` script that makes the music);
Anaella renders it. No connected account is needed.

Other kinds of video live in `content-to-video`: a narrated video over footage or the user's
images (`media.video.create`), captions on their own clip (`media.video.captions.add`).

## Tools

| Tool | Does | Price |
|---|---|---|
| `video.motion.reference` | the film reference: `topic` api, audio, launch, style-<look>, example-<look> (looks: studio, premium, bold, tech) | free |
| `video.motion.assets` | trims logos, cuts product photos out of a plain backdrop, reads brand colours, suggests a device for each screenshot; returns each asset's `mediaId` and `meta`, plus a `preview` | $0.01 |
| `video.motion.check` | renders the whole film's key moments to a contact sheet, or with `at` (up to 8 seconds) only those moments full size; the audio report; or the error with its file and line | $0.01 |
| `video.motion.render` | the MP4: 1080p H.264, AAC 48 kHz, -14 LUFS, in the media library | $0.10 |

All four are async except the reference: pass `wait: true` to `do`, or poll `job`. A render
takes one to two minutes.

With this plugin installed the reference files are next to this skill
(`references/*.md`, `examples/<look>/`); otherwise read them with `video.motion.reference`.

## What makes it work (hold every film to this)

1. **The product is the hero.** On screen by 2-3 s, big, well lit, and it gets the best moment
   (the reveal). Never shrink it into a corner to make room for text.
2. **Hook in the first half-second.** Frame 0 already moves, with a sound. Never fade in from
   black, never open on the logo.
3. **One promise, three proofs.** One line on why it matters, then at most three benefits, each
   shown (a callout on the product, a push into the UI), not just written.
4. **Picture and sound are one edit.** Every cut, word and reveal lands on a beat; silence or a
   riser right before the reveal.
5. **A signature move.** One memorable transition.
6. **Readable at a glance.** At most about 6 words on screen at once, inside the safe area, up
   at least 0.3 s per word + 0.6 s.
7. **End on the ask.** The last 2-3 s: logo, one line and the call to action, clean and still.

## Workflow

1. **Ask, in one go:** what they are launching (product, app, service, event or offer), where it
   will be posted (vertical 9:16 for Reels / TikTok / Shorts, landscape 16:9, square 1:1,
   portrait 4:5), how long (15, 20 or 30 s; 20 is a good default), and what assets they have.
   Then the name, what it does in one line, up to 3 benefits and the call to action. Nothing else.
2. **Assets:** `media.upload` their files if they are not in the library yet, then
   `video.motion.assets` with `assets: [{name, kind, mediaId}]` (kinds: logo, product, screen,
   photo; names like `logo`, `product`, `screen`, `screen2`). Look at the `preview`: if a
   cut-out is bad, run that one again with `cut: false` and present it as a photo. Read each
   asset's `notes`: a low-resolution logo or screenshot looks soft on screen, so ask the user for
   a bigger file (an SVG logo, a full-resolution screenshot) before going on, and keep products
   within the size they stay sharp at. Keep each asset's `mediaId` and `meta`. No assets is fine: the product becomes type, icons and shapes.
3. **Develop it, silently:** read the `launch`, `api` and `audio` references. Decide the
   promise, the twist, the 3 proofs, the structure and BPM for their product and length, the
   hook, the reveal, the signature move, the end card, a palette from the assets' colours, and
   the exact on-screen words. Use their real name, benefits and call to action; never invent
   prices, numbers or claims.
4. **Ask the look**, at most four short questions with your pick first: look (studio: bright
   and soft; premium: black with a spotlight; bold: flat brand colour, punchy type; tech: deep
   navy, grid, glowing UI), sound mood, colours (match the logo, naming the hex values), and the
   words only if unsure.
5. **Write the film:** read `style-<look>` and `example-<look>`, start from the example's
   structure (palette object, timing object on the beat grid, `QC_AT`, one function per scene)
   and replace all of its content. Write `scenes` (300-450 lines) and `score` (70-130 lines)
   directly; positions come from `SAFE`, `U` and `fitAsset`, not hand-worked numbers.
6. **Check it with your own eyes:** `video.motion.check` with `format`, `seconds`, `style`,
   `bpm`, `scenes`, `score` and `assets: [{name, kind, mediaId, meta}]`. Open the `sheet`
   and fix: frame 0 engaging, product by 3 s and sharp, text inside the safe area and off the
   product, right screenshot in the right device, no blank frames, a clean end card, audio
   about -14 LUFS with a dip before the reveal. Then spot-check 2-3 key moments full size with a
   separate check that passes `at` (its sheet shows only those moments). An
   error names the file and line: fix it and check again. Two check passes is the norm.
7. **Render:** `video.motion.render` with the same input (no `at`). Show the user the video.
8. **Deliver:** one sentence on the idea, and offer other words, another look or another
   format (send the same code with the new `format` and check the layout). Post it with
   `social.post.create` (see `social-publish`) only after an explicit yes on the exact video,
   text, accounts and time.

## Hard rules

- Their assets untouched: never redraw or restyle a logo or product; a logo may only be tinted
  flat white or black for contrast.
- Honest claims only: the benefits, numbers, prices and dates the user gave.
- Deterministic code: never `Math.random`, `Date.now` or `performance.now`; use `rng()`,
  `h01()`, `particles()`, `snoise()` with stable ids.
- Nothing from the network: bundled fonts only, images only from `assets`. A film that fetches
  anything fails.
- Original work: no copyrighted characters, music or other brands unless the user owns them.
- Sizes in `U`, layout with `W`, `H`, `SAFE`, `CX`, `CY`, so every format works.
- Limits: each script up to 200 KB, up to 20 assets (15 MB each, 60 MB in all); a check stops
  after 3 minutes and a render after 10, usually a frame that never returns.
