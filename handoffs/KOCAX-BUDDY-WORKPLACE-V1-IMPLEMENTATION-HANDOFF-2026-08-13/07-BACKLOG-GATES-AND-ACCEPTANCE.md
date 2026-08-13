# Backlog, gates and acceptance

## Execution order

### Gate 0 — canonical source and ownership

- complete repository, deployment and mobile identity inventories;
- capture branch, HEAD, tree hash, remotes, owners and clean status;
- scan approved targets for Kiramate contamination;
- prove backups and writer controls;
- freeze exact allowed repositories/worktrees.

Exit: independent reviewer approves exact SHA-bound targets. No build from ambiguous folders.

### Gate 1 — architecture and data flows

- choose identity provider/passkey flow;
- map KocaX Messenger, Workplace, gateway, DB, objects, logs and model routing;
- approve personal-only datastore boundary;
- approve versioned contracts and retention schedule;
- perform DPIA assessment decision.

### Gate 2 — Messenger trust

- reproduce current verifier and crypto findings;
- freeze one protocol description;
- independent review of keys, prekeys, handshake, ratchet, AEAD, nonces, replay, groups, backups and device change;
- separate human and Buddy security UI;
- align public copy and store privacy labels.

### Gate 3 — native Buddy alpha

- integrate five-tab shell into verified client worktree;
- real account/device sessions;
- native Buddy chat, tasks and session-only memory;
- server-side tenant isolation;
- pause and activity events;
- no external connectors.

### Gate 4 — Memory Vault and avatar

- memory provenance, edit, lock, expire, export and delete E2E;
- original character rights package;
- signed catalog/asset verification;
- renderer adapter, static fallback, offline cache and reduced motion;
- cross-device appearance sync with truthful privacy copy.

### Gate 5 — bounded actions

- one calendar connector only;
- proposal/policy/approval/executor process separation;
- durable idempotency, outbox, fencing and reconciliation;
- exact approval plus step-up;
- real actual-result receipt and undo where supported;
- adversarial permission/prompt-injection testing.

### Gate 6 — data rights, operations and consumer readiness

- export/import Buddy Passport;
- delete across stores/index/cache plus documented backup expiry;
- encrypted off-host backup and clean-host restore;
- monitoring, incident, abuse and support runbooks;
- exact pricing, VAT, allowance, terms, withdrawal and cancellation;
- 18+ gate and first-interaction AI disclosure.

### Gate 7 — closed beta and independent audit

- 25–50 invited adult testers;
- no open P0; P1s closed or explicitly owner-accepted where policy permits;
- verified mobile/accessibility/performance matrix;
- real screenshots from release candidate;
- feature/claim evidence ledger complete.

## Acceptance suite

1. Fresh adult account creates exactly one Buddy with KocaX only.
2. Defaults are Guided, session-only, external actions locked, notifications off.
3. User completes a useful native task in NL and EN.
4. Five tabs work with renderer disabled.
5. Display-name change never changes `buddy_id`.
6. Second device loads same approved profile without copying secrets.
7. Missing/corrupt avatar assets fall back without blocking Chat/Control.
8. Reduced motion and static fallback pass keyboard/touch/screen-reader tests.
9. Visual state reflects real backend state; renderer receives no private content.
10. Tampered/downgraded/oversized catalog fails closed.
11. Every memory exposes provenance and full lifecycle controls.
12. Pause/revoke is immediate.
13. R2 proposal shows exact destination and data; rejection changes nothing.
14. Edited payload/target invalidates approval; replay fails.
15. Retry creates at most one real-world effect.
16. Cross-user retrieval fails at all storage/transport layers.
17. Human and Buddy security labels are truthful and distinct.
18. Passport contains no token, password, API key or encryption key.
19. Clean-host restore and catalog rollback succeed.
20. Customer-visible UI/logs/messages leak no internal identities.
21. Every shipped claim maps to release evidence.
22. If payment is enabled, cancellation/withdrawal/export/delete are self-service.
23. No release with unresolved Messenger P0/P1 or unclear core-character ownership.

