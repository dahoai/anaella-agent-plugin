# Look: Clean studio

**The look:** a bright, airy product studio, like an Apple or Braun launch. A soft off-white backdrop with a gentle floor, the product perfectly lit with a soft contact shadow and a faint reflection, calm confident motion, crisp dark type, one brand accent. Premium through restraint.

**Config:** `bg #f3f2ef`, `font 'Outfit'`, `grain 0.03`, `vignette 0`, 96–120 BPM (96 for luxury, 112–120 for tech/lifestyle), 30 fps.
**Palette:** backdrop `#f6f5f2` → `#e2dfd9`, ink `#141414`, muted `#6b6b6b`, accent = the brand's strongest colour (from video.motion.assets), used on one word, the CTA pill and small details.
**Fonts:** Outfit 700 for headlines (tracking −0.02), or Instrument Serif / Gloock for luxury and serif brands; Instrument Sans 400/700 for labels and callouts, Geist Mono 400 for tiny specs ("330 ML · 0 G SUGAR").

## Vocabulary
- **Stage:** `studio({ top: '#f7f6f3', bottom: '#e2dfd9', floor: HORIZON })` every frame, with the horizon line ~6–10% of the frame *above* where the product stands, so it sits on the floor, not on a table edge; product: `product(name, CX, FLOOR - h/2, h, { floor: FLOOR, reflect: 0.3, shadow: 0.4 })`.
- **Light sweeps:** additive, so keep `sweepLight` alpha .05–.1 here; the product's own `shine` is the main light move.
- **Atmosphere (scent, freshness):** thin curved strands drawn with `drawOn(bez(...))` in the accent at alpha .2–.4, drifting with `snoise`; avoid big blurred blobs (they read as smudges on light backgrounds).
- **Reveal:** the product drops in from above with `spring` and one small bounce, or rises from below the floor line, followed by a `shine` sweep (0.8 s) and a soft `A.impact` + `A.bell`.
- **Proofs:** `callout`s in ink (`color: '#141414'`) with an Instrument Sans label and a Geist Mono `sub`, alternating sides, one per beat; a slow camera push (1 → 1.05) during them.
- **Macro:** `camera(camFit(detailRect, u))` into the logo or texture, with the rest softly out of focus (`layer(..., { filter: 'blur(8px)' })` for background elements).
- **Software:** devices in `silver` or `light` theme, soft big shadows (`shadow: 0.6`), screens with `uiFocus` in the brand accent.
- **End card:** product (or device) left or centred, logo + one line + a CTA `pill` in ink or accent.

## Rules
- Lots of air: the product and one line of type per moment. Nothing else.
- Motion is smooth and precise (`eOutQuint`, `eInOutExpo`), never wobbly; springs only for the drop.
- Shadows and light are consistent: light from top-left, shadows soft and below.
- Type is dark on light, never on top of the product.

## Pattern
```js
const C = { top: '#f7f6f3', bot: '#e2dfd9', ink: '#141414', mute: '#6b6b6b', acc: (ASSET.logo && ASSET.logo.brand) || (ASSET.product && ASSET.product.brand) || '#3a5bff' };
const FLOOR = SAFE.y0 + SAFE.h * 0.8, HORIZON = FLOOR - H * 0.08;
function heroOnFloor(t, t0) {                     // drop + bounce + shine, returns the product box for callouts
  const u = seg(t, t0, t0 + 0.9), h = SAFE.h * 0.55;
  const lift = (1 - eOutBack(u, 1.2)) * (FLOOR + h);   // lift keeps the contact shadow on the floor as it falls
  return product('product', CX, FLOOR - h / 2, h, { floor: FLOOR, lift, reflect: 0.3, shine: seg(t, t0 + 0.7, t0 + 1.6), alpha: clamp(u * 4) });
}
```

## Pitfalls
- Grey on grey: keep the backdrop light and the product contrasty; darken the floor slightly, not the product.
- A tiny product: it should fill 45–60% of the height in vertical, 55–70% in landscape.
- Callout labels colliding with the product edge: longer `len`, or move the product off-centre.
