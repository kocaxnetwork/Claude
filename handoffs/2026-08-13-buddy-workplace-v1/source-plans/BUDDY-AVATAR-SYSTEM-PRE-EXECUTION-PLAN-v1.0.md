# Buddy Avatar System
## Pre-Execution Implementation Plan — Audit Candidate v1.0

**Date:** 13 August 2026  
**Status:** Ready for independent plan audit  
**Execution status:** Prohibited until the required gates are approved  
**Primary product:** Buddy  
**Target surfaces:** KocaX Messenger and Buddy Workplace  
**Excluded systems:** Kiramate, `app.kiramate.mate`, `/Applications/Mate.app`, and every unverified Mate application or repository

---

## 1. Executive decision

KocaX will create a new, original, customer-facing character named **Buddy**. Buddy will be nameable by the user, visually animated, and dressable through a controlled wardrobe system.

The product identities remain strictly separated:

- **Buddy:** public personal companion used by customers.
- **MATE:** internal orchestration and delegation agent.
- **Jarvis/J4:** internal executive, administration, and oversight agent.
- **Kiramate:** third-party or otherwise unowned system; excluded from inspection, reuse, modification, dependency resolution, migration, and design reference.

The first implementation will use a **renderer-independent avatar profile** and a limited **Rive 2.5D proof of concept**. Rive is a replaceable renderer, not the permanent data model.

No production, signing, DNS, deployment, or repository changes are authorized by this plan.

---

## 2. Objective

Build a reusable Buddy Avatar System that:

1. displays a compact Buddy in KocaX Messenger;
2. displays a full-body Buddy in Buddy Workplace;
3. allows users to equip approved clothes and accessories;
4. synchronizes appearance safely across supported devices;
5. reacts to a small, controlled set of assistant states;
6. works offline after the required assets are cached;
7. degrades to a static fallback when animation is unavailable;
8. does not expose messages, prompts, microphone content, contacts, internal agent logs, or other private data to the renderer;
9. remains portable to another renderer in the future;
10. uses only assets, source code, repositories, accounts, licenses, and signing identities demonstrably controlled by KocaX.

---

## 3. Non-negotiable boundaries

### 3.1 Ownership boundary

The following are mandatory before implementation:

- The authoritative KocaX Messenger repository must be identified.
- The authoritative Buddy Workplace repository must be identified or created.
- Repository owner, remote URL, default branch, deployment target, local path, and current commit hash must be documented.
- Mobile bundle/package identifiers and signing owners must be documented.
- A search for `kiramate`, `app.kiramate`, `Mate.app`, and known Kiramate paths must be performed in the approved repositories.
- Any detected Kiramate code, assets, identifiers, documentation, or dependencies must be quarantined for review, not silently deleted or reused.
- No file may be copied from an unverified application merely because its architecture appears useful.

### 3.2 Product identity boundary

The stable internal system identifiers must not depend on a user-selected display name.

Example:

```text
System character ID: buddy-v1
Product name: Buddy
User display name: chosen by the user
```

Changing the display name must not rename repositories, package names, database tables, system roles, or security principals.

### 3.3 Agent boundary

MATE and Jarvis/J4 must not share Buddy’s:

- profile records;
- wardrobe entitlements;
- public character identity;
- animation events;
- customer-facing UI;
- private user memory;
- renderer access token;
- asset namespace.

A visual theme may later be created for internal agents, but that is a separate project and separate data model.

### 3.4 Execution boundary

Until the audit verdict is GO:

- no production edits;
- no deployment;
- no package signing;
- no migration;
- no DNS or domain changes;
- no purchase of renderer licenses;
- no external artist contract;
- no publication of privacy or security claims;
- no import of existing Mate or Kiramate assets.

---

## 4. Scope

### 4.1 In scope for version 1

