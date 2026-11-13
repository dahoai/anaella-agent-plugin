# NOIR No.7 — launch brief

**Logline:** A luxury eau de parfum whose scent reaches the room first; the bottle follows it in.
**Promise:** It arrives before you do.
**Twist (the detail + the ritual):** open in macro on the brushed gold cap, then rack-focus to an empty studio where an amber scent trail drifts in *before* the bottle. The bottle lands inside its own trail.
**Proofs:** Oud & black amber (the juice) · 12-hour trail (the collar/atomiser) · Finished by hand (the gold cap).

## Structure — square 1:1, 15 s, 96 BPM (BAR 2.5 s, 6 bars)
| time | scene |
|---|---|
| 0.0–2.5 (bar 1) | **Hook:** macro tilt from the gold cap down to the NOIR label, shine sweeping the cap. Bell motif A–D–F–E. |
| 2.2–2.65 | Push-through rack focus (blur + dissolve) into the empty studio. |
| 2.5–4.7 (bar 2) | **Promise:** "It arrives / before you do." word by word (accent on *before*); an amber scent trail flows in from the left and pools where the bottle will land. Riser. |
| 4.7–5.0 | True silence. Words gone, trail gathers. |
| **5.0** (bar 3) | **Reveal (33%):** the bottle falls into its trail, lands on the downbeat, one small settle, shine sweep. Sub + boom + bell. |
| 6.25–7.0 | Glides to the left third (signature move: the stage opens for the proofs). |
| 6.875 / 8.75 / 10.625 | **Proofs:** one callout at a time, every 3 beats, pops pitched up. |
| 12.5–15 (bar 6) | **End card:** bottle left; NOIR logo, "It arrives / before you do.", pill "Available October 1", noir.paris. Still from 13.5. D major resolution, motif resolves F#–E–D. |

## Look — Clean studio
- Palette: backdrop #f8f6f2 → #e3ddd3 (warm neutrals), ink #16130f (logo), muted #7b736a, accent gold #a47b3e (the cap, darkened for contrast), trail amber #9c6428.
- Type: Outfit 700 headlines (−0.02), Instrument Sans callouts, Geist Mono subs / URL.
- Sound: minimal and premium. D minor bed (Dm9 · Bbmaj9 · Gm9 · A7sus) → Dmaj9 on the end card; soft kick per bar after the reveal.

## Words (final)
- It arrives / before you do.
- Oud & black amber — THE ACCORD
- 12-hour trail — THE SILLAGE
- Finished by hand — THE GOLD CAP
- Available October 1 · noir.paris

## config.js

```js
// Film settings. The engine reads these before anything else.
window.FILM_CONFIG = {
  "title": "NOIR No.7",
  "style": "studio",
  "format": "square",
  "w": 1080,
  "h": 1080,
  "fps": 30,
  "seconds": 15,
  "bpm": 96,
  "bg": "#f3f0ea",
  "grain": 0.03,
  "vignette": 0,
  "twos": false,
  "font": "Outfit"
};
```

## scenes.js

