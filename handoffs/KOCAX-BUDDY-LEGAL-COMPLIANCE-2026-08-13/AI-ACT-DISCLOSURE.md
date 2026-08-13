# KocaX Buddy — AI-transparantie en artikel 50 AI-verordening

**Conceptversie:** 1.0  
**Peildatum:** 13 augustus 2026  
**Eigenaar:** `<<INVULLEN: volledige naam eigenaar volgens actueel KvK-uittreksel>>`, handelend onder de naam KocaExpress  
**Contact:** info@kocaexpress.com · +31 6 19312603

> Dit is een implementatiebeleid, geen verklaring van volledige naleving. Artikel 50 van de AI-verordening geldt sinds 2 augustus 2026. KocaExpress moet vóór livegang zijn rol, technische markering en bewijsvoering laten bevestigen.

## 1. Hoofdregel

Buddy is een AI-systeem dat rechtstreeks met mensen communiceert. De gebruiker moet daarom vanaf het begin van de eerste interactie duidelijk weten dat hij of zij met AI praat. KocaExpress vertrouwt niet op de beperkte uitzondering dat dit voor een gemiddeld geïnformeerde, oplettende gebruiker al “duidelijk” zou zijn.

De melding staat in de chatinterface vóór het eerste invoerveld en is zichtbaar voordat de gebruiker een bericht kan verzenden. Zij staat niet alleen in voorwaarden, onboarding, een helpartikel of privacyverklaring. De interface houdt daarna een blijvend label **“AI-assistent”** zichtbaar bij Buddy.

## 2. Exacte eerste-contacttekst

### Nederlands

> **Je praat met KocaX Buddy, een AI-systeem — niet met een mens.** Antwoorden kunnen onjuist of onvolledig zijn. Controleer belangrijke informatie zelf. Om te antwoorden, wordt de nodige chatinhoud door geselecteerde AI-providers verwerkt. [Hoe je gegevens worden verwerkt](./PRIVACY.md)

Knop:

> **Begrepen — chat starten**

### English

> **You’re chatting with KocaX Buddy, an AI system—not a human.** Answers can be inaccurate or incomplete. Check important information yourself. To respond, selected AI providers process the necessary chat content. [How your data is processed](./PRIVACY.md)

Button:

> **Got it — start chatting**

De eerste zin is de artikel 50-melding. De tweede zin is aanvullende, klantvriendelijke risicoinformatie en vervangt de eerste zin niet.

## 3. Plaatsing en toegankelijkheid

- Toon de tekst vóór de eerste interactie, zonder scrollen op een normaal telefoonvenster.
- Gebruik gewone lopende tekst met voldoende contrast; geen tooltip als enige drager.
- Laat screenreaders de melding vóór het chatveld voorlezen. Koppel haar programmatisch aan het chatgebied, bijvoorbeeld met een beschrijving via `aria-describedby`.
- Maak de knop toetsenbordbedienbaar en geef focus zichtbaar weer.
- Log alleen `account-ID`, taal, meldingversie en tijdstip van eerste weergave/bevestiging. De melding is verplicht en vraagt geen toestemming.
- Bij een terugkerende gebruiker blijft **“AI-assistent”** in de chatheader staan. Bij een materiële wijziging in de aard van het systeem wordt de eerste-contactmelding opnieuw getoond.
- Een menselijke supportmedewerker gebruikt een eigen, ondubbelzinnig label **“Medewerker van KocaExpress”**. Laat nooit onduidelijk of een antwoord van Buddy of een mens komt.

### Blijvend label

Nederlands:

> **Buddy · AI-assistent**

English:

> **Buddy · AI assistant**

Toegankelijke naam:

> Nederlands: **KocaX Buddy, AI-assistent**  
> English: **KocaX Buddy, AI assistant**

## 4. Buddy-antwoorden in de privéchat

De gewone één-op-éénchat hoeft op grond van artikel 50 lid 4 niet bij elk tekstantwoord opnieuw zichtbaar als “AI-gegenereerd” te worden gelabeld. Het eerste-contactbericht en blijvende AI-label blijven wel vereist. Voeg niet automatisch een zware disclaimer aan ieder bericht toe; dat kan de eerste, duidelijke melding juist minder effectief maken.

