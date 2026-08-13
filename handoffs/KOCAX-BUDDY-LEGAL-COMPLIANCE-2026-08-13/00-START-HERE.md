# KocaX Buddy — juridisch & compliance startdossier

**Versie:** concept 1.0  
**Peildatum:** 13 augustus 2026  
**Doel:** consumentenlancering in Nederland, 18+  
**Aanbieder:** `<<INVULLEN: volledige naam eigenaar volgens actueel KvK-uittreksel>>`, handelend onder de naam KocaExpress  
**KvK:** 99592428  
**Btw-id:** NL005402514B55  
**Contact:** info@kocaexpress.com · +31 6 19312603  
**Status:** **NO-GO totdat alle blokkerende punten in `RISICOREGISTER.md` aantoonbaar zijn gesloten.**

> Dit dossier bevat werkbare concepten, geen juridisch advies en geen verklaring dat KocaX Buddy aan alle wetgeving voldoet. Publiceer de teksten alleen als de software, contracten en feitelijke gegevens er exact mee overeenkomen. Laat de eindversie controleren door een Nederlandse jurist met ervaring in consumentenrecht, AVG en de AI-verordening.

## Eerst invullen of bevestigen

Alle nog onbekende velden staan hier één keer bij elkaar. Dezelfde `<<INVULLEN: ...>>`-markeringen komen terug waar ze juridisch nodig zijn.

1. `<<INVULLEN: volledige naam eigenaar volgens actueel KvK-uittreksel>>` — **blokkerend**. Alleen de initialen “M.E. Koca” zijn bevestigd; een privacyverklaring van een eenmanszaak moet de natuurlijke persoon correct identificeren.
2. `<<INVULLEN: volledig vestigingsadres volgens actueel KvK-uittreksel>>` — **blokkerend**. De eerder gebruikte adressen zijn onderling tegenstrijdig.
3. `<<INVULLEN: ingangsdatum voorwaarden en privacyverklaring>>` — pas invullen na finale goedkeuring.
4. `<<INVULLEN: gekozen betaalprovider en contracterende juridische entiteit>>` — **blokkerend**. Stripe is in dit dossier alleen als aanbevolen implementatieroute opgenomen, niet als bevestigd feit.
5. `<<INVULLEN: objectieve fair-use- en gebruikslimieten>>` — bijvoorbeeld berichten, tokens, bestanden, modelklasse en eventuele snelheidslimiet per maand. Geen “onbeperkt” publiceren zonder echte onbeperkte levering.
6. `<<INVULLEN: technisch maximum waarna sessiechat definitief uit actieve systemen verdwijnt>>` — **blokkerend**; “sessie-only” moet technisch meetbaar zijn.
7. `<<INVULLEN: Supabase-abonnement en maximale back-upcyclus>>` — bepaalt hoe lang verwijderde gegevens nog uitsluitend in afgeschermde back-ups kunnen bestaan.
8. `<<INVULLEN: Vercel-abonnement, contractversie en schriftelijke oplossing voor mogelijke bijzondere persoonsgegevens>>` — **blokkerend**; de actuele standaard-DPA verbiedt zulke data in Customer Data.
9. `<<INVULLEN: definitieve productie-allowlist van modellen én inference-endpoints>>` — neem model-ID, endpoint-provider-slug, juridische entiteit en land op; niet alleen de merknamen OpenAI, Google en Anthropic.
10. `<<INVULLEN: keuze directe start of start na 14 dagen>>` — de aanbevolen standaard is directe start op uitdrukkelijk verzoek, met een echte keuze om pas na 14 dagen te starten.
11. `<<INVULLEN: versie en datum van elk getekend/geaccepteerd DPA en transfermechanisme>>` — inclusief Order Form, addendum, SCC-pakket en toepasselijke adequaatheid/DPF-basis.
12. `<<INVULLEN: eigenaar en datum van de laatste transfer impact assessment per derde-landroute>>`.
13. `<<INVULLEN: reactietermijn en kanaal voor supportklachten>>` — aanbevolen: ontvangst binnen twee werkdagen, inhoudelijke reactie binnen veertien dagen.
14. `<<INVULLEN: EAA-status met bewijs van aantal werkzame personen, jaaromzet en balanstotaal>>` — KocaExpress is alleen vrijgesteld als micro-onderneming die diensten levert: minder dan 10 personen én jaaromzet of balanstotaal maximaal € 2 miljoen. **ONZEKER — accountant/jurist laten bevestigen.**

## Beslissingen die dit pakket al vastzet

