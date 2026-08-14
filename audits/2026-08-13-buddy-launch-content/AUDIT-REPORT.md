# Independent audit — KocaX Buddy launch content ("PROMPT 3", Gemini)

**Audit date:** 13–14 August 2026
**Audited object:** `handoffs/KOCAX-BUDDY-LAUNCH-CONTENT-2026-08-13/` — `LANDING.md` (NL+EN), `ONBOARDING.md`, `EMAILS.md`, `MICROCOPY.md`, `CLAIMS-BEWIJS.md`; provenance in that directory's `PROVENANCE.md` (pasted Gemini transcript, no author-side hashes).
**Method:** orchestrated 72-agent audit — seven independent claim sweeps (one per artifact + one cross-cutting), every P0/P1 candidate adversarially verified by a skeptic agent instructed to refute it against the cited brain texts. One candidate was refuted and one downgraded in verification, confirming the skeptics calibrated rather than rubber-stamped. Raw verified findings: `FINDINGS-DATA.json` in this directory.
**Reference corpus:** the legal dossier (`KOCAX-BUDDY-LEGAL-COMPLIANCE-2026-08-13`), the verified implementation handoff (`KOCAX-BUDDY-WORKPLACE-V1-IMPLEMENTATION-HANDOFF-2026-08-13`), and the frozen decision registers in both.

---

## Verdict up front

**NOT PUBLISHABLE AS DELIVERED.** The copy is well-written, sober in tone, and honest in several places the brain demands honesty (no-E2EE disclosure, "Technisch gezien ja" FAQ, exact frozen pricing, `<<INVULLEN>>` discipline, flat denial of non-existent integrations, zero internal-codename leaks). But it asserts gated register items as accomplished facts, contains one legally incorrect statement about consumer withdrawal rights, misdescribes two product mechanisms, diverges from copy the legal dossier mandates verbatim, and its own claims-evidence table validates against the generating briefing instead of against evidence — including three rows certifying exactly the claims the brain marks Blocked/Forbidden.

The root cause is structural: **the Gemini briefing presented unproven register items ("Gehost in de EU", "geen AI-training", "alles verwijderbaar") as verified facts, and the generator worked flawlessly from poisoned premises.** Every future content generation must source its fact list from the brain's claim ledgers, not from a self-contained prompt.

## P0 — publication-blocking (all adversarially confirmed)

**P0-1 · "Al onze servers staan binnen de Europese Unie."** (`LANDING.md:32/:105`)
Factually false: only the Supabase primary DB and the Vercel function region are Frankfurt-pinned; Vercel names US primary processing facilities, OpenRouter, Inc. is US-based, and inference/support/subprocessors can process outside the EEA (`CLAIMS-CHECK.md:31` — "ALLEEN ZEER NAUW GEBRUIKEN"; frozen decision `00-START-HERE.md:43`; `PRIVACY.md:111–114,141`). Combined with the FAQ's "je berichten passeren onze servers", a consumer concludes readable chat stays in the EU — it doesn't.
*Fix:* use the row-31 approved formulation naming Frankfurt components **and** the non-EEA routes, linking the privacy statement.

**P0-2 · "wissen we al je gegevens definitief" / "we permanently erase all your data."** (`LANDING.md:33/:106`, repeated `:65/:138`, `EMAILS.md:52`)
False against the dossier's own retention table: 7-year fiscal administration, 5-year contract/withdrawal/consent evidence, 5-year deletion receipts, backups until cycle overwrite (`PRIVACY.md:158–170`); "Fully erasable" is marked **Forbidden** in the implementation claim ledger (`09-CLAIMS-…:11`); `CLAIMS-CHECK.md:44` requires the exceptions stated in the same visible context or the fallback copy. The capability is also **Blocked** today (`06-IMPLEMENTATION-STATUS.md:40`).
*Fix:* row-44 fallback: "Je kunt je Buddy-gegevens exporteren en een verwijderverzoek doen; sommige administratie moeten we wettelijk bewaren" + concrete backup window; publish only after L-09/L-11/L-12 close.

**P0-3 · Welcome email: "Hierdoor doe je afstand van je wettelijke herroepingsrecht van veertien dagen."** (`EMAILS.md:11`)
Legally incorrect, and the exact opposite of the frozen construction: the 14-day right **remains**; direct start on express request only permits a pro-rata charge on withdrawal, never more than €19,99, and the right is not lost by logging in or chatting (`TERMS.md:105,117–119` — Option A; `00-START-HERE.md:37`; E-03). Telling customers they waived it is a false legal claim to consumers.
*Fix:* Option-A-consistent copy (right retained, pro-rata on withdrawal, "Overeenkomst hier herroepen" route + model form), sent only to customers who actually recorded the direct-start choice.

