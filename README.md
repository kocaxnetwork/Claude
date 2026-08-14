# KocaX Brain

Canonical knowledge repository for KocaX product work. Plans, handoff packages, and audits connect here so that every implementation session starts from verified, versioned context instead of loose files.

**Owner:** kocaxnetwork · **Working machine:** "Horse" (the owner's computer, where complete packages and canonical repositories live) · **This repo:** the shared brain that cloud/agent sessions read from and report into.

## Structure

```
handoffs/   Immutable handoff packages, one directory each, stored verbatim under their
            canonical package name. Never edit files inside a handoff — re-export a new
            package instead.
audits/     Independent audit results for each handoff: findings, Gate-0 inventory,
            verification evidence, and gaps.
```

## Contents

### handoffs/KOCAX-BUDDY-WORKPLACE-V1-IMPLEMENTATION-HANDOFF-2026-08-13/

KocaX Buddy Workplace v1 implementation handoff (Personal Buddy only). **Complete: 98/99 manifest files hash-verified** (only `.env.example` missing from the export — recorded in `MANIFEST.json`, exists on Horse). Outer zip SHA-256 `e8e19a89…36aff2f`. Independently re-verified in a clean cloud container: `npm ci` + full `npm run verify` pass — **45/45 tests** (contracts 17, API 17, UI 11), clean typecheck and builds, loopback API smoke, **0 npm-audit vulnerabilities**. Start with `00-START-HERE.md`; run `npm ci && npm run verify` (Node ≥ 24 pinned; observed to also pass on 22).

### handoffs/KOCAX-BUDDY-LEGAL-COMPLIANCE-2026-08-13/

Dutch legal & compliance start dossier for the consumer launch (concept 1.0): terms, privacy notice, DPIA draft, DPA requirements, AI-Act disclosure, cookies/consent, 18+ gate, risk register (21 live blockers + 11 first-euro gates + 6 post-launch), claims check, and sources. Outer zip SHA-256 `166136d8…48b277`, **12/12 files hash-verified**. Its own status: **NO-GO for public paid launch** until the register's blocking gates are demonstrably closed; the `<<INVULLEN: …>>` fields in `00-START-HERE.md` must be resolved first. Not legal advice; Dutch lawyer review required per the dossier itself.

### handoffs/KOCAX-BUDDY-LAUNCH-CONTENT-2026-08-13/

Gemini-drafted public launch content ("PROMPT 3"): landing page NL+EN, onboarding screens, four transactional emails, microcopy, and a claims-evidence table. Received as a pasted transcript (no author-side hashes — `SHA256SUMS.txt` here was generated at connection time; see `PROVENANCE.md`). **Audited: NOT PUBLISHABLE as delivered** — see `audits/2026-08-13-buddy-launch-content/`.

### audits/2026-08-13-buddy-launch-content/

**`AUDIT-REPORT.md`** — 72-agent orchestrated audit (seven claim sweeps, every P0/P1 adversarially verified; raw data in `FINDINGS-DATA.json`). Six unique P0 defect classes: false "all servers in the EU" claim, false "we erase all your data" claim, a welcome email stating the legal opposite of the TERMS withdrawal construction, an absolute approval claim the claims rules forbid, a 6-day launch premise against ~31–64+ net working days of open gates, and a claims-evidence table that certifies gated claims from the generating briefing (circular) while missing the withdrawal-waiver sentence entirely. Root cause: **the Gemini briefing presented gated register items as verified facts** — future content must be generated from the brain's claim ledgers, never from a self-contained prompt. The honest elements (no-E2EE disclosure, frozen pricing, integration denials, placeholder discipline) are catalogued for reuse.

### audits/2026-08-13-buddy-active-users-widget/

**`AUDIT-REPORT.md`** — verdict: **GO as reference code, NO-GO for deployment.** The widget is the most honest artifact in the launch set (no fabricated numbers, fail-closed both sides, aggregate-only, real a11y/reduced-motion) and should be the template for future public widgets. Blocking for deployment: no presence backend exists, live gates open, "reconnecting automatically" copy, a windowMinutes mismatch that could inflate the claimed activity window, and its integration note pre-empting the open Gate-0 canonical-repo decision (`E:\kocaexpress-v3` — now recorded as Gate-0 evidence). One audit candidate was refuted in adversarial verification and is recorded as such.

### handoffs/KOCAX-BUDDY-ACTIVE-USERS-WIDGET-v1.0.0/

Next.js 15 drop-in widget showing aggregated Buddy users active in the last 5 minutes. **6/6 files hash-verified** against its own `SHA256SUMS.txt` (outer zip SHA-256 `f8b86679…f4e282`). Deliberately honest design: no fabricated fallback numbers, fail-closed 503s when presence data is unreachable, aggregated-count-only contract. Deployment requires a real presence backend, which does not exist yet. Its `INTEGRATION-NOTE.md` names the canonical website repo as `E:\kocaexpress-v3` (Horse) — a Gate-0-relevant fact now on record.

### audits/2026-08-13-buddy-workplace-v1/

- **`AUDIT-REPORT.md`** — audit of the first, partial upload (39/99 files). Retained as history; superseded same-day.
- **`AUDIT-ADDENDUM-COMPLETE-PACKAGE.md`** — audit of the complete package with independent re-verification. **Current verdict: GO for local implementation handoff; NO-GO for production** (concurring with the package's own audit). Remaining open items: Gate-0 canonical-repository inventory (Horse-side), three OpenAPI documentation gaps, minor P3s.
- **`GATE0-INVENTORY.md`** — repository/deployment/mobile inventory; package-completeness condition closed, canonical-repo fields still `PENDING ON HORSE`.
- **`MISSING-FROM-UPLOAD.txt`** — historical list from the partial upload (all delivered since, except `.env.example`).

### audits/2026-08-13-buddy-legal-compliance/

**`AUDIT-REPORT.md`** — full consistency audit of the legal dossier (two independent reviewers over all nine content documents). Verdict: **structurally complete and fit for its stated purpose (lawyer handoff + engineering gate input) after the P1 fixes**; publication NO-GO stands per the dossier's own register. Headline P1 items: "SpaceXAI" vendor-naming error, `allow_fallbacks` carve-out contradicting the anchor mandate, missing Broadcast toggle in the OpenRouter checklist, self-contradictory residual-risk-10 threshold, one absolute claim inside the approved consumer copy, unverified statutory contact channel, NL/EN divergences inside TERMS/PRIVACY, and drafter instructions left in publishable text. No factual value mismatches (price, KvK, Btw, contact, flows) anywhere; no forbidden absolute claim in the consumer documents; all five ZDR guardrail controls consistently specified.

## Current gate status (13 August 2026)

| Gate | Status |
|---|---|
| Implementation package — local reference handoff | **GO** (verified) |
| Gate 0 — canonical repos/deployment/mobile/signing inventory | **NO-GO — pending on Horse** |
| Production integration (identity, DB, Messenger crypto, connectors, deployment) | **NO-GO** (explicitly gated by the package) |
| Public paid consumer launch | **NO-GO** (21 live blockers + 11 first-euro gates in the legal register) |
| Launch content (landing/onboarding/emails/microcopy) | **NO-GO — rewrite required** (6 P0 defect classes; see launch-content audit) |
| Active-users widget | **GO as reference code · NO-GO for deployment** (no presence backend; Gate 0 open) |

## Next actions (owner)

1. **On Horse:** complete the three inventory templates in the implementation package (repository, deployment, mobile identity) including the Kiramate contamination scan of the canonical repositories — this is what closes Gate 0.
2. Include `.env.example` in the next package export so verification runs 99/99 clean.
3. **Legal:** resolve the `<<INVULLEN: …>>` fields (owner name per KvK, address, payment provider, fair-use limits, session TTL, backup cycle, model/endpoint allowlist, DPA versions, EAA status) and take the dossier to a Dutch consumer/AVG/AI-Act lawyer.
4. Work the risk register in order: live blockers → first-euro gates → post-launch items, storing the evidence each row demands.

## Rules of the brain

- Handoff packages are **immutable evidence** — corrections arrive as new packages, never as edits.
- Audits state what was verified and what was absent; absent proof is treated as absent, never assumed.
- Claims are only as good as their evidence; the claim ledgers (`09-CLAIMS-LEGAL-AND-IP-REGISTER.md`, `CLAIMS-CHECK.md`) gate every public statement.
- Nothing in this repository authorizes production, DNS, signing, app-store submission, live connectors, secrets, payments, or deployment.
