'use strict';
// Ledgerly 2.0 — Tech dark reference film. 16:9, 30 s, 120 BPM (BAR = 2 s, BEAT = 0.5 s).
// Idea: real fragments of the Ledgerly UI float in dark space (the freelancer's mess), then an
// empty browser frame materialises and every fragment snaps into its exact slot: the UI
// assembles itself. From there one continuous browser pans between three real features,
// the phone joins it for the proof, and the film lands on logo + line + CTA.

// ---------------------------------------------------------------- palette
const C = {
  top: '#0b1120', bot: '#05080f',            // space gradient
  fg: '#e8edf7', mute: '#7c86a2',            // type
  acc: '#4f46e5',                            // brand indigo (ASSET.logo.colors[1]; [0] is the navy wordmark)
  accHi: '#8b93ff',                          // lighter indigo for rings, tags and glows on dark
  ok: '#2fe07a', late: '#f05252',            // success / overdue
  card: '#0f172a', ghost: '#0b1120',         // toast cards / empty screen before the build
};

// ---------------------------------------------------------------- timing (on the beat grid; score.js reads S)
const S = {
  hook: 0,              // "Who owes you what?"
  when: beats(5),       // 2.5  "When does it land?"
  guess: beats(9),      // 4.5  "Stop guessing."  (drums in)
  converge: beats(14),  // 7.0  frame draws on, fragments fly home (riser)
  reveal: beats(18),    // 9.0  SNAP: the UI is assembled (drop)
  title: beats(21),     // 10.5 device slides left, logo + promise
  f1: beats(26),        // 13.0 live forecast
  f2: beats(33),        // 16.5 one-click invoices
  click: beats(36),     // 18.0 the click
  f3: beats(40),        // 20.0 automatic reminders
  proof: beats(47),     // 23.5 $12,480.00 + phone joins
  cash: beats(51),      // 25.5 counter lands
  end: beats(54),       // 27.0 end card
};
const QC_AT = [S.converge + 1.3, S.reveal + 0.15, S.title + 1.8, S.f1 + 2.2, S.click + 0.4, S.f3 + 2.0, S.cash + 0.3, DUR - 0.2];

// ---------------------------------------------------------------- UI regions (fractions of assets/screen.jpg, read off the screenshot)
const R = {
  outstanding: { x: .190, y: .175, w: .255, h: .147 },
  paid:        { x: .456, y: .175, w: .257, h: .147 },
  overdue:     { x: .724, y: .175, w: .257, h: .147 },
  chart:       { x: .190, y: .342, w: .543, h: .320 },
  plot:        { x: .231, y: .452, w: .481, h: .162 },   // chart plot area (for the scan line)
  expected:    { x: .745, y: .342, w: .235, h: .320 },
  newInv:      { x: .882, y: .112, w: .098, h: .045 },   // the real "New invoice" button
  lateStrip:   { x: .430, y: .882, w: .550, h: .056 },   // Atlas Row row: INV-0139 … Overdue … $1,950.00
  lateFocus:   { x: .425, y: .878, w: .385, h: .063 },
  phoneBal:    { x: .035, y: .122, w: .620, h: .132 },   // assets/screen2.jpg: Outstanding balance $12,480.00
};
const NEW_INV_PT = [.931, .134];
const AUG_PT = [.668, .481];                             // the highlighted August point on the chart

// Zoom windows inside the browser screen ([x, y, w, h] fractions; w = h keeps the screen's aspect).
const Z = {
  full:  [0, 0, 1, 1],
  chart: [.17, .20, .59, .59],
  inv:   [.56, 0, .44, .44],
  late:  [.40, .58, .42, .42],
};

// ---------------------------------------------------------------- layout (landscape)
const DW = W * 0.56;                                   // browser width while a feature is on
const POSE = {
  reveal: [CX, CY + 20 * U, W * 0.62],
  left:   [SAFE.x0 + DW / 2, CY + 10 * U, DW],
  right:  [SAFE.x1 - DW / 2, CY + 10 * U, DW],
  proof:  [SAFE.x1 - W * 0.145 - W * 0.25 + 100 * U - 10 * U, CY - 10 * U, W * 0.50],   // right edge tucked 100 U behind the phone
};
const TEXT_R = SAFE.x0 + DW + 80 * U;                   // words column when the device is left
const TEXT_L = SAFE.x0;                                // words column when the device is right
const TEXT_W = SAFE.w - DW - 80 * U;
const PHONE_W = W * 0.145;
// The browser's default height (0.625 w) leaves a 1.72:1 screen under its 0.045 w bar, which would
// pillarbox a 16:10 screenshot. Size the frame so the screen matches the screenshot exactly.
const BROWSER_H = (w) => w * (1 / ASSET.screen.aspect + 0.045);

