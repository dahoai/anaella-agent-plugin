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
