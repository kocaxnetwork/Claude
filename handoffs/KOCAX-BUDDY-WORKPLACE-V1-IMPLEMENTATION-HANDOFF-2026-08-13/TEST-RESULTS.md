# Test results

**Final verification date:** 13 August 2026  
**Runtime requirement:** Node.js 24+ and npm 11+  
**Result:** PASS

## Automated verification

Command:

```bash
npm run verify
```

Results:

| Stage | Result | Evidence |
|---|---|---|
| Static policy scan | PASS | 20 public files and 83 package text files scanned |
| Contracts typecheck | PASS | TypeScript, no emit |
| API typecheck | PASS | TypeScript, no emit |
| Workplace typecheck | PASS | TypeScript, no emit |
| Contracts tests | PASS | 17/17 |
| API tests | PASS | 17/17 |
| Workplace tests | PASS | 11/11 |
| Total automated tests | **PASS** | **45/45** |
| Contracts build | PASS | compiled ESM and declarations |
| API build | PASS | compiled ESM |
| Workplace build | PASS | Vite production bundle |
| Built API smoke | PASS | loopback listener and disabled-execution health response |

Final Workplace bundle observed during verification:

- HTML: approximately 0.68 kB;
- CSS: approximately 21.48 kB, 5.76 kB gzip;
- JavaScript: approximately 288.67 kB, 85.95 kB gzip.

## Dependency and supply-chain checks

```bash
npm run audit:dependencies
```

Result: **0 reported vulnerabilities**.

A production-dependency CycloneDX 1.5 SBOM is included at `evidence/SBOM.cyclonedx.json` (51 components, 52 dependency entries at generation time).

## Clean-room reproducibility

The package was copied without `node_modules`, build output, coverage, manifest or checksums. From that clean copy:

```bash
npm ci
npm run verify
```

Both commands passed. This demonstrates that the handoff is reconstructable from source and `package-lock.json`, without relying on the working installation.

## Coverage highlights

- personal-only bootstrap and strict safe defaults;
- unauthenticated fail-closed behavior and cross-workspace memory isolation;
- persistent-memory consent denial and per-session transient memory isolation;
- Passport exclusion of secrets, session-only, deleted and expired memory;
- expiry creation/PATCH/read/export lifecycle and terminal deletion;
- external/native-Messenger approval denial in policy contracts;
- server challenge binding, wrong nonce, replay, pause and R3 fail-closed;
- non-executing receipts;
- renderer event privacy/bounds and canonical wardrobe catalog metadata;
- five tabs, truthful transport/security copy, disabled unavailable controls;
- state-derived Today counts, task toggling, memory forget and stable Buddy ID;
- local pause blocks preview approval controls.

## Known limits

These tests cover the standalone in-memory reference only. They do not constitute production database isolation, real authentication, real Messenger cryptography, real connectors/actions, backup/deletion proof, accessibility certification or legal approval.
