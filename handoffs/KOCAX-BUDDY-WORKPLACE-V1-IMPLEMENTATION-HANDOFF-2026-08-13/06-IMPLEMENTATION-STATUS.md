# Implementation status

Status vocabulary:

- **Implemented:** code and automated test exist in this package.
- **Prototype:** interactive local UX exists; no production backend claim.
- **Specified:** contract or plan exists without complete implementation.
- **Deferred:** deliberately after native core.
- **Blocked:** required evidence or upstream gate is missing.

| Capability | Status | Evidence/limit |
|---|---|---|
| Five-tab responsive Workplace | Prototype | `apps/workplace`; local interaction tests |
| Today | Prototype | State-derived local preview status and approval card |
| Buddy native Chat UI | Prototype | Local-only messages; honest AI disclosure |
| Human Messenger chat | Blocked | Existing Messenger audit/security gate |
| Tasks | Prototype | Local in-browser tasks only |
| Memory Vault UI | Prototype | Local forget action; not persistent |
| Memory consent policy | Implemented reference | Explicit-consent policy, per-session transient store, expiry/delete lifecycle and Passport exclusion tests |
| Safe default policy | Implemented | Guided, session-only, KocaX-only, actions locked and notifications off in strict contract/bootstrap test |
| Control/permissions view | Prototype | Displays policy; production grant store absent |
| Global pause UX/API | Implemented reference | Blocks approval/challenge immediately in one in-memory process; no distributed workers |
| Exact R2 approval policy | Implemented reference | Server-derived Workplace surface, server challenge digest, exact binding, replay test; no durable production nonce store |
| R3 approval | Blocked fail-closed | Always denied as `STEP_UP_UNAVAILABLE`; trusted verifier absent |
| External action executor | Blocked | Hard-disabled by design |
| Action receipt | Implemented reference | `not_executed` receipt only |
| Cross-user API isolation | Implemented reference | Two-session negative test; no real DB layers |
| Renderer-independent avatar profile | Implemented | Strict schema and compatibility function |
| Full production avatar renderer | Blocked | No Gate-0 repo evidence, final art or rights |
| CSS/static avatar fallback | Prototype | Code-native visual fixture only |
| Wardrobe catalog integrity | Implemented reference | Canonical catalog metadata wins over caller substitution; signed manifests remain blocked |
| Buddy Passport | Implemented reference | Allowlisted export excludes secrets, deleted/expired/session-only memory; no import/migration yet |
| Built reference API | Implemented reference | Compiled ESM package plus loopback server smoke test |
| Passkeys/device registry | Blocked | Identity provider undecided |
| KocaX Messenger transport | Blocked | Canonical repo and crypto gate needed |
| Calendar connector | Specified | First eligible integration; no OAuth/live effect |
| WhatsApp/Telegram/Discord | Deferred | Displayed as planned only; no connector code |
| File scan/quarantine | Specified | No file upload in preview |
| Subscription/€19.99 | Blocked | Unit economics, VAT, terms, withdrawal/cancel pending |
| Self-service deletion | Blocked | UI explanation only; no stores/backups |
| Production deployment | Blocked | Gate 0 and subsequent gates incomplete |

## Current verdict

**GO:** inspect, run, test and independently review this standalone package.  
**NO-GO:** copy into production, deploy, advertise features as live, connect real accounts, accept payment or publish strong security/privacy claims.
