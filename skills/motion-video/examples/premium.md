# VOLT Electric Lime: brief

- **Product:** VOLT Electric Lime energy drink, 500 ml can (physical product). Assets: `product` (cut-out can photo with condensation), `photo` (macro close-up of the droplets on the logo), `logo` (black tile with lime bolt + VOLT wordmark).
- **Format:** vertical 9:16, 20 s, 120 BPM (10 bars of 2 s), A minor.
- **Logline:** an ice-cold can charges up in the dark and detonates into lime light.
- **Promise:** "Fully charged." **Proofs:** 160 mg natural caffeine · 0 sugar (10 kcal) · real lime.
- **Angle / twist:** the detail + the charge: we start *too close* (macro droplets), pull out into darkness where the can is only a rim-lit silhouette crackling with electricity, and the drop turns it on like a switch.
- **Hook (0–0.5 s):** full-bleed macro of the wet can, drips running, "ICE COLD." slams in; fizz + glassy hit.
- **Structure:** hook macro (bar 1) → dark silhouette build, crackles on the beat, riser (bars 2–3) → 0.25 s silence → **drop at 6.0 s**: white flash, lime burst, arcs to the frame edges, sparks, shine sweep, shake (bar 4) → three callouts on the right, the can left (bars 5–7) → line-up of five cans "STAY CHARGED." (bar 8) → iris to lime end card: logo, the can on a lime floor, "OUT NOW · 500 ML" pill, volt.energy (bars 9–10).
- **Signature move:** the dark-to-lit drop, electricity arcing from the can to the frame edges.
- **Palette:** #050506 black, #c6ff1a lime (from the logo), #f4f7ee white, #8b917c muted; the end card inverts to lime.
- **Type:** Big Shoulders 700 (display), Geist Mono (specs).
- **Sound:** punchy electronic, 120 BPM. Sync: macro fizz + hit (0), whoosh on the whip (1.75), boom + drone (2), accelerating heartbeat kicks + glitch crackles (2.5–5.5), riser (4–5.75), silence (5.75–6), impact + boom + crash (6), four-on-the-floor to 16, pops pitched up per callout, five pops for the line-up, sweep + whoosh into the lime end card, hit + sparkle + bells, Am9 rings out.
- **Words:** ICE COLD. · FULLY CHARGED. · 160 MG / natural caffeine · 0 SUGAR / 10 kcal a can · REAL LIME / sharp, cold finish · STAY CHARGED. · OUT NOW · 500 ML · volt.energy

## config.js

```js
// Film settings. The engine reads these before anything else.
window.FILM_CONFIG = {
  "title": "VOLT Electric Lime",
  "style": "premium",
  "format": "vertical",
  "w": 1080,
  "h": 1920,
  "fps": 30,
  "seconds": 20,
  "bpm": 120,
  "bg": "#07070a",
  "grain": 0.05,
  "vignette": 0.35,
  "twos": false,
  "font": "Instrument Sans"
};
```

## scenes.js

