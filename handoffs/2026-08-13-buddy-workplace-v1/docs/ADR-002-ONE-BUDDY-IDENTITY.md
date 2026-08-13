# ADR-002 — One canonical Buddy identity

**Status:** Accepted

One personal user gets one canonical `buddy_id`. Device, display name, model, renderer or future social channel changes do not create a second Buddy. External identifiers are subordinate connection mappings. Raw transcripts stay separated by channel unless the owner explicitly selects a bounded handoff.

The server derives Buddy/workspace ownership from authenticated identity. Clients and webhooks never choose arbitrary owner IDs.

