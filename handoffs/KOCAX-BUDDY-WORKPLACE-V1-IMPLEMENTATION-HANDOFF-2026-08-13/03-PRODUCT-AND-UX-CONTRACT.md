# Product and UX contract

## Public promise

> **Jouw Buddy. Jouw stijl. Jouw regels.**  
> Een persoonlijke AI-assistent die helpt met je dag, onthoudt wat jij kiest en toestemming vraagt voordat hij iets uitvoert.

Deze tekst is richtinggevende copy. Publicatie vereist een release-evidence check.

## Default experience

| Laag | Default |
|---|---|
| Identity | Buddy; faceless KX base; neutral prototype outfit |
| Conversation | Warm, direct, concise |
| Life pack | Everyday |
| Control | Guided |
| Memory | Session-only totdat eigenaar bewaart |
| Connections | KocaX-only onboarding; transport uit in deze preview |
| External actions | Locked |
| Notifications | Off |
| Motion | Device preference; static fallback |
| Language | Onboarding locale; NL/EN launch target |

## Five-tab contract

### Today

Moet direct beantwoorden:

- wat is vandaag belangrijk;
- wat doet Buddy werkelijk;
- wat wacht op approval;
- zijn native verbinding en pause gezond.

Geen fake “working”-animatie wanneer er geen echte jobstatus is.

### Chat

- pinned, verified Buddy conversation;
- distinct label from human conversation;
- Buddy AI security disclosure: processed by Buddy, therefore not E2EE against KX;
- user-selected files only;
- sources where research is enabled;
- local preview copy cannot be presented as sent or delivered.

### Tasks

- personal tasks, reminders, routines, lists and document outcomes;
- time zone and recurrence are explicit;
- internal work is separate from external actions;
- calendar changes go through proposal → policy → approval → executor → actual receipt.

### Buddy

- display name, tone, voice preference, appearance, wardrobe and state preview;
- display name never changes system IDs;
- cosmetic settings never change access;
- reduced motion and renderer-off fallback preserve all controls;
- asset fixtures are not rights evidence.

### Control

- Memory Vault CRUD, provenance, scope, expiry and export;
- separate permissions and connections;
- devices and session revoke in production target;
- native approval center;
- actual-result receipts;
- global pause;
- Buddy Passport;
- export and deletion flow with truthful backup-retention explanation.

## Interaction contract

```text
user request
  -> allowed context
  -> answer or proposed action
  -> deterministic policy
  -> exact native approval when required
  -> bounded executor
  -> verification
  -> actual-result receipt
```

## Accessibility baseline

- keyboard, touch and screen-reader usable;
- 44px target where practical;
- visible focus;
- no color-only status;
- reduced motion from device plus explicit control;
- static avatar fallback;
- avatar never traps focus or contains essential buttons;
- status announcements are useful and non-repetitive.

## Explicitly excluded

Business CRM/finance/staff/quotes, external social onboarding dependency, live trading, money movement, autonomous publishing, credential vault, arbitrary plug-ins, user-uploaded clothing, runtime-generated clothes, marketplace, NFT, voice cloning, medical/legal/financial decision-making and child-focused companion mechanics.
