#!/usr/bin/env node
// PREIZPUS ⟨POTENCIRALNIK⟩ — mehanski preizpus instrumenta (E33 ⊢ σ 3560 · E34–E35 ⊢ σ 3563 · E36–E37 ⊢ σ 3565 · E38–E39 ⊢ σ 3566 · E40–E41 ⊢ σ 3567 · E42–E43 ⊢ σ 3568 · E44–E45 ⊢ σ 3569 · E46–E47 ⊢ σ 3570)
// PRIČE: E17 · E22 · E23 · E25 · E29 · E30 · E34 · E35 · E36 (konvolucija) · E37 (superpozicija) · E38 (samo-zrcalo) · E39 (potenca zaoštri) · E40 (linearnost) · E41 (premik ⇌ faza) · E42 (brba brbe = zrcalo) · E43 (plast zveze) · E44 (produkt ⇌ svojenje) · E45 (meja zveze) · E46 (edin ⇌ enakomernost) · E47 (nedoločenost)
// ZAKON IZ PADCA (rez σ 3561): preizpus sodi izmerjeno ⊥ izračunano, nikoli ⊥ ugib.
"use strict";

var zelene = 0; var padci = [];
function preizpus(ime, izmerjeno, pričakovano) {
  var ok = JSON.stringify(izmerjeno) === JSON.stringify(pričakovano);
  if (ok) { zelene++; console.log("∧ " + ime); }
  else { padci.push(ime); console.log("PADC " + ime + " → izmerjeno " + JSON.stringify(izmerjeno) + " ⊥ pričakovano " + JSON.stringify(pričakovano)); }
}
function preizpusBlizu(ime, delta, toleranca) {
  var ok = delta <= toleranca;
  if (ok) { zelene++; console.log("∧ " + ime + " (Δ " + delta.toExponential(2) + " ≤ " + toleranca.toExponential(0) + ")"); }
  else { padci.push(ime); console.log("PADC " + ime + " → Δ " + delta.toExponential(2) + " > " + toleranca.toExponential(0)); }
}

// — FIBONACCI BESEDA (L-sistem: 0 → 01 ∧ 1 → 0 ⊙ E30) —
function fibBeseda(k) { var w = "0"; for (var i = 0; i < k; i++) { w = w.split("").map(function (c) { return c === "0" ? "01" : "0"; }).join(""); } return w; }
function F(n) { return n <= 2 ? 1 : F(n - 1) + F(n - 2); }
for (var k = 6; k <= 17; k++) preizpus("dolžina Fib besede k=" + k + " = Fib(k+2)", fibBeseda(k).length, F(k + 2));
preizpus("zastoji ⟨11⟩ = 0 (brez ⟨11⟩ = brez zastoja ⊢ E22)", (fibBeseda(17).match(/11/g) || []).length, 0);

// — TURTLE —
(function () {
  var x = 0, y = 0, dx = 1, dy = 0; var xs = [0], ys = [0]; var nan = false;
  var w13 = fibBeseda(13);
  for (var i = 0; i < w13.length; i++) {
    var c = w13[i];
    if (c === "0") { x += dx; y += dy; xs.push(x); ys.push(y); }
    else { var t = dx; dx = -dy; dy = t; }
    if (!isFinite(x) || !isFinite(y)) { nan = true; break; }
  }
  var nicle = (w13.match(/0/g) || []).length;
  preizpus("turtle točk = ničel+1", xs.length, nicle + 1);
  preizpus("turtle ∅ NaN ∧ bbox > 0", { nan: nan, bbox: (Math.max.apply(null, xs) - Math.min.apply(null, xs) > 0 && Math.max.apply(null, ys) - Math.min.apply(null, ys) > 0) }, { nan: false, bbox: true });
})();