- One original masculine full-body Buddy character.
- One neutral default appearance.
- Compact chest-up Messenger presentation.
- Full-body Workplace presentation.
- Controlled first-party wardrobe.
- Hair, top, outerwear, trousers, shoes, and accessory slots.
- Idle, listening, thinking, working, speaking, completed, attention, offline, and privacy-locked visual states.
- Renderer-independent profile schema.
- Rive renderer adapter.
- Local profile storage.
- Account-based synchronization after the privacy design is approved.
- Static fallback.
- Reduced-motion mode.
- Asset manifest, versioning, integrity verification, and rollback.
- Feature-flagged internal beta.
- Audit evidence package.

### 4.2 Explicitly out of scope for version 1

- User-uploaded clothing or arbitrary remote image URLs.
- Public asset marketplace.
- AI-generated runtime clothing.
- NFTs, blockchain ownership, or tokenized assets.
- Body-shape morphing.
- Facial scanning.
- Real-person likeness generation.
- Full 3D world, free camera, VR, or AR.
- Physics-heavy hair or clothing.
- Direct WhatsApp, Telegram, or Discord avatar rendering.
- Monetized wardrobe purchases.
- MATE or Jarvis character redesign.
- Reuse of Kiramate code or assets.
- Claims that avatar synchronization is end-to-end encrypted unless independently verified.

---

## 5. Product roles and surfaces

| Component | Role | Character presentation |
|---|---|---|
| KocaX Messenger | Communication with Buddy | Compact head/chest view, status reactions |
| Buddy Workplace | User control panel | Full body, dressing room, preview, permissions |
| Buddy Avatar Core | Stable profile and wardrobe logic | No rendering dependency |
| Buddy Renderer Adapter | Converts core state into visuals | Rive in version 1 |
| Wardrobe Catalog | Approved item metadata and compatibility | No user-provided URLs |
| Profile Sync Service | Cross-device appearance synchronization | Subject to privacy approval |
| MATE | Internal orchestration | No Buddy profile access |
| Jarvis/J4 | Internal executive/admin | No Buddy profile access |

---

## 6. Required evidence before design or coding

The audit must treat every missing item as unresolved rather than assuming it exists.

| Evidence | Required contents | Gate |
|---|---|---|
| Repository inventory | Owner, URL, branch, commit, local path, deployment | Gate 0 |
| Deployment inventory | Vercel/server project, domain mapping, environment owner | Gate 0 |
| Mobile identity inventory | iOS bundle ID, Android package ID, signing owner | Gate 0 |
| Contamination scan | Kiramate strings, imports, assets, identifiers, licenses | Gate 0 |
| Data-flow diagram | Client, APIs, storage, CDN, authentication, logging | Gate 1 |
| Character rights package | Source ownership, artist agreement, license register | Gate 2 |
| Renderer license review | Permitted commercial use and distribution obligations | Gate 2 |
| Threat model | Assets, profile sync, renderer, auth, privacy, supply chain | Gate 4 |
| Test device matrix | Browsers, iOS, Android, desktop targets | Gate 3 |
| Rollback procedure | Feature flag, asset rollback, schema rollback, fallback | Gate 5 |

---

## 7. Proposed architecture

```text
                         ┌──────────────────────────┐
                         │  Buddy Avatar Profile    │
                         │  renderer-independent    │
                         └────────────┬─────────────┘
                                      │
                 ┌────────────────────┴────────────────────┐
                 │                                         │
      ┌──────────▼──────────┐                   ┌──────────▼──────────┐
      │  Buddy Workplace    │                   │  KocaX Messenger    │
      │  full body + dress  │                   │  compact companion  │
      └──────────┬──────────┘                   └──────────┬──────────┘
                 │                                         │
                 └────────────────────┬────────────────────┘
                                      │
                         ┌────────────▼─────────────┐
                         │ Buddy Renderer Adapter  │
                         │ Rive implementation v1  │
                         └────────────┬─────────────┘
                                      │
          ┌───────────────────────────┴───────────────────────────┐
          │                                                       │
┌─────────▼─────────┐                                  ┌──────────▼──────────┐
│ Wardrobe Catalog  │                                  │ Visual State Bridge │
│ versions + rules  │                                  │ whitelisted events  │
└─────────┬─────────┘                                  └──────────┬──────────┘
          │                                                       │
┌─────────▼─────────┐                                  ┌──────────▼──────────┐
│ Signed asset packs│                                  │ Buddy runtime state │
│ owned first-party │                                  │ no private content  │
└───────────────────┘                                  └─────────────────────┘
```

