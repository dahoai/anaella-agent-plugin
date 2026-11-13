# Ledgerly — 15 s vertical launch (Bold colour)

**Logline:** freelancers stop chasing money; the invoices do it for them.
**Promise:** Invoices that chase themselves.
**Twist (lens: the problem, felt):** open on the chase itself: "STILL CHASING INVOICES?" slams in while red OVERDUE stickers pile up on a coral field. The answer flips the verb: the invoices chase *themselves*.
**Proofs:** 1 Send an invoice in 30 s (zoom to the + button, tap, "Invoice sent" toast) · 2 Automatic reminders (focus the Overdue pill, reminder cards stack up) · 3 Get paid by card or bank (tap "Turn on payments", PAID stamp slams on).

**Tempo:** 128 BPM, 8 bars (BAR 1.875 s, BEAT 0.469 s).
| scene | bars | time | bg |
|---|---|---|---|
| hook | 0–1 | 0.00 | coral |
| reveal (phone tilts in, impact) | 1–2 | 1.875 | indigo |
| f1 send | 2–3.5 | 3.75 | amber |
| f2 remind | 3.5–5 | 6.56 | paper |
| f3 paid (the drop) | 5–6.5 | 9.375 | green |
| end card | 6.5–8 | 12.19 | indigo |

**Signature move:** the same phone stays put while the whole world colour-cuts behind it on every beat-wipe; each cut pushes the screen into a new real UI element.
**End card:** logo on an off-white slab (logo untouched) + NEW sticker, "Stop chasing. Get paid.", DOWNLOAD FREE pill, ledgerly.app.
**Palette:** indigo #4f46e5 (logo) · coral #ff5b3a · amber #ffc53d · green #22c55e · ink #0f172a (logo wordmark) · paper #fffaf0.
**Type:** Boldonse slams, Bricolage Grotesque 700 support, Geist Mono 700 tags.
**Sound:** punchy electronic, A minor Am–F–C–G. Sparse hook (pluck motif A4–C5–E5–D5, hats, pops on stickers) → riser + 0.25 s silence → reveal impact+boom → half-time groove → f3 full four-on-the-floor → end: hit + sparkle, motif resolves on A, ring out.

## config.js

```js
// Film settings. The engine reads these before anything else.
window.FILM_CONFIG = {
  "title": "Ledgerly",
  "style": "bold",
  "format": "vertical",
  "w": 1080,
  "h": 1920,
  "fps": 30,
  "seconds": 15,
  "bpm": 128,
  "bg": "#ff5b3a",
  "grain": 0.04,
  "vignette": 0,
  "twos": false,
  "font": "Bricolage Grotesque"
};
```

## scenes.js

