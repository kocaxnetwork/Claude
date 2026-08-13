# Release notes — v1.0.0 reference handoff

## Included

- responsive Personal Buddy Workplace prototype with Today, Chat, Tasks, Buddy and Control;
- code-native faceless Buddy fallback and renderer-independent avatar/wardrobe contracts;
- fail-closed in-memory Fastify reference API;
- strict TypeScript/Zod contracts for identity, defaults, memory, connections, actions, approvals, receipts, avatar and Buddy Passport;
- OpenAPI and feature-evidence contracts;
- 45 automated tests plus compiled API smoke;
- source plans, decision register, architecture, threat model, gates, ADRs and runbooks;
- independent audit, test report, visual QA, 10 screenshots, SBOM, manifest and checksums;
- Windows and POSIX local-start/verify helpers.

## Audit-driven corrections

- isolated session-only memory and excluded it from portable exports;
- repaired expiry/delete lifecycle and rejected already-expired creation;
- made compiled API output runnable under plain Node;
- added server-issued approval challenge binding, server-derived Workplace surface, replay/pause enforcement and R3 fail-closed behavior;
- made canonical wardrobe catalog metadata authoritative;
- removed unproven live/security status claims;
- corrected responsive avatar, lifecycle UI, state-derived counts and unavailable controls;
- hardened static scans and release manifest verification.

## Explicitly not included

No production authentication/database, live Messenger transport, E2EE claim, connector, external execution, payment, official character art, signed asset manifest, deployment, DNS, signing or legal approval is included.
