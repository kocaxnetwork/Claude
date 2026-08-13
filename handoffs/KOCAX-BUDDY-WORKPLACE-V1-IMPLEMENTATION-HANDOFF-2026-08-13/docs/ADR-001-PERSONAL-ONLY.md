# ADR-001 — Personal-only product boundary

**Status:** Accepted  
**Date:** 13 August 2026

## Decision

Buddy Workplace contains Personal KocaX Buddy only. Business automation is KocaX Operations and may use KocaX Business OS, but it has no Buddy character, Buddy route, Buddy memory or workspace switch in this product.

## Consequences

- no `/buddy/business`;
- no CRM, finance, staff, quoting or company workflows;
- no Business datastore or tenant models here;
- navigation and copy cannot imply a business Buddy;
- future cross-product transfer requires a separately reviewed explicit copy flow, never shared retrieval.

