# Launch craft: how a 15–30 second launch video sells

## Finding the angle (the twist)
Every launch video shows the product. The good ones have an *angle*: one idea that makes the product feel inevitable. Run the brief through these lenses and take the one that makes you lean in:

| Lens | Move | Example |
|---|---|---|
| **The problem, felt** | 1–2 s of the old way hurting, then the product ends it | A desktop drowning in invoices → one click, all paid |
| **The detail** | Open macro on one irresistible detail, pull out to reveal the whole | Condensation running down a cold can → pull back → the can |
| **The number** | One real number, animated so it lands | "4 hours" of admin a week → counts down to "0" |
| **Before / after** | A wipe drags the new world across the old | Grey cluttered dashboard → wipe → the clean app |
| **Scale jump** | Tiny to huge, or one to many | One can drops → a whole wall of cans lights up in the brand colour |
| **The ritual** | The moment of use, stylised | Tab cracks → fizz → the logo forms from the bubbles |
| **Pattern break** | Three of the same, the fourth is the product | Three dull grey cans, the fourth is ours and the frame explodes in lime |

Commit to one angle. Use their real features and CTA; never invent numbers, prices or awards.

## Structures (scene times go on bars; see the tempo table)

**Physical product**
- **15 s:** hook detail (bar 1) → reveal: the product lands/turns into full view with light sweep (bars 2–3) → 2–3 callout proofs on the product (bars 4–6) → hero + logo + CTA (bars 7–8).
- **20 s:** hook → build/tension (riser, darkness, silhouette) → **reveal** at ~35% → 3 proofs (callouts, macro zooms, a colour/variant moment) → scale moment (many products, lifestyle photo, or the product in context) → end card.
- **30 s:** hook → problem or mood (2 bars) → reveal → proof 1 → proof 2 → proof 3 → "in the world" moment (photo card, variants lineup, pack shot) → name + promise → end card with CTA.

**App / software**
- **15 s:** hook (the pain, or the result, in motion) → device drops in with the app (bar 2) → 2 feature beats: zoom into the UI region + focus ring + cursor/tap (bars 3–6) → logo + CTA (bars 7–8).
- **20 s:** hook → problem (1–2 bars) → **reveal**: device in with a light sweep → 3 feature beats (push into the screenshot, `uiFocus`, cursor click, a counter) → end card.
- **30 s:** hook → problem → reveal → feature 1 → feature 2 → feature 3 → proof (a real stat they gave you, a second device: phone + laptop together) → end card.