```js
'use strict';
// NOIR No.7 — "It arrives before you do."
// Clean studio · square 1:1 · 15 s · 96 BPM (BEAT 0.625 s, BAR 2.5 s, 6 bars).
//
// Hook: macro tilt down the bottle (gold cap → label) → push-through rack focus into an empty studio →
// the promise arrives word by word while an amber scent trail drifts in → a breath of silence →
// REVEAL: the bottle falls into its own trail and lands on the downbeat → it glides to the left third →
// three callout proofs, one per 3 beats → end card (bottle + logo + line + CTA), still for the last 1.5 s.

// ── Palette ────────────────────────────────────────────────────────────────────────────────────────
// Warm neutrals from the bottle's backdrop, ink from the logo, gold from the cap (darkened so it reads on light).
const C = {
  top: '#f8f6f2', bot: '#e3ddd3',
  ink: '#16130f', mute: '#7b736a',
  gold: '#a47b3e',     // accent: one word per line, small details
  amber: '#9c6428',    // the scent trail
  paper: '#faf8f4',    // text on the ink pill
};

// ── Timing: one source of truth on the beat grid (score.js reads these too) ─────────────────────────
const S = {
  hook: 0,
  promise: bars(1),                // 2.5   rack focus lands on the empty stage, words arrive
  breath: bars(2) - 0.3,           // 4.7   true silence
  reveal: bars(2),                 // 5.0   the bottle lands
  glide: bars(2) + beats(2),       // 6.25  slides to the left third
  p1: bars(2) + beats(3),          // 6.875 proof 1
  p2: bars(3) + beats(2),          // 8.75  proof 2
  p3: bars(4) + beats(1),          // 10.625 proof 3
  end: bars(5),                    // 12.5  end card
};
const RACK = [S.promise - 0.3, S.promise + 0.15];           // macro → stage dissolve window
const PROMISE = [['It', 'arrives'], ['before', 'you', 'do.']];
const WORD_T = [0, 1, 2, 3, 4].map((i) => S.promise + i * BEAT / 2);   // one word per 8th note
const QC_AT = [S.promise + 1.6, S.reveal - 0.1, S.reveal + 0.12, S.reveal + 0.9,
  S.p1 + 1.0, S.p2 + 1.0, S.p3 + 1.0, DUR - 0.05];

// ── Stage geometry (all from SAFE, so another format only needs a re-check) ──────────────────────────
const FLOOR = SAFE.y0 + SAFE.h * 0.84;          // where the bottle stands
const HORIZON = FLOOR - 64 * U;                 // the studio floor's back edge, behind the bottle's base
const PH = SAFE.h * 0.64;                       // bottle height
const PW = PH * ASSET.product.aspect;           // bottle width
const PY = FLOOR - PH / 2;                      // bottle centre when standing
const X_HERO = CX;                              // reveal position
const X_LEFT = SAFE.x0 + SAFE.w * 0.28;         // proofs + end card position
const COL_X = SAFE.x0 + SAFE.w * 0.74;          // end-card text column (centre)

// A point on the bottle image (fractions) when the bottle stands at x.
function bottlePt(fx, fy, x) { return [x + (fx - 0.5) * PW, PY - PH / 2 + fy * PH]; }

// The three proofs, each anchored to a real spot on the bottle.
const PROOFS = [
  { t: S.p1, fx: 0.84, fy: 0.56, label: 'Oud & black amber', sub: 'THE ACCORD' },   // the juice
  { t: S.p2, fx: 0.66, fy: 0.225, label: '12-hour trail', sub: 'THE SILLAGE', rise: 0 },     // the collar / atomiser
  { t: S.p3, fx: 0.72, fy: 0.10, label: 'Finished by hand', sub: 'THE GOLD CAP' },  // the cap
];

// ── Shared drawing ──────────────────────────────────────────────────────────────────────────────────
function noirStage() {
  studio({ top: C.top, bottom: C.bot, floor: HORIZON });
}

function noirBottle(x, o = {}) {
  return product('product', x, PY, PH, { floor: FLOOR, reflect: 0.3, shadow: 0.45, ...o });
}

// The scent, drawn as fine gold silk strands: they draw on from the left edge while the promise arrives, curl
// across the stage and pool where the bottle will land; at the reveal they are pulled into the bottle and fade.
const TRAIL_N = 7;
function trailStrand(i, t, gather) {
  const pts = [];
  const lx = X_HERO + (h01('noir-land', i) - 0.5) * PW * 0.5;            // where this strand lands
  const ly = FLOOR - PH * (0.18 + h01('noir-land-y', i) * 0.3);
  for (let j = 0; j <= 80; j++) {
    const s = j / 80;
    const amp = (34 + i * 5) * U * Math.sin(Math.PI * s) * (1 - gather);
    const x = lerp(-0.05 * W, lx, s);
    const y = lerp(CY + (230 + i * 12) * U, ly, eInOutSine(s))
      + amp * Math.sin(s * 5.2 + t * 1.1 + i * 0.9) + 26 * U * snoise(s * 3 + t * 0.4, i + 11) * (1 - gather);
    pts.push([x, y]);
  }
  return pts;
}
function scentTrail(t) {
  const on = eOutQuad(seg(t, S.promise - 0.1, S.promise + 0.5)) * (1 - eInQuad(seg(t, S.reveal - 0.05, S.reveal + 0.35)));
  if (on <= 0) return;
  const gather = eInOutQuad(seg(t, S.reveal - 0.9, S.reveal));
  for (let i = 0; i < TRAIL_N; i++) {
    const pts = trailStrand(i, t, gather);
    const draw = eOutQuint(seg(t, S.promise + i * 0.07, S.promise + 1.8 + i * 0.07));
    const tail = eInQuad(seg(t, S.reveal - 0.9, S.reveal));                 // strands pull into the bottle
    const vis = partial(pts, draw).slice(Math.floor(tail * pts.length * 0.95));
    if (vis.length > 1) strokePts(vis, mixHex(C.gold, C.amber, i / TRAIL_N), (1.2 + (i % 3) * 0.7) * U, false, on * (0.35 + 0.35 * h01('noir-a', i)));
  }
  particles('noir-fleck', 26, (i, r) => {                                    // a few gold motes riding the strands
    const k = i % TRAIL_N, pts = trailStrand(k, t, gather);
    const s = (r() + t * (0.08 + r() * 0.06)) % 1;
    const [x, y] = pts[Math.floor(s * 80)];
    const reach = eOutQuint(seg(t, S.promise, S.promise + 1.8));
    if (s > reach) return;
    sparkle(x + (r() - 0.5) * 30 * U, y + (r() - 0.5) * 30 * U, (4 + r() * 6) * U, C.gold, on * 0.9 * Math.sin(Math.PI * s), t * 0.7 + i);
  });
}

// ── Scene 1: the macro hook (world = the finished bottle, seen through a tilting close-up camera) ─────
function sceneMacro(t, push) {
  const u = eInOutSine(seg(t, -0.3, S.promise + 0.2));
  const [x0, y0] = bottlePt(0.5, 0.12, X_HERO);
  const [x1, y1] = bottlePt(0.52, 0.6, X_HERO);
  const zoom = lerp(3.0, 2.4, u) * (1 + 0.35 * eInQuad(push));
  camera({ x: lerp(x0, x1, u), y: lerp(y0, y1, u), zoom }, () => {
    noirStage();
    noirBottle(X_HERO, { shine: seg(t, -0.4, 1.8) });
  });
}

// ── Scene 2: the promise (words arrive, blurred into focus, one per 8th) ─────────────────────────────
function promiseWords(t) {
  if (t > S.breath + 0.05) return;
  const size = 108 * U, ys = [CY - 110 * U, CY + 10 * U];
  const out = eInQuad(seg(t, S.breath - 0.3, S.breath));
  let i = 0;
  PROMISE.forEach((ln, li) => {
    words(ln.join(' '), CX, ys[li], size, { align: 'center', tracking: -0.02 }).forEach((w) => {
      const k = eOutQuint(seg(t, WORD_T[i], WORD_T[i] + 0.7));
      const col = w.word === 'before' ? C.gold : C.ink;
      i++;
      if (k <= 0) return;
      ctx.save();
      ctx.filter = `blur(${((1 - k) * 14 * U + out * 10 * U).toFixed(2)}px)`;
      text(w.word, w.x, w.y + (1 - k) * 26 * U - out * 22 * U, size,
        { align: 'left', tracking: -0.02, color: col, alpha: k * (1 - out) });
      ctx.restore();
    });
  });
}

// ── Scene 3+: the bottle (falls into its trail, lands on the downbeat, glides left) ───────────────────
function heroBottle(t) {
  const x = lerp(X_HERO, X_LEFT, eInOutExpo(seg(t, S.glide, S.glide + 0.8)));
  const dt = t - S.reveal;
  const lift = dt < 0
    ? (1 - eInCubic(seg(t, S.reveal - 0.45, S.reveal))) * PH * 0.55           // the fall
    : 9 * U * Math.max(0, Math.sin(Math.PI * dt / 0.32)) * (dt < 0.32 ? 1 : 0); // one small settle
  const shine = t < S.end ? seg(t, S.reveal + 0.05, S.reveal + 1.05) : seg(t, S.end + 0.2, S.end + 1.1);
  return noirBottle(x, { lift, shine, alpha: eOutQuad(seg(t, S.reveal - 0.45, S.reveal - 0.2)) });
}

function proofCallouts(t, box) {
  PROOFS.forEach((p, i) => {
    const end = i < PROOFS.length - 1 ? PROOFS[i + 1].t - 0.15 : S.end - 0.1;
    if (t < p.t || t > end) return;
    const u = eOutQuint(seg(t, p.t, p.t + 0.75));
    const out = eInQuad(seg(t, end - 0.3, end));
    const [px, py] = box.pt(p.fx, p.fy);
    withT({ x: 0, y: 0, alpha: 1 - out }, () => callout(px, py, p.label, u, {
      dir: 'right', len: 110 * U, color: C.ink, text: C.ink, size: 42 * U,
      font: 'Instrument Sans', sub: p.sub, subFont: 'Geist Mono',
      ...(p.rise !== undefined && { rise: p.rise }),
    }));
  });
}

// ── Scene 4: end card ─────────────────────────────────────────────────────────────────────────────────
function endCard(t) {
  const lt = t - S.end;
  if (lt < 0) return;
  const lw = 380 * U, logoY = PY - PH * 0.2;
  logo('logo', COL_X, logoY, lw, { u: eOutQuint(seg(lt, 0.05, 0.9)), mode: 'wipe' });
  const k = eOutQuint(seg(lt, 0.4, 1.1));
  const ly = logoY + lw / ASSET.logo.aspect / 2 + 100 * U;
  text('It arrives', COL_X, ly + (1 - k) * 16 * U, 54 * U, { align: 'center', tracking: -0.02, color: C.ink, alpha: k });
  const l2 = words('before you do.', COL_X, ly + 62 * U, 54 * U, { align: 'center', tracking: -0.02 });
  l2.forEach((w) => text(w.word, w.x, w.y + (1 - k) * 16 * U, 54 * U,
    { align: 'left', tracking: -0.02, color: w.word === 'before' ? C.gold : C.ink, alpha: k }));
  pill('Available October 1', COL_X, ly + 170 * U, 36 * U,
    { bg: C.ink, fg: C.paper, u: seg(lt, 0.75, 1.15), font: 'Instrument Sans', weight: 700, tracking: 0.02 });
  text('noir.paris', COL_X, ly + 256 * U, 28 * U,
    { font: 'Geist Mono', weight: 400, color: C.mute, tracking: 0.12, align: 'center', alpha: eOutQuad(seg(lt, 1.0, 1.4)) });
}

// ── The stage scene: everything after the rack focus lives in one camera ──────────────────────────────
function sceneStage(t) {
  const zoom = keys(t, [
    [RACK[0], 1.06], [S.reveal - 0.1, 1.03, eInOutSine],      // slow drift while the trail arrives
    [S.reveal + 1.1, 1.0, eOutQuint],                          // the reveal settles the frame
    [S.end - 0.3, 1.025, eInOutSine],                          // slow push through the proofs
    [S.end + 1.0, 1.0, eInOutExpo],                            // end card: still
  ]) + 0.01 * pulse(t, S.reveal, 0.4);
  camera({ x: CX, y: CY, zoom }, () => {
    noirStage();
    scentTrail(t);
    promiseWords(t);
    if (t >= S.reveal - 0.45) {
      const box = heroBottle(t);
      proofCallouts(t, box);
    }
    endCard(t);
  });
  sweepLight(seg(t, S.reveal + 0.02, S.reveal + 0.9), { alpha: 0.07 });
}

function frame(t) {
  if (t >= RACK[0]) sceneStage(t);
  if (t < RACK[1]) {
    const k = seg(t, RACK[0], RACK[1]);
    if (k <= 0) sceneMacro(t, 0);
    else layer(() => sceneMacro(t, k), { filter: `blur(${(k * 22 * U).toFixed(2)}px)`, alpha: 1 - eInQuad(k) });
  }
}
```

