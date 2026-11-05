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
