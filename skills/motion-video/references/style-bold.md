# Look: Bold colour

**The look:** loud, flat, confident: full-bleed brand colour backgrounds that swap on the beat, heavy display type slamming in, the product popping with springs and hard shadows, stickers and pills. Energy drinks, snacks, apps for young audiences, sales and offers.

**Config:** `bg` = the brand colour, `font 'Bricolage Grotesque'`, `grain 0.04`, `vignette 0`, 120–132 BPM, 30 fps.
**Palette:** 2–3 flat brand colours from the logo/product (the colours video.motion.assets read) + near-black `#111111` + off-white `#fffaf0`. Swap the background between them scene by scene.
**Fonts:** Boldonse or Bricolage Grotesque 700 for slams (tracking −0.03; remember Boldonse caps are ~1.7× taller), Geist Mono 700 for small tags.

## Vocabulary
- **Colour cuts:** each scene is a new flat background; transitions are hard cuts on the beat or `wipe(u, dir, nextColour)`.
- **Slam type:** `reveal(word, ..., { mode: 'slam', by: 'char' })` with `A.hit` + a small camera shake; 1–3 words per beat.
- **Pop product:** `product(...)` enters with `spring` scale (0 → 1.1 → 1) and a small `rot`, hard offset shadow (`drop: { color: '#111111' }`).
- **Stickers:** `badge('NEW', ...)`, `pill('ZERO SUGAR', ...)`, spinning slowly; icons from `icon()` in off-white.
- **Repetition:** the product repeated in a grid or a lineup that pops in on 16ths (`particles`/loops), then one hero steps forward.
- **Software:** the phone tilts in (`rot` −0.1 → 0) over a colour field; `uiFocus` rings in off-white; big type beside it.
- **End card:** product + logo on the main brand colour, CTA `pill` in near-black. A multi-colour logo goes on an off-white plate (`logo(..., { plate: '#fffaf0' })`), never tinted flat.

## Rules
- Flat and graphic: no gradients except the product itself; shadows are hard offsets, not blurs.
- Fast: cuts every 1–2 beats in the build, one held beat for the reveal.
- Every appearance has a sound (`A.pop`, `A.hit`, `A.swipe`), pitched up through sequences.
- Contrast: off-white type on saturated colours, near-black on light ones.

## Pattern
```js
const C = { a: (ASSET.logo && ASSET.logo.brand) || (ASSET.product && ASSET.product.brand) || '#1f3dff', b: '#ff5a1f', ink: '#111111', paper: '#fffaf0' };
function popProduct(t, t0, x, y, h) {
  const s = spring(t - t0, 2.6, 0.38); if (s <= 0) return null;
  return product('product', x, y, h, { scale: s, rot: (1 - clamp(s)) * 0.3, shadow: 0, drop: { color: C.ink } });   // hard offset shadow
}
```

## Pitfalls
- Colours fighting the product: if the product is loud, use its own colours as backgrounds, not new ones.
- Too many words: slam 1–3 words; the rest is visual.
- Losing the product: every scene either shows the product or points at it.
