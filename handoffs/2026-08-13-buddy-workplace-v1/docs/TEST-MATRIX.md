# Test matrix

| Area | Automated here | Required later |
|---|---|---|
| Contract validation | Zod strict schemas | Fuzz/property tests against production schemas |
| Memory policy | Consent/sensitive denial, session isolation/export exclusion, expiry and terminal delete | Full DB/index/cache/backup deletion E2E |
| Action approval | Channel/surface denial, server nonce binding, replay, pause, exact payload and R3 fail-closed | Durable transaction/idempotency/executor and trusted step-up tests |
| Tenant isolation | Reference API cross-user negative test | DB/RLS/object/cache/queue/search/live-event suite |
| Passport | No-secrets allowlist test | Round-trip version migration and encrypted transport |
| Avatar | State filtering, bounds and canonical catalog metadata | Signed manifests, corrupt/decode bomb, network traces |
| UI | Five tabs, truthful transport/disclosure, state-derived counts, memory, identity, disabled controls and pause | Axe/manual SR, keyboard, touch and broader viewport matrix |
| Build | TypeScript + Vite + compiled API loopback smoke | Mobile/Capacitor, CSP, SBOM and signed release build |
| Visual | Manual screenshot review after local build | Reference baselines across supported devices |
| Crypto | None | Independent KocaX Messenger protocol/verifier audit |
| Recovery | Documentation only | Encrypted backup and clean-host restore drill |
