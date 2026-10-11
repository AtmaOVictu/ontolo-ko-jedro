# CANONICAL DECLARATION

> This file is the source-of-truth marker for this repository's role in the ONTOMATEMATIKA system.
> Declared: 2026-09-11 — from Orientation Cycle Canvas v0.1
> Re-declared: 2026-09-30 — after fold/independence audit

## Role

**INDEPENDENT — ONTOMATEMATIKA Presentation/UI Layer (React)**

This repository is the presentation layer of the ONTOMATEMATIKA system: a
web viewer for the system's concepts (Pojmovnik, Manifest, Etika, concept
detail pages).

It contains **no ontology logic**. Ontological definitions rendered here are
hardcoded presentation data (`src/pages/Pojmovnik.tsx`), not canonical
content. The canonical content lives in the corpus (see Hierarchy below);
this repo displays it.

## Decision

The pending fold/independence question is resolved: **independent.**

Rationale (audit, 2026-09-30): this repo shares no code, types, or logic with
the Atmavictu headless core. Folding a React UI into a headless CLI core
would couple two unrelated concerns. The roles are distinct by nature:
Atmavictu computes and verifies; this repo renders.

## Hierarchy

| Repo | Role | Status |
|------|------|--------|
| Atmavictu | Canonical headless TS core (logic, CLI, proof capture) | HEAD |
| **ontolo-ko-jedro** (this) | Presentation/UI layer (React) | INDEPENDENT |
| Atmavictu_Oracle | Ontology oracle | EMPTY — seed or archive |
| soul-evolution | Active game build (Godot/GDScript) | ACTIVE |

## Content boundary

Canonical ontology content (AX-canon, rozetni kamni, stotnije, OPTIKON) does
**not** live in this repository. When the corpus is version-controlled, this
repo's pages should read from it rather than hardcoding concept arrays.

## Verification

All sealed decisions are recorded in the canonical ledger: Atmavictu/canon/DOKAZ.md
(⊢ DOKAZ — Proof-of-Lineage Ledger).

---

Declared: 2026-09-11
Re-declared: 2026-09-30 — fold/independence audit