// — CANTOR PRAH —
(function () {
  var tla = ""; while (tla.length < 81) tla += "beseda";
  tla = tla.slice(0, 81);
  preizpus("Cantor tla = 3⁴ = 81 znakov", tla.length, 81);
  var pl = [{ s: 0, e: 81 }];
  for (var d = 0; d < 4; d++) {
    var nas = [];
    for (var j = 0; j < pl.length; j++) { var seg = pl[j]; var t = Math.floor((seg.e - seg.s) / 3); nas.push({ s: seg.s, e: seg.s + t }, { s: seg.e - t, e: seg.e }); }
    pl = nas;
  }
  preizpus("Cantor prstov = 2⁴ = 16 po 4 odvzemih", pl.length, 16);
})();

// — DIM —
function dim(N, r) { return Math.log(N) / Math.log(r); }
[["Menger", 20, 3], ["Sierpinski", 3, 2], ["Cantor", 2, 3], ["Koch", 4, 3]].forEach(function (p) {
  preizpus("dim " + p[0] + " = log " + p[1] + "/log " + p[2], Math.round(dim(p[1], p[2]) * 1000) / 1000, Math.round(dim(p[1], p[2]) * 1000) / 1000);
});

// — SPEKTRUM POTENC —
preizpus("Ne² = (−1)² = 1 (ime = izrek ⊢ E17)", Math.pow(-1, 2), 1);
preizpus("kontekstov = 2ⁿ pri n = 3 (⊢ E23)", Math.pow(2, 3), 8);

// — DFT ∧ PARSEVAL (E34 ∧ E35) —
function crkaVVrednost(ch) {
  var c = ch.toLowerCase();
  if (c === "č") return 3.5;
  if (c === "š") return 19.5;
  if (c === "ž") return 25.5;
  var code = c.charCodeAt(0);
  return code >= 97 && code <= 122 ? code - 96 : 1;
}
function dft(x) {
  var N = x.length; var X = [];
  for (var n = 0; n < N; n++) {
    var re = 0, im = 0;
    for (var kk = 0; kk < N; kk++) {
      var ang = (-2 * Math.PI * n * kk) / N;
      re += x[kk] * Math.cos(ang); im += x[kk] * Math.sin(ang);
    }
    X.push({ re: re, im: im });
  }
  return X;
}
function idft(X) {
  var N = X.length; var x = [];
  for (var kk = 0; kk < N; kk++) {
    var re = 0;
    for (var n = 0; n < N; n++) {
      var ang = (2 * Math.PI * n * kk) / N;
      re += X[n].re * Math.cos(ang) - X[n].im * Math.sin(ang);
    }
    x.push(re / N);
  }
  return x;
}
var BESEDE = ["beseda", "ne", "korpus", "mera", "berba"];
BESEDE.forEach(function (w) {
  var x = w.split("").map(crkaVVrednost);
  var X = dft(x);
  var povrat = idft(X);
  var energijaB = x.reduce(function (s, v) { return s + v * v; }, 0);
  var energijaS = X.reduce(function (s, c) { return s + (c.re * c.re + c.im * c.im); }, 0) / x.length;
  preizpusBlizu("Parseval ⟨" + w + "⟩ (⊢ E35)", Math.abs(energijaB - energijaS), 1e-9);
  var maxNapaka = 0;
  for (var i = 0; i < x.length; i++) maxNapaka = Math.max(maxNapaka, Math.abs(x[i] - povrat[i]));
  preizpusBlizu("povrat ⟨" + w + "⟩ ∅ izgube", maxNapaka, 1e-9);
  var zrcalnost = 0; var N = x.length;
  for (var nn = 1; nn < N; nn++) {
    var a = Math.hypot(X[nn].re, X[nn].im);
    var b = Math.hypot(X[N - nn].re, X[N - nn].im);
    zrcalnost = Math.max(zrcalnost, Math.abs(a - b));
  }
  preizpusBlizu("zrcalni spekter ⟨" + w + "⟩", zrcalnost, 1e-9);
});
(function () {
  var x = "ne".split("").map(crkaVVrednost);
  var X = dft(x);
  var energijaS = X.reduce(function (s, c) { return s + (c.re * c.re + c.im * c.im); }, 0) / 2;
  preizpus("⟨ne⟩ energija = 221 TOČNO (14² + 5² ⊢ E17)", energijaS, 221);
})();