Voor ieder inhoudelijk risicovol antwoord blijft de productdisclaimer gelden: Buddy is geen arts, advocaat, financieel adviseur, nood- of crisisdienst en belangrijke informatie moet worden gecontroleerd.

## 5. Machineleesbare markering van output

Artikel 50 lid 2 verplicht de **provider** van een generatief AI-systeem om synthetische tekst, audio, beeld en video machineleesbaar te markeren en detecteerbaar te maken. De oplossing moet, voor zover technisch haalbaar, effectief, interoperabel, robuust en betrouwbaar zijn en rekening houden met het type content, implementatiekosten en de algemeen erkende stand van de techniek.

KocaExpress brengt Buddy onder de eigen naam op de EU-markt. Daardoor is KocaExpress waarschijnlijk provider van het Buddy-systeem, ook wanneer basismodellen via OpenRouter komen. **ONZEKER — jurist laten bevestigen:** de uiteindelijke provider-/deployerrollen hangen af van architectuur, contracten en de mate waarin KocaExpress het systeem heeft laten ontwikkelen of inhoudelijk heeft samengesteld.

### Live-eis

KocaExpress kiest vóór live één van deze routes:

1. aansluiten bij en aantoonbaar voldoen aan **sectie 1 van de door Commissie en AI Board adequaat bevonden Code of Practice on Transparency of AI-Generated Content**; of
2. een eigen, aantoonbaar gelijkwaardige markerings- en detectieoplossing documenteren.

Alleen een zichtbaar label, databaseveld, HTTP-header, HTML-attribuut of intern auditlog is **niet zonder meer voldoende**. Gebruik geen zelfbedachte claim als “artikel 50-compliant” zonder een technisch-juridische conformiteitsbeoordeling.

### Minimale engineeringacceptatie

- inventariseer per outputtype: chattekst, gekopieerde tekst, `.txt`, Markdown, PDF, afbeelding, audio en video;
- documenteer per uitgesloten output waarom de uitzondering volgens de Commissie-richtsnoeren geldt, bijvoorbeeld broncode, een zeer korte reeks tekens, uitsluitend machine-tot-machine-output of gewone ondersteunende redactie die invoer of betekenis niet wezenlijk verandert;
- leg vast welke machineleesbare markering ieder type draagt en hoe die na normale export, download of delen behouden blijft;
- implementeer de markering op systeemniveau vóór output aan de gebruiker wordt geleverd;
- bied een gedocumenteerde detectiemethode of verifier volgens de gekozen Code-route;
- test effectiviteit, interoperabiliteit, robuustheid en betrouwbaarheid met versie, datum, testcorpus en resultaten;
- bewaar configuratie- en testbewijs zonder chatinhoud;
- bewaak of modelprovider, router, exportbibliotheek of formaatconversie de markering verwijdert;
- herhaal tests na iedere relevante wijziging en minstens per kwartaal.

Een markering van een onderliggende modelprovider ontslaat KocaExpress niet van verantwoordelijkheid voor de uiteindelijke Buddy-output als KocaExpress provider is. Leg contractueel vast welke partij markeert, behoud de markering door OpenRouter en de applicatielaag heen en voeg zelf een passende markering toe wanneer de upstream-output die niet aantoonbaar bevat.

Voor systemen die pas na 2 augustus 2026 op de markt komen geldt geen algemene viermaandengratie. De beperkte overgang tot 2 december 2026 geldt alleen voor de markeringsplicht van systemen die al vóór 2 augustus 2026 op de markt waren of in gebruik waren.

**BLOKKEREND VOOR LIVE:** geen output leveren totdat de providerrol en een passende artikel 50 lid 2-route schriftelijk zijn beoordeeld en technisch zijn getest.

## 6. Zichtbare labels bij publicatie of delen

### Privéchat of privé-export

Een privégesprek of privé-export is niet alleen daardoor een publicatie die het publiek over een zaak van publiek belang informeert. Machineleesbare markering kan wel vereist blijven onder artikel 50 lid 2.

Bij export toont Buddy klantvriendelijk:

Nederlands:

> **Deze export bevat antwoorden die door KocaX Buddy met AI zijn gegenereerd.**

English:

> **This export contains answers generated with AI by KocaX Buddy.**

### Deepfakes