### 7.1 Proposed package boundaries

```text
packages/
├── buddy-avatar-core/
│   ├── schema/
│   ├── validation/
│   ├── migrations/
│   ├── compatibility/
│   └── defaults/
├── buddy-avatar-rive/
│   ├── renderer/
│   ├── asset-loader/
│   ├── state-bridge/
│   └── fallback/
├── buddy-avatar-ui/
│   ├── dressing-room/
│   ├── wardrobe-grid/
│   ├── full-body-preview/
│   └── compact-avatar/
└── buddy-avatar-testkit/
    ├── fixtures/
    ├── visual-regression/
    └── corrupted-assets/
```

The repository layout may be adapted after the source inventory. The logical boundaries must remain.

---

## 8. Renderer-independent data model

The profile must store stable product concepts, not Rive state-machine numbers, file paths, layer names, or image property identifiers.

### 8.1 Proposed profile

```json
{
  "schemaVersion": 1,
  "characterId": "buddy-v1",
  "displayName": "Buddy",
  "rigVersion": "buddy-rig-1",
  "catalogVersion": "catalog-1",
  "equipped": {
    "hair": "hair-short-black-01",
    "top": "top-black-crew-01",
    "outerwear": "jacket-executive-gold-01",
    "trousers": "trousers-black-01",
    "shoes": "shoes-black-01",
    "accessory": "watch-gold-01"
  },
  "palette": {
    "accent": "kx-gold",
    "secondary": "kx-blue"
  },
  "preferences": {
    "reducedMotion": false,
    "idleMotion": true
  },
  "updatedAt": "2026-08-13T00:00:00Z"
}
```

### 8.2 Separate records

The following must not be merged into one unstructured profile blob:

- avatar appearance;
- wardrobe catalog;
- account entitlements;
- renderer cache;
- animation state;
- user permissions;
- assistant memory;
- chat data;
- billing data.

### 8.3 Required schema behavior

- Strict validation.
- Unknown fields rejected or safely ignored according to a documented rule.
- Unknown items replaced by a deterministic default.
- Migrations tested from every supported schema version.
- Catalog rollback must not corrupt profiles.
- Deleting an item must not break application startup.
- A profile must remain readable without the Rive package installed.
- User display names must be length-limited and safely encoded.
- No HTML, script, or arbitrary URL fields in wardrobe metadata.

---

## 9. Wardrobe model

### 9.1 Initial slots

1. base/body;
2. face;
3. eyes;
4. hair;
5. headwear;
6. top;
7. outerwear;
8. trousers;
9. shoes;
10. neck accessory;
11. wrist accessory;
12. handheld accessory;
13. background;
14. accent/core effect.

Version 1 only needs to expose the six approved user-facing slots listed in scope. The remaining slots may exist internally for future compatibility.

### 9.2 Every item requires

- immutable item ID;
- human-readable localized name;
- slot;
- rig version;
- asset pack version;
- layer order;
- compatibility rules;
- preview thumbnail;
- renderer mapping;
- default color options;
- size limit;
- source file reference;
- rights/license reference;
- integrity hash;
- release status;
- fallback behavior.

### 9.3 Compatibility rules

The catalog must support explicit rules such as:

- headwear hides selected hair layers;
- some outerwear replaces the inner top;
- handheld accessories are unavailable in compact Messenger mode;
- an item may require a minimum rig version;
- incompatible items cannot be equipped through API manipulation;
- the server and client apply the same compatibility rules.

Compatibility must be deterministic and testable. Visual fixes must not exist only as undocumented Rive-layer hacks.

---

## 10. Visual state bridge

The renderer receives only a whitelisted presentation state.

```ts
type BuddyVisualState =
  | "idle"
  | "listening"
  | "thinking"
  | "working"
  | "speaking"
  | "completed"
  | "needs_attention"
  | "offline"
  | "privacy_locked";
```

Optional numeric values must be bounded and documented, for example:

```ts
interface BuddyVisualEvent {
  state: BuddyVisualState;
  intensity?: number;      // 0.0 to 1.0
  viseme?: string;         // approved local lip-sync token only
  sequence: number;
  expiresAt?: number;
}
```

The renderer must never receive:

- message text;
- system prompts;
- raw audio;
- microphone recordings;
- contact details;
- task content;
- personal memory;
- internal MATE/Jarvis messages;
- API credentials;
- full error logs;
- arbitrary event names supplied by remote content.

Lip movement in version 1 must be driven by local amplitude or approved local viseme events. No third-party animation service may receive user audio.

---

## 11. Renderer decision

### 11.1 Selected for proof of concept

**Rive 2.5D**, because it can provide a shared animated presentation for the current web-oriented product surfaces while allowing a full-body and compact camera view from one original character rig.

### 11.2 Selection conditions

The Rive choice is provisional. The proof of concept must verify:

- compatibility with the actual KocaX Messenger stack;
- compatibility with the actual Buddy Workplace stack;
- web and mobile performance;
- reliable runtime item switching;
- offline caching;
- reduced-motion behavior;
- static fallback;
- Content Security Policy requirements;
- package and WebAssembly delivery;
- commercial license obligations;
- absence of third-party tracking;
- acceptable authoring workflow for the wardrobe.

### 11.3 Reconsideration triggers

Spine or another renderer may be reconsidered when:

- Rive cannot handle the approved wardrobe combinations;
- layer masking becomes unmaintainable;
- asset packs become too large;
- runtime performance fails the target device matrix;
- required accessibility cannot be provided;
- licensing or export workflow is unsuitable.

Full 3D remains deferred until a separately approved product requirement exists for free camera movement, AR, VR, or a spatial environment.

---

## 12. Original character and intellectual-property requirements

Buddy must be newly designed for KocaX and must not be a modification of Kiramate or another unowned character.

### 12.1 Required character deliverables

- front, side, and rear model sheets;
- neutral full-body pose;
- compact chest-up crop specification;
- expression sheet;
- hand and gesture sheet;
- clothing layer map;
- palette and material guide;
- animation state sheet;
- editable vector or layered source;
- final rig source;
- exported runtime assets;
- thumbnails;
- asset inventory;
- hashes of approved final source files.

### 12.2 Contract and license requirements

Before final art production:

- identify the legal creator of every asset;
- define commissioned-work ownership;
- obtain written commercial exploitation rights;
- obtain source-file delivery rights;
- record third-party fonts, textures, brushes, models, and plugins;
- prohibit unapproved marketplace assets;
- prohibit unlicensed training images or copied character elements;
- obtain a likeness release when a real person is used;
- record territorial and duration limits, if any;
- verify whether trademark or design registration is appropriate.

No asset is production-approved solely because it was generated or delivered as a PNG.

---

## 13. Security and privacy model

### 13.1 Primary threats

1. loading malicious or replaced asset packs;
2. arbitrary remote URLs in wardrobe data;
3. cross-site scripting through item names or metadata;
4. oversized assets causing memory exhaustion;
5. catalog downgrade or rollback attacks;
6. client-side entitlement bypass;
7. renderer access to private assistant data;
8. third-party CDN tracking;
9. dependency or build-chain compromise;
10. profile tampering or schema confusion;
11. cross-account outfit access;
12. broken CSP caused by renderer or WebAssembly requirements;
13. insecure sync conflict resolution;
14. logs revealing user identity, messages, or microphone data;
15. unverified privacy claims about synchronization.

### 13.2 Required controls

- assets served only from approved first-party origins;
- no arbitrary item URLs;
- signed catalog manifest verified against a pinned public key;
- item hashes verified before activation;
- package version pinning;
- maximum file sizes and decoded-memory limits;
- strict metadata schema and output encoding;
- authenticated and authorized profile APIs;
- server-side entitlement enforcement;
- account isolation tests;
- replay/downgrade protection for catalogs;
- dependency lockfile and software bill of materials;
- no third-party renderer analytics;
- minimal network permissions;
- explicit CSP review;
- local static fallback;
- privacy-safe logging;
- deletion and export behavior documented;
- feature flag and kill switch;
- key and signing procedures documented separately.