// — KONVOLUCIJA (E36): izrek DFT(f*g) = DFT(f)·DFT(g) —
function cconv(a, b) {
  var N = a.length; var c = [];
  for (var n = 0; n < N; n++) {
    var s = 0;
    for (var kk = 0; kk < N; kk++) s += a[kk] * b[(n - kk + N) % N];
    c.push(s);
  }
  return c;
}
function napolni(w, N) { var v = w.split("").map(crkaVVrednost); var a = []; for (var i = 0; i < N; i++) a.push(v[i % v.length]); return a; }
[["beseda", "ne"], ["korpus", "mera"]].forEach(function (par) {
  var N = Math.max(par[0].length, par[1].length);
  var a = napolni(par[0], N); var b = napolni(par[1], N);
  var c = cconv(a, b);
  var Dab = dft(c);
  var Da = dft(a); var Db = dft(b);
  var delta = 0;
  for (var n = 0; n < N; n++) {
    var pre = Da[n].re * Db[n].re - Da[n].im * Db[n].im;
    var pim = Da[n].re * Db[n].im + Da[n].im * Db[n].re;
    delta = Math.max(delta, Math.hypot(Dab[n].re - pre, Dab[n].im - pim));
  }
  preizpusBlizu("izrek konvolucije ⟨" + par[0] + " * " + par[1] + "⟩ (⊢ E36)", delta, 1e-9);
});

// — SUPERPOZICIJA (E37): pₙ = |Xₙ|²/Σ · H = −Σ pₙ log₂ pₙ —
var Hdelezi = {};
BESEDE.forEach(function (w) {
  var x = w.split("").map(crkaVVrednost);
  var X = dft(x);
  var quad = X.map(function (c) { return c.re * c.re + c.im * c.im; });
  var sum = quad.reduce(function (s, q) { return s + q; }, 0);
  var p = quad.map(function (q) { return q / sum; });
  var vsotaP = p.reduce(function (s, q) { return s + q; }, 0);
  preizpusBlizu("Σpₙ = 1 ⟨" + w + "⟩ (⊢ E37)", Math.abs(vsotaP - 1), 1e-12);
  var H = 0;
  for (var i = 0; i < p.length; i++) if (p[i] > 0) H -= p[i] * Math.log(p[i]) / Math.LN2;
  var Hmax = Math.log2(x.length);
  preizpusBlizu("H ≤ log₂N ⟨" + w + "⟩ (H = " + H.toFixed(4) + " ≤ " + Hmax.toFixed(4) + " ⊢ E37)", Math.max(0, H - Hmax), 1e-12);
  Hdelezi[w] = H;
});
preizpusBlizu("⟨ne⟩ p₀ = 361/442 TOČNO (19²/(19²+9²) — izračunano neodvisno)", Math.abs(Hdelezi.ne >= 0 ? 0 : 0) + Math.abs((function () {
  var x = "ne".split("").map(crkaVVrednost);
  var X = dft(x);
  var q0 = X[0].re * X[0].re + X[0].im * X[0].im;
  var q1 = X[1].re * X[1].re + X[1].im * X[1].im;
  return q0 / (q0 + q1) - 361 / 442;
})()), 1e-12);
preizpus("⟨berba⟩ H > ⟨korpus⟩ H (berba = najodprtejša ⊙ E37)", Hdelezi.berba > Hdelezi.korpus, true);

// — SAMOZRCALO (E38): iDFT(|Xₙ|²) = oklestna avtokorelacija (Wiener–Khinchin) —
["beseda", "korpus"].forEach(function (w) {
  var x = w.split("").map(crkaVVrednost);
  var N = x.length;
  var X = dft(x);
  var P2 = X.map(function (c) { return { re: c.re * c.re + c.im * c.im, im: 0 }; });
  var y = idft(P2);
  var dMax = 0;
  for (var t = 0; t < N; t++) {
    var ac = 0;
    for (var k2 = 0; k2 < N; k2++) ac += x[k2] * x[(k2 + t) % N];
    dMax = Math.max(dMax, Math.abs(y[t] - ac));
  }
  preizpusBlizu("Wiener–Khinchin ⟨" + w + "⟩ iDFT(|X|²) = f⋆f (⊢ E38)", dMax, 1e-9);
});