- Productnaam in de consumenteninterface: **KocaX Buddy**, verkort **Buddy**.
- Eén consumentenplan: **€ 19,99 per maand inclusief btw**, automatische maandverlenging en op ieder moment self-service opzegbaar tegen het einde van de lopende betaalperiode.
- Het wettelijke herroepingsrecht blijft **14 dagen** bestaan. Direct gebruik maakt dat recht bij deze doorlopende dienst niet automatisch ongedaan. Bij een geldig verzoek om direct te starten kan bij herroeping alleen een evenredig bedrag voor de al geleverde periode worden berekend.
- Er komen twee verschillende functies: **“Abonnement opzeggen”** voor toekomstige verlengingen en gedurende de bedenktijd **“Overeenkomst hier herroepen”** met bevestiging en e-mailbewijs.
- Chat is standaard sessie-only. Een geheugenitem wordt alleen na een afzonderlijke, zichtbare keuze opgeslagen en blijft per item verwijderbaar.
- Taken en herinneringen die de gebruiker zelf aanmaakt, mogen worden opgeslagen voor uitvoering van de overeenkomst; zij zijn geen stilzwijgend “AI-geheugen”.
- Guided-modus is standaard. Voor iedere externe actie ziet de gebruiker doel, ontvanger, gegevens en gevolg en geeft die gebruiker apart goedkeuring.
- Buddy-chat is **niet end-to-end versleuteld tegenover KocaExpress**. De inhoud moet tijdens een verzoek leesbaar worden verwerkt om een antwoord te genereren.
- Een Vercel-functie in Frankfurt en een primaire Supabase-database in Frankfurt betekenen niet dat alle verwerking in de EER blijft. Vercel, modelinference, support en subprocessors kunnen derde-landdoorgiften veroorzaken; die moeten per entiteit en route worden beoordeeld.
- Geen training en zero retention worden pas als feit gepubliceerd nadat accountinstellingen, request-flags, endpointselectie en contractbewijs samen zijn vastgelegd.
- Start zonder marketing-/analyticscookies. Alleen strikt noodzakelijke sessie-, beveiligings- en consentkeuzetechniek.
- 18+ via zelfverklaring en voorwaarden; geen identiteitsdocument of geboortedatum verzamelen zonder concrete aanleiding.
- Buddy geeft geen medisch, juridisch of financieel advies en neemt geen beslissingen met rechtsgevolg voor de gebruiker.

## Inhoud

| Bestand | Gebruik |
|---|---|
| `TERMS.md` | Websitevoorwaarden NL + EN, herroeping en modelformulier |
| `PRIVACY.md` | Privacyverklaring NL + EN |
| `DPIA.md` | DPIA-concept, risicoanalyse en ondertekenblok |
| `DPA-EISEN.md` | Contract- en instellingencheck per leverancier |
| `AI-ACT-DISCLOSURE.md` | Eerste-contactmelding, labels en AI Act-implementatie |
| `CONSENT-EN-COOKIES.md` | Privacyvriendelijk cookiebeleid en exacte UI-copy |
| `18-PLUS.md` | Proportionele 18+-poort en UI-copy |
| `RISICOREGISTER.md` | Live-gates, eigenaar, bewijs en doorlooptijd |
| `CLAIMS-CHECK.md` | Verboden claims en veilige alternatieven |
| `SOURCES.md` | Officiële juridische en leveranciersbronnen |
| `MANIFEST.md` | Pakketinhoud, gebruik en kwaliteitscontrole |
| `SHA256SUMS.txt` | Integriteitshashes na afronding |

## Minimale publicatievolgorde

1. Sluit identiteit, adres, fair use, betaalprovider en technische bewaartermijnen.
2. Accepteer/bewaar DPA's, subverwerkerslijsten, SCC/adequaatheidsgrond en transferbeoordeling.
3. Zet OpenRouter en alle inference-verzoeken fail-closed op ZDR/no-training; voer een bewijsrun uit.
4. Bouw export, volledige verwijdering, geheugenconsent en de gevoelige-data-poort.
5. Bouw checkout, duurzame bevestigingsmail, self-service opzegging en afzonderlijke herroepingsfunctie.
6. Publiceer voorwaarden, privacy, cookies en AI-melding met dezelfde versienummers als de consentlogs.
7. Voer security-, privacy-, billing- en consumentenrechtacceptatietests uit.
8. Laat de finale documenten en bewijsmap onafhankelijk controleren en neem pas daarna betalingen aan.

## Dit moet Koca zelf regelen of tekenen