### 13.3 Privacy classification

Avatar appearance is account preference data. It may still become personal data when linked to an account or user-selected name.

Version 1 must not claim that avatar synchronization is end-to-end encrypted unless:

1. the exact data path is documented;
2. server visibility is established;
3. key ownership is verified;
4. implementation tests demonstrate the claim;
5. public privacy text matches the verified behavior.

If the service can read the avatar profile, it must be described accurately as encrypted in transit and protected at rest where applicable, not as content-blind or end-to-end encrypted.

---

## 14. Accessibility requirements

- Reduced-motion setting disables nonessential movement.
- A static Buddy fallback is available.
- Essential actions remain normal web/native controls outside the animation canvas.
- Screen-reader labels describe Buddy state without continuously announcing decorative motion.
- Dressing-room controls support keyboard, touch, and screen readers.
- Selection is not communicated by color alone.
- Text contrast and focus indicators meet the product accessibility baseline.
- Animation does not flash at unsafe frequencies.
- Buddy remains optional; application functions must work when the renderer is disabled.
- Outfit thumbnails include accessible names.
- State changes do not steal focus.

---

## 15. Implementation phases and approval gates

## Gate 0 — Source and ownership verification

**Work allowed:** read-only inventory only.

### Tasks

- identify official repositories;
- identify deployments and domains;
- record commit hashes;
- identify mobile signing identities;
- identify storage and API services;
- scan for Kiramate contamination;
- confirm backups and clean working trees;
- identify repository writers and branch protections.

### Deliverables

- `REPOSITORY-INVENTORY.md`;
- `DEPLOYMENT-INVENTORY.md`;
- `MOBILE-IDENTITY-INVENTORY.md`;
- `KIRAMATE-BOUNDARY-REPORT.md`;
- hashes of reviewed manifests and lockfiles.

### Exit criteria

- every implementation target is owned or contractually controlled;
- Kiramate is absent or quarantined;
- no ambiguous local folder is treated as production source;
- auditor issues GO for Gate 1.

---

## Gate 1 — Architecture and data-flow approval

### Tasks

- map client, API, auth, storage, asset hosting, logging, and sync;
- confirm package boundaries;
- approve renderer-independent schema;
- define state bridge;
- define trust boundaries;
- decide where profiles are stored and who can read them.

### Deliverables

- architecture diagram;
- data-flow diagram;
- initial data schema;
- trust-boundary document;
- architecture decision records.

### Exit criteria

- Buddy, MATE, Jarvis, and Kiramate boundaries are unambiguous;
- no renderer dependency appears in the core profile;
- privacy claims are not assumed;
- auditor issues GO for Gate 2.

---

## Gate 2 — Character, rights, and wardrobe specification

### Tasks

- commission or create original Buddy concept;
- complete character bible;
- define rig and slot rules;
- create license and source register;
- review visual similarity risks;
- verify renderer authoring and export rights.

### Deliverables

- character specification;
- wardrobe specification;
- original source package;
- rights-transfer evidence;
- license register;
- asset naming standard.

### Exit criteria

- ownership is documented;
- every third-party element is licensed;
- no Kiramate or unverified asset is used;
- auditor issues GO for Gate 3.

---

## Gate 3 — Limited technical proof of concept

### Proof-of-concept content

- one Buddy rig;
- compact and full-body presentations;
- nine visual states;
- two hairstyles;
- three tops;
- two outerwear items;
- two trousers;
- two shoes;
- two accessories;
- one dressing-room screen;
- local profile persistence;
- static fallback;
- reduced-motion mode.

### Required tests

- web and current mobile shell;
- online and offline;
- cold and warm start;
- wardrobe switching;
- compatibility rules;
- corrupt asset handling;
- missing asset handling;
- CSP behavior;
- memory and frame rate;
- screen rotation and resizing;
- accessibility smoke test.

### Exit criteria

- proof of concept meets the approved device matrix;
- no private content reaches renderer events or network calls;
- all fallback paths work;
- auditor issues GO for Gate 4.