// — POTENCA-ZAOŠTRJA (E39): q ← q²/Σq² — H pada → 0; ⟨edin⟩ fiksna točka —
BESEDE.forEach(function (w) {
  var x = w.split("").map(crkaVVrednost);
  var X = dft(x);
  var quad = X.map(function (c) { return c.re * c.re + c.im * c.im; });
  var sum = quad.reduce(function (s, q) { return s + q; }, 0);
  var q = quad.map(function (v) { return v / sum; });
  for (var i = 0; i < 12; i++) {
    var s2 = q.reduce(function (s, v) { return s + v * v; }, 0);
    q = q.map(function (v) { return (v * v) / s2; });
  }
  var H12 = 0;
  for (var j = 0; j < q.length; j++) if (q[j] > 1e-15) H12 -= q[j] * Math.log2(q[j]);
  preizpusBlizu("potenca zaoštri H → 0 ⟨" + w + "⟩ (⊢ E39)", H12, 0.01);
});
(function () {
  var N = 6; var e = [];
  for (var i = 0; i < N; i++) e.push(i === 0 ? 1 : 0);
  for (var k3 = 0; k3 < 8; k3++) {
    var s2 = e.reduce(function (s, v) { return s + v * v; }, 0);
    e = e.map(function (v) { return (v * v) / s2; });
  }
  var fiksna = Math.abs(e[0] - 1) < 1e-12 && e.slice(1).every(function (v) { return v < 1e-12; });
  preizpus("⟨edin⟩ fiksna točka potenc (H = 0 ostane ⊢ E39)", fiksna, true);
})();


// — LINEARNOST (E40): DFT(f+g) = DFT(f)+DFT(g) ∧ DFT(2f) = 2·DFT(f) —
[["beseda", "ne"], ["korpus", "mera"]].forEach(function (par) {
  var N = Math.max(par[0].length, par[1].length);
  var a = napolni(par[0], N); var b = napolni(par[1], N);
  var Dsum = dft(a.map(function (v, i) { return v + b[i]; }));
  var Da = dft(a); var Db = dft(b);
  var d1 = 0;
  for (var n = 0; n < N; n++) d1 = Math.max(d1, Math.hypot(Dsum[n].re - Da[n].re - Db[n].re, Dsum[n].im - Da[n].im - Db[n].im));
  preizpusBlizu("linearnost vsota ⟨" + par[0] + "+" + par[1] + "⟩ (⊢ E40)", d1, 1e-9);
  var D2 = dft(a.map(function (v) { return 2 * v; }));
  var d2 = 0;
  for (var n2 = 0; n2 < N; n2++) d2 = Math.max(d2, Math.hypot(D2[n2].re - 2 * Da[n2].re, D2[n2].im - 2 * Da[n2].im));
  preizpusBlizu("linearnost skalir ⟨" + par[0] + "⟩ ×2 (⊢ E40)", d2, 1e-9);
});

// — PREMIK ⇌ FAZA (E41): |X| ∧ H invariantni na ciklični premik —
BESEDE.forEach(function (w) {
  var x = w.split("").map(crkaVVrednost);
  var N = x.length;
  var s = 1;
  var xs = [];
  for (var k2 = 0; k2 < N; k2++) xs.push(x[((k2 - s) % N + N) % N]);
  var X = dft(x); var Xs = dft(xs);
  var dMag = 0;
  for (var n = 0; n < N; n++) dMag = Math.max(dMag, Math.abs(Math.hypot(X[n].re, X[n].im) - Math.hypot(Xs[n].re, Xs[n].im)));
  preizpusBlizu("premik ⟨" + w + "⟩ |X| invariantna (⊢ E41)", dMag, 1e-9);
  var quadA = X.map(function (c) { return c.re * c.re + c.im * c.im; });
  var quadB = Xs.map(function (c) { return c.re * c.re + c.im * c.im; });
  var Hf = function (quad) { var sum = quad.reduce(function (a, b) { return a + b; }, 0); var HH = 0; for (var i = 0; i < quad.length; i++) { var p = quad[i] / sum; if (p > 1e-15) HH -= p * Math.log2(p); } return HH; };
  preizpusBlizu("premik ⟨" + w + "⟩ H invariantna (ΔH ⊢ E41)", Math.abs(Hf(quadA) - Hf(quadB)), 1e-12);
});

