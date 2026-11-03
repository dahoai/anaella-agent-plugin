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
