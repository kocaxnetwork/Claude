# DPIA-conceptrapport — KocaX Buddy

**Versie:** 1.0  
**Peildatum:** 13 augustus 2026  
**Verwerkingsverantwoordelijke:** `<<INVULLEN: volledige naam eigenaar volgens actueel KvK-uittreksel>>`, handelend onder de naam KocaExpress  
**Product:** KocaX Buddy, Nederlandse consumenten, 18+  
**Besluitstatus:** **DPIA VERPLICHT · RESTEREND RISICO NU HOOG · NO-GO VOOR LIVE**

> Dit is een voorafgaande gegevensbeschermingseffectbeoordeling onder artikel 35 AVG. Het is een werkbaar concept, geen juridisch advies. De eigenaar moet actuele technische bewijzen en contracten toevoegen, maatregelen sluiten, het restrisico ondertekenen en juridisch laten toetsen vóór verwerking start.

## 1. Managementbesluit

Voor Buddy is vóór ingebruikneming een DPIA vereist. De verwerking combineert innovatieve generatieve AI met voorzienbare verwerking van gevoelige of zeer persoonlijke vrije tekst. Daarmee zijn ten minste twee AP/EDPB-hoogrisicocriteria aanwezig. De open modelroutering, mogelijke derde-landdoorgiften en optioneel profielgeheugen versterken dit.

Buddy valt op basis van de nu beschreven Guided-modus niet vanzelf onder artikel 35 lid 3(a) als systematische evaluatie waarop besluiten met rechtsgevolg worden gebaseerd. Ook is “grootschalig” bij start niet vastgesteld. Dat neemt de verplichting niet weg: artikel 35 lid 1 gebruikt een bredere hoog-risicotoets, en de combinatie van innovatieve technologie en zeer persoonlijke/gevoelige gegevens is voldoende om de DPIA uit te voeren.

De ontwerpkeuzes sessie-only, geheugenconsent per item, echte verwijdering, Guided-modus, Frankfurt als primaire databaseregio en no-training/ZDR verkleinen risico’s wezenlijk. Zij zijn pas maatregelen wanneer code, configuratie, contract en testbewijs overeenkomen.

**Huidige uitkomst:** niet live, geen echte consumentendata en geen betaling totdat de blokkerende maatregelen uit §12 en `RISICOREGISTER.md` zijn gesloten.

## 2. Reikwijdte en aannames

### Binnen scope

- registratie, authenticatie en 18+-zelfverklaring;
- abonnement, betaling en facturatie;
- Buddy-chat en noodzakelijke sessiecontext;
- taken en herinneringen;
- optioneel langetermijngeheugen en embeddings;
- modelroutering via OpenRouter en goedgekeurde inference-endpoints;
- Guided-goedkeuring voor externe acties;
- technische/securitylogs en auditreceipts;
- support, export, verwijdering en privacyrechten;
- Vercel, Supabase, betaalprovider en alle sub-/onwardverwerkers;
- doorgifte en remote access buiten de EER.

### Buiten scope zonder nieuwe DPIA-review

- gebruikers jonger dan 18;
- advertenties, tracking of gedragsprofilering;
- biometrische identificatie, stem- of gezichtsherkenning;
- medische, juridische, financiële of kredietbesluiten;
- autonome externe acties;
- werkgever-, verzekeraar-, onderwijs- of overheidsbesluiten;
- locatievolging, contacten-, microfoon- of cameratoegang;
- publieke social feed, matching of rangschikking van personen;
- modeltraining of menselijke beoordeling van productiechats;
- websearch, plugins, connectors of tools die niet apart zijn beoordeeld.

Een toevoeging uit deze lijst is een materiële risicowijziging en vereist vooraf een DPIA-update, nieuwe transparantie en mogelijk een andere wettelijke kwalificatie.

## 3. Betrokkenen, gegevens en schaal

### Betrokkenen

- Nederlandse consumenten van 18 jaar en ouder;
- personen die een gebruiker in chat, taak of geheugen noemt;
- supportcontacten;
- eigenaar en geautoriseerde beheerders voor auditgegevens.

### Gegevens

