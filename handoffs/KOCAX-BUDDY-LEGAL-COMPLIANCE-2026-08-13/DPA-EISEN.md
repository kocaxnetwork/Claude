# Verwerkersovereenkomsten, doorgiften en providerinstellingen — KocaX Buddy

**Versie:** concept 1.0  
**Peildatum leveranciersinformatie:** 13 augustus 2026  
**Verwerkingsverantwoordelijke:** `<<INVULLEN: volledige naam eigenaar volgens actueel KvK-uittreksel>>`, handelend onder de naam KocaExpress  
**Product:** KocaX Buddy  
**Status:** **NO-GO zolang de blokkerende controles in dit document niet met bewijs zijn gesloten.**

> Dit is een juridisch-operationele checklist, geen juridisch advies. Een vinkje zonder een contract, configuratie-export, testresultaat of ander herleidbaar bewijs is geen afgeronde controle. Leveranciersvoorwaarden en dashboardinterfaces kunnen wijzigen; controleer de gelinkte officiële bron opnieuw op de dag van ondertekening en vóór iedere materiële wijziging.

---

Alle onbekende velden staan één keer bij elkaar in `00-START-HERE.md`. Gebruik dit document niet als afvinklijst voordat die centrale invullijst is gesloten.

## 1. Beslisregel voor livegang

KocaExpress mag een leverancier pas voor productie toelaten als alle volgende punten aantoonbaar waar zijn:

- de rol van iedere partij staat vast: verwerkingsverantwoordelijke, verwerker, subverwerker of zelfstandige verwerkingsverantwoordelijke;
- een geldige overeenkomst dekt consumenten-eindgebruikers, vrije chattekst, metadata, geheugenitems en mogelijke bijzondere persoonsgegevens;
- alle verplichte onderdelen van artikel 28 AVG zijn aanwezig;
- iedere subverwerker en inference-endpoint is vooraf toegestaan en aan gelijkwaardige verplichtingen gebonden;
- iedere doorgifte buiten de EER heeft een geldig hoofdstuk V-mechanisme én een gedocumenteerde transfer impact assessment (“TIA”);
- retentie, verwijdering, no-training en eventueel zero-data-retention (“ZDR”) zijn contractueel én technisch afgedwongen;
- instellingen zijn fail-closed getest: als geen goedgekeurde route beschikbaar is, wordt het verzoek geweigerd en niet via een ruimere route herhaald;
- het bewijsdossier bevat contractversies, screenshots of exports, testresultaten en een eigenaar/hercontroledatum; en
- de publieksdocumenten beschrijven de feitelijke keten zonder absolute claims als “alleen EU”, “volledig privé” of “geen enkele opslag”.

**Niet voldoende:** een privacybadge, marketingpagina, SOC 2-logo, algemene “GDPR compliant”-claim, een EU-runtimekeuze of alleen de instelling “no training”. Deze bewijzen niet zelfstandig een artikel 28-overeenkomst, ZDR of rechtmatige derde-landdoorgifte.

## 2. Feitelijke verwerkingsketen die moet worden vastgelegd

| Schakel | Beoogde rol | Te verwerken gegevens | Contract-/bewijsvereiste |
|---|---|---|---|
| KocaExpress | verwerkingsverantwoordelijke | alle categorieën | verwerkingsregister, DPIA, privacyverklaring, grondslagen en interne procedures |
| Vercel | verwerker voor hostingfuncties; daarnaast mogelijk eigen verwerkingsverantwoordelijke voor servicegegevens | requestmetadata en, wanneer een serverfunctie de call doorstuurt, tijdelijk ook chatinhoud | toepasselijk Pro/Enterprise-DPA, regio- en logbewijs, subprocessorcontrole, oplossing voor contractuele beperking op gevoelige data |
| Supabase | verwerker | account, taken, geheugenitems, consentbewijs, securitylogs; **geen sessietranscript** | DPA, Frankfurt-regio, schema-/retentie-/back-upbewijs, subprocessorcontrole |
| OpenRouter | verwerker of andere contractueel vast te leggen rol | chatinhoud, noodzakelijke context, modelantwoord en requestmetadata | uitgevoerde toepasselijke overeenkomst/DPA, ZDR/no-trainingconfiguratie en schriftelijke dekking van consumentendata en modelproviderketen |
| Iedere daadwerkelijke inference-endpointpartij | subverwerker van OpenRouter, subverwerker van KocaExpress of mogelijk andere rol | chatinhoud, noodzakelijke context, antwoord en technische metadata | rol, juridische entiteit, land, beleid, onward subprocessors, transfermechanisme en retentie per endpoint vastleggen |
| Betaalprovider | vaak deels verwerker en deels zelfstandig verwerkingsverantwoordelijke voor fraude, AML en wettelijke taken | factuur-, klant-, abonnements- en transactiegegevens; kaartdata rechtstreeks bij PSP | serviceschedule/DPA, controllerbepalingen, subprocessors, PCI-scope, retentie en transfers |

