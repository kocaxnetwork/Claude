# Decision register

## Frozen decisions

| ID | Besluit | Status |
|---|---|---|
| D-001 | Publieke productnaam is **KocaX Buddy**; korte UI-naam **Buddy**. | Frozen; trademark clearance pending |
| D-002 | Personal Buddy en zakelijke automatisering blijven product-, route-, UI- en data-technisch gescheiden. | Frozen |
| D-003 | `/buddy` is personal. `/buddy/personal` redirect naar `/buddy`. Zakelijk gaat naar `/bedrijfsautomatisering`; geen `/buddy/business`. | Frozen |
| D-004 | KocaX Messenger = praten; Buddy Workplace = besturen. | Frozen |
| D-005 | Vijf tabs: Today, Chat, Tasks, Buddy, Control. | Frozen |
| D-006 | Eén canonical `buddy_id`; nickname of kleding verandert nooit de systeemidentiteit. | Frozen |
| D-007 | Default control profile is Guided. | Frozen |
| D-008 | Default memory is session-only; langetermijnmemory vereist zichtbare owner consent. | Frozen |
| D-009 | Default connections zijn KocaX-only; social bridges zijn later, apart consented en revocable. | Frozen |
| D-010 | External bridges beheren geen memory, permissions, devices, wardrobe, billing of R2/R3 approvals. | Frozen |
| D-011 | Buddy AI-chat krijgt geen E2EE-claim tegen KX; human chat pas na onafhankelijke crypto-verificatie. | Frozen |
| D-012 | Avatarprofiel is renderer-independent; Rive is hoogstens een verwisselbare adapter. | Frozen |
| D-013 | Cosmetics en life packs geven nooit permissions. | Frozen |
| D-014 | Buddy Passport exporteert configuratie en gekozen content, nooit secrets of keys. | Frozen |
| D-015 | V1 is 18+, personal productivity en volwassenen-first. | Frozen |
| D-016 | Geld, trading, aankopen, autonoom publiceren, verwijderen, deployen en security/access changes zijn niet in Personal v1. | Frozen |
| D-017 | Live uitvoering, connectors en production writes blijven fail-closed totdat bewijs en approval bestaan. | Frozen |

## Open owner decisions

| ID | Vraag | Default zolang open |
|---|---|---|
| O-001 | Definitieve visual gender direction: gender-neutral of masculine presentation? | Schema blijft gender-neutraal; geen definitieve art commission |
| O-002 | Exacte €19.99-allowance en unit economics? | Geen checkout of prijsclaim in productpreview |
| O-003 | Welke canonical repositories en deployment targets zijn eigendom van KocaX? | Geen integratie of deploy |
| O-004 | Welke identity-provider/passkeyimplementatie wordt gekozen? | Reference sessions only; duidelijk test-only |
| O-005 | Is huidige KocaX Messenger-crypto herstelbaar of moet worden gemigreerd? | Geen human-E2EE launchclaim |
| O-006 | Welke kalenderprovider is de eerste connector? | Alleen contract; geen OAuth of uitvoering |
| O-007 | Definitieve originele Buddy art, artist/rights chain en rendererlicentie? | CSS-fallbackfixture; geen productieasset |

## Change control

Een frozen besluit verandert uitsluitend via een nieuwe ADR met owner, reden, impact, migratie, testaanpassing en expliciete goedkeuring. Marketingcopy, UI en API-contracten mogen een besluit niet stilzwijgend veranderen.

