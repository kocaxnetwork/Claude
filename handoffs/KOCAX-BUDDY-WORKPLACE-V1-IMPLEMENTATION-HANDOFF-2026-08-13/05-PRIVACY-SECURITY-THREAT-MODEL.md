# Privacy, security and threat model

## Protected assets

- owner identity and sessions;
- Buddy profile and canonical ID;
- conversations, attachments and memory;
- tasks, routines and notification history;
- permissions, approvals and receipts;
- OAuth/API credentials;
- avatar catalog, rights and integrity metadata;
- exports, deletion events and subscription state.

## Main threats and required controls

| ID | Threat | Control in reference | Production evidence still required |
|---|---|---|---|
| T-01 | Cross-user retrieval | Store queries always filter server-derived workspace; API test | DB/RLS/cache/object/search/queue/live-event isolation tests |
| T-02 | Silent long-term memory | Zod contract + explicit-consent policy + tests | UI/API/database/deletion E2E evidence |
| T-03 | Sensitive auto-save | Owner-selected condition + denial test | Classifier/eval/red-team proof |
| T-04 | External-channel approval | Capability matrix denies R2/R3 + tests | Real adapter contract tests and webhook verification |
| T-05 | Approval substitution | Exact payload/target/type/workspace/environment/expiry/nonce-digest binding, server-derived Workplace surface and in-memory single-use | Durable transactional nonce store and trusted step-up provider evidence |
| T-06 | Duplicate external action | Idempotency field specified | Durable outbox, executor fence and reconciliation tests |
| T-07 | Model bypasses policy | Separate contract functions | Separate runtime/process identity and tool isolation |
| T-08 | Secret leakage | Passport allowlist and static scans | Vault, log/prompt/browser trace tests |
| T-09 | Misleading AI E2EE | Explicit AI security disclosure | Independently verified human-chat protocol and claims |
| T-10 | Renderer receives private content | Strict visual-event schema | Browser/mobile network trace and renderer adapter audit |
| T-11 | Malicious avatar pack | Strict metadata shape, no URLs in item schema | Signed manifest, pinned key, decode limits and rollback |
| T-12 | Broken deletion claim | No “fully erasable” claim | Active stores, indexes, caches and backup-expiry rehearsal |
| T-13 | Prompt injection from files/web | Not implemented | Scan/quarantine, isolation, instruction hierarchy and evals |
| T-14 | Internal identity leakage | Public-source static scan | Runtime/log/screenshot/public-site evidence |
| T-15 | Production execution from preview | API execution hard-disabled, server opt-in | Environment separation, credentials and release controller |
| T-16 | Session context becomes durable | Per-session transient store, second-session negative test and Passport exclusion | Production session lifecycle/TTL and crash/restart evidence |

## Data minimization

- External raw transcripts remain channel-local by default.
- No unrelated contacts, groups or account history ingestion.
- Memory persistence requires explicit owner choice.
- Renderer gets state, bounded intensity, approved viseme, sequence and optional expiry only.
- Passport uses an allowlist; credentials and keys are structurally excluded.
- Receipts contain actual outcome but should avoid private content where a digest/reference is enough.

## Honest crypto language

Human-to-human E2EE and Buddy AI processing are different security modes. Buddy must process authorized plaintext to answer. Therefore the Buddy AI thread must not display a badge implying KX cannot process it. Public human-E2EE language remains blocked until the full Messenger implementation and verifier pass independent review.

## Incident triggers

Immediately pause and block release for:

- suspected cross-account exposure;
- unauthorized R2/R3 action;
- secret in prompt, log, browser storage or channel;
- invalid avatar signature accepted;
- missing/corrupt assets blocking core Workplace/Chat;
- deletion/export inconsistency;
- public unsupported security claim;
- lost canonical repository/rights evidence.