**Blokkerend:** de [OpenRouter Enterprise Terms/DPA](https://openrouter.ai/terms-of-service-enterprise) moeten vóór live schriftelijk worden afgestemd op de echte keten. De gepubliceerde tekst noemt in de verwerkingsbijlage als betrokkenen met name geautoriseerde medewerkers/contractors van de klant en vermeldt geen gevoelige data, terwijl Buddy Nederlandse consumenten en vrije tekst verwerkt. De voorwaarden bevatten bovendien een afzonderlijke kwalificatie van AI Model Providers. KocaExpress mag daarom niet stilzwijgend aannemen dat alle modelproviders artikel 28-subverwerkers onder hetzelfde DPA zijn.

Vereis schriftelijke bevestiging of contractaanpassing die ten minste vastlegt:

- dat Nederlandse/EER-consumenten van Buddy betrokkenen onder het DPA zijn;
- dat vrije chatinhoud, mogelijke artikel 9-gegevens, accountdata en metadata binnen de scope vallen;
- welke juridische entiteit voor iedere modelroute optreedt en in welke rol;
- dat artikel 28-flow-down, verwijdering, audit, incidentmelding, no-training en ZDR op iedere toegelaten endpointpartij van toepassing zijn;
- welke landen, transfermechanismen en onward subprocessors worden gebruikt; en
- dat een endpoint niet zonder voorafgaande kennisgeving en autorisatie buiten het goedgekeurde beleid mag vallen.

**ONZEKER — jurist laten bevestigen:** of de standaard gepubliceerde OpenRouter-documenten zonder maatwerk een geldige en volledige artikel 28-keten voor deze consumentendienst opleveren. Tot schriftelijke bevestiging: **BLOKKEREND VOOR LIVE**.

## 3. Artikel 28 AVG — verplichte contractcheck voor iedere verwerker

Vul deze checklist afzonderlijk in voor Vercel, Supabase, OpenRouter en de verwerkersactiviteiten van de betaalprovider. Een link naar algemene voorwaarden telt alleen als die voorwaarden aantoonbaar zijn geaccepteerd, op KocaExpress van toepassing zijn en de relevante dienst dekken.

### 3.1 Kerninhoud van de verwerkersovereenkomst

| Controle | Minimale contractinhoud | Vereist bewijs |
|---|---|---|
| Partijen en rollen | volledige juridische namen, adressen, contracterende entiteiten en kwalificatie controller/verwerker per activiteit | getekende of aantoonbaar geaccepteerde overeenkomst en entiteitenmatrix |
| Onderwerp | levering van de concreet gebruikte hosting-, database-, inference-, authenticatie- of betaaldienst | productschedule/Order Form met plan en functies |
| Duur | start, looptijd, beëindiging en periode waarin data/back-ups nog bestaan | contract, accountdatum en offboardingclausule |
| Aard en doel | uitsluitend verwerking om KocaX Buddy volgens gedocumenteerde instructies te leveren, beveiligen en ondersteunen | DPA-schedule en instructiedocument |
| Betrokkenen | consumenten van 18+, prospecten waar van toepassing, Koca-medewerkers en supportcontacten | expliciete lijst; niet alleen “authorized users” als eindgebruikers ontbreken |
| Persoonsgegevens | accountdata, chatinhoud, context, modeloutput voor zover persoonsgegeven, taken, geheugenitems, consentbewijs, betaalmetadata, IP-/device-/securitydata en supportdata | datacategorieënschedule die bij architectuur en privacyverklaring past |
| Bijzondere gegevens | vrije tekst kan gezondheid, etniciteit, religie, politiek, seksualiteit, biometrie/genetica of andere artikel 9-data bevatten | expliciete contractuele toelating of technisch aantoonbare blokkade vóór de leverancier |
| Gedocumenteerde instructies | alleen verwerken op schriftelijke instructie van KocaExpress, inclusief doorgiften; afwijking alleen bij bindend recht en vooraf melden tenzij verboden | DPA-clausule plus productieconfiguratie |
| Doelbinding | geen eigen reclame, profilering, verkoop, datamakelaardij, modeltraining, menselijke beoordeling of productverbetering met Buddy-inhoud | expliciet contractverbod; instellingen alleen zijn onvoldoende |
| Geheimhouding | iedereen met toegang is tot vertrouwelijkheid verplicht en krijgt alleen need-to-know toegang | DPA/security schedule; toegangsbeleid of assurance-rapport |
| Beveiliging | passende maatregelen conform artikel 32 AVG, afgestemd op vrije consumentenchats | TOMs/security schedule, assurance-rapport, test- en configuratiebewijs |
| Subverwerkers | voorafgaande specifieke of algemene schriftelijke toestemming; wijzigingen vooraf melden; reële bezwaarmogelijkheid | actuele lijst, notificatie-inschrijving, bezwaarprocedure en datum |
| Flow-down | subverwerker krijgt materieel dezelfde gegevensbeschermingsverplichtingen; primaire verwerker blijft jegens KocaExpress verantwoordelijk | DPA-clausule en schriftelijke ketenbevestiging |
| Rechten van betrokkenen | hulp bij inzage, kopie, rectificatie, verwijdering, beperking, overdraagbaarheid, bezwaar en geautomatiseerde besluitvorming | support-SLA, export-/delete-API en testresultaat |
| Beveiligingsbijstand | hulp bij risicoanalyse, beveiliging, datalekken en communicatie aan betrokkenen | incidentclausule en contactkanaal |
| DPIA/voorafgaande raadpleging | redelijke hulp bij artikelen 35 en 36 AVG, inclusief actuele technische en transferinformatie | contractclausule en assurancepakket |
| Datalekmelding | verwerker meldt zonder onredelijke vertraging; contractueel doel: binnen 24 uur na ontdekking, met gefaseerde updates | SLA met inhoud, contactpersoon en oefenresultaat; 72 uur voor KocaExpress begint bij kennisneming |
| Einde dienstverlening | naar keuze retourneren of verwijderen, inclusief kopieën, behoud alleen waar recht verplicht; geen heractivering uit back-up | deletecertificaat, backupcyclus en exitprocedure |
| Verantwoording/audit | alle noodzakelijke informatie beschikbaar; audits/inspecties toegestaan, niet uitsluitend marketingcertificaten | auditclausule, rapporten en escalatiepad voor restrisico's |
| Onrechtmatige instructie | verwerker meldt als een instructie volgens hem in strijd is met AVG of ander EU-/lidstaatrecht | expliciete artikel 28-clausule |
| Schriftelijke vorm | DPA en instructies zijn schriftelijk, ook elektronisch, en versieerbaar | gedateerde PDF/export, acceptatielog of handtekening |

### 3.2 Minimale technische en organisatorische maatregelen

De DPA of security schedule moet ten minste voldoende concreet bewijs geven voor:

- encryptie in transit en at rest, sleutelbeheer en secret rotation;
- MFA/SSO voor beheerders, least privilege, periodieke access reviews en scheiding productie/test;
- logging zonder prompt-, antwoord-, token-, betaalkaart- of bijzondere persoonsgegevens;
- detectie, incidentrespons, forensisch bewijs en datalekcommunicatie;
- tenantisolatie, secure development, dependency-/vulnerabilitybeheer en penetratietests;
- beschikbaarheid, herstel, back-upbeveiliging en geteste disaster recovery;
- verwijdering uit actieve systemen, caches, vectoren/embeddings, replica's en back-ups;
- personeelsscreening voor zover wettelijk toegestaan en vertrouwelijkheid;
- beheer van supporttoegang en tijdelijke, gelogde elevatie;
- bescherming tegen ongeautoriseerde exports, scraping en modeltraining;
- periodieke evaluatie van effectiviteit overeenkomstig artikel 32 lid 1(d) AVG; en
- een procedure voor overheidsverzoeken, inclusief toetsing, minimalisering en kennisgeving waar toegestaan.

SOC 2- of ISO-documentatie kan ondersteunend bewijs zijn, maar vervangt de productspecifieke controles hierboven niet.

### 3.3 Operationele termijnen die KocaExpress moet contracteren

Waar de leverancier ruimte laat, hanteert KocaExpress de volgende doelen:

| Verzoek/gebeurtenis | Contractdoel |
|---|---|
| Beveiligingsincident/datalek | eerste bruikbare melding binnen 24 uur na ontdekking; updates zonder onredelijke vertraging |
| Rechtenverzoek | ontvangstbevestiging door leverancier binnen twee werkdagen; gegevens/actie ruim vóór Koca's wettelijke maandtermijn |
| Productieverwijdering | actieve data onmiddellijk of binnen aantoonbaar technisch maximum; backupverval apart benoemd |
| Subprocessorwijziging | minimaal 30 dagen vooraf melden; als standaardcontract korter is, interne dagelijkse monitoring en escalatie |
| Overheidsverzoek | vooraf melden indien toegestaan; dataminimaliseren en rechtsgeldigheid betwisten waar redelijk |
| Auditbewijs | ten minste jaarlijks en na een materieel incident of ketenwijziging |

## 4. Internationale doorgiften en TIA

Een EU-database of EU-functionregio sluit een derde-landdoorgifte niet uit. Voor Buddy zijn ten minste OpenRouter, inference-endpoints, Vercel-support/-backups, Supabase-subprocessors en de betaalprovider afzonderlijk te toetsen.

### 4.1 Per route vastleggen

- exporteur, importeur en iedere onward recipient met volledige juridische entiteit;
- rolverdeling en toepasselijke SCC-module: doorgaans Module 2 controller-to-processor, maar de feitelijke keten kan Module 3 processor-to-processor vereisen;
- landen van opslag, runtime, support, logging, backups en remote access;
- adequaatheidsbesluit indien toepasselijk, anders de actuele SCC's en eventuele UK-/Zwitserse addenda;
- of de importeur onder een toepasselijk EU-US Data Privacy Framework-certificaat valt, inclusief exacte gecertificeerde entiteit en scope; geen merknaamveronderstelling;
- gevoeligheid, inhoud, volume, frequentie, bewaartermijn en mogelijkheid tot heridentificatie;
- wet- en praktijkrisico in het importland, overheidsbevoegdheden en beschikbare rechtsmiddelen;
- technische aanvullende maatregelen: sterke encryptie, pseudonimisering, minimale context, ZDR, geen logs, sleutelcontrole en endpointbeperking;
- contractuele maatregelen: challenge/notice bij overheidsverzoeken, transparantierapport, onward-transferverbod buiten goedgekeurde lijst en audit;
- resterend risico, eigenaar, goedkeuring en herbeoordelingsdatum.

### 4.2 TIA-beslisboom

1. **Is er toegang of verwerking buiten de EER?** Zo nee, bewijs dit per opslag, support, logs en backups; alleen een regiokeuze is onvoldoende.
2. **Is een adequaatheidsbesluit geldig voor de exacte entiteit en dienst?** Bewaar bewijs. Zo nee: sluit SCC's met juiste module(s).
3. **Kunnen wet of praktijk in het derde land de SCC-bescherming aantasten?** Voer en onderteken de TIA.
4. **Maken aanvullende maatregelen het risico aanvaardbaar?** Zo nee: route blokkeren of uitsluitend een EER-route contracteren.
5. **Wijzigt een endpoint, model, subprocessor, land, feature of retentiebeleid?** Route opnieuw beoordelen vóór activering.

**Minimumuitkomst voor OpenRouter:** een live, versieerbare matrix van `model-ID → endpoint-provider-slug → juridische entiteit → land(en) → retentie/trainingsbeleid → transfergrond → TIA → status`. Een modelnaam als “OpenAI”, “Google” of “Anthropic” is niet precies genoeg: OpenRouter kan hetzelfde model via first-party, Azure, Google Vertex of Amazon Bedrock leveren.

## 5. OpenRouter — exacte productie-instellingen

### 5.1 Gewone OpenRouter-route versus direct/BYOK

| Route | Wiens provideraccount wordt gebruikt? | Welke instelling is bewijs? |
|---|---|---|
| Gewone OpenRouter-route | OpenRouter of zijn upstreamketen | OpenRouter ZDR-/data-policy, endpointselectie, routerbewijs en OpenRouter-contractketen |
| OpenRouter BYOK | KocaExpress' eigen upstreamkey, via OpenRouter | zowel OpenRouter-routing/BYOK-fallbackinstelling als Koca's upstreamcontract, projectinstellingen en retentieapproval |
| Rechtstreekse API-call buiten OpenRouter | KocaExpress' eigen provideraccount | provider-DPA, project-/orginstelling, endpointgedrag en transferconfiguratie |

**Belangrijk:** een ZDR-toggle in een eigen OpenAI-, Anthropic- of Google-account geldt niet voor een gewone OpenRouter-call die niet met die eigen key wordt uitgevoerd. Andersom is OpenRouter-ZDR geen bewijs voor een rechtstreekse of BYOK-call die bij de upstreamprovider niet onder de vereiste approval valt.

### 5.2 Verplichte requestpolicy

Gebruik voor iedere inference-request een centraal, niet door de client overschrijfbaar serverbeleid:

```json
{
  "model": "SERVER_SIDE_APPROVED_MODEL_ID",
  "provider": {
    "zdr": true,
    "data_collection": "deny",
    "only": ["SERVER_SIDE_APPROVED_PROVIDER_SLUG"],
    "allow_fallbacks": false
  }
}
```

`SERVER_SIDE_APPROVED_MODEL_ID` en `SERVER_SIDE_APPROVED_PROVIDER_SLUG` zijn serverconstanten uit de ondertekende productie-allowlist, geen invoer van de gebruiker. Vul ze pas na endpoint-, contract- en TIA-beoordeling in. De officiële [Provider Routing-documentatie](https://openrouter.ai/docs/guides/routing/provider-selection) bevestigt de velden `only` en `allow_fallbacks`; het actuele `provider_tag` uit de endpointdata is leidend.

Verplichte controles:

- `provider.zdr` is exact `true`;
- `provider.data_collection` is exact `"deny"`;
- `provider.only` bevat uitsluitend goedgekeurde endpoint-provider-slugs;
- `provider.allow_fallbacks` is `false`, tenzij meerdere expliciet goedgekeurde slugs in dezelfde allowlist staan en iedere route dezelfde contract-/TIA-status heeft;
- modellen, providerobject en fallbacks zijn volledig server-side en kunnen niet via browser, prompt, tooloutput of gebruikersprofiel worden gewijzigd;
- geen Auto Router of model-array gebruiken zonder afzonderlijke, vaste `allowed_models`-allowlist en test; eenvoudigste verdedigbare start is één expliciet model en endpoint per use case;
- bij HTTP 404, capacity error of policymismatch wordt de request gestopt; geen retry zonder ZDR, zonder `data_collection:"deny"` of buiten `only`;
- plugins, web search en tools blijven uit totdat hun eigen retentie- en subverwerkerketen is beoordeeld; OpenRouter-ZDR dekt die niet automatisch;
- geen prompt of antwoord in request-, error-, APM-, tracing- of supportlogs opnemen.

### 5.3 Account- en guardrailbeleid

Volgens de officiële [OpenRouter ZDR-documentatie](https://openrouter.ai/docs/guides/features/zdr) kan ZDR op account-, guardrail- en requestniveau worden afgedwongen. Een `false` op requestniveau mag een hogere `true` niet versoepelen.

Zet in OpenRouter **Privacy settings** de ZDR-scope aan voor alle vijf gedocumenteerde groepen:

- Anthropic;
- OpenAI;
- Google;
- SpaceXAI; en
- overige/non-frontier providers.

**ONZEKER — exacte actuele klikroute en zichtbare dashboardlabels buiten de officieel genoemde pagina “Privacy settings” zijn niet volledig gedocumenteerd.** Noteer geen verzonnen menuvolgorde; leg de werkelijk getoonde UI met datum en workspace-ID vast.

Koppel de Buddy-productiekey aan een guardrail met exact deze velden:

```json
{
  "enforce_zdr_anthropic": true,
  "enforce_zdr_openai": true,
  "enforce_zdr_google": true,
  "enforce_zdr_xai": true,
  "enforce_zdr_other": true
}
```

Het oudere algemene veld `enforce_zdr` is deprecated en is geen nieuw implementatieadvies.

Zet daarnaast uit of blokkeer:

- **Private Input & Output Logging** in de officieel genoemde **Observability settings**;
- **OpenRouter Use of Inputs/Outputs** in de officieel genoemde **Privacy settings**; en
- routes voor providers die data verzamelen of voor training mogen gebruiken, afzonderlijk voor betaalde en gratis routes waar het account deze keuze toont.

**ONZEKER — exacte actuele namen van de betaalde/gratis accounttoggles zijn niet stabiel in de publieke documentatie.** Het per-requestbewijs `data_collection:"deny"` blijft daarom verplicht, ook als de account-UI correct staat.

### 5.4 Enterprise EU in-region routing — afzonderlijke keuze

OpenRouter documenteert voor Enterprise-klanten op aanvraag regionale verwerking via `https://eu.openrouter.ai`. Na activering worden prompts en antwoorden volgens die documentatie binnen de gekozen regio verwerkt. Dit is **geen standaardonderdeel van ZDR** en een normale `openrouter.ai`-call wordt niet regionaal door alleen `zdr:true` te zetten.

Als KocaExpress in marketing wil zeggen dat modelverwerking binnen de EU plaatsvindt, is vóór die claim minimaal nodig:

- schriftelijke OpenRouter-bevestiging dat EU in-region routing voor de Buddy-workspace is geactiveerd;
- alle productiecalls naar de EU-hostnaam, zonder fallback naar de globale host;
- de beschikbare modellen opvragen via `/api/v1/models/user` op de EU-hostnaam en alleen die regionale routes allowlisten;
- contractuele bevestiging welke EU-datacenters, supporttoegang, metadata en subprocessors binnen of buiten de regio vallen;
- een synthetische endpointtest plus DNS/egresscontrole die globale calls blokkeert; en
- aangepaste privacytekst en transfermatrix voor metadata, support en andere diensten die mogelijk buiten de EER blijven.

Zonder dit bewijs blijft de veilige tekst dat modelverwerking buiten de EER **kan** plaatsvinden. Regionale routing vervangt DPA, subverwerkercontrole, ZDR/no-training of TIA voor resterende doorgiften niet.

### 5.5 Wat ZDR wel en niet betekent

- ZDR filtert inference-endpoints die volgens OpenRouter prompts niet bewaren.
- ZDR is niet hetzelfde als no-training; daarom is `data_collection:"deny"` ook nodig.
- OpenRouter kan technische requestmetadata zoals tokenaantallen, latency en routinginformatie bewaren.
- OpenRouter rekent kortstondige in-memory caching binnen zijn ZDR-definitie.
- wettelijke, fraude- of veiligheidsuitzonderingen en het precieze upstreamcontract moeten apart worden beoordeeld.
- ZDR geldt niet automatisch voor plugins, tools of web search.
- volgens de huidige [providerpolicy-tabel](https://openrouter.ai/providers) kunnen first-party endpoints andere retentie hebben dan gehoste varianten. OpenRouter documenteert bijvoorbeeld dat groeps-ZDR first-party OpenAI, Anthropic en Google AI Studio kan verwijderen terwijl Azure, Bedrock of Vertex kunnen overblijven. Beoordeel dus de endpointpartij, niet alleen de modelontwikkelaar.

### 5.6 OpenRouter-bewijsrun

Voer vóór live, na iedere allowlistwijziging en minimaal maandelijks uit:

1. Exporteer of fotografeer de Privacy-, Observability- en guardrailinstellingen met datum, workspace-ID en key-ID-suffix; scherm secrets af.
2. Roep met een management key `GET https://openrouter.ai/api/v1/endpoints/zdr` aan zoals beschreven in de officiële [ZDR endpoint preview](https://openrouter.ai/docs/api/api-reference/endpoints/preview-the-impact-of-zdr-on-the-available-endpoints). Een gewone key kan 403 geven.
3. Bewaar gesaneerde JSON, tijdstip, hash, model-ID's, provider-tags en policyversie; bewaar geen prompts.
4. Stuur synthetische canaryprompts met `X-OpenRouter-Metadata: enabled` volgens [Router Metadata](https://openrouter.ai/docs/guides/features/router-metadata).
5. Controleer dat iedere respons daadwerkelijk een allowlisted endpoint gebruikt. Bewaar alleen request-ID, endpoint/provider, model, policy-uitkomst, status en tijdstip.
6. Forceer een model/providercombinatie zonder geschikte ZDR-route en bewijs dat de applicatie weigert in plaats van beleid te versoepelen.
7. Controleer applicatie-, Vercel-, Supabase- en observabilitylogs met een unieke canarystring; de string mag nergens voorkomen.
8. Laat CI builds falen als `zdr`, `data_collection`, `only` of fail-closed gedrag ontbreekt.

Bewaar daarnaast:

- uitgevoerde OpenRouter Order Form en DPA-versie;
- [authorized subprocessor list](https://openrouter.ai/authorized-sub-processors) en notificatiebewijs;
- schriftelijke lijst/rol van AI Model Providers, ook als OpenRouter ze niet als eigen subcontractors kwalificeert;
- providerpolicy-snapshot per toegelaten endpoint;
- SCC/TIA en eventuele aanvullende maatregelen; en
- incident-, verwijder- en auditcontacten.

## 6. Onderliggende modelproviders bij gewone OpenRouter-routing

Bij gewone OpenRouter-routing hoeft en kan KocaExpress niet bewijzen dat een eigen upstreamdashboard goed staat. KocaExpress moet wél contractueel laten vastleggen welke upstreamentiteit de data ontvangt, welke retentie geldt en hoe artikel 28/hoofdstuk V door de keten loopt.

| Modelgroep | Gevolg van OpenRouter groeps-ZDR volgens huidige docs | Productiebesluit |
|---|---|---|
| OpenAI-modellen | first-party OpenAI-endpoints worden verwijderd; een Azure-route kan overblijven | alleen expliciet goedgekeurde provider-tag toelaten; Azure-entiteit/regio/contractketen/TIA vastleggen |
| Anthropic-modellen | first-party Anthropic-endpoints worden verwijderd; Bedrock en Vertex kunnen overblijven | alleen expliciet goedgekeurde provider-tag; Amazon/Google-entiteit, regio, retentie en onwardrol vastleggen |
| Google-modellen | Google AI Studio-endpoints worden verwijderd; Vertex kan overblijven | alleen Vertex-provider-tag na entiteits-/regio-/TIA-beoordeling |

**Geen contractbewijs = geen endpoint.** Een regel op de OpenRouter-providerpagina ondersteunt de technische selectie, maar vervangt geen overeenkomst, subverwerkersmachtiging of TIA.

## 7. Rechtstreeks of BYOK — aanvullende providercontroles

Deze sectie geldt alleen als KocaExpress een eigen providerkey rechtstreeks gebruikt of via OpenRouter BYOK toevoegt. Zonder direct/BYOK is zij geen bewijs voor de gewone OpenRouter-route.

### 7.1 OpenRouter BYOK-fallback

De officiële [BYOK-documentatie](https://openrouter.ai/docs/guides/overview/auth/byok) vermeldt dat OpenRouter na een mislukte eigen key standaard naar gedeelde OpenRouter-capaciteit kan terugvallen. Als een specifieke BYOK-contractketen verplicht is:

- zet de eigen key in de bedoelde prioritized-sectie;
- activeer de gedocumenteerde optie **“Always use for this provider”**;
- houd `provider.only` en `allow_fallbacks:false` in ieder verzoek aan;
- test rate limit en upstream failure; de call moet falen en mag niet naar shared capacity gaan; en
- bewaar screenshot met workspace, provider, key-ID-suffix en datum, nooit de key zelf.

### 7.2 OpenAI direct/BYOK

Officiële bronnen: [API data controls](https://developers.openai.com/api/docs/guides/your-data), [DPA](https://openai.com/policies/data-processing-addendum/), [Enterprise privacy](https://openai.com/enterprise-privacy/) en [subprocessors](https://openai.com/policies/subprocessors).

Vereisten:

- API-data wordt standaard niet voor training gebruikt tenzij expliciet opt-in, maar standaard abuse-monitoring kan input/output tot 30 dagen bewaren. “No training” is daarom geen ZDR.
- ZDR of Modified Abuse Monitoring vereist voorafgaande OpenAI-goedkeuring en aanvullende voorwaarden; het is geen standaard self-servicekeuze.
- na approval documenteert OpenAI het pad **Settings → Organization → Data controls → Data Retention**. Stel organisatie én ieder productieproject in en laat geen project op een ruimere override staan;
- verkrijg schriftelijk bewijs met exacte organisatie-ID, project-ID, endpoints, modellen en ingangsdatum;
- stuur waar ondersteund `store:false`; ZDR kan dit voor geschikte endpoints afdwingen;
- gebruik alleen endpoints/features die in de actuele datacontroltabel als ZDR-eligible staan. Conversations, Assistants/Threads, vector stores, Files, fine-tuning, evals, Batches en andere persistente functies zijn niet zonder meer ZDR;
- beoordeel background mode, application state, audio, prompt caching en safety-retentie afzonderlijk;
- voor EU data residency: verkrijg project-/contractapproval, gebruik het gedocumenteerde EU-endpoint `eu.api.openai.com` en verifieer wat buiten de regio blijft; en
- archiveer DPA, subprocessorlijst, approval, screenshots, codeconfiguratie en een endpointtest.

### 7.3 Anthropic direct/BYOK

Officiële bronnen: [API- en dataretentie](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention), [retentieuitleg](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data), [ZDR-scope](https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to), [DPA](https://www.anthropic.com/legal/data-processing-addendum), [serverlocaties](https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers) en [subprocessors](https://trust.anthropic.com/subprocessors).

Vereisten:

- reguliere API-inhoud kan tot 30 dagen worden bewaard; safety-/handhavingsuitzonderingen kunnen langer gelden. No-training is geen ZDR;
- ZDR vereist sales-/accountapproval per organisatie;
- na approval is het officieel gedocumenteerde verificatiepad **Settings → Privacy Controls → Data retention period**;
- leg organisatie-ID, ingangsdatum, modellen en eligible features schriftelijk vast;
- hanteer een featuredenylist: Files, batches, code execution, Managed Agents, MCP connector en andere niet-ZDR-features blijven uit zolang de actuele tabel ze niet dekt;
- controleer de actuele modeltabel: bepaalde covered models kunnen verplichte retentie hebben en niet ZDR-geschikt zijn;
- leg safety/legal-holduitzonderingen en wereldwijde server-/supportlocaties in privacytekst en TIA vast; en
- laat de DPA-scope voor eventuele bijzondere persoonsgegevens schriftelijk aansluiten op Buddy.

### 7.4 Google Gemini direct/BYOK

Officiële bronnen: [Gemini API ZDR](https://ai.google.dev/gemini-api/docs/zdr), [usage policies](https://ai.google.dev/gemini-api/docs/usage-policies), [Gemini API Terms](https://ai.google.dev/gemini-api/terms), [Google Cloud DPA](https://cloud.google.com/terms/data-processing-addendum) en [subprocessors](https://cloud.google.com/terms/subprocessors).

Vereisten:

- gebruik voor een EER-facing client uitsluitend de contractueel toegestane Paid Services met actieve billing; unpaid/free verwerking mag niet als productiecontrole dienen;
- Paid Services gebruiken prompts/responses niet voor modelverbetering, maar standaard abuse-logging kan inhoud bewaren. No-training is geen ZDR;
- project-specifieke ZDR vereist aanvraag en Google-approval;
- **ONZEKER — het exacte aanvraagformulier, dashboardpad en zichtbare bewijsveld voor Gemini Developer API ZDR zijn niet in de officiële publieke ZDR-doc vastgelegd.** Verkrijg daarom schriftelijke approval met project-ID en ga niet af op een verondersteld vinkje;
- bij de Interactions API: `store:false` afdwingen;
- geen Search Grounding of Maps Grounding gebruiken zolang ZDR is vereist; de docs noemen hiervoor afzonderlijke 30-dagenretentie die niet kan worden uitgezet;
- geen Session Resumption voor Live API, Files, expliciete context caches of andere persistente features zonder afzonderlijke beoordeling;
- leg vast dat impliciete kortstondige caching binnen Google's ZDR-definitie kan bestaan; en
- archiveer billingstatus, DPA, subprocessorlijst, ZDR-approval, codechecks en fail-closed tests.

## 8. Vercel

Officiële bronnen: [Vercel DPA](https://vercel.com/legal/dpa), [Function regions](https://vercel.com/docs/functions/configuring-functions/region), [regiolijst](https://vercel.com/docs/regions), [runtime logs](https://vercel.com/docs/logs/runtime) en [security/subprocessors](https://security.vercel.com).

### 8.1 Contractuele acceptatie

- Gebruik geen Hobby-plan voor consumentendata. De huidige DPA omschrijft toepassing voor Pro en Enterprise; bewaar plan-/factuurbewijs.
- Archiveer de DPA-versie, toepasselijke Service Specific Terms, TOMs, subprocessorlijst en notificatie-inschrijving.
- De huidige DPA beschrijft primaire verwerkingsfaciliteiten in de VS, mogelijke wereldwijde verwerking en globale backups. Presenteer `fra1` niet als volledige EU-residency.
- De huidige DPA-schedule beperkt het opnemen van sensitive/special-category data in Customer Data. Een chatrequest kan zulke tekst door een Vercel Function voeren, ook als KocaExpress haar niet duurzaam opslaat.
- Verkrijg vóór live een schriftelijk addendum/verklaring die deze verwerking toestaat en beveiligt, of ontwerp en bewijs een architectuur waarin de inhoud Vercel niet bereikt.

**ONZEKER — jurist laten bevestigen:** of de standaard Vercel-DPA vrije Buddy-chat met mogelijke bijzondere persoonsgegevens toestaat. Zonder schriftelijke oplossing: **BLOKKEREND VOOR LIVE**.

### 8.2 Regio, logs en bewijs

De officiële documentatie noemt Frankfurt als `fra1`. Stel de Function-regio expliciet in, bijvoorbeeld waar de gebruikte runtime dit ondersteunt:

```json
{
  "regions": ["fra1"]
}
```

Controleer per daadwerkelijk gebruikte runtime: Functions, Edge, Cron, Queues, middleware en eventuele failover kunnen een andere regiowerking hebben. Bewaar bronconfiguratie én deployed projectbewijs; alleen de repositoryconfig is onvoldoende.

- voorkom `console.log`/exception serialisatie van prompts, antwoorden, cookies, Authorization headers, geheugenitems en betaaldata;
- zet third-party APM/session replay uit of redacteer vóór verzending;
- voer een unieke canarystring door productieachtige flows en zoek alle Vercel-logoppervlakken;
- leg de retentie vast die hoort bij het werkelijk gekozen plan;
- **ONZEKER — interne backendretentie en het exacte actuele UI-pad voor alle redactioninstellingen zijn niet volledig publiek gedocumenteerd.** Vraag dit schriftelijk en verzin geen menu-instructie;
- leg supporttoegang, globale backups, verwijdertermijn en overheidsverzoeken vast in TIA/offboarding; en
- abonneer op subprocessorwijzigingen en houd rekening met de korte contractuele bezwaarperiode.

Vercel heeft voor core hosting geen algemene “zero retention”-toggle. ZDR is hier geen passend label; bewijs minimalisering, loguitsluiting, verwijdering en backupverval.

## 9. Supabase

Officiële bronnen: [Supabase DPA](https://supabase.com/legal/customer-resources/data-processing-addendum), [regio's](https://supabase.com/docs/guides/platform/regions), [backups](https://supabase.com/docs/guides/platform/backups), [databasegrootte/VACUUM](https://supabase.com/docs/guides/platform/database-size), [logs](https://supabase.com/docs/guides/monitoring-and-debugging/logs) en [subprocessors](https://supabase.com/legal/customer-resources/subprocessor-list).

### 9.1 Contract en regio

- Archiveer de in de voorwaarden opgenomen DPA, SCC's, toepasselijk abonnement, project-ID en actuele subprocessorlijst.
- Selecteer exact AWS **Central EU (Frankfurt), `eu-central-1`**. Een algemene “Europe”-keuze kan volgens de regiopagina ook een niet-EU-locatie zoals London of Zurich opleveren.
- De geselecteerde regio betreft primaire projectdata. Support, subprocessors, observability en andere servicegegevens kunnen internationale toegang/verwerking meebrengen; TIA blijft nodig.
- Supabase is een persistente database-/authdienst en heeft geen zinvolle algemene ZDR-instelling. No-training/doelbinding volgt uit contract en configuratie; noem Supabase niet “zero retention”.
- De DPA stelt voorwaarden aan verwerking van Sensitive Data. Een item-specifieke geheugenconsent legaliseert niet automatisch eerdere gevoelige sessietekst. Stem de artikel 9-gate, contractscope en DPIA op elkaar af.

### 9.2 Dataminimalisatie en verwijdering

Productieregels:

- geen tabel, bucket, vectorstore, realtime channel history of auth/user metadata gebruiken voor sessietranscripten;
- alleen het concrete geheugenitem opslaan nadat aparte toestemming is gelogd;
- geen volledige prompt in task-/memorysamenvatting, error of auditrecord kopiëren;
- RLS op alle gebruikerstabellen; service-role key uitsluitend server-side en least privilege;
- export en verwijdering omvatten geheugenrecord, embedding/vector, afgeleide samenvatting, storageobject, cache en zoekindex;
- verwijderde actieve data mag niet uit een backup naar productie terugkeren zonder opnieuw toepassen van een deletion ledger;
- leg uit dat fysieke dead tuples tot databaseonderhoud/VACUUM kunnen bestaan en dat backups volgens de plantermijn vervallen.

De huidige backupdocumentatie noemt onder meer dagelijkse backupvensters van zeven dagen voor Pro, veertien dagen voor Team en tot dertig dagen voor Enterprise. Controleer en registreer het werkelijk afgenomen plan; beloof niet “direct overal definitief weg” als afgeschermde backups nog moeten vervallen.

### 9.3 Logs en bewijs

- log nooit chatinhoud, geheugenitems, bijzondere gegevens, Authorization headers of secrets vanuit Functions of SQL;
- houd `log_connections` uit tenzij aantoonbaar noodzakelijk; zet pgAudit alleen doelgericht aan en voorkom dat statements waarden bevatten;
- minimaliseer IP-/User-Agentverwerking en plaats geen persoonsgegevens in User-Agentvelden;
- voer canarytests uit in database-, auth-, API-, function-, realtime- en storage-logs;
- **ONZEKER — de publieke gebruikerszichtbaarheid van logs is niet hetzelfde als de interne verwijdertermijn.** Vraag Supabase schriftelijk naar backend-/auditlogretentie voor het gekozen plan en de gekozen regio;
- bewaar een schema-export waaruit blijkt dat geen sessietranscript wordt opgeslagen;
- bewaar screenshot/export van project-ID en `eu-central-1`, backupplan, RLS-test, create/export/delete-test en subprocessorabonnement.

## 10. Betaalprovider

De betaalprovider is nog niet bevestigd. Daarom kunnen de juridische entiteit, rollen, instellingen, subprocessors, transfers en bewaartermijnen niet definitief worden ingevuld.

**Status: NODIG VOOR EERSTE EURO; geen checkout activeren totdat dit deel is gesloten.**

### 10.1 Selectie- en contracteisen

- volledige naam en vestigingsland van de contracterende PSP-entiteit;
- dienstenmatrix die onderscheid maakt tussen verwerkerstaken en zelfstandige controllerdoelen zoals AML, fraude, sancties, kredietrisico en wettelijke administratie;
- toepasselijke DPA/controllerbepalingen, SCC's/adequaatheid, subprocessor-/serviceproviderlijst en notificatie;
- hosted payment page of hosted fields zodat PAN/CVC rechtstreeks van browser naar PSP gaat;
- actuele PCI-verplichtingen en passende SAQ/attestatie voor de gekozen integratie;
- bewaartermijnen voor customer, payment method, transaction, fraud, dispute, invoice en webhookdata;
- self-service opzegging, refunds, chargebacks en verwijdering zonder fiscale gegevens onrechtmatig te wissen;
- webhook-signatureverificatie, replaybescherming, secret rotation en idempotency;
- geen kaartnummer/CVC in Vercel, Supabase, logs, supportticket, analytics of Buddy-chat; en
- privacytekst die de dubbele rol en wettelijke retentie eerlijk benoemt.

Bewaar als bewijs: accountlegal-entity, geaccepteerde contract-/DPA-versie, subprocessorinschrijving, dataflow, hosted-checkouttest, PCI-document, webhooktest en retentiematrix.

### 10.2 Alleen als Stripe wordt gekozen

Neem Stripe niet als feit op totdat KocaExpress de keuze bevestigt. Officiële bronnen zijn de [Stripe DPA](https://stripe.com/legal/dpa), [serviceproviders](https://stripe.com/legal/service-providers) en [security integration guide](https://docs.stripe.com/security/guide).

- Stripe kan per activiteit verwerker of zelfstandige verwerkingsverantwoordelijke zijn; neem beide rollen op.
- Gebruik hosted Checkout of een door Stripe gehost invoerelement waardoor kaartdata rechtstreeks naar Stripe gaat.
- Een payment provider heeft geen algemene ZDR/no-trainingtoggle: fraude-, AML-, chargeback- en wettelijke administratie vereisen retentie.
- Controleer de exacte contracterende Stripe-entiteit, DPF/SCC-scope, Radar-/fraudefuncties, Link/marketingkeuzes en optionele datafuncties vóór activering.
- **ONZEKER — exacte UI-paden hangen af van account, regio en geactiveerde Stripe-producten.** Leg de werkelijk gebruikte instellingen vast; publiceer geen fictief klikpad.

## 11. Leveranciersacceptatiematrix

Een leverancier is pas groen als iedere verplichte cel een bewijsreferentie heeft.

| Controle | OpenRouter | Vercel | Supabase | Betaalprovider |
|---|---|---|---|---|
| Juiste juridische entiteit | ☐ | ☐ | ☐ | ☐ |
| DPA/Order Form aantoonbaar van kracht | ☐ | ☐ | ☐ | ☐ |
| Consumenten als betrokkenen gedekt | ☐ | ☐ | ☐ | ☐ |
| Vrije tekst/mogelijke bijzondere data toegestaan | ☐ | ☐ | ☐ | n.v.t. tenzij support/metadata dit bevat |
| Artikel 28-check volledig | ☐ | ☐ | ☐ | ☐ voor verwerkersactiviteiten |
| Subprocessorlist + alerts | ☐ | ☐ | ☐ | ☐ |
| Onward/modelproviders expliciet gedekt | ☐ | n.v.t. | n.v.t. | n.v.t. |
| Landen-/datastromenkaart | ☐ | ☐ | ☐ | ☐ |
| SCC/adequaatheid + TIA | ☐ | ☐ | ☐ | ☐ |
| Retentie/backups/logs bekend | ☐ | ☐ | ☐ | ☐ |
| No-training contractueel | ☐ | n.v.t.; doelbinding | n.v.t.; doelbinding | n.v.t. |
| ZDR technisch en contractueel | ☐ | n.v.t. | n.v.t. | n.v.t. |
| Logging zonder inhoud getest | ☐ | ☐ | ☐ | ☐ |
| Export/delete/offboarding getest | ☐ | ☐ | ☐ | ☐ |
| Incident- en rechten-SLA | ☐ | ☐ | ☐ | ☐ |
| Finale jurist-/eigenaarssign-off | ☐ | ☐ | ☐ | ☐ |

## 12. Bewijsdossier

Gebruik per leverancier een map met onveranderbare kopieën of hashes. Neem geen API-secrets of chatinhoud op.

Minimale inhoud:

1. `01-ENTITEIT-EN-PLAN` — factuur/accountpagina, juridische entiteit en productplan.
2. `02-DPA-EN-ORDER-FORM` — gedateerde PDF, acceptatielog/handtekening en toepasselijke schedules.
3. `03-SUBPROCESSORS` — lijstsnapshot, wijzigingsnotificatie en bezwaarprocedure.
4. `04-DATAFLOW-EN-REGIOS` — gegevenscategorie, endpoint, land, support, logs en backups.
5. `05-SCC-TIA` — module, bijlagen, aanvullende maatregelen, eigenaar en datum.
6. `06-CONFIG` — gesaneerde screenshots/exports met workspace/project-ID en tijdstip.
7. `07-TESTS` — fail-closed, canary, export, delete, webhook en restore-test.
8. `08-ASSURANCE` — TOMs, relevante auditrapporten en bevindingen/mitigaties.
9. `09-INCIDENT-EN-DSAR` — contacten, SLA en tabletop-oefening.
10. `10-GOEDKEURING` — juridisch oordeel, restrisicoacceptatie en hercontroledatum.

Een screenshot bevat minimaal: datum/tijd, leverancier, workspace-/project-ID, volledige relevante instelling en een tweede controleur. Scherm tokens, API-keys, prompts, antwoorden en betaalgegevens af.

## 13. Wijzigingsbeheer

Heropen de leveranciersbeoordeling vóór:

- nieuw model, provider-tag, plugin, web search, tool of fallbackroute;
- overgang van gewone OpenRouter naar BYOK of direct API-gebruik;
- nieuwe Vercel-runtime, regio, observability- of logdienst;
- Supabase-plan-, regio-, backup-, extensie- of schemaverandering;
- andere betaalprovider of nieuw fraude-/checkoutproduct;
- gewijzigde DPA, subprocessor, dataretentie of transfergrond;
- beveiligingsincident of aanwijzing dat logs inhoud bevatten; en
- marketingclaim over privacy, encryptie, EU-hosting, no-training of ZDR.

Minimaal per kwartaal controleert de privacy-eigenaar de provider-/subprocessorlijsten; OpenRouter-endpoints en fail-closed tests worden maandelijks en bij iedere deploymentwijziging gecontroleerd.

## 14. Ondertekenblok leveranciersacceptatie

| Veld | In te vullen |
|---|---|
| Leverancier en juridische entiteit |  |
| Diensten/plan |  |
| DPA-/Order Form-versie en datum |  |
| Subprocessorlist-versie |  |
| Transfergrond en TIA-datum |  |
| Productieconfiguratieversie |  |
| Laatste fail-closed/delete/logtest |  |
| Openstaande afwijkingen |  |
| Restrisico | laag / middel / hoog / niet aanvaardbaar |
| Besluit | toelaten / voorwaardelijk / blokkeren |
| Technisch eigenaar, naam/datum |  |
| KocaExpress, naam/datum |  |
| Juridische review, naam/datum |  |

## 15. Geconsolideerde taakverdeling

De enige geconsolideerde eindlijst **“Dit moet Koca zelf regelen of tekenen / Dit kan en moet software afdwingen”** staat aan het eind van `00-START-HERE.md`. Gebruik die lijst als eigenaarsoverzicht; de detailcontroles in dit document blijven leidend voor leveranciersacceptatie.

---

## Officiële leveranciersbronnen

Alle bronnen hieronder zijn provider-eigen pagina's, gecontroleerd op 13 augustus 2026:

- OpenRouter: [ZDR](https://openrouter.ai/docs/guides/features/zdr), [provider logging/data policy](https://openrouter.ai/docs/guides/privacy/provider-logging), [data collection](https://openrouter.ai/docs/guides/privacy/data-collection), [I/O logging](https://openrouter.ai/docs/guides/features/input-output-logging), [provider routing](https://openrouter.ai/docs/guides/routing/provider-selection), [BYOK](https://openrouter.ai/docs/guides/overview/auth/byok), [providers](https://openrouter.ai/providers), [router metadata](https://openrouter.ai/docs/guides/features/router-metadata), [Enterprise Terms/DPA](https://openrouter.ai/terms-of-service-enterprise) en [subprocessors](https://openrouter.ai/authorized-sub-processors).
- OpenAI: [API data controls](https://developers.openai.com/api/docs/guides/your-data), [DPA](https://openai.com/policies/data-processing-addendum/), [Enterprise privacy](https://openai.com/enterprise-privacy/) en [subprocessors](https://openai.com/policies/subprocessors).
- Anthropic: [API/dataretentie](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention), [retentie](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data), [ZDR-scope](https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to), [DPA](https://www.anthropic.com/legal/data-processing-addendum), [serverlocaties](https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers) en [subprocessors](https://trust.anthropic.com/subprocessors).
- Google: [Gemini ZDR](https://ai.google.dev/gemini-api/docs/zdr), [usage policies](https://ai.google.dev/gemini-api/docs/usage-policies), [Gemini API Terms](https://ai.google.dev/gemini-api/terms), [Google Cloud DPA](https://cloud.google.com/terms/data-processing-addendum) en [subprocessors](https://cloud.google.com/terms/subprocessors).
- Vercel: [DPA](https://vercel.com/legal/dpa), [Function regions](https://vercel.com/docs/functions/configuring-functions/region), [regions](https://vercel.com/docs/regions), [runtime logs](https://vercel.com/docs/logs/runtime) en [security/subprocessors](https://security.vercel.com).
- Supabase: [DPA](https://supabase.com/legal/customer-resources/data-processing-addendum), [regions](https://supabase.com/docs/guides/platform/regions), [backups](https://supabase.com/docs/guides/platform/backups), [database/VACUUM](https://supabase.com/docs/guides/platform/database-size), [logs](https://supabase.com/docs/guides/monitoring-and-debugging/logs) en [subprocessors](https://supabase.com/legal/customer-resources/subprocessor-list).
- Indien Stripe wordt gekozen: [DPA](https://stripe.com/legal/dpa), [serviceproviders](https://stripe.com/legal/service-providers) en [security integration guide](https://docs.stripe.com/security/guide).
