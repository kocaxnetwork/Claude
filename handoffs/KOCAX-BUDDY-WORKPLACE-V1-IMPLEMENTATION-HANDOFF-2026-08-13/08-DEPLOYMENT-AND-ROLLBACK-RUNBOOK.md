# Deployment and rollback runbook

## Current authorization

Only local loopback preview and tests are authorized by this package. The commands below for production are checklists, not execution permission.

## Local preview

```bash
npm ci
npm run verify
npm run dev
```

## Production preconditions

- exact repository/branch/SHA approved;
- clean worktree and single writer lease;
- independent audit result attached to same SHA;
- production identity and secrets stores configured without secrets in source;
- database migrations rehearsed on disposable copy;
- backup and clean-host restore demonstrated;
- external execution and connectors disabled by default;
- feature and renderer kill switches verified;
- public claims built from release evidence;
- owner approves deploy target and release digest.

## Staged release

1. Build exact SHA in clean environment.
2. Generate SBOM, test report, manifest and artifact digest.
3. Deploy protected preview; do not touch public DNS.
4. Run smoke, isolation, network trace, CSP and accessibility checks.
5. Approve small internal cohort.
6. Review errors, performance, privacy traces and catalog integrity.
7. Increase cohort only after signed gate decision.
8. General availability requires separate approval.

## Rollback triggers

- cross-account exposure or authorization ambiguity;
- unauthorized action or duplicate external effect;
- suspected secret or private-content leak;
- invalid asset/catalog signature accepted;
- renderer blocks Messenger/Control;
- crash/performance threshold breached;
- profile/schema migration loses appearance or memory controls;
- unsupported privacy/security claim published;
- cancellation/delete/export failure after payment activation.

## Rollback actions

1. Activate global external-execution kill switch.
2. Disable affected connector/renderer feature flag.
3. Preserve privacy-safe evidence and action receipts.
4. Restore last-known-good client/catalog/schema through the release controller.
5. Reconcile outbox/executor state before resuming.
6. Notify owner and incident roles; assess user/regulatory notification obligations.
7. Do not resume until the root cause, isolation and clean restore are independently verified.
