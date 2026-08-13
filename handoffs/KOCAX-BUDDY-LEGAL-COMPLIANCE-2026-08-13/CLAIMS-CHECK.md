# Claims-check KocaX Buddy

**Versie:** concept 1.0  
**Datum:** 13 augustus 2026  
**Toepassing:** website, checkout, advertenties, app-storetekst, onboarding, interface, e-mail, support, pers en verkoopgesprekken.

Dit document is een operationele marketingcontrole en geen juridisch advies. Een claim mag alleen live als zij in de exacte productieconfiguratie aantoonbaar waar is. Een disclaimer repareert geen opvallende onware hoofdclaim.

## Hoofdregel

Gebruik geen absolute woorden als **nooit**, **altijd**, **volledig**, **100%**, **anoniem**, **veilig**, **AVG-compliant** of **end-to-end versleuteld** als een leverancier, uitzondering, tijdelijke verwerking, metadata, menselijke toegang, beveiligingsincident of configuratiewijziging die claim kan tegenspreken.

Een veilige claim is:

- specifiek over welke gegevens, component, periode en ontvanger het gaat;
- begrijpelijk zonder technische voetnoot;
- aantoonbaar met contract én productie-instelling én test;
- opnieuw beoordeeld bij ieder nieuw model, endpoint, subverwerker of logging-/monitoringtool; en
- op dezelfde pagina niet weersproken door privacyverklaring of productgedrag.

## Beoordeling concrete claims