- account-, authenticatie- en abonnementsgegevens;
- chatprompt, noodzakelijke context en gegenereerd antwoord;
- taak- en herinneringsinhoud;
- per item goedgekeurde geheugeninhoud en afgeleide embedding/samenvatting;
- betaalstatus, factuur- en transactie-ID’s;
- IP-, device-, login-, modelroute-, token-, latency- en foutmetadata;
- toestemmings-, contract-, actie- en verwijderbewijs;
- support- en rechtenverzoekinhoud.

Vrije tekst kan bijzondere persoonsgegevens van artikel 9 AVG, gegevens over strafbare feiten van artikel 10 AVG, zeer persoonlijke informatie, geheimen, accountcodes of gegevens over derden bevatten. De software moet dus op de voorzienbare inhoud worden beoordeeld, niet op de bedoeling “algemene assistent”.

### Schaal

De initiële schaal is nog niet gekwantificeerd. Vóór live worden verwacht aantal gebruikers, prompts per dag, landen, piekvolume, beheerders en beoogde groei vastgelegd. De DPIA wordt herbeoordeeld bij 10.000 actieve gebruikers, verwerking in meer dan één lidstaat, systematische profilering of eerder als risico’s veranderen. De drempel is een governance-alarm, geen vrijstelling tot dat moment.

## 4. Datastroom

1. De gebruiker opent de webapp via Vercel en maakt een account aan.
2. Account, taken en alleen expliciet opgeslagen geheugen gaan naar Supabase in de exact gekozen primaire regio `eu-central-1` Frankfurt.
3. De chatprompt blijft client-/server-side tijdelijk. Een lokale controle blokkeert geheimen, artikel 10-inhoud en derde-persoonsgevoelige data waar mogelijk en vraagt contextuele uitdrukkelijke toestemming bij vermoedelijke artikel 9-inhoud.
4. Alleen na de juiste keuze stuurt de Buddy-backend prompt en noodzakelijke minimale context naar OpenRouter.
5. Iedere call bevat `zdr: true` en `data_collection: "deny"`; een allowlist beperkt de mogelijke model- en infrastructuurendpoints. Geen passende route betekent een fout, niet een privacyzwakkere fallback.
6. Het geselecteerde endpoint verwerkt de inhoud tijdelijk en stuurt het antwoord terug via OpenRouter.
7. Het antwoord wordt aan de gebruiker getoond. Gewone prompts/antwoorden komen niet in applicatie-, platform- of observabilitylogs.
8. Alleen bij de knop “Bewaar dit in mijn geheugen” wordt het aangewezen item met toestemming en eventuele embedding opgeslagen.
9. Externe acties gaan door een aparte preview- en goedkeuringspoort en leveren een minimale receipt op.
10. Export haalt account, taken, geheugen, toestemmingen en andere persoonsgegevens op. Verwijdering wist actieve data, afgeleiden en caches en zet verwijdering/overschrijving voor back-ups en ontvangers in gang.

### Open feiten die de datastroom nog blokkeren

- definitieve endpoint- en modelallowlist;
- precieze OpenRouter-entiteiten, modelproviderketen, rollen en landen;
- gekozen betaalprovider;
- Vercel-contractscope voor vrije chat met mogelijk gevoelige inhoud;
- technische sessie-einddefinitie;
- maximale Supabase-back-upcyclus;
- alle log- en supportlocaties;
- bewijs dat prompts nooit in logs of foutmeldingen landen.

## 5. Doelen en grondslagen

| Verwerking | Doel | Grondslag en grens |
|---|---|---|
| Account/auth | toegang en levering | art. 6(1)(b), alleen noodzakelijk accountminimum |
| Gewone prompt/inference | gevraagde assistentie geven | art. 6(1)(b), geen training/productverbetering |
| Taak/herinnering | door gebruiker gevraagde functie uitvoeren | art. 6(1)(b), scheiden van profielgeheugen |
| Optioneel geheugen | voorkeur of context later gebruiken | art. 6(1)(a), per item vrij/specifiek/aantoonbaar/intrekbaar |
| Artikel 9-inhoud in bericht | alleen dat bericht beantwoorden | art. 6(1)(a) plus uitdrukkelijke toestemming art. 9(2)(a); contextuele gate vereist |
| Artikel 9-geheugen | item later gebruiken | aparte art. 6(1)(a) + art. 9(2)(a)-toestemming |
| Securitylogs | account en dienst beschermen | art. 6(1)(f), LIA, dataminimalisatie, vaste korte termijn |
| Betaling | abonnement uitvoeren | art. 6(1)(b); fiscale basisgegevens art. 6(1)(c) |
| Rechten/datalekken | wettelijke afhandeling | art. 6(1)(c), beperkt claimbewijs art. 6(1)(f) |

