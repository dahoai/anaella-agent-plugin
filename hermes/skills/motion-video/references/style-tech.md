# Look: Tech dark

**The look:** a modern software launch: deep navy space, a faint grid, devices floating with soft glows, the camera pushing into the real UI, glowing focus rings, crisp sans type and mono labels. SaaS, apps, AI tools, fintech, developer products.

**Config:** `bg #070b14`, `font 'Instrument Sans'`, `grain 0.05`, `vignette 0.3`, 112–124 BPM, 30 fps.
**Palette:** `#070b14` → `#0d1424` background, `#e8edf7` type, `#7c86a2` muted, accent = the brand colour (or `#6d7cff`), plus one success colour (`#2fe07a`) for "done" moments.
**Fonts:** Instrument Sans 700 headlines (tracking −0.02), Geist Mono 400/700 for labels, numbers and UI tags.

## Vocabulary
- **Space:** `studio({ top: '#0b1120', bottom: '#05080f' })` + a faint perspective grid (thin `line()`s, alpha 0.06) + a soft accent `glow` behind the device.
- **Device entrance:** `device('laptop' | 'browser' | 'phone', ...)` rises with `eOutExpo` and a small `rot` settle, the screen fading up from black, `sweepLight` across it once.
- **Push into the UI:** `zoom: { x, y, w, h, u }` into the feature area, then `uiFocus(dev, r, u, { label, color: accent })`; a `pointer` glides (`keys`) to `dev.pt(...)`, clicks (`tap`, `A.click`), and the result appears (a toast card, a counter, a check `icon`).
- **Data moments:** `counter` numbers in Geist Mono, `lineChart`/`barsChart` in the accent, only with numbers the user gave you.
- **Two devices:** laptop + phone side by side for "everywhere"; the phone slightly in front, lower.
- **End card:** logo tinted white, one line, the CTA as an accent `pill` ("Start free", "Download") + the URL in mono.

## Rules
- The UI is the hero: big devices (55–75% of the width in landscape, 80–90% in vertical), pushes close enough to read the feature.
- Glow only around the focus (the ring, the device halo), never on type.
- Crisp, fast motion (`eOutExpo`, `eInOutExpo`), 70–100 ms staggers, clicks exactly on beats.
- Sound: clean electronic, `A.click`/`A.blip`/`A.tick` for UI, a `A.riser` into the reveal, `A.impact` + `A.notify` on the result.

## Pattern
```js
const C = { top: '#0b1120', bot: '#05080f', fg: '#e8edf7', mute: '#7c86a2', acc: (ASSET.logo && ASSET.logo.brand) || (ASSET.product && ASSET.product.brand) || '#6d7cff' };
function techGrid(t) { for (let i = -10; i <= 10; i++) line(CX + i * 90 * U, 0, CX + i * 90 * U, H, rgba(C.fg, 0.05), 1.2 * U); for (let j = 0; j < 24; j++) line(0, j * 90 * U, W, j * 90 * U, rgba(C.fg, 0.05), 1.2 * U); }
function heroDevice(t, t0, kind, w) {
  const u = eOutExpo(seg(t, t0, t0 + 0.8));
  glow(CX, CY, w * 0.8, C.acc, 0.25 * u);
  return device(kind, CX, CY + (1 - u) * 200 * U, w, { screen: 'screen', alpha: u, rot: (1 - u) * 0.05, theme: 'dark' });
}
```

## Pitfalls
- Unreadable screenshots: never show a full desktop UI tiny for long; push in.
- Focus rings on the wrong spot: estimate UI fractions from the screenshot and check them on the QC sheet.
- Too much grid/glow: it's atmosphere at 5–8% alpha, not a pattern.