**Service or business / event or offer:** hook (the customer's moment) → the promise in 3–5 words → three proofs as icon/type beats or photo cards → the offer (price/date in a big `pill` or `badge`) → logo + CTA.

The product is on screen by 2–3 s (software: the device enters at bar 2). The **reveal** is its hero moment (full light, the signature move): at 30–45% for physical products and 20–30 s films; in 15 s software films the device entrance at bar 2 is the reveal and the energy peak (the drop) comes on a feature at 55–65%. Put 0.2–0.5 s of near-silence or a riser right before the reveal.

## Tempo and length (whole bars)
| Length | BPM options (bars) |
|---|---|
| 15 s | 96 (6) · 112 (7) · 128 (8) · 144 (9) |
| 20 s | 84 (7) · 96 (8) · 108 (9) · 120 (10) · 132 (11) |
| 30 s | 96 (12) · 104 (13) · 112 (14) · 120 (15) · 128 (16) |
`BAR = 240 / bpm` seconds. Put scene boundaries on bars and hits on beats. Pick the value nearest the look's usual range.

## Hooks (0.0–0.5 s)
- **Macro detail:** extreme close-up of the product (`product(...)` huge, inside `camera` zoomed on a detail: a droplet, the logo emboss, the cap).
- **The pain in motion:** the old way already happening (notifications piling up, a messy desk of shapes).
- **Question / claim:** 2–4 huge words ("Still doing this?"), with a hit.
- **Silhouette:** the product's shape in darkness, rim-lit (`product(..., { rim })` on black), before the full reveal.
Never fade from black, never open on the logo.

## Showing a physical product
- **Lighting sells it:** a `studio()` backdrop with a floor, a contact shadow (automatic), a slow `shine` sweep on the reveal, a subtle `reflect` on glossy floors (studio/premium looks).
- **Movement:** products don't sit still. Drop in with a spring and a floor bounce, a slow `float`, a small `rot` sway, a slow camera push (1 → 1.06). `turn` fakes a quarter-turn for a flip reveal (pair it with a cut or a flash at edge-on).
- **Callouts:** `callout(...box.pt(fx, fy), 'Label', u, { sub })` from real spots on the product (`box.pt` maps fractions of the *cut-out* image: Read `assets/product.png` to pick them). Two or three, alternating sides, staggered on beats. Leave room for labels beside the product (put the product off-centre in landscape).
- **Macro:** `camera(camFit(rectAroundDetail, u), draw)` pushes into a detail (logo, texture, cap), great for a hook or a proof. Stay within the sharpness limit video.motion.assets reported ("sharp up to N px tall on screen"); beyond it, a photo looks soft.
- **Cold / fresh / wet products:** `droplets(name, box, t)` adds condensation and running drips on the product.
- **Variants:** draw the product several times in a lineup (tint the backdrop per variant), or the same product with `rim` light in different colours.
- **Uncut photos** (lifestyle shots): `photo(name, x, y, w, { zoom, focus })` as a rounded card with a slow Ken Burns push.

## Showing software
- **Device choice:** use what video.motion.assets suggested (`ASSET.screen.device`): tall screenshots → `phone`, wide → `browser` (web app) or `laptop` (desktop app / premium feel), 4:3 → `tablet`. Two devices together (laptop + phone) = "works everywhere".
- **Enter:** the device rises in with `spring`, a slight `rot` that settles to 0, a light sweep across the screen.
- **Feature beat recipe (one per proof, ~1.5–2.5 s):** push into a UI region with `zoom: { x, y, w, h, u }` (fractions of the screenshot) or `camera(camFit(dev.rect(r), u))`, then `uiFocus(dev, r, u, { label })`, then a `pointer` glides to `dev.pt(fx, fy)` and clicks (`tap` + `A.click`), then a short headline outside the device.
- **Find UI coordinates by looking:** Read the screenshot file itself (`<project>/assets/screen.png`; large files are fine, Read downscales them) and estimate fractions (0..1) of the element you want (e.g. the "New invoice" button at x .78–.92, y .06–.10). Verify on the QC sheet.
- **Scroll** a tall screenshot inside a phone with `scroll: 0..1`.
- **Don't** fake UI you weren't given. Build extra UI (a notification, a toast) only as simple overlay cards in the app's colours.

## Brand and end card
- `logo('logo', x, y, w, { u, mode: 'rise'|'scale'|'wipe'|'shine', tint, plate })`: for contrast, `tint: '#ffffff'` for a one-colour dark logo on a dark background, or `plate: '#ffffff'` (a rounded plate behind it) for a multi-colour logo. Never redraw or restyle it. Brand colour: `ASSET.logo.brand`.
- End card: logo (or the product + logo), one line (the promise or tagline), the CTA as a `pill` (date, price, "Available now", "Download free") and/or the URL in small type. Nearly still for the last 1.5–2 s.
- `badge('NEW', ...)` or `pill` for launch-day energy; sparingly.

## Motion rules
- **Easing:** entrances `eOutQuint`/`eOutExpo`, exits `eInExpo`, camera `eInOutExpo`, bouncy things `spring`/`eOutBack`. Never linear except drift and particles.
- **Timing:** small things 0.2–0.35 s, big moves 0.5–0.9 s, holds ≥ 0.6 s, staggers 60–120 ms.
- **Anticipation and settle:** a small reverse move before big moves, overshoot and settle on arrival (drops bounce once on the floor).
- **Alive holds:** slow drift (1–3% scale, subtle float) so the frame never goes dead, except the final end-card hold.
- **Beat sync:** `pulse(t, hitTime)` drives scale bumps, flashes and shakes on the beat.
- **Depth:** foreground faster than background; blur or dim what isn't the focus.

## Typography
- **Sizes:** vertical 9:16 headlines 110–200 U (body ≥ 52 U); 16:9 headlines 110–200 U; square and 4:5 headlines 90–150 U; callout labels 36–48 U (square 34–42 U).
- **Frame 0 with centred reveals:** `reveal`/`words` lay out the whole line first, so a half-revealed centred line looks off-centre. Start the hook's reveal slightly before 0 (e.g. `seg(t, -0.3, 0.3)`) or reveal it word by word on separate lines.
- **Words:** ≤ 6 on screen, 1–2 lines. Cut every word that isn't needed.
- **Tracking:** display type tight (−0.02 to −0.03); small uppercase labels wide (+0.08 to +0.14).
- **Pairing:** one display + one support face (see the style file). One accent word per line at most.
- **Contrast:** never text over the product or over busy screenshots without a backing shape.

## Composition
- **Vertical 9:16:** product/device centred, big (a product 45–65% of the frame height; a phone 55–75%, i.e. up to `SAFE.h*0.8`); headline above in the top third; CTA low but inside `SAFE`. Bottom ~22% and right edge are under platform UI.
- **16:9:** product/device on one third, words on the other; or centred hero for the reveal and end card.
- **Square / 4:5:** centred and bold, fewer elements.
- One focal point per moment.

## QC like a creative director
1. Would frame 0 stop a thumb?
2. Does the product look *premium*: sharp, lit, grounded (shadow), never stretched?
3. Is each proof instantly understood (one label, one visual)?
4. Is the reveal clearly the biggest moment?
5. Is the end card clean, with the CTA readable at thumbnail size?