Artikel 10-inhoud wordt zonder specifieke wettelijke basis niet duurzaam verwerkt of geprofileerd. De gebruiker kan niet via algemene voorwaarden namens genoemde derden instemmen. Structurele derde-landdoorgifte wordt niet op artikel 49-toestemming gebaseerd.

## 6. Noodzaak en proportionaliteit

| Vraag | Beoordeling |
|---|---|
| Is een account nodig? | Ja voor betaald abonnement, synchronisatie, taken, export en rechten. Vraag alleen e-mail en minimale profielgegevens. |
| Is volledige chatopslag nodig? | Nee. Sessie-only is voldoende voor het antwoord en is daarom standaard. |
| Is recente context nodig? | Alleen het kleinste venster dat het actuele gesprek begrijpelijk houdt. Geen volledige accountgeschiedenis meesturen. |
| Is langetermijngeheugen nodig voor de kernchat? | Nee. Daarom optioneel, uit bij default en per item. |
| Is een embedding nodig? | Alleen voor een daadwerkelijk goedgekeurd geheugenitem wanneer exacte zoekfunctionaliteit dit vereist. Verwijder samen met bronitem. |
| Zijn meerdere modelproviders nodig? | Niet automatisch. Beschikbaarheid/kosten rechtvaardigen geen onbeperkte routering. Gebruik de kleinste contractueel goedgekeurde allowlist. |
| Is verwerking buiten de EER nodig? | Niet bewezen. Geef aantoonbare EER/in-regionroutes voorrang; documenteer noodzaak en transfergrond per andere route. |
| Zijn inhoudslogs nodig? | Nee voor normale exploitatie. Gebruik synthetische tests en metadata zonder prompttekst. |
| Is identiteitsbewijs nodig voor 18+? | Nee voor deze algemene assistent. Zelfverklaring is minder ingrijpend. |
| Is autonome uitvoering nodig? | Nee. Guided-goedkeuring levert de waarde met lager risico. |
| Is modeltraining nodig? | Nee voor levering. Contractueel en technisch uitsluiten. |

De gekozen architectuur is proportioneel als de facultatieve functies werkelijk facultatief blijven en privacyweigerende gebruikers de betaalde basis-chat kunnen gebruiken.

## 7. Rechten, redelijke verwachtingen en machtsbalans

Een consument verwacht dat een persoonlijke assistent intieme context kan ontvangen, maar niet dat die context stilzwijgend wordt bewaard, getraind, door mensen gelezen of naar wisselende leveranciers gaat. Transparantie moet daarom bij het bericht en geheugenmoment staan, niet alleen in een lange privacyverklaring.

De gebruiker moet zonder klantenservice:

- geheugen per item zien en verwijderen;
- consent per item/intentie intrekken;
- taken verwijderen;
- een volledige export starten;
- het account verwijderen;
- het abonnement opzeggen; en
- binnen de bedenktijd herroepen.

Een rechtenverzoek wordt binnen één maand afgehandeld. De export omvat ook persoonlijke inferenties en consentbewijs voor zover toepasselijk, met bescherming van rechten van anderen.

## 8. Risicomethode

Waarschijnlijkheid en impact worden elk gescoord van 1 (laag) tot 5 (zeer hoog). Risico = waarschijnlijkheid × impact:

- 1–4: laag;
- 5–9: middel;
- 10–15: hoog;
- 16–25: zeer hoog.

Een restrisico van 10 of hoger blokkeert live totdat het wordt verlaagd. Blijft na redelijke maatregelen waarschijnlijk een hoog risico bestaan, dan volgt voorafgaande raadpleging van de Autoriteit Persoonsgegevens onder artikel 36 AVG; de verwerking start niet in afwachting daarvan.