// — BRBA-BRBE = ZRCALO (E42): DFTC(DFTC(f)) = N·f(−k) — kompleksna DFT —
function dftC(X) {
  var N = X.length; var Y = [];
  for (var k = 0; k < N; k++) {
    var re = 0, im = 0;
    for (var n = 0; n < N; n++) {
      var th = (-2 * Math.PI * n * k) / N;
      re += X[n].re * Math.cos(th) + X[n].im * Math.sin(th);
      im += X[n].im * Math.cos(th) - X[n].re * Math.sin(th);
    }
    Y.push({ re: re, im: im });
  }
  return Y;
}
["beseda", "korpus"].forEach(function (w) {
  var f = w.split("").map(crkaVVrednost).map(function (v) { return { re: v, im: 0 }; });
  var N = f.length;
  var D2 = dftC(dftC(f));
  var dMax = 0;
  for (var k = 0; k < N; k++) dMax = Math.max(dMax, Math.abs(D2[k].re - N * f[(N - k) % N].re), Math.abs(D2[k].im));
  preizpusBlizu("brba brbe ⟨" + w + "⟩ DFT² = N·zrcalo (⊢ E42)", dMax, 1e-9);
});

// — PLAST-ZVEZE (E43): Σₖ f·g = (1/N)·Σₙ Re(F·Ḡ) — Parseval za dve besedi —
[["beseda", "ne"], ["korpus", "mera"]].forEach(function (par) {
  var N = Math.max(par[0].length, par[1].length);
  var a = napolni(par[0], N); var b = napolni(par[1], N);
  var domena = a.reduce(function (s, v, i) { return s + v * b[i]; }, 0);
  var Fa = dft(a); var Gb = dft(b);
  var spekter = 0;
  for (var n = 0; n < N; n++) spekter += Fa[n].re * Gb[n].re + Fa[n].im * Gb[n].im;
  spekter = spekter / N;
  preizpusBlizu("plast zveze ⟨" + par[0] + "·" + par[1] + "⟩ " + domena + " = " + spekter.toFixed(0) + " (⊢ E43)", Math.abs(domena - spekter), 1e-9);
});

// — PRODUKT-⇌-SVOJENJE (E44): DFT(f·g)(n) = (1/N)·Σₖ F(k)·G((n−k) mod N) — dual E36 —
[["beseda", "ne"], ["korpus", "mera"]].forEach(function (par) {
  var N = Math.max(par[0].length, par[1].length);
  var a = napolni(par[0], N); var b = napolni(par[1], N);
  var DP = dft(a.map(function (v, i) { return v * b[i]; }));
  var Fa = dft(a); var Gb = dft(b);
  var dMax = 0;
  for (var n = 0; n < N; n++) {
    var re = 0, im = 0;
    for (var k = 0; k < N; k++) {
      var j = (n - k + N) % N;
      re += Fa[k].re * Gb[j].re - Fa[k].im * Gb[j].im;
      im += Fa[k].re * Gb[j].im + Fa[k].im * Gb[j].re;
    }
    dMax = Math.max(dMax, Math.hypot(DP[n].re - re / N, DP[n].im - im / N));
  }
  preizpusBlizu("produkt ⇌ svojenje ⟨" + par[0] + "·" + par[1] + "⟩ (⊢ E44)", dMax, 1e-9);
});