// Hook fragments: crops of the real screenshot, floating around a clear centre for the words.
const FRAGS = [
  { r: R.expected,    at: [.11, .66], w: 300, rot: 0.08,  z: .70 },
  { r: R.chart,       at: [.50, .15], w: 560, rot: -0.03, z: .75 },
  { r: R.newInv,      at: [.125, .41], w: 230, rot: -0.06, z: .85 },
  { r: R.paid,        at: [.81, .23], w: 420, rot: 0.06,  z: .90 },
  { r: R.lateStrip,   at: [.42, .86], w: 780, rot: 0.025, z: .95, late: true },
  { r: R.outstanding, at: [.19, .25], w: 460, rot: -0.07, z: 1.0 },
  { r: R.overdue,     at: [.80, .74], w: 450, rot: -0.05, z: 1.0, late: true },
];
const FRAG_IN = FRAGS.map((f, i) => -0.45 + i * 0.125);    // pop-ins on 16ths: four already in at frame 0, the rest pop (score pops them too)

// ---------------------------------------------------------------- small helpers
function ldgTag(str, x, y, t, t0, t1, o = {}) {
  const a = inout(t, t0, t1, 0.3, 0.3);
  if (a <= 0) return;
  text(str, x + (1 - eOutExpo(seg(t, t0, t0 + 0.4))) * 20 * U, y, 27 * U,
    { font: 'Geist Mono', weight: 700, color: C.accHi, tracking: 0.14, alpha: a, ...o });
}

function ldgHead(str, x, y, size, t, t0, t1, o = {}) {
  if (t < t0 - 0.4 || t > t1) return;
  const out = eInCubic(seg(t, t1 - 0.3, t1));
  reveal(str, x, y - out * 18 * U, size, seg(t, t0, t0 + 0.55), {
    by: 'word', mode: 'rise', stagger: 0.5, ease: eOutExpo, tracking: -0.02,
    color: C.fg, lh: 1.04, ...o, alpha: (o.alpha ?? 1) * (1 - out),
  });
}

// The logo keeps its indigo icon; only the navy wordmark is flat-tinted white so it reads on dark.
const LOGO_SPLIT = 0.232;                              // icon ends ~21% of the trimmed logo width
function ldgLogo(x, y, w, o = {}) {
  const h = w / ASSET.logo.aspect, x0 = x - w / 2, cut = x0 + w * LOGO_SPLIT;
  ctx.save(); ctx.beginPath(); ctx.rect(x0 - w, y - 3 * h, cut - (x0 - w), 6 * h); ctx.clip();
  logo('logo', x, y, w, o);
  ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(cut, y - 3 * h, 2 * w, 6 * h); ctx.clip();
  const box = logo('logo', x, y, w, { ...o, tint: '#ffffff' });
  ctx.restore();
  return box;
}

// A crop of the screenshot as a floating card, centred at (x, y), w wide.
function ldgCrop(r, x, y, w, rot, alpha, dim = 0) {
  const sw = r.w * ASSET.screen.w, sh = r.h * ASSET.screen.h, h = w * sh / sw;
  withT({ x, y, rot, alpha }, () => {
    const pts = rrect(-w / 2, -h / 2, w, h, Math.min(16 * U, h * 0.3));
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 40 * U; ctx.shadowOffsetY = 18 * U;
    fillPts(pts, '#f5f6fa');
    ctx.restore();
    ctx.save(); tracePath(pts, true); ctx.clip();
    ctx.drawImage(IMG.screen, r.x * ASSET.screen.w, r.y * ASSET.screen.h, sw, sh, -w / 2, -h / 2, w, h);
    if (dim > 0) rect(-w / 2, -h / 2, w, h, rgba(C.bot, dim));
    ctx.restore();
    strokePts(pts, rgba('#ffffff', 0.12), 1.5 * U, true);
  });
  return { w, h };
}