```js
'use strict';
// VOLT Electric Lime — 20 s vertical launch. Look: Dark premium, charged with lime electricity.
// Hook: a macro of the ice-cold can, drips running. Dark: the can as a rim-lit silhouette, crackling.
// Drop (6.0 s): the can lights up in a burst of arcs. Proofs: three callouts. Line-up. Lime end card.

const C = { bg: '#050506', lime: '#c6ff1a', limeD: '#84aa14', white: '#f4f7ee', mute: '#8b917c', ink: '#0b0c0b' };
const S = {
  hook: 0, whip: bars(1) - beats(0.5), dark: bars(1), crack1: bars(1) + beats(1), words: bars(1) + beats(0.5),
  rise: bars(2), hush: bars(3) - beats(0.5), drop: bars(3),
  c1: bars(4), c2: bars(4) + beats(3), c3: bars(5) + beats(2),
  line: bars(7), lime: bars(8), cta: bars(8) + beats(2), end: bars(10),
};
const QC_AT = [0.2, S.whip + 0.1, S.dark + 1.2, S.hush + 0.1, S.drop + 0.08, S.drop + 0.7, S.c3 + 1.0, S.line + 1.2, S.lime + 0.3, S.end - 0.1];

// ------------------------------------------------------------ helpers (volt-prefixed: no clashes with the engine)
/** a jagged electric arc between two points; the shape re-rolls every 2 frames */
function voltArc(x0, y0, x1, y1, seed, amp, lw, a) {
  if (a <= 0.01) return;
  const n = 16, k = Math.floor(CLK.F / 2), pts = [], nx = -(y1 - y0), ny = x1 - x0, L = Math.hypot(nx, ny) || 1;
  for (let i = 0; i <= n; i++) {
    const u = i / n, off = (i === 0 || i === n) ? 0 : (h01(seed, k, i) - 0.5) * amp * Math.sin(Math.PI * u) * (0.6 + 0.8 * h01(seed, k, 99));
    pts.push([lerp(x0, x1, u) + nx / L * off, lerp(y0, y1, u) + ny / L * off]);
  }
  bloom(() => { strokePts(pts, rgba(C.lime, a), lw * 2.4); strokePts(pts, rgba('#ffffff', a), lw * 0.8); }, 14 * U, 0.9);
}
/** crackles hugging the can's silhouette: short arcs between points on its edge */
function voltCrackle(box, seed, a, n = 3) {
  for (let i = 0; i < n; i++) {
    const r = rng(seed, i, Math.floor(CLK.F / 3)), side = r() < 0.5 ? 0.04 : 0.96, fy0 = 0.15 + r() * 0.7, fy1 = fy0 + (r() - 0.5) * 0.25;
    const [x0, y0] = box.pt(side, fy0), [x1, y1] = box.pt(side + (side < 0.5 ? -0.25 : 0.25) * r(), fy1);
    voltArc(x0, y0, x1, y1, seed * 31 + i, 70 * U, 3 * U, a * (0.5 + 0.5 * r()));
  }
}
/** lime sparks flying out from (x, y), u = 0..1 progress */
function voltSparks(x, y, u, n, seed, spread) {
  if (u <= 0 || u >= 1) return;
  particles(seed, n, (i, r) => {
    const ang = r() * TAU, sp = (0.35 + r() * 0.65) * spread, e = eOutExpo(u), px = x + Math.cos(ang) * sp * e, py = y + Math.sin(ang) * sp * e + 260 * U * u * u;
    circle(px, py, (2 + r() * 5) * U * (1 - u), i % 4 ? C.lime : '#ffffff', 1 - u);
  });
}
/** a full-bleed photo (the macro), pushed in slowly */
function voltMacro(t) {
  const z = lerp(1.08, 1.32, eInOutSine(seg(t, 0, S.dark)));
  photo('photo', CX, CY, W, { h: H, radius: 0, shadow: 0, zoom: z, focus: [lerp(0.55, 0.62, seg(t, 0, 2)), 0.35] });
  // two big drips running down the lens-close surface
  droplets('photo', { x0: 0, y0: 0, w: W, h: H, cx: CX, cy: CY }, t + 0.6, { n: 0, runs: 3, size: 26, id: 'macroRuns', top: 0.0 });
}

// ------------------------------------------------------------ scenes (local times)
function sceneHook(t) {
  voltMacro(t);
  wash(0, H * 0.55, 0, H, '#000000', 0, 0.75);
  sweepLight(seg(t, 0.25, 1.35), { color: C.lime, alpha: 0.28, width: W * 0.35 });
  reveal('ICE COLD.', CX, SAFE.y1 - 40 * U, 250 * U, seg(t, 0.05, 0.6), { align: 'center', font: 'Big Shoulders', weight: 700, tracking: -0.01, color: C.white, mode: 'slam', by: 'char', stagger: 0.25, maxW: SAFE.wc });
}

function sceneDark(t, lt) {
  // the can as a silhouette in the dark: rim light grows, crackles on the beat, a slow push
  const grow = eInOutSine(seg(t, S.dark, S.hush)), hush = seg(t, S.hush, S.hush + 0.08);
  const z = lerp(1.0, 1.08, grow), h = SAFE.h * 0.78;
  camera({ zoom: z, y: CY + 30 * U }, () => {
    glow(CX, CY, 520 * U, C.lime, 0.10 * grow * (1 - hush), 'lighter');
    const b = product('product', CX, CY + 40 * U, h, { alpha: lerp(0.08, 0.32, grow) * (1 - 0.7 * hush), rim: C.lime, rimA: lerp(0.25, 0.9, grow) * (1 - hush), shadow: 0 });
    const beatsOn = [S.crack1, S.crack1 + BEAT * 2, S.crack1 + BEAT * 4, S.crack1 + BEAT * 5, S.crack1 + BEAT * 5.5];
    let crack = 0; for (const bt of beatsOn) crack = Math.max(crack, pulse(t, bt, 0.25));
    if (t < S.hush) voltCrackle(b, 'dark', crack, 2);
  });
  const wu = seg(t, S.words, S.words + 0.5), wo = 1 - seg(t, S.hush - 0.4, S.hush);
  withT({ alpha: wo }, () => {
    reveal('FULLY', CX, SAFE.y0 + 150 * U, 170 * U, wu, { align: 'center', font: 'Big Shoulders', weight: 700, color: C.white, mode: 'rise', by: 'char', stagger: 0.3 });
    reveal('CHARGED.', CX, SAFE.y0 + 300 * U, 170 * U, seg(t, S.words + 0.25, S.words + 0.8), { align: 'center', font: 'Big Shoulders', weight: 700, color: C.lime, mode: 'rise', by: 'char', stagger: 0.3 });
  });
}

function sceneDrop(t) {
  const u = t - S.drop, hit = pulse(t, S.drop, 0.35), push = eOutExpo(seg(t, S.drop, S.drop + 0.6));
  const h = SAFE.h * lerp(0.95, 0.86, eInOutSine(seg(t, S.drop, S.c1)));
  camera({ zoom: lerp(1.25, 1, push), shake: 22 * U * pulse(t, S.drop, 0.4), y: CY }, () => {
    // giant outlined VOLT behind the can
    text('VOLT', CX, CY + 250 * U, 560 * U, { align: 'center', font: 'Big Shoulders', weight: 700, color: null, stroke: rgba(C.lime, 0.28 * push), lw: 3 * U, tracking: -0.02 });
    glow(CX, CY, 700 * U, C.lime, 0.16 + 0.3 * hit, 'lighter');
    // arcs radiating to the frame edges on the hit
    for (let i = 0; i < 6; i++) { const ang = -Math.PI / 2 + (i - 2.5) * 0.55, R = H * 0.7; voltArc(CX, CY - 60 * U, CX + Math.cos(ang) * R, CY + Math.sin(ang) * R, 'burst' + i, 140 * U, 4 * U, hit * 1.2); }
    const b = product('product', CX, CY + 20 * U, h, { rim: C.lime, rimA: 0.55 + 0.4 * hit, shine: seg(t, S.drop + 0.15, S.drop + 1.1), shadow: 0 });
    droplets('product', b, t, { n: 0, runs: 5, size: 11, id: 'dropRuns' });
    voltCrackle(b, 'drop', 0.4 + 0.6 * hit, 3);
    voltSparks(CX, CY - 100 * U, seg(t, S.drop, S.drop + 1.3), 90, 'sparks', 620 * U);
  });
  flash(pulse(t, S.drop, 0.14), '#ffffff');
  flash(pulse(t, S.drop + 0.06, 0.3) * 0.5, C.lime, 'lighter');
}

function sceneProofs(t) {
  // can slides left, three callouts land on the right, one per beat group
  const mv = eInOutExpo(seg(t, S.c1, S.c1 + 0.7)), x = lerp(CX, SAFE.x0 + SAFE.w * 0.27, mv), h = SAFE.h * lerp(0.86, 0.8, mv);
  const sway = Math.sin((t - S.c1) * 1.3) * 0.02;
  glow(x, CY, 560 * U, C.lime, 0.12, 'lighter');
  const b = product('product', x, CY + 20 * U, h, { rim: C.lime, rimA: 0.55, rot: sway, shadow: 0, float: 8 * U, id: 'proofCan' });
  droplets('product', b, t, { n: 0, runs: 4, size: 11, id: 'proofRuns' });
  const cs = { color: C.lime, text: C.white, size: 58 * U, font: 'Big Shoulders', subFont: 'Geist Mono', subColor: C.mute, len: 70 * U, rise: -40 * U, dir: 'right' };
  callout(...b.pt(0.72, 0.22), '160 MG', seg(t, S.c1 + 0.5, S.c1 + 1.3), { ...cs, sub: 'natural caffeine' });
  callout(...b.pt(0.78, 0.5), '0 SUGAR', seg(t, S.c2, S.c2 + 0.8), { ...cs, sub: '10 kcal a can' });
  callout(...b.pt(0.72, 0.78), 'REAL LIME', seg(t, S.c3, S.c3 + 0.8), { ...cs, sub: 'sharp, cold finish' });
  text('500 ML · ENERGY DRINK', CX, SAFE.y0 + 10 * U, 30 * U, { align: 'center', font: 'Geist Mono', weight: 400, tracking: 0.14, color: rgba(C.mute, eOut(seg(t, S.c1 + 0.3, S.c1 + 1))) });
}

function sceneLineup(t) {
  // five cans pop in on eighth notes, the centre one steps forward
  const xs = [-2, -1, 1, 2, 0], h = SAFE.h * 0.5;
  reveal('STAY', CX, SAFE.y0 + 120 * U, 150 * U, seg(t, S.line, S.line + 0.4), { align: 'center', font: 'Big Shoulders', weight: 700, color: C.white, mode: 'slam', by: 'word' });
  reveal('CHARGED.', CX, SAFE.y0 + 260 * U, 150 * U, seg(t, S.line + 0.25, S.line + 0.65), { align: 'center', font: 'Big Shoulders', weight: 700, color: C.lime, mode: 'slam', by: 'word' });
  xs.forEach((k, i) => {
    const t0 = S.line + i * BEAT / 2, s = spring(t - t0, 2.6, 0.4); if (s <= 0) return;
    const front = k === 0, hh = h * (front ? 1.18 : 0.9), x = CX + k * 190 * U, y = SAFE.y0 + SAFE.h * 0.66 + (front ? 30 * U : 0);
    product('product', x, y, hh, { scale: s, rim: front ? C.lime : C.limeD, rimA: front ? 0.8 : 0.35, alpha: front ? 1 : 0.8, shadow: 0 });
  });
}

function sceneLime(t) {
  // flash-cut to lime: logo, the can, the CTA
  const u = seg(t, S.lime, S.lime + 0.45);
  rect(0, 0, W, H, C.bg);
  iris(1 - eInOutExpo(u), CX, CY, C.lime);          // iris covers with the bg colour as it shrinks... drawn inverted below
  ctx.save(); ctx.beginPath(); ctx.arc(CX, CY, Math.hypot(CX, CY) * eInOutExpo(u), 0, TAU); ctx.clip(); rect(0, 0, W, H, C.lime);
  const floor = SAFE.y0 + SAFE.h * 0.84;
  studio({ top: C.lime, bottom: '#b6ec12', floor, floorCol: '#b2e612' });
  const lg = logo('logo', CX, SAFE.y0 + 95 * U, SAFE.wc * 0.62, { u: seg(t, S.lime + 0.2, S.lime + 0.9), mode: 'scale' });
  const s = spring(t - S.lime - 0.1, 2.2, 0.45), h = SAFE.h * 0.58;
  const b = product('product', CX, floor - h / 2, h, { scale: Math.max(0.001, s), floor, shadow: 0.55, drop: { x: 16 * U, y: 10 * U, color: '#8fbf0c' }, shine: seg(t, S.lime + 0.8, S.lime + 1.8) });
  if (s > 0.2) droplets('product', b, t, { n: 0, runs: 3, size: 11, id: 'endRuns' });
  pill('OUT NOW · 500 ML', CX, SAFE.y1 - 30 * U, 44 * U, { bg: C.ink, fg: C.lime, u: seg(t, S.cta, S.cta + 0.6), font: 'Big Shoulders', weight: 700, tracking: 0.06 });
  text('volt.energy', CX, SAFE.y1 + 70 * U, 34 * U, { align: 'center', font: 'Geist Mono', weight: 400, color: rgba(C.ink, eOut(seg(t, S.cta + 0.3, S.cta + 0.9))) });
  ctx.restore();
  flash(pulse(t, S.lime, 0.15) * 0.8, '#ffffff');
}

// ------------------------------------------------------------ frame
function frame(t) {
  if (t < S.dark) sceneHook(t);
  else if (t < S.drop) sceneDark(t);
  else if (t < S.c1) sceneDrop(t);
  else if (t < S.line) sceneProofs(t);
  else if (t < S.lime) sceneLineup(t);
  else sceneLime(t);
  // the whip out of the macro: a lime flash on the cut into the dark
  flash(pulse(t, S.dark, 0.1) * 0.7, C.lime, 'lighter');
}
```

