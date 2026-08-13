# File inventory

The authoritative path-by-path inventory, byte size and SHA-256 are generated into `MANIFEST.json` and `SHA256SUMS.txt` after all final evidence files are present.

## Main groups

| Path | Contents |
|---|---|
| `00-START-HERE.md` … `10-IMPLEMENTATION-MASTER-PROMPT.md` | reconciled product, UX, architecture, privacy, gate and handoff specification |
| `apps/workplace` | React/Vite responsive local prototype and UI tests |
| `apps/api` | fail-closed Fastify reference API and API tests |
| `packages/contracts` | strict schemas, deterministic policies and contract tests |
| `contracts` | OpenAPI and feature-evidence JSON schema |
| `docs` | ADRs, inventories, test matrix and audit prompt |
| `source-plans` | four original planning inputs preserved verbatim |
| `templates` | feature, IP and release-gate CSV templates |
| `scripts` | policy scan, compiled-API smoke and hardened manifest tooling |
| `evidence/visual` | ten final screenshots and capture metrics |
| `evidence/SBOM.cyclonedx.json` | production-dependency CycloneDX 1.5 SBOM |
| `AUDIT-REPORT.md`, `TEST-RESULTS.md`, `VISUAL-QA-REPORT.md` | final review evidence |

## Deliberately excluded from the ZIP

- `node_modules`;
- generated `dist` directories and source maps;
- coverage and log files;
- `.env` and other local environment overrides;
- nested ZIP files.

Use `npm ci && npm run verify` to reconstruct and verify build output from the lockfile.
