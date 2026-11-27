---
name: poster-design
description: Design and render a still graphic that looks designed, not generated - a feed post, carousel slide, quote card, announcement, event or promo poster, flyer, YouTube thumbnail or LinkedIn banner - from a direction grounded in real references, with the user's own words, logo, colours and fonts, rendered at the exact size with Anaella. Use when the user wants a poster, a visual, a graphic, an image post, an announcement card, a flyer or "something that looks good" for a post. For a link preview use og-image, for an X banner x-header, for a video motion-video.
---

# Poster design with Anaella

Read the `anaella` skill first. You are the designer: you make the creative calls, the user gives
the facts. The poster is HTML and CSS you write, rendered to a PNG at its exact size by
`web.page.screenshot` (free, 100 a day), so the type is sharp and every word is spelled right.
`media.image.generate` makes a photo or texture to put in it, never the words.

## 1. What you need

- **The message**: one thing the poster says (a launch, an offer, an event with its date and
  place, a quote, a number). Use only facts the user gave or their site states; a missing fact is
  a `[placeholder]`, listed at the end, never invented.
- **The brand**: logo (`media.upload` or their library: `media.list`), colours and fonts. Read
  their site with `web.page.read` or `seo.page.audit` for the name, the line they use and their
  look; `video.motion.assets` reads brand colours off a logo. Ask once for what you can't find.
- **Already made in Canva?** When Canva is connected (an MCP server, `mcp.canva.*` in `find`), its designs and brand kit are the first place to look: `mcp.canva.search-designs`, then `mcp.canva.export-design` (png; `pages` for carousel slides) and `media.upload` with the returned links. Use that design as is, or as the reference and the assets for a new poster.
- **Where it goes**, which sets the size:

| Use | Size (px) | Keep clear |
|---|---|---|
| Instagram / Facebook / LinkedIn feed, portrait | 1080 × 1350 | 60 px margins |
| Square post, carousel slide | 1080 × 1080 | 60 px margins |
| Story, reel cover, TikTok cover | 1080 × 1920 | top 250 and bottom 340 px (app chrome) |
| YouTube thumbnail | 1280 × 720 | bottom-right 200 × 60 (the duration badge) |
| LinkedIn page banner | 1128 × 191 | the left 300 px on mobile (the logo) |
| Printed A4 flyer (screen proof) | 1240 × 1754 | 50 px bleed-safe margin |

## 2. Ground it in references (two to five)

Look before you design: a direction from real work beats a direction from memory.

- **Their own winners**: the `post-outliers` skill, or `social.posts.list` and
  `social.post.get` for the images of their best posts. Their voice and look come first.
- **Brands they admire or compete with**: a post or video link they give; their Meta ads
  (`ads.competitors.list`, EU and UK ads, text only); their site (`web.page.screenshot` with
  `url`, free) or its link preview (`seo.page.audit` → `openGraph.image`).
- **The web**: `web.search` for the kind of poster ("conference speaker announcement poster",
  "SaaS pricing launch carousel"), then open the best image links.
- **A posts.design account**, when the user connected it as an MCP server: its gallery is in
  `find` as `mcp.<server>.*`.

Run `media.breakdown` ($0.10) on the two or three closest (an image `url` or `mediaId`, with
`for` set to what you're making): it returns their layout, type, colour, hierarchy and the moves
worth borrowing. Save a reference worth keeping in their library with `media.upload` (`url`), so
it's there next time.

## 3. The direction

Say in four or five lines, before you build: the look in one phrase; the layout; the type (two
faces at most: one display, one text); the palette (their colours; at most one accent); what each
idea borrows and from which reference. Borrow structure, never identity: no reference's logo,
words, mascot or signature colour.

Rules that make it look designed:

- **One focal point** filling 40 % or more of the frame: the headline, the product, a number or a
  face. Everything else is smaller and quieter.
- **Hierarchy in three steps at most**: headline, one supporting line, the small print (date,
  place, URL). The headline is at least 2.5 times the supporting line.
- **Few words**: a headline of 2 to 7 words; under 25 words on the whole poster (a carousel slide
  can take 40). Cut words before shrinking type.
- **Readable at feed size** (a third of the width): headline 90 px or more on a 1080 wide
  poster, nothing under 28 px.
- **A grid**: one margin all round (5.5 % of the width), elements aligned to it, the logo in a
  corner, not floating.
- **Contrast**: text at 4.5:1 against what is behind it; over a photo, a scrim or a solid band.
- **Empty space is a choice**: a third of the poster can be empty.
- **Real assets**: their real logo file and real product shots, never a drawn stand-in. With no
  product shot, make it type-led.

## 4. Build and render

Write one self-contained HTML page: a fixed-size `body` (`margin:0; width:1080px;
height:1350px; overflow:hidden`), the fonts from Google Fonts with a `<link>` (or the brand's own
font URL), images as their `url`s from the library. Flex or grid layout, sizes in px.

`web.page.screenshot` with `html`, `width`, `height` and `format: "png"`. It returns a library
resource ready for `social.post.create`.

A carousel: one HTML per slide, same grid, type and palette; slide 1 is the hook, the last one
the call to action. Render each, then post them together.

## 5. Check before showing

Look at the PNG (download its `url` if your tools show images; else say you haven't seen it):
nothing cut off or overflowing, every word right, the focal point reads at a third of the size,
the safe areas above are clear, text contrast holds. Fix and render again (it's free). Show the
user the image and the exact caption, and post only after their yes (the `social-publish`
skill).

## Notes

- Several options: make two or three directions (different layout or focal point, same facts)
  and let the user pick, rather than one safe middle.
- A version per network: the same HTML at the other size, re-laid out, not stretched.
- The direction and reference method follows posts.design's skills (MIT, see
  THIRD_PARTY_NOTICES.md), adapted to Anaella's tools.