## score.js

```js
'use strict';
// NOIR No.7 score: minimal and premium, 96 BPM, D minor → D major on the end card.
// A sparse keys/pad bed, one bell motif (stated in the hook, resolved on the end card), true silence before the
// reveal, a deep sub + soft boom when the bottle lands, glassy blips pitched up through the proofs.
// Every time comes from S / WORD_T / PROOFS in scenes.js, so picture and sound can't drift.

function score(A) {
  const CH = {                                   // voicings (MIDI), D3 = 50
    Dm9: [50, 53, 57, 60, 64],
    Bbmaj9: [46, 50, 53, 57, 60],
    Gm9: [43, 46, 50, 53, 57],
    A7sus: [45, 50, 52, 55, 59],
    Dmaj9: [50, 54, 57, 61, 64],
  };
  A.reverb(0.34);

  // ── Hook (bar 1): the motif A–D–F–E over a soft Dm9, a shimmer on the cap's shine ──
  A.keys(0, CH.Dm9, S.promise, 0.6);
  A.pad(0, CH.Dm9, S.promise + 0.3, 0.4, { cutoff: 900, attack: 0.05 });
  [[0, 69], [1, 74], [2, 77], [3.5, 76]].forEach(([b, n]) => A.bell(A.b(b), n, 1.6, 1));
  A.sparkle(0.2, 0.35);
  A.whoosh(RACK[0], RACK[1] - RACK[0] + 0.1, 0.35, false);          // the rack-focus push

  // ── Promise (bar 2): filtered Bbmaj9 opening up, one soft pluck per word, a riser into true silence ──
  A.pad(S.promise, CH.Bbmaj9, S.breath - S.promise, 0.5, { cutoff: 600, cutoffTo: 2600, attack: 0.3 });
  A.sub(S.promise, 34, S.breath - S.promise, 0.3);
  [62, 65, 69, 72, 74].forEach((n, i) => A.pluck(WORD_T[i], n, 0.5, 0.5, { pan: (i - 2) * 0.15 }));
  A.riser(S.promise + 0.6, S.breath - S.promise - 0.6, 0.55);
  A.silence(S.breath, S.reveal);

  // ── Reveal (bar 3): the bottle lands ──
  A.boom(S.reveal, 0.8);
  A.impact(S.reveal, 0.6);
  A.kick(S.reveal, 0.8, { f1: 40, len: 0.6 });
  A.sub(S.reveal, 38, beats(4), 0.45);
  A.bell(S.reveal, 74, 3, 0.8);
  A.sparkle(S.reveal + 0.1, 0.45);                                  // the shine sweep
  A.pad(S.reveal, CH.Dm9, bars(1), 0.8, { cutoff: 2400, attack: 0.02 });
  A.whoosh(S.glide, 0.75, 0.16);                                     // glide to the left third

  // ── Proofs (bars 4–5): a quiet pulse, Gm9 → Bbmaj9 → A7sus, one glassy blip per callout ──
  const pulseBars = Math.round((S.end - bars(3)) / A.bar);
  A.pattern(bars(3), 'x...............', (t) => A.kick(t, 0.3, { f1: 42, len: 0.45 }), pulseBars);
  A.pattern(bars(3), '..x...x...x...x.', (t) => A.shaker(t, 0.3), pulseBars);
  [[bars(3), 'Gm9', 43], [bars(4), 'Bbmaj9', 46], [bars(4) + beats(2), 'A7sus', 45]].forEach(([t, c, root], i, a) => {
    const d = (i < a.length - 1 ? a[i + 1][0] : S.end) - t;
    A.pad(t, CH[c], d + 0.2, 0.8, { cutoff: 2200 });
    A.keys(t, CH[c], d, 0.6);
    A.sub(t, root, d, 0.18);
  });
  PROOFS.forEach((p, i) => {
    A.blip(p.t, [81, 86, 88][i], 0.4, 0.2);
    A.pop(p.t + 0.04, 0.3, [1, 1.12, 1.26][i]);
  });

  // ── End card (bar 6): D major resolution, the motif resolves F#–E–D and rings out ──
  A.hit(S.end, 0.4);
  A.sparkle(S.end + 0.15, 0.45);
  A.pad(S.end, CH.Dmaj9, A.dur - S.end, 0.7, { cutoff: 3000, attack: 0.05 });
  A.keys(S.end, CH.Dmaj9, A.dur - S.end, 0.55);
  A.sub(S.end, 38, A.dur - S.end, 0.2);
  [[0, 78], [1, 76], [2, 74]].forEach(([b, n]) => A.bell(S.end + A.b(b), n, 2.4, 0.7));
  A.pop(S.end + 0.75, 0.3, 1.3);                                    // the CTA pill
}
```