```js
'use strict';
// Ledgerly — "Invoices that chase themselves." 15 s vertical, Bold colour look.
// One phone, one screenshot; the world colour-cuts behind it on the beat, and every cut
// pushes the screen into a different real UI element.

// ---------- palette (logo brand + bold supports, flat) ----------
const C = {
  indigo: ASSET.logo.brand || '#4f46e5',   // the logo mark
  coral: '#ff5b3a',
  amber: '#ffc53d',
  green: '#22c55e',
  ink: '#0f172a',                          // the logo wordmark
  paper: '#fffaf0',
  red: '#dc2626',                          // the app's own "Overdue" red
};
const HARD = { x: 18 * U, y: 24 * U, color: C.ink };   // the one hard offset shadow, used everywhere

// ---------- timing on the 128 BPM grid (BAR 1.875 s, BEAT 0.469 s) ----------
const S = {
  hook: 0,
  reveal: bars(1),            // phone tilts in: the hero moment
  f1: bars(2),                // send in 30 s
  f2: bars(3.5),              // automatic reminders
  f3: bars(5),                // get paid: the drop
  end: bars(6.5),             // logo + CTA
};
const WIPE = 0.2;             // every cut is a wipe that lands on the downbeat

// beat-relative moments, shared with score.js
const HOOK_WORDS = [-0.12, beats(0.5), beats(1)];                              // STILL / CHASING / INVOICES?
const HOOK_PILLS = [0, 0, 0, 2, 2.25, 2.5, 2.75, 3].map(b => beats(b));        // three on frame 0, then 16ths
const REVEAL_WORDS = [0.12, beats(1), beats(1.5)];                             // Invoices that / CHASE / THEMSELVES.
const F1 = { tap: beats(2.5), toast: beats(3.5) };
const F2 = { focus: beats(1), cards: [beats(2), beats(3), beats(4)] };
const F3 = { pills: [beats(0.5), beats(1)], tap: beats(2), stamp: beats(3) };
const END = { logo: 0.05, line: beats(1), phone: beats(1.5), pill: beats(2), url: beats(2.5) };

const QC_AT = [0, S.reveal + 0.55, S.f1 + F1.tap + 0.05, S.f1 + F1.toast + 0.4,
  S.f2 + F2.cards[2] + 0.3, S.f3 + 0.12, S.f3 + F3.stamp + 0.4, S.end + 2.4];

// ---------- screenshot map (fractions of assets/screen.jpg) ----------
const UI = {
  plus:    { x: 0.435, y: 0.900, w: 0.130, h: 0.062 },   // the + (new invoice) button
  overdue: { x: 0.725, y: 0.765, w: 0.190, h: 0.030 },   // "Overdue" pill on Atlas Row
  payBtn:  { x: 0.090, y: 0.460, w: 0.415, h: 0.040 },   // "Turn on payments" button
};
// zoom regions must keep the screen's aspect (h = w for this screenshot) or the screen shows black
// past the image; w .75 keeps names + amounts readable and still pushes in 1.33x
const ZOOM = {
  f1: { x: 0.20, y: 0.25, w: 0.75, h: 0.75 },
  f2: { x: 0.20, y: 0.25, w: 0.75, h: 0.75 },
  f3: { x: 0.04, y: 0.22, w: 0.75, h: 0.75 },
};
const mid = r => [r.x + r.w / 2, r.y + r.h / 2];

// ---------- layout (vertical: 2-line headline on top, a big phone under it) ----------
const L = {
  line1: SAFE.y0 + 150 * U,               // headline baselines
  line2: SAFE.y0 + 290 * U,
  phoneW: 440 * U,                        // 2.06w ≈ 906 U ≈ 73% of SAFE.h
  phoneX: CX,
  maxW: SAFE.wc - 24 * U,                 // room for the hard text shadow
};
L.phoneTop = SAFE.y0 + 350 * U;
L.phoneY = L.phoneTop + L.phoneW * 1.03;

// ---------- building blocks ----------
const SLAM = { font: 'Boldonse', align: 'center', tracking: -0.03, maxW: L.maxW };
function slamLine(str, y, size, lt, t0, col) {
  const u = seg(lt, t0, t0 + 0.2);
  if (u <= 0) return;
  reveal(str, CX, y, size * U, u, Object.assign({}, SLAM, {
    mode: 'slam', by: 'char', stagger: 0.5, color: col,
    shadow: col === C.ink ? undefined : { color: C.ink, blur: 0, y: 9 * U },
  }));
}
function fillBg(col) { rect(0, 0, W, H, col); }

// the phone, always with the hard flat shadow (Bold colour: no blurs)
function ledgerPhone(x, y, w, o) {
  o = o || {};
  return device('phone', x, y, w, {
    screen: 'screen', theme: 'dark', shadow: 0, drop: HARD, rot: o.rot || 0, scale: o.scale, zoom: o.zoom,
  });
}
// the phone's resting state for a feature scene: bumps on the cut, pushes into a region
function featurePhone(lt, zoomRect, zoomAt) {
  const za = zoomAt === undefined ? 0.05 : zoomAt;
  const zu = eInOutExpo(seg(lt, za, za + 0.55));
  return ledgerPhone(L.phoneX, L.phoneY + snoise(lt * 0.6, 7) * 5 * U, L.phoneW, {
    scale: 1 + 0.035 * pulse(lt, 0, 0.35), zoom: Object.assign({ u: zu }, zoomRect),
  });
}
function glidePointer(dev, lt, target, tIn, tTap) {
  if (lt < tIn) return;
  const [tx, ty] = dev.pt(target[0], target[1]);
  const p = keys(lt, [[tIn, [tx + 260 * U, ty + 380 * U]], [tTap - 0.08, [tx, ty], eOutQuint]]);
  const press = pulse(lt, tTap, 0.22);
  tap(tx, ty, seg(lt, tTap, tTap + 0.45), { color: C.indigo, r: 90 * U });
  pointer(p[0], p[1], { scale: 1.25 - 0.12 * press, pressed: press, alpha: eOutQuint(seg(lt, tIn, tIn + 0.15)) });
}
// a flat overlay card in the app's colours (toast / notification)
function appCard(x, y, w, u, iconName, iconBg, title, sub) {
  if (u <= 0) return;
  const s = spring(u * 0.6, 3, 0.4), h = 128 * U;
  withT({ x, y, scale: s, rot: (1 - clamp(s)) * -0.12 }, () => {
    roundRect(-w / 2 + 12 * U, -h / 2 + 14 * U, w, h, 30 * U, C.ink);
    roundRect(-w / 2, -h / 2, w, h, 30 * U, '#ffffff');
    const ix = -w / 2 + 64 * U;
    circle(ix, 0, 38 * U, iconBg);
    icon(iconName, ix, 0, 40 * U, { color: '#ffffff', lw: 6 * U });
    text(title, ix + 62 * U, -6 * U, 42 * U, { color: C.ink, weight: 700 });
    text(sub, ix + 62 * U, 38 * U, 30 * U, { color: '#64748b', weight: 400 });
  });
}

// ---------- scenes (local time) ----------
function sceneHook(lt) {
  fillBg(C.coral);
  // the pile-up: red OVERDUE stickers pop in on 16ths around the question
  const spots = [[0.26, 0.17, -0.10], [0.74, 0.14, 0.08], [0.76, 0.72, -0.06], [0.24, 0.76, 0.09],
                 [0.52, 0.23, 0.04], [0.36, 0.70, -0.12], [0.22, 0.27, -0.14], [0.58, 0.80, 0.11]];
  spots.forEach(([fx, fy, r], i) => {
    const t0 = HOOK_PILLS[i];
    const s = t0 <= 0 ? 1 : spring(lt - t0, 3.2, 0.36);
    if (s <= 0) return;
    const jig = snoise(lt * 1.3 + i, 3 + i) * 0.04;
    withT({ x: W * fx, y: H * fy, rot: r + jig, scale: s }, () => {
      pill('OVERDUE', 8 * U, 10 * U, 44 * U, { bg: C.ink, fg: C.ink, font: 'Geist Mono', tracking: 0.08, icon: 'clock' });
      pill('OVERDUE', 0, 0, 44 * U, { bg: C.paper, fg: C.red, font: 'Geist Mono', tracking: 0.08, icon: 'clock' });
    });
  });
  const y0 = SAFE.y0 + SAFE.h * 0.4;
  slamLine('STILL', y0, 165, lt, HOOK_WORDS[0], C.paper);
  slamLine('CHASING', y0 + 235 * U, 165, lt, HOOK_WORDS[1], C.paper);
  slamLine('INVOICES?', y0 + 470 * U, 165, lt, HOOK_WORDS[2], C.ink);
}

function sceneReveal(lt) {
  fillBg(C.indigo);
  // burst behind the phone on the hit
  const hit = pulse(lt, 0, 0.6);
  burst(L.phoneX, L.phoneY, 280 * U, 1000 * U, 18, lt * 0.15, C.paper, 10 * U, 0.35 * hit + 0.08);
  // the phone tilts in from below
  const s = spring(lt + 0.04, 2.4, 0.42);
  ledgerPhone(L.phoneX, lerp(H + 700 * U, L.phoneY, s), L.phoneW, { rot: lerp(-0.16, 0, clamp(s)) + (s - 1) * 0.2 });
  text('Invoices that', CX, SAFE.y0 + 30 * U, 48 * U, {
    align: 'center', color: C.paper, alpha: eOutQuint(seg(lt, REVEAL_WORDS[0], REVEAL_WORDS[0] + 0.3)),
  });
  slamLine('CHASE', L.line1 + 20 * U, 92, lt, REVEAL_WORDS[1], C.amber);
  slamLine('THEMSELVES.', L.line2 + 8 * U, 92, lt, REVEAL_WORDS[2], C.paper);
}

function sceneSend(lt) {
  fillBg(C.amber);
  const dev = featurePhone(lt, ZOOM.f1);
  uiFocus(dev, UI.plus, eOutQuint(seg(lt, 0.5, 0.8)), { color: C.indigo, dim: 0.4 });
  glidePointer(dev, lt, mid(UI.plus), 0.55, F1.tap);
  appCard(L.phoneX + 30 * U, L.phoneTop + 170 * U, 580 * U, seg(lt, F1.toast, F1.toast + 1), 'check', C.green, 'Invoice sent', 'Juniper Labs · $2,400.00');
  slamLine('INVOICE IN', L.line1, 96, lt, 0.02, C.ink);
  slamLine('30 SECONDS', L.line2, 96, lt, beats(0.5), C.paper);
}

function sceneRemind(lt) {
  fillBg(C.paper);
  const dev = featurePhone(lt, ZOOM.f2);
  uiFocus(dev, UI.overdue, eOutQuint(seg(lt, F2.focus, F2.focus + 0.3)), { color: C.coral, dim: 0.3 });
  // reminders stack up on their own, one per beat
  F2.cards.forEach((t0, i) => {
    appCard(L.phoneX + (i % 2 ? -22 : 22) * U, L.phoneTop + 120 * U + i * 150 * U, 600 * U, seg(lt, t0, t0 + 1),
      'bell', C.indigo, 'Reminder sent', 'Atlas Row Architects');
  });
  slamLine('REMINDERS', L.line1, 96, lt, 0.02, C.ink);
  slamLine('ON AUTOPILOT', L.line2, 96, lt, beats(0.5), C.indigo);
}

function scenePaid(lt) {
  fillBg(C.green);
  const dev = featurePhone(lt, ZOOM.f3, 0);
  uiFocus(dev, UI.payBtn, eOutQuint(seg(lt, beats(1.25), beats(1.25) + 0.3)), { color: C.ink, dim: 0.35 });
  glidePointer(dev, lt, mid(UI.payBtn), beats(1), F3.tap);
  // the stamp
  if (lt >= F3.stamp) {
    const s = spring(lt - F3.stamp, 3.4, 0.34);
    withT({ x: L.phoneX + 150 * U, y: L.phoneY + 200 * U, scale: 0.4 + 0.6 * s, rot: -0.18 }, () => {
      badge('PAID', 12 * U, 14 * U, 160 * U, { bg: C.ink, fg: C.ink, spin: 0, points: 14, font: 'Boldonse', size: 54 * U });
      badge('PAID', 0, 0, 160 * U, { bg: C.indigo, fg: C.paper, spin: lt * 0.2, points: 14, font: 'Boldonse', size: 54 * U });
    });
  }
  slamLine('GET PAID', L.line1, 110, lt, -0.02, C.paper);
  const py = L.line2 - 34 * U;
  const pu = F3.pills.map(t0 => seg(lt, t0, t0 + 0.35));
  pill('CARD', CX - 150 * U, py, 52 * U, { bg: C.ink, fg: C.paper, u: pu[0], font: 'Geist Mono', tracking: 0.08 });
  text('or', CX, py + 18 * U, 52 * U, { align: 'center', color: C.ink, alpha: pu[1] });
  pill('BANK', CX + 150 * U, py, 52 * U, { bg: C.ink, fg: C.paper, u: pu[1], font: 'Geist Mono', tracking: 0.08 });
}

function sceneEnd(lt) {
  fillBg(C.indigo);
  // logo on its plate (untouched), the promise, the phone, the ask
  const logoY = SAFE.y0 + 95 * U, logoW = 540 * U;
  const s = spring(lt - END.logo, 2.8, 0.42);
  withT({ x: CX, y: logoY, scale: 0.6 + 0.4 * s, rot: (1 - clamp(s)) * -0.08 }, () => {
    logo('logo', 0, 0, logoW, { u: seg(lt, END.logo, END.logo + 0.5), mode: 'rise', plate: C.paper });
  });
  badge('NEW', CX + logoW / 2 + 20 * U, logoY - 80 * U, 78 * U,
    { bg: C.amber, fg: C.ink, u: seg(lt, END.line, END.line + 0.35), spin: lt * 0.25, font: 'Geist Mono', size: 30 * U });
  reveal('Stop chasing. Get paid.', CX, logoY + 230 * U, 72 * U, seg(lt, END.line, END.line + 0.35),
    { mode: 'rise', by: 'word', align: 'center', color: C.paper, weight: 700, tracking: -0.02, maxW: L.maxW });
  // the home screen rises in between the promise and the ask
  const ps = spring(lt - END.phone, 2.6, 0.5), pw = 310 * U;
  const phoneCY = logoY + 290 * U + pw * 1.03;
  if (ps > 0) ledgerPhone(CX, lerp(H + 400 * U, phoneCY, ps), pw, { rot: (1 - clamp(ps)) * 0.12 });
  const ctaY = SAFE.y1 - 125 * U;
  pill('DOWNLOAD FREE', CX, ctaY, 50 * U, { bg: C.ink, fg: C.paper, u: seg(lt, END.pill, END.pill + 0.4), icon: 'arrowDown', tracking: 0.06 });
  text('ledgerly.app', CX, SAFE.y1 - 12 * U, 44 * U, {
    align: 'center', font: 'Geist Mono', weight: 700, color: C.paper, tracking: 0.04,
    alpha: eOutQuint(seg(lt, END.url, END.url + 0.3)),
  });
}

// ---------- the edit ----------
const SCENE_LIST = [
  [S.hook, sceneHook, C.coral], [S.reveal, sceneReveal, C.indigo], [S.f1, sceneSend, C.amber],
  [S.f2, sceneRemind, C.paper], [S.f3, scenePaid, C.green], [S.end, sceneEnd, C.indigo],
];
const WIPE_DIRS = ['up', 'left', 'right', 'left', 'up'];

function frame(t) {
  let k = 0;
  while (k + 1 < SCENE_LIST.length && t >= SCENE_LIST[k + 1][0]) k++;
  const [t0, drawScene] = SCENE_LIST[k];
  const hookShake = t < S.reveal ? HOOK_WORDS.reduce((a, w) => a + pulse(t, w + 0.18, 0.2), 0) : 0;
  const shake = 10 * U * (hookShake + pulse(t, S.reveal, 0.3) + 1.6 * pulse(t, S.f3, 0.35) + pulse(t, S.f3 + F3.stamp, 0.25));
  camera({ x: CX, y: CY, zoom: 1, shake, seed: 3 }, () => drawScene(t - t0));
  // colour wipe into the next scene, landing exactly on the cut
  if (k + 1 < SCENE_LIST.length) {
    const next = SCENE_LIST[k + 1];
    const wu = seg(t, next[0] - WIPE, next[0]);
    if (wu > 0) wipe(eInExpo(wu), WIPE_DIRS[k], next[2]);
  }
  flash(pulse(t, S.f3, 0.16) * 0.6, C.paper);
}
```