function ldgToast(x, y, w, u, iconName, iconCol, title, sub) {
  if (u <= 0) return;
  const h = sub ? 96 * U : 76 * U, s = 0.85 + 0.15 * spring(u * 0.9, 2.4, 0.45);
  withT({ x, y: y + (1 - eOutExpo(u)) * 24 * U, scale: s, alpha: clamp(u * 3) }, () => {
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 36 * U; ctx.shadowOffsetY = 14 * U;
    roundRect(-w / 2, -h / 2, w, h, 20 * U, C.card);
    ctx.restore();
    roundRect(-w / 2, -h / 2, w, h, 20 * U, null, rgba(C.accHi, 0.45), 1.5 * U);
    const ix = -w / 2 + 44 * U;
    circle(ix, 0, 22 * U, rgba(iconCol, 0.18));
    icon(iconName, ix, 0, 24 * U, { color: iconCol, lw: 3 * U, u: seg(u, 0.25, 0.8) });
    const tx = ix + 40 * U;
    text(title, tx, sub ? -6 * U : 9 * U, 27 * U, { color: C.fg, weight: 700, tracking: -0.01 });
    if (sub) text(sub, tx, 28 * U, 19 * U, { font: 'Geist Mono', weight: 400, color: C.mute });
  });
}

// ---------------------------------------------------------------- space
function ldgSpace(t, glowAt) {
  studio({ top: C.top, bottom: C.bot });
  const g = 96 * U, drift = (t * 6 * U) % g;
  for (let i = -11; i <= 11; i++) line(CX + i * g, 0, CX + i * g, H, rgba(C.fg, 0.045), 1.2 * U);
  for (let j = -1; j < 13; j++) line(0, j * g + drift, W, j * g + drift, rgba(C.fg, 0.045), 1.2 * U);
  if (glowAt) glow(glowAt[0], glowAt[1], glowAt[2], C.acc, glowAt[3]);
}

// ---------------------------------------------------------------- hook: floating UI fragments
function ldgFragPose(f, i, t) {
  const tense = seg(t, S.guess, S.converge);                        // drift gets restless before the build
  const amp = (18 + 22 * tense) * U * f.z, fq = 0.18 + 0.25 * tense;
  const x = f.at[0] * W + snoise(t * fq, 11 + i) * amp;
  const y = f.at[1] * H + snoise(t * fq, 41 + i) * amp + (1 - f.z) * t * 4 * U;
  const rot = f.rot + snoise(t * fq * 0.8, 71 + i) * 0.025 * (1 + tense);
  return { x, y, w: f.w * U * (1 + 0.012 * t * f.z), rot };
}

function ldgFragments(t, dev) {
  if (t > S.reveal + 0.3) return;
  FRAGS.forEach((f, i) => {
    const pop = spring(t - FRAG_IN[i], 2.4, 0.5);
    let p = ldgFragPose(f, i, t);
    let dim = 0.55 * (1 - f.z) / 0.3, a = clamp(pop * 1.6);
    if (dev && t >= S.converge) {                                   // fly home into the browser
      const u = eInOutExpo(seg(t, S.converge + 0.25 + i * 0.13, S.reveal));
      const r = dev.rect(f.r), tx = r.x + r.w / 2, ty = r.y + r.h / 2;
      p = { x: lerp(p.x, tx, u), y: lerp(p.y, ty, u), w: lerp(p.w, r.w, u), rot: lerp(p.rot, 0, u) };
      dim *= 1 - u;
      a *= 1 - seg(t, S.reveal + 0.05, S.reveal + 0.3);
    }
    if (a <= 0.01) return;
    const scale = t < S.converge ? 0.8 + 0.2 * pop : 1;
    const box = ldgCrop(f.r, p.x, p.y, p.w * scale, p.rot, a, dim);
    if (f.late && t > S.guess - 0.2 && t < S.converge + 0.6) {        // the overdue ones throb red on the beat
      const k = pulse(t, S.guess + Math.floor((t - S.guess) / BEAT) * BEAT, 0.45) * inout(t, S.guess, S.converge + 0.6, 0.2, 0.4);
      withT({ x: p.x, y: p.y, rot: p.rot }, () => {
        const pts = rrect(-box.w / 2 - 6 * U, -box.h / 2 - 6 * U, box.w + 12 * U, box.h + 12 * U, 20 * U);
        strokePts(pts, C.late, 3 * U, true, 0.35 + 0.65 * k);
        glow(0, 0, box.w * 0.55, C.late, 0.18 * k);
      });
    }
  });
}