| Claim | Oordeel | Waarom dit nu niet kan | Veiliger alternatief | Bewijs vereist vóór gebruik |
|---|---|---|---|---|
| “End-to-end versleuteld” | **NIET GEBRUIKEN — feitelijk onjuist** | KocaExpress, OpenRouter en de geselecteerde modelprovider moeten chatinhoud in leesbare vorm verwerken om te antwoorden. Transport- of opslagversleuteling is geen end-to-end encryptie tegenover deze partijen. | **“Je verbinding is tijdens transport versleuteld. Chatinhoud is niet end-to-end versleuteld tegenover KocaExpress en de AI-providers, omdat zij de inhoud moeten verwerken om te antwoorden.”** | TLS-configuratie, opslagconfiguratie en volledige verwerkersketen. |
| “Je data wordt nooit gedeeld” | **NIET GEBRUIKEN — feitelijk onjuist** | Noodzakelijke chatinhoud en context gaan via OpenRouter naar een geselecteerde modelprovider; ook hosting-, betaal- en supportleveranciers kunnen persoonsgegevens verwerken. | **“We delen alleen gegevens die nodig zijn om KocaX Buddy te leveren, bijvoorbeeld met onze hosting-, betaal- en geselecteerde AI-providers. We verkopen je persoonsgegevens niet.”** Gebruik de laatste zin alleen als dat voor alle activiteiten aantoonbaar waar is. | Actuele dataflow, leverancierslijst, contracten en controle dat geen advertentieverkoop/-deling plaatsvindt. |
| “Volledig privé” | **NIET GEBRUIKEN — te absoluut en misleidend** | Chatinhoud wordt extern verwerkt en kan gevoelige informatie bevatten. Account-, betaal- en technische gegevens bestaan ook. Privacymaatregelen maken verwerking niet “volledig privé”. | **“Privacyvriendelijk ingesteld: chats zijn standaard sessie-only en je kiest per item wat Buddy langer onthoudt. Voor antwoorden verwerken geselecteerde AI-providers tijdelijk de nodige chatinhoud.”** | TTL-/logtests, item-consenttest, productieroute en leverancierretentie. |
| “Je Buddy vergeet niets” | **NIET GEBRUIKEN — strijdig met productontwerp** | Buddy hoort chats standaard na de sessie te vergeten en geheugenitems moeten verwijderbaar zijn. De claim suggereert onbeperkte en permanente opslag. | **“Buddy onthoudt alleen een item voor later als jij dat zichtbaar kiest. Je kunt ieder geheugenitem weer verwijderen.”** | Consentledger, datamodel en end-to-end verwijdertest inclusief afgeleiden en back-upverval. |
| “AVG-compliant” | **NIET GEBRUIKEN als algemene garantie** | AVG-naleving is contextueel, doorlopend en afhankelijk van contracten, transfers, instellingen en feitelijk gedrag. Een eigen verklaring is geen certificering of toezichthoudergoedkeuring. | **“KocaX Buddy is ingericht volgens beginselen als dataminimalisatie, privacy by default en gebruikerscontrole. In onze privacyverklaring lees je welke gegevens we verwerken en welke rechten je hebt.”** Alleen gebruiken als de beschreven maatregelen aantoonbaar werken. | Afgeronde DPIA, verwerkingsregister, DPAs, transferbeoordeling, rechten- en beveiligingstests en juristreview. |
| “Veilig” | **NIET GEBRUIKEN zonder concrete kwalificatie** | Geen online of AI-systeem is risicoloos. De term zegt niet tegen welk risico, voor welke component of op welk moment bescherming bestaat. | **“We beperken risico's met versleuteld transport, toegangsbeperking, sessie-only chat als standaard en expliciete goedkeuring vóór externe acties.”** Alleen de werkelijk geïmplementeerde maatregelen noemen. | Securityconfiguratie, tenant-isolatietest, toegangsreview en Guided-modus e2e-tests. |
| “In de EU gehost” / “Je data blijft in de EU” | **ALLEEN ZEER NAUW GEBRUIKEN** | Een Vercel-functie en Supabase-database kunnen in Frankfurt staan, terwijl Vercel zelf primaire verwerkingsfaciliteiten in de VS noemt en OpenRouter/modelproviders, support en subprocessors buiten de EER kunnen verwerken of toegang hebben. “Je data blijft in de EU” is dan onjuist. | **“Onze primaire database en toegewezen Vercel-functieregio zijn in Frankfurt geconfigureerd. Vercel, AI-providers en andere subprocessors kunnen gegevens buiten de EER verwerken; de actuele routes en waarborgen staan in onze privacyverklaring.”** | Productieregio's, remote-accessanalyse, volledige routekaart en doorgiftewaarborg per juridische entiteit. |
| “Je data wordt niet gebruikt om AI-modellen te trainen” / “No-training” | **ALLEEN GEBRUIKEN NA ROUTE-VOOR-ROUTE BEWIJS** | Een routerinstelling of algemene providerpolicy hoeft niet voor elk model, endpoint, accounttype, foutpad of subverwerker te gelden. | **“We staan niet toe dat geselecteerde AI-providers jouw chatinhoud gebruiken om hun modellen te trainen. We gebruiken alleen vooraf goedgekeurde routes waarvoor dit contractueel en technisch is ingesteld.”** | DPA/contract per route, actuele providerpolicy, instellingsexport, `data_collection: "deny"`, gesloten allowlist en requesttest. |
| “Zero data retention” / “ZDR” | **NIET ALS LOSSE CONSUMENTENCLAIM GEBRUIKEN** | Zero retention betekent niet zero processing. Technische metadata, tijdelijke buffers en nauw omschreven security-/wettelijke uitzonderingen kunnen bestaan. De dekking verschilt per endpoint. | **“De goedgekeurde AI-routes zijn ingesteld om chatinhoud na het genereren van het antwoord niet bij de AI-provider te bewaren. De inhoud wordt wel tijdelijk verwerkt om te antwoorden; beperkte technische metadata kan volgens de privacyverklaring worden bewaard.”** | Endpoint-specifiek ZDR-contract/policy, `zdr: true`, instellingsexport, leverancierbevestiging, retentietest en gedocumenteerde uitzonderingen. |
| “Versleuteld” | **ALLEEN MET LAAG EN SCOPE** | Zonder toelichting kan een consument dit begrijpen als end-to-end encryptie. TLS, database-encryptie en applicatietoegang beschermen tegen verschillende risico's. | **“Gegevens worden tijdens transport versleuteld en opgeslagen data wordt met de geconfigureerde platformversleuteling beschermd. Chatinhoud is niet end-to-end versleuteld tegenover KocaExpress en de AI-providers.”** | TLS-scan, opslag-/back-upconfiguratie, sleutel- en toegangsbeheer. |
| “Anoniem” / “100% anoniem” | **NIET GEBRUIKEN — feitelijk onjuist** | Een account, abonnement, IP-/logmetadata en eventueel geheugen zijn direct of indirect aan een gebruiker te koppelen. Pseudonimisering is geen anonimiteit. | **“We verzamelen zo min mogelijk gegevens en scheiden of pseudonimiseren gegevens waar dat praktisch kan. Gebruik van KocaX Buddy is niet anoniem.”** | Datainventaris, identifierschema, logreview en onderbouwde pseudonimiseringsmaatregelen. |

