# Independent audit — KocaX Buddy legal & compliance start dossier (concept 1.0)

**Audit date:** 13 August 2026
**Audited object:** `KOCAXBUDDYLEGALCOMPLIANCE20260813_2.zip`, outer SHA-256 `166136d86db5790df8f4a0de0e8810ca0b9f3202c07d4356c123575a3248b277` (matches the digest stated by the owner at delivery)
**Connected at:** `handoffs/KOCAX-BUDDY-LEGAL-COMPLIANCE-2026-08-13/`
**Method:** integrity verification, full read of all 13 files (two parallel independent reviewers for the nine content documents), cross-check against the implementation handoff's frozen decisions and the dossier's own claims rules
**Scope limit:** this is a consistency/completeness audit, **not legal advice and not a legal-validity review**. The dossier itself requires review by a Dutch lawyer (consumer law, AVG, AI-verordening) before publication; nothing here replaces that.

---

## 1. Integrity and structure

| Check | Result |
|---|---|
| Outer zip SHA-256 | Matches owner-stated digest |
| `SHA256SUMS.txt` | **12/12 files verified, 0 mismatches, 0 missing** |
| Content vs `MANIFEST.md` table | All 13 listed files present |
| Standalone `00-START-HERE.md` upload | Byte-identical to the copy inside the zip |
| `RISICOREGISTER.md` structure | Exactly as manifested: **21× BLOKKEREND VOOR LIVE (L-01…L-21), 11× NODIG VOOR EERSTE EURO (E-01…E-11), 6× KAN NA LAUNCH (N-01…N-06)** |
| Forbidden-claims self-test | The six claims the generation brief required verdicts for are all covered in `CLAIMS-CHECK.md` |

## 2. Cross-check against the implementation handoff (frozen decisions)

The dossier and the implementation package describe the same product without conflict:

| Decision (implementation `02-DECISION-REGISTER.md`) | Legal dossier | Verdict |
|---|---|---|
| D-007 Guided default, per-action approval | `00-START-HERE.md:41`, TERMS §3, PRIVACY §5 | Consistent |
| D-008 session-only default, per-item memory consent | `00-START-HERE.md:39`, TERMS §9, PRIVACY §5 | Consistent |
| D-011 no E2EE claim for Buddy AI chat | `00-START-HERE.md:42`, TERMS §10, PRIVACY §1 — explicit non-E2EE disclosure | Consistent |
| D-015 18+, adults-first | `18-PLUS.md` self-declaration approach | Consistent |
| D-016 no payments/high-impact actions in v1 | TERMS §2 exclusions, PRIVACY §5 | Consistent |
| O-002 €19.99 conditional (no price claim in product until gates close) | Dossier freezes €19,99 incl. btw as the plan of record, gated behind E-01…E-11 before first euro | Consistent (dossier is the later, dedicated decision; product still shows no price) |
| Implementation `09-CLAIMS` ledger (forbidden absolutes) | `CLAIMS-CHECK.md` mirrors and extends it | Consistent |

New facts first fixed by this dossier (not present in the implementation package): concrete production stack **Vercel EU + Supabase Frankfurt + OpenRouter (OpenAI/Google/Anthropic endpoints)**, KvK **99592428**, Btw-id **NL005402514B55**, contact `info@kocaexpress.com` / +31 6 19312603, payment provider deliberately open (Stripe recommendation only — zero occurrences of "Stripe" in the published texts, correctly). Entity naming: the dossier says "niet end-to-end versleuteld **tegenover KocaExpress**" where the implementation says "tegen **KX**" — same meaning, one is the legal entity, the other the brand; harmonize wording at publication. Note: KvK/Btw formats are plausible but **not verified against the registry** from this session; the dossier itself marks the owner's full legal name and address as blocking unknowns.

## 3. Findings — consumer-facing documents (TERMS, PRIVACY, 18-PLUS, CONSENT-EN-COOKIES)

Reviewer verdicts: TERMS **ISSUES (7)** · PRIVACY **ISSUES (10)** · 18-PLUS **ISSUES (4)** · CONSENT-EN-COOKIES **ISSUES (7)**. Headline: **no value mismatches anywhere** (price, KvK, Btw, contact, product name, flow labels all consistent across files), and **none of the six forbidden absolute claims appears** ("volledig privé", positive E2EE, "nooit gedeeld", "AVG-compliant", absolute "anoniem", "100%"). The issues are of four kinds:

