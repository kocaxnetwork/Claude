# KocaX Brain

Canonical knowledge repository for KocaX product work. Plans, handoff packages, and audits connect here so that every implementation session starts from verified, versioned context instead of loose files.

**Owner:** kocaxnetwork · **Working machine:** "Horse" (the owner's computer, where complete packages and canonical repositories live) · **This repo:** the shared brain that cloud/agent sessions read from and report into.

## Structure

```
handoffs/   Immutable handoff packages, one dated directory each, stored verbatim.
            Never edit files inside a handoff — re-export a new dated package instead.
audits/     Independent audit results for each handoff: findings, Gate-0 inventory,
            and evidence gaps. One dated directory per audited package.
```

## Contents

### handoffs/2026-08-13-buddy-workplace-v1/

KocaX Buddy Workplace v1 implementation handoff (Personal Buddy only), as uploaded on 13 August 2026. **Partial export: 39 of the 99 files listed in its own `SHA256SUMS.txt`** — all 39 verify byte-exact (no tampering); the complete package remains on Horse. Start with the package's `00-START-HERE.md`.

### audits/2026-08-13-buddy-workplace-v1/

Independent adversarial audit of that upload, run per the package's own `docs/INDEPENDENT-AUDIT-PROMPT.md`:

- **`AUDIT-REPORT.md`** — full findings (P0–P3) and the required verdict block. Headline: **NO-GO at Gate 0.** Authentic but incomplete archive; nothing requiring the 60 absent files (API, Zod contracts, all security tests, all evidence) is verifiable; what is present matches the personal-only five-tab contract and is honestly worded.
- **`GATE0-INVENTORY.md`** — repository/deployment/mobile inventory with everything verifiable from the cloud session filled in, and every Horse-only field marked `PENDING ON HORSE`.
- **`MISSING-FROM-UPLOAD.txt`** — the exact 60 files to re-export from Horse.

## Next actions (owner, on Horse)

1. Re-export the **complete** package folder from Horse (zip the whole directory) and verify locally: `sha256sum -c SHA256SUMS.txt` → must report **99/99 OK**.
2. Upload the complete archive to a brain session so it can be connected as a new dated handoff and the audit re-run with real build/test evidence (`npm ci && npm run verify`, Node ≥ 24, npm ≥ 11).
3. Complete the three inventory templates **on Horse** (repository, deployment, mobile identity), including the Kiramate contamination scan of the canonical repositories.
4. Only after Gate-0 turns GO: proceed per `10-IMPLEMENTATION-MASTER-PROMPT.md` (exact allowlist, single writer, owner approval bound to repo + SHA).

## Rules of the brain

- Handoff packages are **immutable evidence** — corrections arrive as new dated packages, never as edits.
- Audits state what was verified and what was absent; absent proof is treated as absent, never assumed.
- Nothing in this repository authorizes production, DNS, signing, app-store submission, live connectors, secrets, or deployment.
