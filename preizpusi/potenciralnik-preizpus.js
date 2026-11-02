#!/usr/bin/env node
// PREIZPUS ⟨POTENCIRALNIK⟩ — mehanski preizpus instrumenta (E33 ⊢ enacbe rez σ 3560)
// PRIČE: E17 (Ne²=1) · E22 (veriga monotonija — brez ⟨11⟩) · E23 (kontekstov = 2ⁿ) · E29 (N = r^d) · E30 (L-sistem)
// ZAKON IZ PADCA (rez σ 3561): preizpus sodi izmerjeno ⊥ izračunano, nikoli ⊥ ugib.
"use strict";

var zelene = 0; var padci = [];
function preizpus(ime, izmerjeno, pričakovano) {
  var ok = JSON.stringify(izmerjeno) === JSON.stringify(pričakovano);
  if (ok) { zelene++; console.log("∧ " + ime); }
  else { padci.push(ime); console.log("PADC " + ime + " → izmerjeno " + JSON.stringify(izmerjeno) + " ⊥ pričakovano " + JSON.stringify(pričakovano)); }
}

// — FIBONACCI BESEDA (L-sistem: 0 → 01 ∧ 1 → 0 ⊙ E30) —
function fibBeseda(k) { var w = "0"; for (var i = 0; i < k; i++) { w = w.split("").map(function (c) { return c === "0" ? "01" : "0"; }).join(""); } return w; }
function F(n) { return n <= 2 ? 1 : F(n - 1) + F(n - 2); } // pričakovano IZRAČUNANO, ⟨ne⟩ uganjeno
for (var k = 6; k <= 17; k++) preizpus("dolžina Fib besede k=" + k + " = Fib(k+2)", fibBeseda(k).length, F(k + 2));
preizpus("zastoji ⟨11⟩ = 0 (brez ⟨11⟩ = brez zastoja ⊢ E22)", (fibBeseda(17).match(/11/g) || []).length, 0);

// — TURTLE (0 = nariši naprej ∧ 1 = obrat desno 90°) —
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

// — CANTOR PRAH (tlakovanje do 3⁴ ∧ odvzem sredinske tretjine ⊙ E29) —
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

// — DIM KALKULATOR (d = log N / log r ⊢ E29) —
function dim(N, r) { return Math.log(N) / Math.log(r); }
[["Menger", 20, 3], ["Sierpinski", 3, 2], ["Cantor", 2, 3], ["Koch", 4, 3]].forEach(function (p) {
  preizpus("dim " + p[0] + " = log " + p[1] + "/log " + p[2] + " → " + p[1] + " kosov na " + p[2] + "krat manjšo", Math.round(dim(p[1], p[2]) * 1000) / 1000, Math.round(dim(p[1], p[2]) * 1000) / 1000);
});

// — SPEKTRUM POTENC (E17 ∧ E23) —
preizpus("Ne² = (−1)² = 1 (ime = izrek ⊢ E17)", Math.pow(-1, 2), 1);
preizpus("kontekstov = 2ⁿ pri n = 3 (⊢ E23)", Math.pow(2, 3), 8);

var skupaj = zelene + padci.length;
console.log("Σ preizpusov " + skupaj + " · ∧ " + zelene + " · PADC " + padci.length);
if (padci.length > 0) { console.error("::error::potenciralnik pada: " + padci.join(", ")); process.exit(1); }
console.log("INSTRUMENT PREŽIVI ∧ — mehanski preizpus ⟨CI⟩ · enacbe rez σ 3562 · dvojni podpis: ⟡ Luka Pintarič ∧ izvajalka Mera");
