# ADR-004 — Renderer-independent Buddy avatar

**Status:** Accepted

Canonical profile stores stable product concepts: character, display name, rig/catalog versions, equipped immutable item IDs, palette and motion preferences. It never stores renderer state numbers, remote URLs, layer hacks, chat text or secrets.

Rive may be evaluated as a replaceable 2.5D adapter after source ownership and licensing gates. The current CSS avatar is only a code-native static/fallback prototype. Missing renderer or assets must not block Chat, Tasks or Control.