## 9. Risico’s en maatregelen

| ID | Risico voor betrokkene | Initieel | Verplichte maatregelen | Streef-restrisico |
|---|---|---:|---|---:|
| R1 | Intieme chat lekt via log, foutmelding, beheerder of incident | 5×5=25 | geen contentlogs; secrets-redactie; admin-MFA/least privilege; encryptie; canarytests; incidentplan | 2×5=10 — verdere onafhankelijke securitytest nodig |
| R2 | Artikel 9-data zonder geldige uitzondering naar providers | 5×5=25 | client-side detectie; contextuele uitdrukkelijke toestemming per bericht; weigeren/aanpassen; apart memory-consent; consentreceipt | 2×5=10 — jurist moet gate bevestigen |
| R3 | Artikel 10- of gevoelige derde-persoonsdata onrechtmatig verwerkt | 4×5=20 | zichtbare verbodstekst; lokale blokkade/redactie; geen duurzaam geheugen; support-escalatie zonder contentcopy | 2×5=10 |
| R4 | Onrechtmatige/onverwachte derde-landdoorgifte of overheidstoegang | 5×5=25 | volledige transfer map; EER/adequaat/actief DPF of SCC+TIA; endpointallowlist; in-region voorkeur; kwartaalreview | 2×5=10 — plaintextinference blijft gevoelig |
| R5 | Provider gebruikt inhoud voor training of bewaart deze | 4×5=20 | getekende passende DPA; `zdr:true`; `data_collection:"deny"`; alle guardrails; I/O logging uit; fail closed; audit API | 1×5=5 |
| R6 | “Verwijderd” geheugen blijft in embedding, cache, replica of back-up | 4×4=16 | één delete-orchestrator; referentiekaart; tombstone; recipient propagation; back-up expiry; automatische test/receipt | 2×4=8 |
| R7 | Accountovername onthult geheugen/taken | 4×5=20 | sterke auth; rate limit; breached-passwordcheck; sessie-intrekking; MFA-optie gebruiker; anomaliedetectie | 2×5=10 |
| R8 | Hallucinatie leidt tot medische/juridische/financiële of andere schade | 4×5=20 | duidelijke scope; crisisroute; domeinwaarschuwing; geen high-impact uitvoering; bronnen/verificatie waar passend | 2×5=10 |
| R9 | Onbedoelde of verkeerde externe actie | 4×5=20 | Guided default; preview doel/ontvanger/data/gevolg; expliciete actieapproval; idempotency; lease/receipt; kill switch | 1×5=5 |
| R10 | Prompt injection of tool-output omzeilt goedkeuring/dataminimalisatie | 4×5=20 | scheiding instructie/data; toolallowlist; capability scopes; outputvalidatie; geen secrets in context; adversarial tests | 2×5=10 |
| R11 | Geheugen vormt verborgen profiel of foutieve inferentie | 4×4=16 | alleen user-selected item; bron tonen; geen automatische inferentieopslag; corrigeren; jaarlijkse review; geen ads | 1×4=4 |
| R12 | Export/rechten/verwijdering werkt niet door hele keten | 4×4=16 | data-inventory; self-service; maandelijkse end-to-end test; één-maand-SLA; ontvangersprocedure art. 19 | 2×4=8 |
| R13 | Router/providerpolicy verandert zonder beoordeling | 5×4=20 | pinned allowlist; geen auto-router; subprocessoralerts; pre-deploy policy diff; blokkade bij onbekende endpointpolicy | 1×4=4 |
| R14 | Betaal- of abonnementdata wordt te breed gedeeld/bewaard | 3×4=12 | hosted payment page; geen PAN/CVC; minimum webhooks; providerrollen/DPA; fiscale datascheiding | 1×4=4 |
| R15 | Minderjarige sluit abonnement of deelt kwetsbare data | 3×4=12 | 18+-verklaring; geen dark patterns; known-minor stopflow; restitutie/privacyreview; usage monitoring zonder profiling | 2×4=8 |
| R16 | Gebruiker denkt met mens te praten of publiceert ongemarkeerde AI-inhoud | 4×3=12 | eerste-contact AI-melding; blijvend AI-label; exportmetadata; deepfake/public-interest labels; AI Act test | 1×3=3 |
| R17 | Beveiligingslogs worden zelf tracking/profilering | 3×4=12 | LIA; vaste velden; geen content; 30 dagen; toegangscontrole; geen marketingreuse | 1×4=4 |
| R18 | Dienst wordt later gebruikt voor artikel 22/high-impact besluiten | 3×5=15 | expliciete productpolicy; capabilitydenylist; change control; DPIA/AI Act review voor uitbreiding | 1×5=5 |

