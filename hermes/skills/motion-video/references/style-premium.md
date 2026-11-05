# Look: Dark premium

**Two flavours:** *luxury* (perfume, watches, spirits: 90–104 BPM, gold, slow, serif) and *high-energy dark* (energy drinks, gaming, sports and tech gear: 120–132 BPM, one electric accent, arcs/sparks, harder cuts). The example film (VOLT) is the high-energy flavour; its macro hook uses a `photo` asset: without one, push the camera into the product itself.

**The look:** a launch in the dark: near-black space, the product carved out of shadow by a spotlight and a coloured rim light, slow deliberate camera moves, elegant serif type, one spark of light. Perfume, watches, spirits, flagship devices, premium drinks.

**Config:** `bg #07070a`, `font 'Instrument Sans'`, `grain 0.05`, `vignette 0.35`, 90–104 BPM (luxury) or 120–132 (high-energy), 30 fps.
**Palette:** `#07070a` background, `#f2efe8` warm white type, `#8a8578` muted, one rim/glow colour from the brand (or gold `#d4b26a`).
**Fonts:** Gloock or Instrument Serif (italic for one word) for headlines, Instrument Sans 400 in wide-tracked uppercase (+0.18) for small labels.

## Vocabulary
- **Darkness first:** `studio({ top: '#0c0c10', bottom: '#050506', spot: [CX, CY - H * 0.1, H * 0.45], spotCol: '#ffffff', spotA: 0.10 })`.
- **Silhouette hook:** the product in near-black with only its rim lit: `product(..., { rim: C.glow, rimA: 0.9, alpha: 0.25 })`, then light blooms up to full (`alpha` → 1) on the reveal hit.
- **Light sweep:** `shine` across the product, and a full-frame `sweepLight` once, on the reveal.
- **Slow camera:** a push 1 → 1.12 across a whole scene (`eInOutSine`), a slow orbit feel with a small `rot` drift (±0.02).
- **Macro details:** push into the cap, the engraving, the texture; shallow focus (blur the rest with `layer` + `blur`).
- **Particles:** a few slow dust motes (`particles` + `snoise`) catching the light; gold sparkles on the end card.
- **End card:** logo tinted warm white (`tint: '#f2efe8'`), a serif line, a thin rule, the CTA in small wide-tracked caps.

## Rules
- 70–85% of the frame stays dark. Light only where the eye should go.
- Slow and confident: longer holds, `eInOutSine` camera, no bouncy springs.
- One glow colour, used on the rim and one accent. Everything else is warm white.
- Sound: low drone, a heartbeat kick, a riser, a deep `A.boom` on the reveal, then space.

## Pattern
```js
const C = { bg: '#07070a', fg: '#f2efe8', mute: '#8a8578', glow: '#d4b26a' };
function heroInLight(t, t0) {
  const light = eInOutSine(seg(t, t0, t0 + 1.2));
  studio({ top: '#0c0c10', bottom: '#050506', spot: [CX, CY, H * 0.5], spotA: 0.12 * light });
  return product('product', CX, CY, SAFE.h * 0.62, { rim: C.glow, rimA: 0.35 + 0.5 * light, alpha: 0.2 + 0.8 * light, shadow: 0.2, shine: seg(t, t0 + 0.9, t0 + 2.2), float: 6 * U });
}
```

## Pitfalls
- Muddy blacks: keep the backdrop at #050506–#0c0c10 and let the product be the brightest thing.
- Too much glow: rim alpha ≤ 0.9, never bloom the type.
- Fast cuts break the mood: 2–4 s per shot.