## Claims die alleen na technische verificatie mogen worden gebruikt

| Voorgenomen claim | Minimale waarheidstoets |
|---|---|
| “Sessie-only by default” | Exact sessie-einde en maximale TTL zijn gepubliceerd; geen prompt/antwoord in applicatie-, platform-, fout-, support- of observabilitylogs; canary- en TTL-test slagen. |
| “Jij bepaalt wat Buddy onthoudt” | Ieder geheugenitem vereist een niet-vooraf-aangevinkte, zichtbare keuze; afwijzen heeft geen nadeel voor gewone chat; export, intrekking en echte verwijdering werken. |
| “Buddy doet niets zonder jouw akkoord” | Beperk dit tot externe acties. Guided staat standaard aan; ieder actiepreview toont doel, ontvanger, gegevens en gevolg; bypass- en retrytests falen veilig. |
| “Je kunt alles exporteren en verwijderen” | “Alles” omvat aantoonbaar account-, taak-, reminder-, chat- en geheugendata voor zover aanwezig; wettelijke/fiscale uitzonderingen en maximale back-uptermijn worden direct vermeld. Anders: **“Je kunt je Buddy-gegevens exporteren en een verwijderverzoek doen; sommige administratie moeten we wettelijk bewaren.”** |
| “We verkopen je data niet” | Geen verkoop, advertentieprofilering of vergelijkbare commerciële verstrekking in enige product- of leveranciersroute; contracten en tags bevestigen dit. |
| “Privacy by default” | Geen langetermijngeheugen, analytics of marketingtracking standaard; minimale logs; niet-goedgekeurde providers falen gesloten; defaultinstellingen zijn getest en versiegebonden. |

## Goedgekeurde korte producttekst

Gebruik deze tekst pas nadat de bijbehorende blokkers in `RISICOREGISTER.md` zijn gesloten:

> **Buddy is een AI-assistent.** Chats zijn standaard sessie-only. Jij kiest per item wat Buddy voor later onthoudt en kunt dat weer verwijderen. Voor een antwoord wordt de nodige chatinhoud via OpenRouter door een geselecteerde AI-provider verwerkt. Chat is daarom niet end-to-end versleuteld tegenover KocaExpress en deze providers. Buddy voert geen externe actie uit zonder jouw uitdrukkelijke goedkeuring.

Optionele tweede alinea, alleen na volledig bewijs van alle productieroutes:

> We gebruiken alleen vooraf goedgekeurde AI-routes die zijn ingesteld op geen training met jouw chatinhoud en geen bewaring van chatinhoud na het antwoord. Beperkte technische metadata kan volgens onze privacyverklaring worden bewaard.

## Verplichte context bij gevoelige onderwerpen

Zet bij relevante invoer of output, niet alleen diep in voorwaarden:

> **Buddy is geen arts, advocaat of financieel adviseur.** Gebruik antwoorden niet als vervanging voor professioneel medisch, juridisch of financieel advies. Deel bij voorkeur geen gevoelige gegevens over jezelf of anderen. Bij acuut gevaar: neem contact op met de bevoegde nooddienst of een gekwalificeerde professional.

Vermijd ook varianten als “diagnose”, “juridisch correct”, “gegarandeerd rendement”, “risicoloos”, “goedgekeurd door de AP” of “officieel gecertificeerd”, tenzij de specifieke bewering aantoonbaar en actueel waar is.

## Publicatiegate voor iedere claim

De claim-eigenaar legt vóór publicatie vast:

1. de exacte claim en alle omliggende tekst/beelden;
2. kanaal, doelgroep, taal en publicatiedatum;
3. het technische en contractuele bewijs voor de exacte productieversie;
4. alle beperkingen die in dezelfde zichtbare context moeten staan;
5. de eigenaar en uiterste hercontroledatum; en
6. welke wijziging de claim automatisch offline haalt, zoals een nieuw model, endpoint, leverancier, bewaartermijn of logtool.

Zonder compleet bewijs is de veilige keuze: de claim niet publiceren en alleen feitelijk beschrijven wat de gebruiker op dat moment kan zien en bedienen.