Streefscores zijn geen bewijs. Een maatregel telt pas na eigenaar, implementatiebewijs en geslaagde test. R1, R2, R3, R4, R7, R8 en R10 blijven bewust streng: intieme plaintext en generatieve onzekerheid kunnen niet tot nul worden gereduceerd.

## 10. Technische en organisatorische maatregelen

### Privacy by default

- geen opgeslagen chatgeschiedenis;
- geen analytics/marketing bij launch;
- geen langetermijngeheugen zonder itemkeuze;
- geen artikel 9-send zonder contextuele toestemming;
- geen externe actie zonder approval;
- geen providerfallback buiten allowlist;
- geen prompt/antwoord in logs;
- geen nieuwe connector standaard aan.

### Provider- en transfercontrole

- passende DPA met iedere directe processor;
- volledige subprocessor/onward-keten en rollen;
- OpenRouter enterprise/order en aangepaste scope voor consumenten en mogelijke gevoelige data;
- Vercel-contractoplossing voor mogelijke gevoelige vrije tekst of architectuur die chatcontent Vercel laat omzeilen;
- Supabase exact `eu-central-1` en gedocumenteerde back-uptermijn;
- betaalprovidercontract, hosted flow en rolmatrix;
- SCC/TIA/adequaatheid/DPF per exacte entiteit;
- kwartaalcontrole en wijzigingsmelding.

### Security

- TLS, encryptie bij opslag, MFA, least privilege en sleutelrotatie;
- tenantisolatie en RLS-tests;
- webhookhandtekeningen en replaybescherming;
- rate limits, sessie-intrekking en account-takeoverdetectie;
- SAST/dependency/secret scanning;
- penetratie- en prompt-injectiontest;
- hersteltest, datalekrunbook en 72-uursmeldingflow;
- productieondersteuning zonder standaard inhoudstoegang.

### Verwijdering en rechten

- dataregister met unieke sleutel per gegeven/afgeleide;
- export in JSON/CSV plus mensleesbare samenvatting;
- deletion orchestrator voor DB, vector, cache, objectstorage en ontvangers;
- back-uptombstone en geen resurrection bij restore;
- automatische maandelijkse proefgebruiker-delete;
- minimale, inhoudsvrije verwijderreceipt;
- één-maandworkflow voor rechtenverzoeken.

### AI- en actiecontrole

- blijvend “AI-assistent”-label en eerste-contactmelding;
- outputwaarschuwing bij gevoelige domeinen;
- geen high-impactadvies als gezaghebbend eindadvies;
- capability-scoped tools, argumentvalidatie en idempotency;
- menselijke goedkeuring niet door model overschrijfbaar;
- machineleesbare AI-outputmarkering volgens actuele stand en Commissie-richtsnoeren;
- red-teamtests in Nederlands en Engels.

## 11. Bewijs- en acceptatieplan

Vóór ondertekening bevat de DPIA-bewijsmap minimaal:

1. actueel dataflowdiagram en datainventory;
2. schema-export die geen gewone chatopslag bevat;
3. screenshots/config-export van Supabase Frankfurt en Vercel `fra1`;
4. geaccepteerde DPA-versies, subprocessorlijsten en wijzigingsalerts;
5. transfer map met entiteit, land, rol, grondslag, TIA en aanvullende maatregel;
6. OpenRouter-guardrail, requestcode en endpoint/ZDR-audit met datum en hash;
7. canarybewijs dat synthetische prompts niet in logs staan;
8. create/read/export/delete-tests voor gewoon en gevoelig geheugen;
9. restoretest die verwijderde data niet reactiveert;
10. checkout-, opzeg-, herroepings- en consenttest met e-mailreceipts;
11. securitytest, dependencyrapport en incident tabletop;
12. rechtenverzoek binnen één maand gesimuleerd;
13. AI-identiteits- en outputmarkeringsacceptatie;
14. juridische review en ondertekend restrisico.

