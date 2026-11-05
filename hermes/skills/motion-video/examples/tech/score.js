'use strict';
// Ledgerly 2.0 — clean electronic, 120 BPM, G major (Gmaj7–Em7–Cmaj7–D). Every sync point reads S from scenes.js.
function score(A) {
  const D = S.reveal;
  const PROG = ['Gmaj7', 'Em7', 'Cmaj7', 'D'];
  const MOTIF = [[0, 'B4'], [0.5, 'D5'], [1, 'G5'], [2, 'F#5']];        // stated in the hook, resolved on the end card
  const chordAt = (i) => A.chord(PROG[i % 4], 3);
  A.reverb(0.22);

  // ---- intro: filtered e-piano bed, soft ticks, the motif
  A.sweep(0, S.converge, 1200, 3200);
  A.sweep(S.converge, D - 0.3, 3200, 600);
  for (let i = 0; i * A.bar < D; i++) { A.keys(i * A.bar, chordAt(i), A.bar, 0.45); A.pad(i * A.bar, chordAt(i), A.bar, 0.4, { cutoff: 1400, attack: 0.05 }); }
  A.pattern(0, '..x...x...x...x.', (t) => A.hat(t, 0.3), Math.ceil(S.converge / A.bar));
  MOTIF.forEach(([b, n]) => A.bell(A.b(b), n, 0.9, 0.7, 0.1));
  MOTIF.forEach(([b, n]) => A.pluck(S.when + A.b(b), n, 0.35, 0.55, { pan: -0.2 }));
  A.hit(0, 0.55); A.hit(S.when, 0.5);
  FRAG_IN.forEach((t, i) => { if (t >= 0) A.pop(t, 0.35, 1 + i * 0.12); });

  // ---- "Stop guessing.": half-note kicks, the overdue cards throb on each beat
  A.hit(S.guess, 0.7); A.sub(S.guess, 'G1', A.b(4), 0.7);
  A.pattern(S.guess, 'x.......x.......', (t) => A.kick(t, 0.7, { len: 0.3 }), Math.ceil((S.converge - S.guess) / A.bar));
  A.every(S.guess, S.converge + 0.5, A.beat, (t) => A.blip(t, 'D4', 0.3, 0.3));

  // ---- the build: riser, a whoosh per fragment flying home, a breath of silence
  A.riser(S.converge, D - 0.25 - S.converge, 0.85);
  FRAGS.forEach((f, i) => A.whoosh(S.converge + 0.25 + i * 0.13, 0.7, 0.28, i % 2 === 0));
  A.sub(S.converge, 'D2', D - 0.25 - S.converge, 0.35);                        // dominant pedal under the build
  A.every(S.converge, D - 1, A.beat, (t) => A.kick(t, 0.32, { len: 0.22 }));       // kicks tighten: quarters...
  A.every(D - 1, D - 0.3, A.beat / 2, (t, i) => A.kick(t, 0.3 + i * 0.05, { len: 0.18 }));   // ...then eighths
  A.silence(D - 0.25, D);

  // ---- the drop: the UI snaps together
  A.impact(D, 1); A.boom(D, 0.9); A.crash(D, 0.7);
  A.whoosh(D + 0.05, 0.8, 0.45);
  A.sweep(D, D + 0.01, 600, 20000);
  const bars = Math.round((S.end - D) / A.bar);
  A.pattern(D, 'x...x...x...x...', (t) => A.kick(t, 1), bars);
  A.pattern(D, '....x.......x...', (t) => A.clap(t, 0.65), bars);
  A.pattern(D, '..x...x...x...x.', (t) => A.hat(t, 0.5), bars);
  A.pattern(D, 'x.x.x.x.x.x.x.x.', (t) => A.shaker(t, 0.3), bars);
  for (let i = 0; i < bars; i++) {
    const t = D + i * A.bar, n = chordAt(i);
    A.bass(t, n[0] - 12, A.bar - 0.05, 0.9, { type: 'saw', cutoff: 900 });
    A.pad(t, n, A.bar, 0.45, { cutoff: 2400 });
    if (i % 2 === 1) A.arp(t, n.map((m) => m + 12), A.beat / 2, A.bar, 0.25);
  }
  A.level(D, 1); A.level(S.title, 0.72, 0.6); A.level(S.f1, 0.66, 0.5);                                   // keep the drop the loudest moment

  // ---- title
  A.pop(S.title + 0.35, 0.6, 1); A.pop(S.title + 0.6, 0.5, 1.26);

  // ---- 01 live forecast: push, focus, scan, ping
  A.whoosh(S.f1, 0.7, 0.4);
  A.blip(S.f1 + 0.8, 'G5', 0.5);
  ['G5', 'A5', 'B5', 'D6', 'E6', 'G6'].forEach((n, i) => A.blip(S.f1 + 1.25 + i * 0.25, n, 0.3, -0.4 + i * 0.16));
  A.bellFx(S.f1 + 2.5, 'D6', 1.0, 0.5);

  // ---- 02 one-click invoices: focus, the click on the beat, the toast
  A.whoosh(S.f2, 0.7, 0.4, false);
  A.blip(S.f2 + 0.7, 'B5', 0.45);
  A.click(S.click, 1); A.notify(S.click + 0.2, 0.7);

  // ---- 03 automatic reminders
  A.whoosh(S.f3, 0.7, 0.4);
  A.blip(S.f3 + 0.8, 'E4', 0.5);
  A.notify(S.f3 + 1.5, 0.7); A.bellFx(S.f3 + 1.55, 'B5', 0.8, 0.35, 0.2);

  // ---- proof: the phone joins, the counter runs to the cent
  A.whoosh(S.proof, 0.7, 0.4, false);
  A.swipe(S.proof + 0.5, 0.6, 1);
  A.blip(S.proof + 1.1, 'G5', 0.4); A.blip(S.proof + 1.4, 'B5', 0.4);
  A.every(S.proof + 0.9, S.cash - 0.1, A.beat / 4, (t, i) => A.tick(t, 0.25, 2600 + i * 40));
  A.cash(S.cash, 0.9); A.hit(S.cash, 0.45);

  // ---- end card: drums out, logo hit, the motif resolves on the tonic and rings out
  A.downer(S.end - 0.6, 0.6, 0.35);
  A.hit(S.end + 0.25, 0.8); A.sparkle(S.end + 0.3, 0.6);
  A.pad(S.end, A.chord('Gmaj9', 3), A.dur - S.end, 0.6, { cutoff: 3000 });
  A.keys(S.end + 0.25, A.chord('Gmaj7', 4), A.dur - S.end - 0.25, 0.5);
  A.sub(S.end, 'G1', A.dur - S.end, 0.8);
  [[0.5, 'B4'], [0.75, 'D5'], [1.0, 'F#5'], [1.5, 'G5']].forEach(([dt, n], i) => A.bell(S.end + dt, n, i === 3 ? 2.2 : 0.8, 0.75));
  A.pop(S.end + 0.9, 0.5, 1.26);
}