### 3.1 NL/EN divergence inside binding texts (P1 — fix before publication)

The NL and EN parts are not equivalent where they must be:

- TERMS NL §8 contains fair-use commitments with no EN counterpart (`TERMS.md:129` vs `:325–333`); NL §11's no-general-monitoring sentence is missing in EN (`:165` vs `:353–357`).
- Liability carve-out differs materially: NL "evident **onjuist** AI-antwoord" (`TERMS.md:204`) vs EN "evidently **unreliable** AI output" (`:389`) — different exclusions.
- NL §2 excludes "juridische vertegenwoordiging" (`:33`); EN drops representation (`:263`).
- PRIVACY: NL has 13 sections, EN 12 (children+changes merged); the EN retention section incorporates the Dutch table **by reference** (`PRIVACY.md:284`) — an English-only reader cannot read their retention terms; EN omits the NL analytics-cookie-free start (`:30`), the Art. 19 erasure-notification commitment (`:173`), the one-month extension notice and export-format commitments (`:198–200`).
- No language-precedence clause was reported in TERMS — with divergent texts, which language governs is undefined. Either make the texts equivalent or add precedence (lawyer's call).

### 3.2 Editorial/spec voice left in publishable text (P1)

Drafter instructions sit inside operative consumer text: `TERMS.md:221` ("Noem of link geen geschillencommissie…"), `:403` ("Do not state otherwise without evidence."); engineering-requirement voice inside the privacy notice: `PRIVACY.md:69,79,155,247` ("De software moet … blokkeren", "vanaf live te configureren en te bewijzen"). These must move to internal docs before publication.

### 3.3 Absolutes the dossier's own CLAIMS-CHECK gates (P1)

- "**nooit**/never" fail-closed claims: `PRIVACY.md:133/272` (retry without privacy filters), `CONSENT-EN-COOKIES.md:124/143`.
- Unqualified "**veilig**/securely" in consumer UI copy: `CONSENT-EN-COOKIES.md:12,69,77,91,103` — `CLAIMS-CHECK.md:30` forbids "veilig" without concrete qualification.
- Present-tense operational absolutes ahead of evidence: `TERMS.md:149` and `PRIVACY.md:28` state no-training/zero-retention routing as current fact ("alleen aantoonbaar goedgekeurde routes"); both are hedged nearby and the whole dossier is draft-bannered, but at publication these need either the route-by-route proof (`RISICOREGISTER.md` L-05/L-06) or softer wording.

### 3.4 Open points beyond the tracked placeholders (P2)

- **28 `<<INVULLEN: …>>` placeholders** across the four files (TERMS 13, PRIVACY 13, 18-PLUS 1, CONSENT-EN-COOKIES 1) — all matching the central list in `00-START-HERE.md`; no stray unlisted placeholder categories.
- **Unmarked** open points that should carry markers: five ONZEKER/UNCERTAIN decision points inside publishable text (`PRIVACY.md:77,163,164,249,284`), the sector age-verification question (`18-PLUS.md:165`), JSON template example values (`18-PLUS.md:83–86`), parent-evidence deletion "volgens een korte termijn" with no period and no retention row (`18-PLUS.md:149`, cross-file gap), cookie names/storage behavior pending software choice (`CONSENT-EN-COOKIES.md:31,42`).
- Cross-file loops: cookie-consent evidence retention is delegated to PRIVACY which never names it (`CONSENT-EN-COOKIES.md:176` → `PRIVACY.md:44,166`); the 24-hour session-cookie cap (`CONSENT-EN-COOKIES.md:35`) can silently conflict with the still-open session-TTL placeholder (X2); header blocks are asymmetric — KvK/Btw/address only in TERMS/PRIVACY (X3).
- Withdrawal day-count convention undefined: "dag 15" vs "14 kalenderdagen vanaf de dag waarop u het abonnement afsluit" is only consistent under inclusive counting (`TERMS.md:63,89,109`) — flag for counsel, not a contradiction.
- Architecture fork left open in published text: whether chat content technically bypasses Vercel or a written Vercel solution is obtained (`PRIVACY.md:111`) — already tracked as blocking (`00-START-HERE.md:25`), but the published texts must state the chosen architecture, not both.

## 4. Findings — compliance documents (DPIA, DPA-EISEN, AI-ACT-DISCLOSURE, CLAIMS-CHECK, SOURCES)

Reviewer verdicts: DPIA **ISSUES (4)** · DPA-EISEN **ISSUES (5)** · AI-ACT-DISCLOSURE **ISSUES (5)** · CLAIMS-CHECK **ISSUES (1)** · SOURCES **ISSUES (2, minor)**. Structural completeness is good: the DPIA carries every required element (systematic description, necessity/proportionality, scored risk register of 18 risks, measures, evidence plan, sign-off block, Article 36 path); DPA-EISEN covers every provider with exact settings and evidence methods; the AI-Act file contains the literal NL+EN first-contact texts, placement rules, and Article 50(2) output-marking gate; CLAIMS-CHECK gives verdict + safe alternative + evidence threshold for all six mandated forbidden claims plus extras; SOURCES uses exclusively official/primary domains.

### 4.1 Defects to fix before use (P1)

- **Wrong vendor name "SpaceXAI"** in the five-ZDR-group prose list (`DPA-EISEN.md:195`) — the guardrail JSON four lines below correctly uses `enforce_zdr_xai` (`:207`); the vendor is xAI, SpaceX is a different company. Prose contradicts its own code block.
- **`allow_fallbacks` carve-out contradicts the anchor mandate:** the mandatory request JSON hard-codes `"allow_fallbacks": false` (`DPA-EISEN.md:179`) but the control list allows a non-false value for multiple approved slugs (`:168`), while `00-START-HERE.md:102` commands unconditional `false` with fail-closed mismatch refusal. One rule must win; as written, engineering can implement either.
- **"Broadcast" toggle missing:** the anchor requires Broadcast off alongside Private I/O Logging and input/output-use (`00-START-HERE.md:103`), but the detailed OpenRouter account checklist (`DPA-EISEN.md:214–218`) never mentions it.
- **Residual-risk threshold boundary is self-contradictory:** "restrisico van 10 of hoger blokkeert live" (`DPIA.md:161`) while seven risks have a *target* residual score of exactly 10 (`:167–176`) — hitting every target still blocks live by the document's own rule, and the live-gate list never resolves it. Change the rule to >10, lower the targets, or state the Article 36 consequence explicitly.
- **Absolute claim inside the approved consumer copy:** "Buddy voert geen externe actie uit zonder jouw uitdrukkelijke goedkeuring" (`CLAIMS-CHECK.md:52`) is an absolute negative guarantee that the file's own hoofdregel (`:11`) forbids and the DPIA's open bypass/prompt-injection residual risks (R9/R10, `DPIA.md:175–176`) undercut; use the qualified framing of row 43.
- **Statutory contact channel unverified:** `info@kocaexpress.com` / +31 6 19312603 is the only hard-filled identity fact in the package and is wired into withdrawal, DSAR, minors and security flows across all files — while the mailbox/domain has no verification evidence (and differs from the address the owner uses day-to-day). A dead statutory contact channel is itself a compliance failure; verify domain + mailbox before anything goes live.

### 4.2 Unhedged assertions needing verification or ONZEKER markers (P2)

The dossier's hedging discipline is otherwise good (ONZEKER correctly applied in eight places in DPA-EISEN alone), which makes the unhedged spots stand out: the 2 December 2026 marking-obligation transition date (`AI-ACT-DISCLOSURE.md:96`), the "adequaat bevonden" status of the Transparency Code of Practice (`:77`) which anchors a live-gate route choice, the existence/status of "het officiële EU-icoon" (`:128`), the `allowed_models` field name as the only uncited technical field (`DPA-EISEN.md:181`), and the `enforce_zdr` deprecation claim (`:212`). Also: `DPIA.md:86` asserts in indicative mood that prompts don't reach logs while `:100` lists the proof as an open blocker — and "nooit in logs" is itself unprovable by canary testing; phrase as design goal + test evidence.

### 4.3 Minor (P3)

DPIA lacks a consolidated retention table (only security logs "30 dagen" at `:183`; session/backup terms open — acknowledged blockers); the literal AI-disclosure UI text links `./PRIVACY.md` as a repo-relative path without an INVULLEN step for the production URL; SOURCES records no per-link access dates and item 40 is an EDPB summary rather than the underlying guidelines; DPIA header says "Versie: 1.0" where siblings say "concept 1.0"; the sovereign-routing citation for `eu.openrouter.ai` lives only in SOURCES, not in DPA-EISEN's own list; first-contact copy says "geselecteerde AI-providers" while approved product copy names OpenRouter — harmonize disclosure granularity.

### 4.4 Technical-control inventory (verified consistent)

All five context-required software controls are specified and internally consistent apart from the two deviations above: per-request `zdr: true` + `data_collection: "deny"`, server-side non-overridable `only` allowlist, all five `enforce_zdr_*` guardrail fields (avoiding the deprecated aggregate), Private I/O Logging and input/output-use off, fail-closed on any mismatch (no privacy-weaker retry), CI gate that fails when the flags are absent, forced-failure test, EU in-region routing with global-egress block as the optional hardened path, provider-direct fallbacks (`store:false`, retention paths, EU endpoints) for BYOK scenarios, Vercel `fra1` pinning with the correct no-full-EU-residency caveat, Supabase `eu-central-1`, RLS + least-privilege service keys, no-content logging with canaries, webhook signature/replay/idempotency rules, hosted payment page with no PAN/CVC in own stack, and a deletion orchestrator with restore-no-resurrection.

## 5. Closing block

**Overall verdict:** The dossier is a **structurally complete, internally disciplined start dossier** whose two packages (implementation and legal) describe the same product without factual conflict. Integrity is perfect (12/12), the register is exactly as manifested, no forbidden absolute claim appears in the four consumer documents, and the technical enforcement spec matches the anchor requirements on all five ZDR guardrails. It is **not publication-ready**, by its own declaration and by the findings above — which is exactly what a concept 1.0 with a NO-GO register claims to be. **FIT FOR ITS STATED PURPOSE (lawyer handoff + engineering gate input) after the P1 list is fixed.**

**Gate approved:** none changes. The dossier's own **NO-GO for public paid launch stands** (21 live blockers + 11 first-euro gates, none closed). Connection to the brain is complete.

**Blocking findings (for publication, not for handoff):** the six P1 items in §4.1 plus §3.1 (NL/EN divergence in binding texts), §3.2 (drafter voice in operative text), §3.3 (absolutes gated by the dossier's own CLAIMS-CHECK).

**Non-blocking findings:** §3.4 and §4.2/§4.3 lists.

**Missing evidence:** the 28 `<<INVULLEN>>` values (owner name/address per KvK, payment provider, fair-use limits, session TTL, backup cycle, model/endpoint allowlist, DPA versions, TIA ownership, support terms, EAA status); registry verification of KvK/Btw numbers; contact-channel verification; every evidence artifact the risk register's rows demand.

**Predicted next failures:** engineering implements the `allow_fallbacks` carve-out instead of the anchor mandate (2.2) — make the anchor win; the day-15 billing start collides with the withdrawal window under exclusive day-counting (T5) — have counsel pin the convention; the session-TTL INVULLEN lands above the 24-hour cookie cap (X2); the Vercel architecture fork (P6) surfaces at DPIA sign-off; the residual-risk-10 boundary (2.4) makes the DPIA formally unsignable at target scores.

**Required corrections:** fix the six §4.1 items; equalize or precedence-clause the NL/EN texts; strip drafter/spec voice from publishable copy; qualify "veilig"/"nooit" per CLAIMS-CHECK's own rules; mark the §4.2 assertions ONZEKER or attach sources; close the §3.4 cross-file loops (cookie-evidence retention row, TTL cap, header blocks, parent-evidence retention); then run the dossier's own publication order (`00-START-HERE.md` "Minimale publicatievolgorde") with a Dutch lawyer.

**Conditions for execution:** per the dossier itself — no publication, no checkout, no payment intake until every BLOKKEREND VOOR LIVE and NODIG VOOR EERSTE EURO row is closed with dated evidence, the DPIA is signed by the controller, and a Dutch consumer/AVG/AI-Act lawyer has approved the final texts.
