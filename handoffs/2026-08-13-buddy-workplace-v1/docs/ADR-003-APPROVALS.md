# ADR-003 — Deterministic action approvals

**Status:** Accepted

Models may draft or propose but never authorize or directly execute a consequential action. R2 uses exact Workplace approval. R3 is excluded from Personal v1 and fails closed as `STEP_UP_UNAVAILABLE`; any later production design requires step-up evidence from a trusted server-side verifier.

The reference server issues a challenge and stores its digest in the action. The approval binding contains action type, payload digest, target, workspace, environment, expiry, nonce digest and authenticated approver. The API derives the `workplace` surface and native channel rather than trusting browser assertions. Any binding change invalidates approval. External channels are notifications/conversation only and cannot approve R2/R3.

The preview consumes the challenge and action once in one process. Production additionally requires a durable transactional nonce store, trusted step-up verifier, outbox, executor fence, idempotent provider call and reconciliation. None is claimed by the in-memory preview.