---

## Gate 4 — Core implementation and security review

### Tasks

- implement avatar core;
- implement renderer adapter;
- implement signed catalog and integrity validation;
- implement compatibility engine;
- implement entitlements separately from appearance;
- implement profile migrations;
- implement state bridge;
- create threat model and abuse cases;
- create software bill of materials.

### Deliverables

- source code;
- unit and integration tests;
- threat model;
- SBOM;
- dependency review;
- security test results;
- privacy data map.

### Exit criteria

- all P0 and P1 findings closed;
- no unresolved authorization flaw;
- no unverified privacy claim;
- auditor issues GO for Gate 5.

---

## Gate 5 — Product integration and recovery readiness

### Tasks

- integrate compact Buddy in KocaX Messenger;
- integrate full Buddy in Buddy Workplace;
- implement account synchronization only as approved;
- implement feature flag;
- implement catalog rollback;
- implement schema rollback/fallback;
- implement static kill switch;
- document support and incident handling.

### Deliverables

- integration evidence;
- network traces;
- recovery runbook;
- rollback test;
- privacy copy draft;
- user controls and deletion flow.

### Exit criteria

- rollback is demonstrated, not merely documented;
- the app works with renderer disabled;
- account isolation tests pass;
- auditor issues GO for Gate 6.

---

## Gate 6 — Internal beta

### Conditions

- limited invited accounts;
- first-party assets only;
- no paid wardrobe;
- no external marketplace;
- no unsupported encryption claims;
- monitoring excludes private content;
- rollback owner available;
- change freeze during review.

### Exit criteria

- beta defect threshold is approved;
- performance is acceptable on the supported matrix;
- no P0/P1 issues;
- privacy and support documents match actual behavior;
- production launch receives separate approval.

---

## Gate 7 — Staged production release

### Rollout

1. internal production accounts;
2. small customer cohort;
3. larger cohort after evidence review;
4. general availability.

Every stage requires:

- error-rate review;
- performance review;
- privacy/network trace review;
- catalog integrity check;
- rollback readiness;
- explicit release owner approval.

---

## 16. Proposed performance and reliability thresholds

These thresholds are audit candidates and may be tightened after the device matrix is established.

- Minimum sustained animation: 30 FPS on the lowest supported device.
- Target sustained animation: 50–60 FPS on standard supported devices.
- Initial compressed avatar payload: no more than 10 MB.
- Average additional wardrobe item: no more than 1 MB unless formally excepted.
- Incremental runtime memory: no more than 120 MB on the lowest supported device.
- No crash or unrecoverable state in 1,000 automated equip/unequip operations.
- Offline startup succeeds after approved assets have been cached.
- A missing or corrupt item falls back without blocking Messenger or Workplace startup.
- Profile migration test coverage includes every supported prior schema version.
- Feature kill switch disables animation without requiring an app-store release.
- A catalog rollback restores the previous approved wardrobe without data loss.

---

## 17. Test strategy

### 17.1 Unit tests

- schema validation;
- migrations;
- default profile;
- unknown item handling;
- compatibility rules;
- layer ordering;
- display-name encoding;
- entitlement checks;
- deterministic fallback;
- catalog version handling.

### 17.2 Integration tests

- profile save/load;
- cross-device sync;
- offline mode;
- concurrent update conflict;
- account isolation;
- revoked entitlement;
- renderer disabled;
- corrupt manifest;
- invalid signature;
- old catalog replay;
- missing asset;
- asset download interruption;
- state-event expiration.

### 17.3 Visual regression

- every item individually;
- every state with default outfit;
- pairwise coverage across exposed wardrobe slots;
- at least 50 curated complete outfits;
- compact and full-body views;
- supported screen sizes;
- light/dark surrounding interfaces where applicable;
- reduced-motion and static fallback.

### 17.4 Security tests

- HTML/script in item metadata;
- arbitrary URL injection;
- path traversal attempts;
- oversized image/asset;
- decompression or decode bomb controls;
- manifest tampering;
- catalog downgrade;
- entitlement bypass;
- cross-account profile request;
- replayed state event;
- renderer event with private content;
- dependency and supply-chain scan;
- CSP violation review.

