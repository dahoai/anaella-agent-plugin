---
name: x-header
description: Design an X (Twitter) profile header from real brand headers and make it at 1500×500 with the user's own brand, rendered as a PNG with Anaella. Use when someone wants an X header, Twitter banner, profile banner or cover image for a brand, product or founder account (also LinkedIn and YouTube banners, with their own sizes).
---

# X header with Anaella

Read the `anaella` skill first. You design the user's profile header from real ones that fit,
then render the file. Free unless you break references down (`media.breakdown`, $0.10 each).

## 1. Start

You need the account and what the header should say or show (the product, a launch, a line, or
the brand alone). The best headers come from the brand's font, its logo as SVG and a real
screenshot of what the product mainly does: take them from their site (`web.page.read`,
`web.page.screenshot`), their media library or their project. Ask only for what you can't find;
if they can't answer now, go ahead and list what you assumed. A person's header carries their
product or their role, not both, and never repeats the @handle the profile already shows (a
brand's name or logo is fine).

## 2. Find references

Headers of three to five accounts in the same field or that the user admires: a link or image
they give, `web.search` for "<brand> X header" or "<category> twitter banner", the brands' sites
(their hero often is the header). X profiles mostly refuse automated readers: when one can't be
read, say so and use what the user shows you. Pick ones that fit, preferring different brands and
treatments; break the strongest down with `media.breakdown` when you can't see images yourself.

## 3. Direction and the frame

Say what the closest references share (photo, product UI, type, pattern or gradient; where the
weight sits; how much is left empty) and pick one direction, naming the reference each idea comes
from. Use their colours, type, logo and words, never a reference's. Put only their own words on it
(a name, a product, a line they gave you or their site already uses); with no line, the name
alone. Don't invent taglines, numbers or sample text.

Make it 1500×500 (3:1). X crops up to 60 pixels from the top and bottom on some screens, and the
profile photo covers part of the lower left: keep text and the logo between 60 and 440 pixels
down and clear of the left third. Other banners: LinkedIn personal 1584×396 (photo over the lower
left), LinkedIn page 1128×191, YouTube 2560×1440 with everything inside the centre 1546×423.

## 4. Make it

Write it as HTML (a fixed-size `body`, the brand's fonts from Google Fonts or their font URL, the
logo and product shot as library `url`s) and render with `web.page.screenshot` (`html`, `width:
1500`, `height: 500`, `format: "png"`). Use the real logo file and a real product shot (cropped to
read, its words checked), never a redrawn stand-in; with no screenshot, make it type-led and say
where one would go. X takes a PNG or JPG, not animated.

Look at the PNG whole and at about 600 pixels wide, with the crop and the profile photo area in
mind; fix and render again (free). The user uploads it: never change their profile. Cite each
reference you used with its link.

## Notes

- Adapted from posts.design's x-header skill (MIT, see THIRD_PARTY_NOTICES.md).