function sceneHook(t) {
  // a dark pool behind the words keeps them clean over the fragments
  ctx.fillStyle = radGrad(CX, CY, 0, 620 * U, [[0, rgba(C.bot, 0.82)], [0.6, rgba(C.bot, 0.5)], [1, rgba(C.bot, 0)]]);
  ctx.fillRect(0, 0, W, H);
  const o = { align: 'center', base: 'middle' };
  ldgHead('Who owes you what?', CX, CY, 124 * U, t, -0.45, S.when, o);
  ldgHead('When does it land?', CX, CY, 124 * U, t, S.when, S.guess, o);
  ldgHead('Stop guessing.', CX, CY, 150 * U, t, S.guess, S.converge + 0.15, { ...o, colors: [C.fg, C.accHi] });
}

// ---------------------------------------------------------------- the browser (one continuous device from the build to the end card)
function ldgPose(t) {
  return keys(t, [
    [S.converge, POSE.reveal], [S.title - 0.1, POSE.reveal],
    [S.title + 0.6, POSE.left, eInOutExpo], [S.f2, POSE.left],
    [S.f2 + 0.7, POSE.right, eInOutExpo], [S.f3, POSE.right],
    [S.f3 + 0.7, POSE.left, eInOutExpo], [S.proof, POSE.left],
    [S.proof + 0.7, POSE.proof, eInOutExpo],
  ]);
}
function ldgZoom(t) {
  return keys(t, [
    [S.f1, Z.full], [S.f1 + 0.8, Z.chart, eInOutExpo], [S.f2, Z.chart],
    [S.f2 + 0.7, Z.inv, eInOutExpo], [S.f3, Z.inv],
    [S.f3 + 0.7, Z.late, eInOutExpo], [S.proof, Z.late],
    [S.proof + 0.7, Z.full, eInOutExpo],
  ]);
}

function ldgBrowser(t) {
  const [x, y, w] = ldgPose(t), z = ldgZoom(t);
  const built = t >= S.reveal;
  const rise = eOutExpo(seg(t, S.converge, S.converge + 1.1));
  const exit = eInExpo(seg(t, S.end, S.end + 0.5));
  glow(x, y, w * 0.7, C.acc, (built ? 0.3 : 0.18 * rise) * (1 - exit));
  return device('browser', x, y + (1 - rise) * 90 * U + exit * 70 * U, w * (1 - 0.06 * exit), {
    h: BROWSER_H(w), screen: built ? 'screen' : C.ghost, url: 'ledgerly.app', theme: 'dark',
    alpha: rise * (1 - exit), rot: (1 - rise) * 0.04, shadow: 0.7,
    zoom: { x: z[0], y: z[1], w: z[2], h: z[3], u: 1 },
  });
}

// ---------------------------------------------------------------- reveal + title
function sceneTitle(t, dev) {
  const lt = t - S.title, x = TEXT_R;
  if (lt < -0.2 || t > S.f1 + 0.2) return;
  const a = inout(t, S.title + 0.35, S.f1, 0.35, 0.3);
  const lw = 330 * U, lu = eOutExpo(seg(lt, 0.35, 1.0));
  ldgLogo(x + lw / 2, CY - 150 * U, lw, { u: lu, mode: 'rise', alpha: a });
  pill('2.0', x + lw + 58 * U, CY - 150 * U, 26 * U, { bg: C.acc, fg: '#ffffff', u: seg(lt, 0.6, 1.0), font: 'Geist Mono', weight: 700, alpha: a });
  ldgHead('Cash flow, before it happens.', x, CY - 20 * U, 84 * U, t, S.title + 0.75, S.f1 + 0.05, { wrap: true, maxW: TEXT_W, colors: [C.fg, C.fg, C.accHi, C.fg, C.fg] });
}

// ---------------------------------------------------------------- features
function ldgFeatureCopy(t, t0, t1, tag, head, x, colors) {
  ldgTag(tag, x, CY - 110 * U, t, t0 + 0.55, t1);
  ldgHead(head, x, CY - 10 * U, 80 * U, t, t0 + 0.7, t1, { wrap: true, maxW: TEXT_W, colors });
}