- Het actuele KvK-uittreksel controleren en één correct vestigingsadres aanwijzen.
- Definitieve fair-use- en productlimieten kiezen en commercieel goedkeuren.
- Betaalprovider kiezen; DPA, betaalvoorwaarden en eventuele controller-to-controller-rollen accepteren.
- Een OpenRouter Order Form/DPA of maatwerkaddendum sluiten dat consumenten, vrije chat, mogelijke bijzondere persoonsgegevens en de volledige modelproviderketen dekt.
- Per inference-endpoint schriftelijk entiteit, rol, landen, retentie, no-training, ZDR, subprocessors en transferwaarborg bevestigen.
- De Vercel-DPA-beperking voor gevoelige/bijzondere Customer Data schriftelijk oplossen of aantoonbaar zorgen dat chatinhoud Vercel niet bereikt.
- Vercel-, Supabase- en OpenRouter-contracten, actuele subverwerkerslijsten en wijzigingsalerts bewaren; zo nodig Enterprise EU in-region routing contracteren.
- Een verwerkers- en doorgiftebeoordeling ondertekenen; vastleggen wie iedere leverancier en wijziging blijft controleren.
- SCC's, TIA's en eventuele adequaatheid/DPF-basis per exacte juridische entiteit ondertekenen en periodiek herbeoordelen.
- De DPIA als eigenaar/verwerkingsverantwoordelijke goedkeuren en resterende risico's formeel accepteren of de verwerking stoppen.
- Bij waarschijnlijk hoog restrisico eerst de Autoriteit Persoonsgegevens raadplegen en niet verwerken zolang artikel 36 dat blokkeert.
- Klachten-, terugbetalings-, datalek- en rechtenprocedures bemensen.
- De fiscale bewaartermijnen en btw/OSS-behandeling met boekhouder bevestigen.
- Met accountant/jurist vastleggen of de micro-ondernemingsvrijstelling van de European Accessibility Act geldt; zo niet, vóór online verkoop toegankelijkheid en toegankelijkheidsverklaring afronden.
- Medewerkers en opdrachtnemers die Buddy exploiteren passende AI-geletterdheid geven en bewijs daarvan bewaren.
- Een jurist de finale websiteversies laten beoordelen; daarna ingangsdatum en versienummers vastzetten.
- Geen marketingclaim goedkeuren die verder gaat dan het aanwezige bewijs.

## Dit kan en moet software afdwingen

- 18+-zelfverklaring, versiegebonden akkoord met voorwaarden en checkoutbewijs loggen.
- De juiste knoptekst voor betalingsverplichting, directe-startkeuze en herroepingsbevestiging tonen.
- “Abonnement opzeggen” en “Overeenkomst hier herroepen” als twee afzonderlijke, werkende flows aanbieden.
- Voor iedere inference-request `zdr: true`, `data_collection: "deny"`, een server-side `only`-allowlist en `allow_fallbacks: false` afdwingen en bij mismatch weigeren.
- Alle vijf OpenRouter ZDR-guardrailvelden activeren, productiekeys eraan binden en Private I/O Logging, input/output-use, Broadcast en niet-beoordeelde tools/plugins uit laten.
- Wanneer EU in-region routing is gecontracteerd uitsluitend de EU-hostnaam gebruiken en globale egress technisch blokkeren.
- Prompts en antwoorden uit applicatie-, platform- en observabilitylogs houden.
- Chat sessie-only houden; geheugen alleen na item-specifieke toestemming opslaan.
- Geheugen, embeddings, afgeleide samenvattingen en caches aantoonbaar per item verwijderen.
- Export en accountverwijdering self-service uitvoeren, met duidelijke uitzonderingen voor fiscale gegevens.
- Een gevoelige-datawaarschuwing en expliciete toestemmingspoort tonen vóór externe verwerking van vermoedelijke artikel 9-gegevens.
- Guided-modus en expliciete bevestiging per externe actie fail-closed afdwingen.
- AI-identiteit bij eerste contact en een blijvend AI-label tonen; generatieve output machineleesbaar markeren en detecteerbaar maken waar artikel 50 AI-verordening dit vereist.
- Iedere medewerker, opdrachtnemer en beheerder die Buddy namens KocaExpress exploiteert of gebruikt passende AI-geletterdheid geven voor rol, risico's, menselijke controle, privacy en incidentescalatie; deelname en materiaal vastleggen.
- Alleen strikt noodzakelijke opslag vóór opt-in gebruiken; analytics en marketing standaard uit laten.
- Bewaartermijnen automatisch toepassen en back-upverval documenteren.
- Auditbewijs genereren zonder chatinhoud: configuratieversie, provider/endpoint, consentversie, actiebevestiging, verwijderingsreceipt en foutstatus.
- Deployments blokkeren als contractbewijs, endpointpolicy, retentieconfiguratie of een vereiste acceptatietest ontbreekt of verlopen is.