## score.js

```js
'use strict';
// VOLT — punchy electronic, 120 BPM, A minor. Fizz + crackle intro, heartbeat build, silence, the drop at S.drop.
function score(A) {
  const D = S.drop;
  // hook: ice fizz and a glassy hit
  A.noise(A.sfx, 0, 1.9, 0.12, { type: 'highpass', f: 5200, swell: true });
  // a cold pulse under the macro: filtered arp + ticking hats, so the hook has music from frame 0
  A.arp(0, A.chord('Am7', 4), A.b(0.25), S.whip, 0.55, { cutoff: 2200 });
  A.pattern(0, 'x.x.x.x.x.x.x.x.', (t) => A.hat(t, 0.35), 1);
  A.sub(0, 'A1', S.whip, 0.6);
  A.hit(0.02, 0.8); A.sparkle(0.05, 0.6);
  A.whoosh(S.whip, 0.3, 0.8, false);
  // dark: drone, heartbeat kicks that speed up, crackles on the arcs, a riser into silence
  A.boom(S.dark, 0.5);
  A.drone(S.dark, 'A1', D - S.dark, 0.9);
  A.pad(S.dark, A.chord('Am7', 3), D - S.dark, 0.35, { cutoff: 900 });
  [0, 1, 2, 2.5, 3, 3.25, 3.5, 3.625, 3.75].forEach((b) => A.kick(S.dark + A.b(b), 0.7, { len: 0.3 }));
  [S.crack1, S.crack1 + A.b(2), S.crack1 + A.b(4), S.crack1 + A.b(5), S.crack1 + A.b(5.5)].forEach((t) => A.glitch(t, 0.16, 0.6));
  A.riser(S.rise, S.hush - S.rise, 1);
  A.silence(S.hush, D);
  // the drop: impact, boom, crash, then four-on-the-floor until the lime end card
  A.impact(D, 1); A.boom(D, 0.8); A.crash(D, 0.9); A.glitch(D, 0.35, 0.8);
  const bars = Math.round((S.lime - D) / A.bar);
  A.pattern(D, 'x...x...x...x...', (t) => A.kick(t, 1), bars);
  A.pattern(D, '....x.......x...', (t) => A.clap(t, 0.7), bars);
  A.pattern(D, '..x...x...x...x.', (t) => A.hat(t, 0.6), bars);
  A.progression(D, ['Am', 'F', 'C', 'G', 'Am'], 4, (n, t) => { A.bass(t, n[0] - 12, A.b(4) - 0.05, 1); A.pad(t, n, A.b(4), 0.45, { cutoff: 2400 }); }, 3);
  [[0, 'A4'], [0.5, 'C5'], [1, 'E5'], [1.75, 'D5'], [2.5, 'E5']].forEach(([b, n]) => A.pluck(D + A.bar + A.b(b), n, 0.3, 0.8));
  // proofs: pops pitched up through the sequence
  [[S.c1 + 0.5, 1], [S.c2, 1.12], [S.c3, 1.26]].forEach(([t, p]) => { A.pop(t, 0.9, p); A.blip(t + 0.08, 'E6', 0.6); });
  // line-up: five pops on eighth notes, then a sweep down into the end card
  for (let i = 0; i < 5; i++) A.pop(S.line + i * A.b(0.5), 0.7, 1 + i * 0.1);
  A.sweep(S.lime - A.b(2), S.lime, 16000, 900);
  A.whoosh(S.lime - 0.35, 0.35, 0.9, true);
  // end card: a hit, sparkle, and the home chord ringing out
  A.hit(S.lime, 1); A.impact(S.lime, 0.5); A.sparkle(S.lime + 0.2, 0.8);
  A.pad(S.lime, A.chord('Am9', 3), S.end - S.lime, 1, { cutoff: 3600 });
  A.drone(S.lime, 'A2', S.end - S.lime, 0.6);
  A.bass(S.lime, 'A1', 2, 0.8);
  [[0.4, 'E5'], [0.9, 'A5'], [1.4, 'C6']].forEach(([d, n]) => A.bell(S.lime + d, n, 1.8, 0.6));
  A.pop(S.cta, 0.8, 1.3);
}
```