function sceneForecast(t, dev) {
  const lt = t - S.f1;
  if (lt < 0 || t > S.f2 + 0.3) return;
  const out = 1 - seg(t, S.f2, S.f2 + 0.3);
  uiFocus(dev, R.chart, eOutExpo(seg(lt, 0.8, 1.3)) * out, { color: C.accHi, dim: 0.45 });
  // scan line sweeps the forecast, then the August point pings
  const pr = dev.rect(R.plot), su = eInOutSine(seg(lt, 1.2, 2.7)), sa = inout(lt, 1.2, 3.1, 0.2, 0.4) * out;
  if (sa > 0) {
    const sx = pr.x + pr.w * su;
    ctx.save(); ctx.beginPath(); ctx.rect(pr.x, pr.y - 20 * U, pr.w, pr.h + 40 * U); ctx.clip();
    ctx.fillStyle = linGrad(sx - 160 * U, 0, sx, 0, [[0, rgba(C.acc, 0)], [1, rgba(C.acc, 0.28 * sa)]]);
    ctx.fillRect(sx - 160 * U, pr.y - 20 * U, 160 * U, pr.h + 40 * U);
    line(sx, pr.y - 20 * U, sx, pr.y + pr.h + 20 * U, rgba(C.accHi, sa), 3 * U);
    ctx.restore();
  }
  const [px, py] = dev.pt(AUG_PT[0], AUG_PT[1]), pk = seg(lt, 2.5, 3.3);
  if (pk > 0 && out > 0) {
    ringStroke(px, py, (14 + 46 * eOutCubic(pk)) * U, rgba(C.accHi, (1 - pk) * out), 3 * U);
    glow(px, py, 60 * U, C.acc, 0.5 * (1 - pk) * out);
  }
  ldgFeatureCopy(t, S.f1, S.f2 + 0.05, '01 · LIVE FORECAST', 'Your cash, forecast live.', TEXT_R, [C.fg, C.fg, C.accHi, C.fg]);
}

function sceneInvoice(t, dev) {
  const lt = t - S.f2, ck = S.click - S.f2;
  if (lt < 0 || t > S.f3 + 0.3) return;
  const out = 1 - seg(t, S.f3, S.f3 + 0.3);
  uiFocus(dev, R.newInv, eOutExpo(seg(lt, 0.7, 1.1)) * out, { color: C.accHi, dim: 0.35, pad: 10 * U });
  // the pointer glides in, lands on the real button and clicks on the beat
  const to = dev.pt(NEW_INV_PT[0], NEW_INV_PT[1]), from = dev.pt(0.74, 0.40);
  const pp = keys(lt, [[0.6, from], [ck - 0.15, to, eInOutCubic]]);
  const press = pulse(t, S.click, 0.22);
  const pa = inout(lt, 0.6, 3.3, 0.2, 0.3) * out;
  tap(to[0], to[1], seg(t, S.click, S.click + 0.45), { color: C.accHi });
  if (pa > 0) pointer(pp[0], pp[1], { pressed: press, alpha: pa });
  const [bx] = dev.pt(0.98, 0), by = dev.pt(0, 0.2)[1];
  ldgToast(bx - 190 * U, by + 60 * U, 380 * U, seg(t, S.click + 0.2, S.click + 0.7) * out, 'check', C.ok, 'Invoice ready to send', null);
  ldgFeatureCopy(t, S.f2, S.f3 + 0.05, '02 · ONE-CLICK INVOICES', 'One click. Invoiced.', TEXT_L, [C.fg, C.fg, C.accHi]);
}

function sceneReminder(t, dev) {
  const lt = t - S.f3;
  if (lt < 0 || t > S.proof + 0.3) return;
  const out = 1 - seg(t, S.proof, S.proof + 0.3);
  uiFocus(dev, R.lateFocus, eOutExpo(seg(lt, 0.8, 1.2)) * out, { color: C.late, dim: 0.45, pad: 6 * U });
  const r = dev.rect(R.lateFocus);
  ldgToast(r.x + r.w / 2, r.y - 90 * U, 440 * U, seg(lt, 1.5, 2.0) * out, 'bell', C.ok, 'Reminder sent', 'Atlas Row Architects · $1,950');
  ldgFeatureCopy(t, S.f3, S.proof + 0.05, '03 · AUTO REMINDERS', 'Overdue? Chased for you.', TEXT_R, [C.late, C.fg, C.fg, C.fg]);
}

