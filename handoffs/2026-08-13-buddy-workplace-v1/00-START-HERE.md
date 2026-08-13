# KocaX Buddy Workplace v1 — implementation handoff

**Versie:** 1.0.0  
**Datum:** 13 augustus 2026  
**Productscope:** Personal Buddy only  
**Status:** standalone reference implementation; geen productie-release

Dit pakket zet de bestaande Buddy-plannen om in zoveel mogelijk concrete, lokaal testbare bestanden zonder een onbewezen productieomgeving of live koppeling te veinzen.

## Besluit in één zin

**KocaX Messenger is waar de gebruiker met Buddy praat; Buddy Workplace is waar de gebruiker Buddy bestuurt.**

De app gebruikt vijf vaste tabs:

1. **Today** — dagoverzicht, echte status, open taken en approvals.
2. **Chat** — native Buddy-gesprek met eerlijk AI-beveiligingslabel.
3. **Tasks** — persoonlijke taken, reminders en routines.
4. **Buddy** — uiterlijk, wardrobe, toon en visuele status.
5. **Control** — Memory Vault, rechten, verbindingen, approvals, receipts, export, pause en delete.

## Wat nu echt aanwezig is

- responsive React/Vite Workplace-preview;
- renderer-onafhankelijk Buddy-profiel en beperkte CSS-fallback-avatar;
- TypeScript/Zod-contracten voor identity, memory, connections, avatar, actions, approvals, receipts en Buddy Passport;
- fail-closed reference API met server-derived preview sessions en tenant-filtering;
- tests voor silent-memory denial, cross-user isolation, external-channel approval denial, exact action binding, avatar event filtering, Passport secret exclusion en global pause;
- OpenAPI- en JSON-contracten;
- threat model, claim ledger, gates, runbooks, inventories en auditinstructie;
- deterministische manifest- en hashgenerator;
- auditrapport en testbewijs na verificatie.

## Wat dit pakket nadrukkelijk niet beweert

- geen werkende productie-authenticatie of passkeys;
- geen live KocaX Messenger-backend of goedgekeurde E2EE-release;
- geen database, object store, secrets vault of off-host backup;
- geen echte calendar-, WhatsApp-, Telegram- of Discord-koppeling;
- geen externe actie-uitvoering;
- geen productie-avatarassets, getekend catalogusmanifest of IP-rechtenbewijs;
- geen afgehandelde merk-, consumenten-, privacy- of app-store-goedkeuring.

Zie `06-IMPLEMENTATION-STATUS.md` voor de status van elke capability.

## Lokale demo

Vereisten: Node.js 24+ en npm 11+.

```bash
npm ci
npm run verify
npm run dev
```

Open daarna `http://127.0.0.1:8844`.

Windows-gebruikers kunnen `START-DEMO.cmd` gebruiken. Het script installeert exact de gelockte dependencies met `npm ci` wanneer `node_modules` ontbreekt en start alleen een lokale loopback-preview.

## Referentie-API

De API start uitsluitend na een expliciete lokale opt-in:

```bash
KX_ALLOW_REFERENCE_SERVER=1 npm run dev:api
```

Loopback-adres: `http://127.0.0.1:8787`. De API voert geen externe acties uit. De preview-session header is uitsluitend een testfixture en is geen productie-authenticatie.

## Verplichte leesvolgorde voor implementatie

1. `00-START-HERE.md`
2. `01-EXECUTIVE-SUMMARY.md`
3. `02-DECISION-REGISTER.md`
4. `03-PRODUCT-AND-UX-CONTRACT.md`
5. `04-TECHNICAL-ARCHITECTURE.md`
6. `05-PRIVACY-SECURITY-THREAT-MODEL.md`
7. `06-IMPLEMENTATION-STATUS.md`
8. `07-BACKLOG-GATES-AND-ACCEPTANCE.md`
9. `08-DEPLOYMENT-AND-ROLLBACK-RUNBOOK.md`
10. `09-CLAIMS-LEGAL-AND-IP-REGISTER.md`
11. `10-IMPLEMENTATION-MASTER-PROMPT.md`
12. `AUDIT-REPORT.md`
13. `TEST-RESULTS.md`
14. `VISUAL-QA-REPORT.md`
15. `RELEASE-NOTES.md`
16. `FILE-INVENTORY.md`

## Uitvoeringsgrens

Dit pakket mag lokaal worden bekeken, getest en als planning/handoff worden gebruikt. Het geeft geen toestemming voor productie, DNS, signing, app-store submission, Tailscale-wijzigingen, live connectors, live secrets, deployment of edits aan een nog niet geverifieerde canonical repository.