**P0-4 · Onboarding: "Er gebeurt niets zonder dat jij expliciet op een knop klikt."** (`ONBOARDING.md:16`)
Absolute that is false on its face — answering, external AI processing, logging and session handling all happen without clicks. `CLAIMS-CHECK.md:43` explicitly scopes this claim family to **external actions**; the approved copy is "Buddy voert geen externe actie uit zonder jouw uitdrukkelijke goedkeuring." The same overreach recurs on the landing hero ("elke actie", `LANDING.md:5`) and FAQ ("nooit zelfstandig", `:53`).

**P0-5 · The launch premise: live in 6 days.**
The register is NO-GO with 21 live blockers + 11 first-euro gates. Its own realistic net working-time estimates sum to **~31–64+ working days**, explicitly *excluding* supplier, lawyer, pentester and AP waiting time; L-13's Article-36 consultation alone can take ~8 weeks if triggered (`RISICOREGISTER.md:17,35,62–72`). All five artifacts presuppose a live paid service (active subscriptions, processed payments, invoices, suspension threats).
*Fix:* treat all five artifacts as draft copy with no publication date until every L- and E-row is evidenced closed.

**P0-6 · The claims-evidence table certifies gated claims as facts and misses the worst claim.** (`CLAIMS-BEWIJS.md`)
Rows 10–12 certify "Geen AI-training.", "Gehost in de EU." and "Volledige export en verwijdering." as supported by briefing "Feiten" — the brain marks all three gated/Blocked/Forbidden (L-05/L-06, L-04, L-09/L-11 open). The table's entire evidence column is the generating briefing (circular by construction), it sweeps only the landing page (emails, microcopy, onboarding surfaces unregistered), and it has **no row** for the withdrawal-right waiver — the single most dangerous sentence in the package.
*Fix:* rebuild the table with evidence keyed to the brain: closing register row (L-xx/E-xx), `kx.feature.evidence.v1` entry, or test artifact per claim — never a briefing.

## P1 — must fix before any publication (confirmed; grouped)

**Gated claims stated as current fact:**
- "Geen AI-training" + FAQ "zekerheid dat je data geen modellen traint" (`LANDING.md:31,47/:104,120`) — publishable only after route-by-route proof (L-05/L-06; `CLAIMS-CHECK.md:32`; ledger: Blocked). Use the row-32 qualified alternative; drop "zekerheid".
- Present-tense €19,99 offer + CTA "[ Start met KocaX Buddy ]" (`LANDING.md:38,70`) — Subscription/€19.99 is Blocked (unit economics, VAT, terms pending; O-002).
- "Via het Control-paneel beheer je vanaf vandaag zelf je opgeslagen data en de rechten" (`EMAILS.md:13`) and "je ziet exact wat er is bewaard... elk item wissen" (`LANDING.md:11,18`; `ONBOARDING.md:21`) — Memory Vault and Control are Prototype, deletion Blocked.
- Invoice download, export instructions (`EMAILS.md:26,52`) — flows don't exist (E-08, N-02, L-12 open).

**Product-semantics mismatches (copy describes a different product):**
- **Pause**: sold as a memory-pause ("reageert alleen op je huidige bericht", `LANDING.md:34/:107`; buttons "Pauzeer/Hervat geheugen", `MICROCOPY.md:11–12`) — the product's pause is a **global** Buddy/workspace pause that blocks approvals (`/v1/pause`, 423 WORKSPACE_PAUSED). No memory-scoped pause exists anywhere in the brain.
- **Session end**: two different definitions inside one package ("zodra de sessie stopt" vs "zodra je de app afsluit") while the technical session definition + TTL is a blocking `<<INVULLEN>>` (L-08). Also `MICROCOPY.md:25` "Buddy start zonder context van eerdere gesprekken" is false for users with saved memory items — contradicting the product's own selling point.
- **"Alles gebeurt en blijft binnen de KocaX-app"** (`LANDING.md:24/:97`) — chat content transits Vercel/OpenRouter (US)/model endpoints. Scope it to tasks/reminders artifacts.
- **Data-flow concealment**: "onze servers ... zodat de AI een antwoord kan genereren" never names the third-party AI providers; every mandated brain text does ("geselecteerde AI-providers"). The E2EE scope line names only KocaExpress where the approved copy names KocaExpress **and** the providers.
- **"We lezen niet mee ... nergens anders voor"** (`LANDING.md:50/:123`) — forbidden absolute; TERMS §11 and PRIVACY reserve abuse/security/legal-claims processing. Use the row-26 alternative.
- **ChatGPT FAQ** — unevidenced price claim ("hetzelfde kost") plus implied competitor-trains-on-your-data comparison; both fail the publication gate and the no-unsubstantiated-comparisons rule.