### 17.5 Privacy verification

Use network inspection to prove that the renderer does not transmit:

- chat messages;
- prompt text;
- microphone audio;
- contacts;
- personal memory;
- MATE/Jarvis logs;
- authentication tokens to unapproved origins.

---

## 18. Deployment and rollback

### 18.1 Required controls

- server-side feature flag;
- client-side safe default;
- static-character fallback;
- versioned catalog;
- versioned asset packs;
- previous catalog retained;
- backward-compatible profile reader;
- last-known-good profile cache;
- kill switch for renderer initialization;
- release owner and rollback owner;
- written incident criteria.

### 18.2 Rollback triggers

Rollback is mandatory when:

- crashes exceed the approved threshold;
- the renderer blocks core Messenger functions;
- a private-data leak is suspected;
- catalog signature verification fails;
- cross-account access is detected;
- a license or ownership dispute arises;
- memory or battery impact exceeds the approved limit;
- a schema migration corrupts or hides user profiles;
- unsupported public security/privacy claims are published.

---

## 19. Risk register

| ID | Risk | Severity | Required mitigation |
|---|---|---:|---|
| R-01 | Wrong repository or Kiramate contamination | Critical | Gate 0 ownership inventory and quarantine scan |
| R-02 | Unclear character ownership | Critical | Signed rights transfer and source register |
| R-03 | Renderer receives private user content | Critical | Whitelisted state bridge and network tests |
| R-04 | Cross-account profile or entitlement access | Critical | Server-side authorization and isolation tests |
| R-05 | Malicious or replaced asset pack | High | Signed manifest, pinned key, hash verification |
| R-06 | CSP/WebAssembly integration weakens site security | High | CSP-specific test and minimal approved directives |
| R-07 | Clothing clipping and unmaintainable layer rules | High | Slot contract, compatibility engine, visual regression |
| R-08 | Renderer vendor lock-in | High | Renderer-independent core schema and adapter |
| R-09 | Profile sync claim exceeds actual privacy | High | Verified data flow and accurate public wording |
| R-10 | Mobile performance or battery regression | High | Device matrix, budgets, feature flag, fallback |
| R-11 | Missing asset prevents app startup | Medium | Deterministic defaults and local fallback |
| R-12 | Catalog/schema rollback corrupts profiles | High | Versioned migrations and demonstrated rollback |
| R-13 | Third-party dependency or CDN tracking | High | First-party hosting, pinned versions, SBOM |
| R-14 | Animation is inaccessible | Medium | Reduced motion, static fallback, external controls |
| R-15 | User-generated assets create moderation/security issues | High | Excluded from version 1 |

---

## 20. Audit evidence package

The pre-execution audit pack should use the following structure:

```text
buddy-avatar-audit-pack/
├── 00-PLAN.md
├── 01-REPOSITORY-INVENTORY.md
├── 02-DEPLOYMENT-INVENTORY.md
├── 03-KIRAMATE-BOUNDARY-REPORT.md
├── 04-ARCHITECTURE.md
├── 05-DATA-FLOW.md
├── 06-DATA-SCHEMA/
├── 07-THREAT-MODEL.md
├── 08-CHARACTER-AND-IP/
├── 09-LICENSE-REGISTER.md
├── 10-RENDERER-DECISION.md
├── 11-TEST-PLAN.md
├── 12-ROLLBACK-RUNBOOK.md
├── 13-DECISION-LOG.md
├── 14-SBOM/
├── 15-OPEN-QUESTIONS.md
├── MANIFEST.json
└── SHA256SUMS.txt
```

For the first plan audit, files that do not yet exist must be listed as **missing evidence**. Empty placeholders must not be treated as proof.

---

## 21. Independent auditor mandate

The auditor must review adversarially and must not modify code, repositories, deployments, DNS, signing identities, or production assets.

For every finding, the auditor must provide:

- severity: P0, P1, P2, or P3;
- affected plan section;
- evidence;
- failure scenario;
- required correction;
- whether it blocks the next gate.

### Required audit questions