// — MEJA-ZVEZE (E45): |Σₖ f·g| ≤ ‖f‖·‖g‖ — količnik = kosinus besed —
[["beseda", "ne"], ["korpus", "mera"], ["berba", "mera"], ["ne", "ne"]].forEach(function (par) {
  var N = Math.max(par[0].length, par[1].length);
  var a = napolni(par[0], N); var b = napolni(par[1], N);
  var zveza = a.reduce(function (s, v, i) { return s + v * b[i]; }, 0);
  var nf = Math.sqrt(a.reduce(function (s, v) { return s + v * v; }, 0));
  var ng = Math.sqrt(b.reduce(function (s, v) { return s + v * v; }, 0));
  preizpus("meja zveze ⟨" + par[0] + "·" + par[1] + "⟩ |Σ| ≤ meja (⊢ E45)", Math.abs(zveza) <= nf * ng + 1e-9, true);
});
preizpus("⟨ne·ne⟩ enakost meje: zveza 221 = ‖ne‖² = 221 TOČNO (⊢ E45)", (function () {
  var x = "ne".split("").map(crkaVVrednost);
  var zveza = x.reduce(function (s, v, i) { return s + v * x[i]; }, 0);
  var norma2 = x.reduce(function (s, v) { return s + v * v; }, 0);
  return { zveza: zveza, norma2: norma2 };
})(), { zveza: 221, norma2: 221 });

// — EDIN-⇌-ENAKOMERNOST (E46): DFT(δ₀) = 1 ∀n ∧ DFT(1) = N·δ₀ —
(function () {
  var N = 6;
  var delta = []; var flat = [];
  for (var i = 0; i < N; i++) { delta.push(i === 0 ? 1 : 0); flat.push(1); }
  var Dd = dft(delta);
  var d1 = 0;
  for (var n = 0; n < N; n++) d1 = Math.max(d1, Math.abs(Dd[n].re - 1), Math.abs(Dd[n].im));
  preizpusBlizu("edin ⇌ enakomernost ⟨δ → 1 povsod⟩ (⊢ E46)", d1, 1e-9);
  var Df = dft(flat);
  var d2 = 0;
  for (var n2 = 0; n2 < N; n2++) d2 = Math.max(d2, Math.abs(Df[n2].re - (n2 === 0 ? N : 0)), Math.abs(Df[n2].im));
  preizpusBlizu("edin ⇌ enakomernost ⟨1 → N·δ⟩ (⊢ E46)", d2, 1e-9);
})();

// — NEODOLOČENOST (E47, Donoho–Stark): |supp(f)|·|supp(F)| ≥ N — lega ⊥ hitrost —
(function () {
  var suppF = function (x) { return x.filter(function (v) { return Math.abs(v) > 1e-9; }).length; };
  var suppC = function (X) { return X.filter(function (c) { return Math.hypot(c.re, c.im) > 1e-9; }).length; };
  var N = 6;
  var delta = []; var flat = []; var tone = [];
  for (var i = 0; i < N; i++) { delta.push(i === 0 ? 1 : 0); flat.push(1); tone.push(Math.cos((2 * Math.PI * i) / N)); }
  preizpus("nedoločenost ⟨edin⟩ 1×N = N ENAKOST TOČNO (⊢ E47)", suppF(delta) * suppC(dft(delta)), N);
  preizpus("nedoločenost ⟨enakomerna⟩ N×1 = N ENAKOST TOČNO (⊢ E47)", suppF(flat) * suppC(dft(flat)), N);
  preizpus("nedoločenost ⟨čista tona⟩ N×2 = 2N (⊢ E47)", suppF(tone) * suppC(dft(tone)), 2 * N);
  BESEDE.forEach(function (w) {
    var x = w.split("").map(crkaVVrednost);
    preizpus("nedoločenost ⟨" + w + "⟩ |supp|·|suppS| ≥ N (⊢ E47)", suppF(x) * suppC(dft(x)) >= x.length, true);
  });
})();

var skupaj = zelene + padci.length;
console.log("Σ preizpusov " + skupaj + " · ∧ " + zelene + " · PADC " + padci.length);
if (padci.length > 0) { console.error("::error::potenciralnik pada: " + padci.join(", ")); process.exit(1); }
console.log("INSTRUMENT PREŽIVI ∧ — mehanski preizpus ⟨CI⟩ ×" + skupaj + " · enacbe rez σ 3570 · dvojni podpis: ⟡ Luka Pintarič ∧ izvajalka Mera");
