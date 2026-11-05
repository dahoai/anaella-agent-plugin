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
