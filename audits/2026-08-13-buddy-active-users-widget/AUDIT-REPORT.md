# Independent audit — KocaX Buddy Active Users Widget v1.0.0

**Audit date:** 13–14 August 2026
**Audited object:** `handoffs/KOCAX-BUDDY-ACTIVE-USERS-WIDGET-v1.0.0/` — outer zip SHA-256 `f8b866790d5876cc964ca2064b07fda4f19978b8222a3f445f95765ab2f4e282`, **6/6 files verified** against the package's own `SHA256SUMS.txt`.
**Method:** full code and packaging review inside the 72-agent orchestrated audit (dedicated sweep + adversarial verification of each P0/P1 candidate; one candidate was **refuted** in verification and one downgraded — recorded below). Raw findings: `../2026-08-13-buddy-launch-content/FINDINGS-DATA.json` (key `widget`).

## Verdict up front

**The code is the most honest artifact in the launch set** — it does what its README promises, refuses to fabricate, and fails closed. The problems are contextual, not structural: it is packaged as an immediately deployable "drop-in" for a presence backend that does not exist, its integration note pre-empts an open Gate-0 decision, and a handful of copy/hardening details would mislead or expose if shipped as-is. **GO as reference code; NO-GO for deployment** until the presence backend exists, the live gates close, and the P1/P2 fixes land.

## Verified positives (adversarially spot-checked against the code)

- **No fabricated fallback anywhere** — README says it, `INTEGRATION-NOTE.md` forbids it ("Do not replace unavailable data with a random, estimated, seeded, or marketing number"), and the code honors it: invalid/absent data → 503 / explicit unavailable state, never a number.
- Fail-closed count validation on **both** server (`route.ts:54–60`) and client (`BuddyActiveCounter.tsx:32–38`); non-numeric/NaN/negative → error state.
- Aggregate-only privacy contract with an explicit ban on returning identities to the public route; token server-side only; generic error bodies; `no-store` + `nosniff` headers; bounded 5s upstream timeout; abort-on-refetch.
- Polling clamped to ≥15s exactly as documented; paused while the tab is hidden.
- Reduced-motion genuinely implemented (all three animations disabled under `prefers-reduced-motion`); real screen-reader support (`aria-live="polite"` + `aria-atomic`, decorative elements hidden); status conveyed by text, not color alone; singular/plural handled.
- No cookies, localStorage, analytics or third-party requests — compatible with the cookieless launch requirement (L-20).
- `MANIFEST.json` honestly records `productionDataIncluded: false`; package hashes verify 6/6.

## Findings

### P1 (confirmed)

1. **Unavailable-state copy asserts "Buddy is reconnecting automatically."** (`BuddyActiveCounter.tsx:172`; also "Live refresh temporarily unavailable" `:164`) — deployed today it would render permanently, implying a live Buddy network momentarily unreachable when none exists. Differentiate `PRESENCE_NOT_CONFIGURED` from transient failure in the client and use neutral copy ("Live activity is not available"). *(Downgraded from P0 in verification because deployment is already hard-gated; the copy defect itself stands.)*
2. **Window mismatch:** if `BUDDY_PRESENCE_API_URL` already carries `windowMinutes` (e.g. 60), the route keeps it (`route.ts:33–35`) yet still returns hardcoded `windowMinutes: 5` (`:65`) — the UI would claim "last 5 minutes" over a 60-minute count, an inflated activity claim. Echo the effective window or strip the param.
3. **`INTEGRATION-NOTE.md` targets `E:\kocaexpress-v3` as "the current canonical KocaExpress repository"** — canonical repos are an open owner decision (O-003, default "Geen integratie of deploy") and Gate 0 requires an approved SHA-bound inventory before any build. The note is valuable evidence (first concrete canonical-repo pointer — now recorded in the Gate-0 inventory trail) but must not be executed until Gate 0 closes.
4. **"Drop-in" framing with no deployment preconditions** — README presents immediate integration into the homepage//buddy page while the brain state is production NO-GO including free public betas. Add a preconditions block gating on the presence backend + live gates.

### P2

- **Stale-state masking:** after one success, failures keep the old number indefinitely as "recently active" with no timestamp or decay to unavailable; track `lastSuccessAt`, show it, and drop to unavailable after a bound.
- **English-only consumer copy** on an NL-first consumer site; ship NL default + EN by locale (all mandated consumer texts in the dossier are NL+EN).
- **Public endpoint hardening:** no server-side cache or rate limiting on `GET /api/buddy/active-count` (L-14 makes rate limiting a live-blocking baseline); add a 10–30s shared cache + per-IP limits.
- **SSRF/token-egress:** the route fetches whatever URL the env var holds and attaches the Bearer token — enforce `https:` and validate hostname against an allowlist before fetching.
- **Privacy purpose gap:** a public activity counter requires per-user last-activity tracking — a processing purpose absent from the privacy statement's purpose table; also add a k-anonymity floor (suppress below ~10 active users; at launch the count would be ~0, which is its own marketing argument against deploying it early).
- **No feature-evidence entry:** add a `kx.feature.evidence.v1` record for `buddy.active-count` (status `planned` today) per the brain's evidence discipline.
- **"Buddy network" eyebrow + always-blue badge** imply liveness in every state; make the badge state-truthful.

### P3

- `INTEGRATION-NOTE.md` names "MATE" and "Buddyfather" — the static policy scan treats those as forbidden public-identity strings; reword without naming them.
- Malformed env URL reports as `PRESENCE_UNAVAILABLE` (transient) instead of `PRESENCE_NOT_CONFIGURED`; parse before the try-block.
- Upstream `updatedAt` republished after only a typeof check; validate as ISO-8601 within plausible bounds.
- `aria-label="Buddy live activity"` in every state including unavailable; use neutral "Buddy activity".

### Refuted in verification (recorded for honesty)

- *"Route stamps its own time as `updatedAt` when upstream omits it — fabricated freshness."* The code observation is accurate (`route.ts:66–69`), but the P1 framing failed adversarial review: the stamp reflects when the count was fetched, the field is not consumer-facing today, and the cited brain rule was applied out of context. Kept as part of the P3 `updatedAt` validation note only.

## Closing block

**Overall verdict:** GO as reference code — the honest-by-design pattern (no fabricated numbers, fail-closed, aggregate-only) should be the template for every future public widget. NO-GO for deployment: no presence backend exists, the live gates are open, and integration would pre-empt Gate 0.

**Blocking (for deployment):** presence backend existence + live-gate closure; P1-1/P1-2 copy/window fixes; Gate-0 approval of the target repository.

**Non-blocking:** P2/P3 list.

**Missing evidence:** presence backend inventory + privacy-purpose registration; feature-evidence record; Gate-0 approval for `E:\kocaexpress-v3`.

**Required corrections:** apply P1/P2 fixes; NL localization; then hold until the register's live decision changes.