## score.js

```js
'use strict';
// Punchy electronic, 128 BPM, A minor (Am–F–C–G). Every time comes from S / HOOK_* / F1–F3 / END in scenes.js.
function score(A) {
  const R = S.reveal, D = S.f3, E = S.end;
  const PROG = ['Am', 'F', 'C', 'G'];
  const MOTIF = [[0, 'A4'], [0.75, 'C5'], [1.5, 'E5'], [2.5, 'D5']];

  // ---- hook: sparse, filtered, the motif on a pluck; every slam and sticker has a sound
  A.pad(0, A.chord('Am', 3), R, 0.45, { cutoff: 900 });
  A.pattern(0, '..x...x...x.....', (t) => A.hat(t, 0.45), 1);
  MOTIF.forEach(([b, n]) => A.pluck(A.b(b), n, 0.3, 0.9));
  HOOK_WORDS.forEach((w, i) => { A.hit(Math.max(0, w + 0.14), 0.75 + i * 0.1); A.kick(Math.max(0, w + 0.14), 0.7); });
  HOOK_PILLS.slice(2).forEach((t, i) => A.pop(t, 0.6, 1 + i * 0.09));
  A.riser(A.b(1), R - A.b(1) - 0.25, 0.8);
  A.silence(R - 0.25, R);                                        // the breath before the reveal

  // ---- reveal: the hero hit, then a half-time groove
  A.impact(R, 1); A.boom(R, 1); A.hit(R, 0.8); A.crash(R, 0.7);
  A.whoosh(R - 0.05, 0.5, 0.6);
  REVEAL_WORDS.slice(1).forEach((w, i) => A.hit(R + w + 0.12, 0.6 + i * 0.1));
  A.sweep(R, D, 1600, 9000);
  const midBars = (D - R) / A.bar;
  A.pattern(R, 'x.......x.......', (t) => A.kick(t, 0.85), midBars);
  A.pattern(R, '....x.......x...', (t) => A.snare(t, 0.5), midBars);
  A.pattern(R, '..x...x...x...x.', (t) => A.hat(t, 0.45), midBars);
  A.progression(R, PROG, 4, (n, t) => { A.bass(t, n[0] - 12, A.b(4) - 0.05, 0.8, { cutoff: 900 }); A.pad(t, n, A.b(4), 0.45); }, 3);

  // ---- colour cuts: a swipe into each wipe
  [S.f1, S.f2, S.f3, E].forEach((c, i) => A.swipe(c - 0.2, 0.4, i % 2 ? 'left' : 'right'));

  // ---- f1: send
  A.pop(S.f1 + 0.5, 0.5, 1.2);                                   // focus ring
  A.click(S.f1 + F1.tap, 1);
  A.notify(S.f1 + F1.toast, 0.8);

  // ---- f2: reminders stack up, pitched up
  A.pop(S.f2 + F2.focus, 0.6, 1.1);
  F2.cards.forEach((t, i) => { A.pop(S.f2 + t, 0.7, 1.15 + i * 0.12); A.bellFx(S.f2 + t + 0.02, ['E5', 'G5', 'A5'][i], 0.4, 0.4); });
  A.riser(D - A.b(2), A.b(2) - 0.12, 0.6);
  A.silence(D - 0.12, D);

  // ---- f3: the drop, full four-on-the-floor
  A.impact(D, 0.85); A.crash(D, 0.8);
  // 1.5 bars: step with A.every so nothing spills into the end card
  A.every(D, E - 0.01, A.beat, (t, i) => { A.kick(t, 0.95); if (i % 2) A.clap(t, 0.55); A.hat(t + A.beat / 2, 0.55); });
  A.progression(D, ['F', 'C', 'G', 'Am', 'F', 'C'], 1, (n, t) => { A.bass(t, n[0] - 12, A.b(1) - 0.03, 0.9); }, 3);
  A.pad(D, A.chord('F', 3), A.b(2), 0.5); A.pad(D + A.b(2), A.chord('C', 3), A.b(2), 0.5); A.pad(D + A.b(4), A.chord('G', 3), A.b(2), 0.5);
  F3.pills.forEach((t, i) => A.pop(D + t, 0.4, 1.2 + i * 0.12));
  A.click(D + F3.tap, 1);
  A.hit(D + F3.stamp, 0.8); A.cash(D + F3.stamp + 0.05, 0.9);
  A.level(D, 0.85, 0.05);

  // ---- end card: logo hit, motif resolves on A, ring out
  A.level(E, 0.9, 0.05);
  A.hit(E + END.logo, 0.5); A.sparkle(E + END.logo + 0.1, 0.6);
  A.kick(E, 0.55); A.sub(E, 'A1', A.dur - E, 0.7);
  A.pad(E, A.chord('Am', 3), A.dur - E, 0.55, { cutoff: 2600, cutoffTo: 1200 });
  A.pop(E + END.line, 0.5, 1.2); A.whoosh(E + END.phone - 0.1, 0.45, 0.5); A.pop(E + END.pill, 0.7, 1.4);
  MOTIF.slice(0, 3).forEach(([b, n]) => A.pluck(E + END.line + A.b(b), n, 0.35, 0.8));
  A.bell(E + END.url, 'A5', A.dur - E - END.url, 0.6);
}
```