1. Does the plan prevent accidental work on Kiramate or another unowned repository?
2. Is the ownership evidence required by Gate 0 sufficient and independently verifiable?
3. Are Buddy, MATE, and Jarvis/J4 technically and product-wise separated?
4. Can the avatar profile survive replacement of Rive with another renderer?
5. Are wardrobe slots, compatibility rules, migrations, and fallbacks adequately defined?
6. Does the renderer receive more data than it needs?
7. Are synchronization and privacy claims constrained to what can be proven?
8. Are asset integrity, authorization, entitlement, and account-isolation controls sufficient?
9. Are CSP, WebAssembly, supply-chain, and third-party-origin risks addressed?
10. Are character ownership and third-party licensing controls sufficient?
11. Are accessibility and static-fallback requirements adequate?
12. Are performance thresholds measurable and realistic?
13. Can the system be disabled or rolled back without breaking Messenger?
14. Are any major application, API, authentication, monitoring, backup, or incident-response concerns missing?
15. Which failures are most likely to appear immediately after the proof of concept passes?
16. Which plan statements are assumptions presented as facts?
17. What evidence must be obtained before Gate 0, Gate 1, and Gate 2 can pass?
18. Is the correct verdict GO, GO WITH CONDITIONS, or NO-GO?

### Required auditor verdict format

```text
Overall verdict:
Gate approved:
Blocking findings:
Non-blocking findings:
Missing evidence:
Predicted next failures:
Required plan revisions:
Conditions for execution:
```

---

## 22. Go/no-go standard

### GO

Only when:

- all P0 and P1 findings are closed;
- ownership and repository targets are verified;
- Kiramate is excluded;
- the profile is renderer-independent;
- privacy and security boundaries are testable;
- character rights are documented;
- rollback is credible;
- all next-gate evidence exists.

### GO WITH CONDITIONS

Permitted only for a limited, non-production proof of concept where:

- conditions are explicit;
- no customer data is used;
- no deployment or signing occurs;
- no public claims are made;
- every condition has an owner and verification method.

### NO-GO

Required when:

- source ownership is uncertain;
- Kiramate contamination cannot be ruled out;
- private content can reach the renderer;
- profile authorization is undefined;
- rights to character or clothing assets are unclear;
- the plan depends on unverified code;
- rollback is absent;
- the reviewer cannot reproduce the evidence.

---

# Appendix A — Immediate next action

The only authorized next action is **Gate 0 read-only source and ownership verification**.

No character coding, Rive implementation, art commissioning, asset import, sync service, or production integration should begin before the Gate 0 audit is approved.

---

# Appendix B — Copy-paste audit instruction

```text
You are an independent, adversarial architecture, security, privacy, licensing, and delivery reviewer.

Audit the attached “Buddy Avatar System — Pre-Execution Implementation Plan v1.0.” Do not execute it, modify code, edit repositories, contact vendors, change deployments, or assume missing evidence exists.

The project must create a new, original, customer-facing Buddy character for KocaX Messenger and Buddy Workplace. MATE and Jarvis/J4 are separate internal agents. Kiramate, app.kiramate.mate, /Applications/Mate.app, and every unverified Mate repository or asset are explicitly excluded.

Review every section for:
1. incorrect assumptions;
2. ownership or repository ambiguity;
3. architecture gaps;
4. renderer lock-in;
5. security and privacy failures;
6. authorization and account-isolation failures;
7. asset-integrity and supply-chain weaknesses;
8. inaccurate encryption or privacy claims;
9. intellectual-property and licensing risk;
10. mobile/web performance and accessibility risk;
11. missing recovery, monitoring, backup, or incident controls;
12. likely next failures after each gate passes.

Classify findings as P0, P1, P2, or P3. Cite the affected section. State the concrete failure scenario and required correction. Treat absent evidence as absent. Do not rubber-stamp the plan.

Finish with:
- Overall verdict: GO, GO WITH CONDITIONS, or NO-GO
- Gate approved
- Blocking findings
- Non-blocking findings
- Missing evidence
- Predicted next failures
- Required plan revisions
- Conditions for execution
```