**Mandated literal texts not used:**
- AI-Act first-contact melding: onboarding paraphrases the **exact** mandated text, drops the product name, the "Antwoorden kunnen onjuist zijn"-sentence, the provider-processing sentence, and the privacy link; button "[ Begrepen ]" instead of "Begrepen — chat starten"; delivered only as an onboarding screen while the dossier requires it **in the chat interface before the first input field** plus a persistent "AI-assistent" label (L-17; `AI-ACT-DISCLOSURE.md:14–44`).
- 18+ gate: dossier prescribes a not-pre-checked checkbox with exact text and a specific log record; onboarding ships a button variant with no logging spec (L-19; `18-PLUS.md`).
- Memory save button "Opslaan in geheugen" vs TERMS-quoted "Bewaar dit in mijn geheugen" (L-16 blocks live when terms and product diverge).

**Mandatory elements missing entirely:**
- Microcopy has none of the four legally mandated labels: "Abonneren en € 19,99 per maand betalen", "Abonnement opzeggen", "Overeenkomst hier herroepen", "Herroeping bevestigen" (TERMS §5–§7; E-02/E-03/E-04) — the withdrawal flow has no UI copy at all, and only two of E-05's four exit flows have buttons.
- Email set lacks the mandatory withdrawal-receipt email (TERMS §7.1) and every E-07 durable-confirmation element (price, term, renewal, withdrawal info, model form, provider identity + KvK + address, terms version); all emails are signed bare "KocaExpress" while identity/address are blocking L-01 unknowns.
- Welcome email assumes direct start for **every** customer, contradicting the mandatory un-preselected Option A/B checkout choice; payment-failure email assumes SEPA incasso while the payment provider is an open blocking decision (E-01).
- No terms/privacy acceptance step (version-bound) anywhere in onboarding; no sensitive-data warning/consent gate (L-07) anywhere in the package.

## P2/P3 (39 + 20 inline findings — headline items)

Approval microcopy lacks reject labels and the doel/ontvanger/gegevens/gevolg preview (L-18); no nearing-limit warning (TERMS §8 requires warning + reset date); no paused-state message for the pause buttons the deck ships; fair-use unit pre-committed to "berichten" while the owner decision spans messages/tokens/files/model class; price block omits automatic renewal and the withdrawal right; "permanent geheugen" phrasing vs "langetermijngeheugen"; unsubstantiated "de meeste AI-diensten onthouden alles" generalization; onboarding NL-only while all mandated copy is NL+EN; no cookie-policy link at registration; memory-deletion verb inconsistency ("Wis"/"Vergeet"/"verwijderen"); 7-day suspension window invented (no brain source); "Dag 15" billing-start interplay flagged for counsel. Full list: `FINDINGS-DATA.json`.

## What is genuinely good (keep through every rewrite)

The no-E2EE disclosure made prominent and explained; "Kunnen jullie mijn gesprekken lezen? Technisch gezien ja" — honest server-side readability admission; exact frozen pricing with no invented discounts; `<<INVULLEN>>` discipline on fair-use; flat "Nee" on email/calendar/WhatsApp/Telegram with no "coming soon"; session-only + per-item consent memory narrative matching D-008; Guided propose-then-approve as the core differentiator; 18+/NL-only positioning; medical/legal/financial denial with "controleer de feiten altijd zelf"; reminders described without promising notifications; no cookies/analytics promises; no MATE/Jarvis/Kiramate/Buddyfather leaks anywhere; and the instinct to ship a claims-evidence table at all — the skeleton is right, only its evidence source is wrong.

## Closing block

**Overall verdict:** REJECT for publication in current form; ACCEPT as a strong draft skeleton whose tone, structure and honest elements are worth keeping. Every defect traces to one of four causes: briefing-as-evidence (the poisoned-premise problem), gated claims stated as fact, product semantics invented where the brain already defines them, and mandated literal texts paraphrased.

**Gate approved:** none. Publication remains governed by the risk register (NO-GO, 21+11 open gates).

**Blocking findings:** P0-1 … P0-6 above; the P1 groups block any partial publication of the affected surfaces.

**Non-blocking findings:** the P2/P3 set.

**Missing evidence:** everything the register already lists; additionally a rebuilt claims table keyed to brain evidence, and the mandated withdrawal/first-contact/18+ literal texts wired into the copy deck.

**Predicted next failures:** if this copy ships after only the P0s are patched, the first consumer complaint will hit the absolute FAQ answers ("lezen niet mee", "nergens anders voor"); the first legal exposure will be the missing withdrawal machinery (no UI entry point despite the Dutch online-withdrawal function requirement in force since 25 June 2026); and the AI-Act first-contact placement (chat interface, not onboarding) will fail any Article 50 review.

**Required corrections:** apply the per-finding fixes above; regenerate all future marketing content from a brain-sourced fact sheet (the claim ledgers + implementation status), never from a self-contained briefing; extend `CLAIMS-BEWIJS.md` to every artifact surface with brain-keyed evidence; have the Dutch lawyer review the corrected set together with the legal dossier (the two must ship as one consistent reality).

**Conditions for execution:** unchanged — the register's live decision applies; a limited internal preview with synthetic data remains permitted, public/paid use does not.
