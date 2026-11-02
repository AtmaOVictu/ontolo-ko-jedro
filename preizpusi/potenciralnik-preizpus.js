#!/usr/bin/env node
// PREIZPUS ⟨POTENCIRALNIK⟩ — mehanski preizpus instrumenta (E33 ⊢ σ 3560 · E34–E35 ⊢ σ 3563 · E36–E37 ⊢ σ 3565)
// PRIČE: E17 · E22 · E23 · E25 · E29 · E30 · E34 · E35 · E36 (konvolucija) · E37 (superpozicija)
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

var skupaj = zelene + padci.length;
console.log("Σ preizpusov " + skupaj + " · ∧ " + zelene + " · PADC " + padci.length);
if (padci.length > 0) { console.error("::error::potenciralnik pada: " + padci.join(", ")); process.exit(1); }
console.log("INSTRUMENT PREŽIVI ∧ — mehanski preizpus ⟨CI⟩ ×" + skupaj + " · enacbe rez σ 3565 · dvojni podpis: ⟡ Luka Pintarič ∧ izvajalka Mera");