// ---------------------------------------------------------------- proof: the phone joins, the number lands
function sceneProof(t, dev) {
  const lt = t - S.proof;
  if (lt < 0) return;
  const exit = eInExpo(seg(t, S.end, S.end + 0.5));
  const pu = spring(lt - 0.5, 1.9, 0.55);
  const px = SAFE.x1 - PHONE_W / 2 - 10 * U + (1 - pu) * 420 * U;
  const py = CY + 110 * U + (1 - pu) * 140 * U + exit * 90 * U;
  if (pu > 0.001) {
    const ph = device('phone', px, py, PHONE_W, { screen: 'screen2', theme: 'dark', shadow: 0.8, rot: (1 - pu) * 0.12, alpha: clamp(pu * 2) * (1 - exit) });
    uiFocus(ph, R.phoneBal, eOutExpo(seg(lt, 1.4, 1.8)) * (1 - exit), { color: C.accHi, dim: 0.4, pad: 4 * U });
  }
  uiFocus(dev, R.outstanding, eOutExpo(seg(lt, 1.1, 1.5)) * (1 - exit), { color: C.accHi, dim: 0.4 });

  const x = TEXT_L, a = 1 - seg(t, S.end - 0.05, S.end + 0.25);
  ldgTag('OUTSTANDING', x, CY - 110 * U, t, S.proof + 0.6, S.end + 0.25);
  const cu = eOutQuart(seg(t, S.proof + 0.9, S.cash));
  if (cu > 0 && a > 0) {
    const v = 12480 * cu, whole = Math.floor(v), cents = Math.floor((v - whole) * 100 + 1e-6);
    const mo = { weight: 700, tabular: true, tracking: -0.02, alpha: a * clamp(cu * 5) };
    const land = pulse(t, S.cash, 0.35);
    const m = text('$' + fmtNum(whole), x, CY + 10 * U, 96 * U * (1 + 0.04 * land), { ...mo, color: C.fg });
    text('.' + String(cents).padStart(2, '0'), x + m.w + 2 * U, CY + 10 * U, 50 * U, { ...mo, color: C.mute });
  }
  ldgHead('Tracked to the cent.', x, CY + 90 * U, 44 * U, t, S.cash - 0.3, S.end + 0.25, { weight: 400, color: C.mute, tracking: 0 });
  ldgTag('WEB + MOBILE', x, CY + 170 * U, t, S.proof + 1.0, S.end + 0.25, { color: C.mute, weight: 400 });
}

// ---------------------------------------------------------------- end card
function sceneEnd(t) {
  const lt = t - S.end;
  if (lt < 0) return;
  glow(CX, CY - 40 * U, 700 * U, C.acc, 0.22 * eOutCubic(seg(lt, 0.2, 1.2)));
  ldgLogo(CX, CY - 160 * U, 700 * U, { u: eOutExpo(seg(lt, 0.25, 1.0)), mode: 'rise' });
  ldgHead('Cash flow, before it happens.', CX, CY + 20 * U, 72 * U, t, S.end + 0.55, DUR + 1, { align: 'center', colors: [C.fg, C.fg, C.accHi, C.fg, C.fg] });
  pill('Start free', CX, CY + 160 * U, 44 * U, { bg: C.acc, fg: '#ffffff', u: seg(lt, 0.9, 1.35), icon: 'arrowRight' });
  text('ledgerly.app', CX, CY + 262 * U, 32 * U, { font: 'Geist Mono', weight: 400, align: 'center', color: C.mute, tracking: 0.06, alpha: eOutCubic(seg(lt, 1.1, 1.5)) });
}

// ---------------------------------------------------------------- frame
function frame(t) {
  const [gx, gy, gw] = t >= S.converge ? ldgPose(t) : [CX, CY, W * 0.5];
  ldgSpace(t, [gx, gy, gw * 0.9, t < S.converge ? 0.08 : 0.14]);
  const zoom = keys(t, [[0, 1.0], [S.converge, 1.05, eInOutSine], [S.reveal, 1.0, eInOutCubic]]);
  camera({ x: CX, y: CY, zoom, shake: 10 * U * pulse(t, S.reveal, 0.3) + 4 * U * pulse(t, S.click, 0.15) }, () => {
    const dev = t >= S.converge && t < S.end + 0.6 ? ldgBrowser(t) : null;
    ldgFragments(t, dev);
    if (t < S.converge + 0.3) sceneHook(t);
    if (dev) {
      if (t >= S.reveal) sweepLight(eInOutSine(seg(t, S.reveal + 0.05, S.reveal + 0.9)), { color: C.accHi, alpha: 0.3 });
      sceneTitle(t, dev);
      sceneForecast(t, dev);
      sceneInvoice(t, dev);
      sceneReminder(t, dev);
      sceneProof(t, dev);
    }
    sceneEnd(t);
  });
  flash(pulse(t, S.reveal, 0.22) * 0.55, C.accHi, 'lighter');
}