Als KocaExpress beeld, audio of video publiceert die een bestaande of plausibel bestaande persoon, zaak, plaats, entiteit of gebeurtenis nabootst en ten onrechte authentiek of waar kan lijken, is uiterlijk bij eerste blootstelling een duidelijke zichtbare of hoorbare melding nodig. Een verborgen machineleesbare marker vervangt die melding niet.

Nederlands:

> **Deze inhoud is met AI gegenereerd of aangepast.**

English:

> **This content was generated or modified with AI.**

Gebruik waar passend het officiële EU-icoon naast deze tekst. Het icoon is optioneel en bewijst op zichzelf geen naleving.

### Tekst over zaken van publiek belang

Publiceert KocaExpress AI-gegenereerde of AI-bewerkte tekst met het doel het publiek te informeren over zaken van publiek belang, dan verschijnt uiterlijk bij eerste blootstelling:

Nederlands:

> **Deze tekst is met AI gegenereerd of aangepast.**

English:

> **This text was generated or modified with AI.**

Dit zichtbare label is niet vereist wanneer de tekst een wezenlijke menselijke inhoudelijke beoordeling of redactionele controle heeft doorlopen én een natuurlijke of rechtspersoon de redactionele verantwoordelijkheid voor de publicatie draagt. Alleen spellingcontrole, stijlaanpassing of formele goedkeuring is geen wezenlijke inhoudelijke beoordeling. Leg reviewer, deskundigheid, bronnencontrole, wijzigingen, goedkeuring en verantwoordelijke vast.

## 7. Nieuwe functies

Buddy gebruikt bij launch geen emotieherkenning of biometrische categorisering. Voeg zo'n functie niet toe zonder afzonderlijke rechtmatigheids-, proportionaliteits- en artikel 50 lid 3-beoordeling en duidelijke informatie aan iedere blootgestelde persoon.

Een tool, plugin of modelroute mag alleen live als is vastgesteld:

- wie provider en deployer is;
- welk outputtype ontstaat;
- wie de machineleesbare markering toevoegt en bewaart;
- of zichtbare openbaarmakingsplicht geldt; en
- hoe KocaExpress dit kan bewijzen.

## 8. AI-geletterdheid

Artikel 4 AI-verordening geldt sinds 2 februari 2025. KocaExpress moet, rekening houdend met ieders rol, ervaring en de gebruikscontext, zoveel mogelijk zorgen voor voldoende AI-geletterdheid van personeel en andere personen die Buddy namens KocaExpress exploiteren of gebruiken.

Vóór live krijgen eigenaar, developers en support minimaal instructie over:

- dat Buddy AI is en kan hallucineren;
- de grenzen rond medisch, juridisch en financieel gebruik;
- sessiechat, geheugen, gevoelige gegevens en providerdoorgifte;
- Guided-goedkeuring en het verbod op menselijke controle veinzen;
- incident-, datalek- en klacht-escalatie;
- artikel 50-labels en behoud van machineleesbare markeringen; en
- wijzigingen die een nieuwe juridische/technische review vereisen.

Bewaar datum, doelgroep, materiaal en aanwezigheid. Een eenmalige training volstaat niet bij materiële systeem- of rolwijzigingen.

## 9. Bewijsmap

Bewaar minimaal:

- screenshots en toegankelijkheidstest van de eerste-contactmelding;
- interfaceversie en deploymentdatum;
- provider-/deployerbeoordeling;
- gekozen Code of Practice-sectie, ondertekend formulier en nalevingsbewijs, of gelijkwaardige eigen onderbouwing;
- markeringsspecificatie per formaat en verifierresultaten;
- tests van kopiëren, exporteren, downloaden en delen;
- register van publieke AI-content, gebruikte labels en eventuele menselijke redactie;
- wijzigings- en incidentlog.
- AI-geletterdheidsmateriaal en deelnamebewijs.

## 10. Officiële bronnen

- [Geconsolideerde AI-verordening, artikel 50 — stand 27 juli 2026](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A02024R1689-20260727)
- [Europese Commissie — FAQ transparantieverplichtingen artikel 50](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act)
- [Europese Commissie — richtsnoeren artikel 50](https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems)
- [Europese Commissie — Code of Practice on Transparency of AI-Generated Content](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content)
- [Europese Commissie — EU-iconen voor AI-content](https://digital-strategy.ec.europa.eu/en/policies/eu-icons-labelling-ai-generated-content)