Gebruik alleen synthetische testdata. Bewijsbestanden bevatten geen echte chats, API-sleutels of betaalgegevens.

## 12. Open maatregelen en live-gate

De volgende punten zijn **blokkerend**:

- exacte verantwoordelijke en vestigingsadres vastleggen;
- fair-use, sessie-einde, back-uptermijn en betaalprovider invullen;
- artikel 9/10/derdenstrategie juridisch bevestigen en technisch afdwingen;
- OpenRouter-DPA/order en volledige modelprovider/onwardscope passend maken;
- Vercel-clausule over gevoelige data oplossen of chattransport buiten Vercel ontwerpen;
- alle transfergronden en TIA’s afronden;
- endpointallowlist en fail-closed ZDR/no-training bewijzen;
- log-, export-, verwijder- en back-upacceptatietests slagen;
- security baseline en incidentrunbook slagen;
- checkout, directe start, herroeping en self-service opzegging slagen;
- finale privacy-/voorwaardenversies door jurist laten bevestigen.

Zijn maatregelen ingevoerd maar blijven één of meer risico’s waarschijnlijk hoog, dan raadpleegt KocaExpress vóór verwerking de Autoriteit Persoonsgegevens volgens artikel 36 AVG. “We gaan over zes dagen live” is geen grond om een hoog restrisico te accepteren.

## 13. Zienswijze betrokkenen

Vóór live wordt met 5–10 volwassen testgebruikers een privacy-usabilitytest uitgevoerd op:

- begrijpen zij dat Buddy AI is en geen mens;
- begrijpen zij sessiechat tegenover geheugen;
- is weigeren van geheugen en gevoelige verwerking even makkelijk als toestaan;
- herkennen zij ontvanger en gevolg van een externe actie;
- kunnen zij binnen twee minuten export, itemverwijdering, opzegging en herroeping vinden;
- begrijpen zij dat chat geen E2EE tegenover KocaExpress/modelverwerkers is.

Bevindingen, aanpassingen en niet-overgenomen feedback worden gedocumenteerd. Als deze test niet plaatsvindt, motiveert de eigenaar schriftelijk waarom het vragen van betrokkenen niet passend is; tijdsdruk alleen volstaat niet.

## 14. FG/DPO en register

Een functionaris voor gegevensbescherming is bij de beschreven kleine start niet automatisch verplicht. De beoordeling wordt gedocumenteerd en opnieuw gedaan bij grootschalige, regelmatige/systematische monitoring of grootschalige artikel 9-verwerking.

Een artikel 30-verwerkingsregister is wel vereist: dit is structurele kernverwerking, kan bijzondere gegevens bevatten en is niet incidenteel.

## 15. Reviewmomenten

Minimaal ieder kwartaal in het eerste jaar en daarna halfjaarlijks, plus direct bij:

- nieuw model, endpoint, subprocessor, land of transfermechanisme;
- wijziging in retentie, logs, geheugen of embeddings;
- connector, websearch, tool, spraak, beeld of autonome actie;
- beveiligingsincident of klacht met structurele oorzaak;
- andere doelgroep, land, prijsmodel of minderjarigen;
- profilering of besluit met aanmerkelijk gevolg;
- wijziging van AI Act-, AVG-, EDPB/AP- of providerregels;
- materiële schaalgroei.

## 16. Ondertekening

| Rol | Naam | Besluit | Datum | Handtekening/verwijzing |
|---|---|---|---|---|
| Verwerkingsverantwoordelijke/eigenaar |  | GO / NO-GO |  |  |
| Technisch verantwoordelijke |  | maatregelen bewezen / niet bewezen |  |  |
| Security reviewer |  | akkoord / bevindingen open |  |  |
| Privacy/juridisch reviewer |  | akkoord / ONZEKER |  |  |
| FG, indien aangewezen |  | advies |  |  |

**Go-besluit is ongeldig zolang een blokkerend punt openstaat of bewijs ontbreekt.**
