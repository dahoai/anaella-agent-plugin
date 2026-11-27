---
name: og-image
description: Design and build a website's Open Graph image (the link preview) from real link previews in the same field - pick a direction, then make it with the user's own colours, type and logo, either rendered as a PNG with Anaella or in their project as a Next.js opengraph-image.tsx. Use when someone wants an OG image, social preview, link preview, social card or share image for their site or one of its pages.
---

# OG image with Anaella

Read the `anaella` skill first. You design the user's link preview from real ones in their field,
then make it. Free unless you break references down (`media.breakdown`, $0.10 each, optional).

## 1. Start

Read the brand before asking: in their project, the colours (CSS variables, the Tailwind or theme
config), fonts, logo files, the page's title and description, and any OG image it already has
(`opengraph-image.*`, an `og:image` tag); without a project, `seo.page.audit` on the page gives
its title, description and current `openGraph` tags, and `web.page.screenshot` shows its look.
The best images come from the brand's font files, its logo as SVG and a real screenshot of the
product. You need which page the image is for; ask only for what you can't find.

## 2. Find references

`seo.page.audit` (free) on the matching page of three to six products in the user's field
(competitors, or `web.search` for "<category> app"): its `openGraph.image` is their link preview.
Their own current one comes first. Look at them (download the image links if your tools show
images; else `media.breakdown` them and say you haven't seen them yourself). Pick up to five that
fit, preferring different brands and layouts, and say when none is in the product's field.

## 3. Direction

Say what the closest references share (layout, headline size, logo placement, product shot or
none, colour) and pick one direction, naming the reference each idea comes from. Borrow
structure, not identity: their colours, type and logo, never a reference's.

Make it 1200×630 (1.91:1). The words are theirs: the page's own title or heading, never a claim
you can't check (a price, "simple", "free"). Keep text meant to be read at about 72 px or more,
since a timeline shows it at a third of that width, and keep text and the logo clear of the
lower-left corner, where X lays the site's domain over the image. With no real product
screenshot, make it type-led and say where one would go.

## 4. Build

- **No project, or a static site:** write the image as HTML (a 1200×630 `body`, fonts from
  Google Fonts or the brand's font URL, the logo and screenshot as library `url`s) and render it
  with `web.page.screenshot` (`html`, `width: 1200`, `height: 630`, `format: "png"`). Give them the
  PNG and the tags to add: `og:image` (absolute URL), `og:image:width`, `og:image:height`,
  `og:image:alt`, and `twitter:card` = `summary_large_image`. On a site Anaella edits (the
  `site-editing` skill), it can set them, after a yes.
- **Next.js (App Router), in their project:** an `opengraph-image.tsx` in the page's route folder
  exporting `size` (1200×630), `contentType` (`image/png`), `alt`, and a default function that
  returns an `ImageResponse` from `next/og`. The renderer takes flexbox only (an element with more
  than one child needs `display: "flex"`), fonts as ttf, otf or woff (not woff2) read once at
  module scope, images as absolute URLs or data URIs, and a bundle under 500 KB. Set
  `metadataBase` in the root layout so the URL is absolute.
- **Other stacks:** the framework's own OG route, else a static PNG with the tags above.

Check that the page sets `twitter:card` to `summary_large_image`, or X shows a small square card.
Never draw a stand-in logo or invent UI; when the logo is an icon alone, set the name beside it
in the brand's font and say so.

## 5. Check

Look at the result at about 400 pixels wide, as a timeline shows it: the headline reads, nothing
important sits under the domain corner, the colours hold on light and dark timelines. Fix and
render again (free). Leave deploying to the user. Cite each reference with its page link. For a
profile banner, offer `x-header` next.

## Notes

- Adapted from posts.design's og-image skill (MIT, see THIRD_PARTY_NOTICES.md).
