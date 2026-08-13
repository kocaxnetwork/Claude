# KocaX Buddy — proportionele 18+-poort

**Conceptversie:** 1.0  
**Peildatum:** 13 augustus 2026  
**Doelgroep:** Nederlandse consumenten van 18 jaar en ouder  
**Aanbieder:** `<<INVULLEN: volledige naam eigenaar volgens actueel KvK-uittreksel>>`, handelend onder de naam KocaExpress  
**Contact:** info@kocaexpress.com · +31 6 19312603

> De 18+-grens is voor deze algemene AI-assistent een product- en contractkeuze. Dit document is geen wettelijke safe harbour voor overeenkomsten die een minderjarige zonder vereiste toestemming sluit.

## 1. Gekozen aanpak

Buddy is niet gericht op kinderen en accepteert alleen gebruikers van 18 jaar of ouder. Voor een algemene persoonlijke AI-assistent bestaat geen algemene plicht om uitsluitend wegens deze zelfgekozen leeftijdsgrens een identiteitsdocument, gezichtsscan, bank-ID of volledige geboortedatum te verzamelen.

De eenvoudigste verdedigbare en privacyvriendelijke poort is daarom:

- een afzonderlijke, niet vooraf aangevinkte zelfverklaring bij registratie;
- dezelfde 18+-voorwaarde duidelijk bij checkout en in de voorwaarden;
- technisch blokkeren wanneer de gebruiker niet verklaart 18+ te zijn;
- alleen verklaring, tijdstip en documentversie loggen;
- geen marketing die op minderjarigen is gericht; en
- een incidentroute voor signalen dat een gebruiker jonger is dan 18.

Dit is proportioneel zolang Buddy geen pornografie, gokken, alcoholverkoop, wettelijk leeftijdsgebonden goederen, harde volwasseninhoud of andere functie aanbiedt waarvoor sterkere leeftijdscontrole vereist kan zijn.

## 2. Exacte UI-tekst bij registratie

### Nederlands

Niet vooraf aangevinkt:

> ☐ **Ik verklaar dat ik 18 jaar of ouder ben.** KocaX Buddy is alleen bedoeld voor volwassenen.

Knop zolang niet aangevinkt:

> **Account aanmaken** — uitgeschakeld

Validatiefout:

> **U kunt KocaX Buddy alleen gebruiken als u 18 jaar of ouder bent.**

### English

Unchecked by default:

> ☐ **I confirm that I am 18 or older.** KocaX Buddy is intended for adults only.

Button while unchecked:

> **Create account** — disabled

Validation message:

> **You can only use KocaX Buddy if you are 18 or older.**

## 3. Exacte tekst bij checkout en in account

Direct boven de betaalverplichting, naast de andere kernvoorwaarden:

Nederlands:

> **Alleen 18+.** Door te bestellen bevestigt u dat uw eerdere 18+-verklaring nog juist is.

English:

> **18+ only.** By placing your order, you confirm that your earlier age declaration is still accurate.

Accountpagina:

> **Leeftijdsstatus: 18+ zelf verklaard.**

English:

> **Age status: self-declared 18+.**

## 4. Wat wordt gelogd

Bewaar uitsluitend:

```json
{
  "adult_self_declaration": true,
  "declared_at": "ISO-8601-tijdstip",
  "age_gate_version": "1.0",
  "terms_version": "toepasselijke versie",
  "account_id": "gepseudonimiseerd intern ID"
}
```

Bewaar niet standaard:

- geboortedatum;
- leeftijd in jaren;
- kopie of nummer van paspoort, identiteitskaart of rijbewijs;
- selfie, gezichtsscan of biometrische template;
- BSN;
- gegevens van ouders of voogd;
- betaalmethode als verborgen leeftijdsbewijs.

Een betaalkaart bewijst niet dat de gebruiker de kaarthouder of meerderjarig is.

De 18+-verklaring is een verklaring over contractuele toelating, geen AVG-toestemming voor extra gegevensverwerking. Leid leeftijd niet heimelijk af uit chatinhoud, gezicht, stem, apparaatgedrag of advertentieprofielen en stuur chatinhoud niet naar een leeftijdsschatter.

## 5. Juridische beperking van de zelfverklaring

Een minderjarige heeft voor rechtshandelingen in beginsel toestemming van een wettelijke vertegenwoordiger nodig, behalve wanneer het in het maatschappelijk verkeer gebruikelijk is dat een minderjarige van die leeftijd die handeling zelfstandig verricht. Bij een doorlopend abonnement kunnen kosten oplopen; volgens ACM ConsuWijzer mag een aanbieder er dan niet zonder meer van uitgaan dat ouderlijke toestemming bestaat.

Daarom:

- schrijf niet dat een onjuiste verklaring de overeenkomst altijd geldig maakt;
- neem geen beding op dat ieder restitutie- of vernietigingsrecht uitsluit;
- gebruik de verklaring niet als bewijs dat ouderlijke toestemming bestond;
- beoordeel een ouderlijk verzoek om vernietiging individueel en snel; en
- probeer geen nog te betalen termijnen te innen nadat de overeenkomst rechtsgeldig is vernietigd.

## 6. Signaal of melding dat een gebruiker minderjarig is

Een grap, typefout of enkel modelvermoeden is niet automatisch voldoende om een account definitief te sluiten. Bij een concrete eigen verklaring, oudermelding, betrouwbare supportinformatie of ander sterk signaal:

1. pauzeer nieuwe betalingen en externe acties;
2. laat Buddy geen inhoudelijke leeftijdsondervraging uitvoeren;
3. stuur een neutrale melding en bied contact met support;
4. beoordeel contract en eventuele ouderlijke vernietiging;
5. beëindig toegang als de gebruiker jonger dan 18 blijkt;
6. restitueer waar de wet dat vereist;
7. verwijder persoonsgegevens volgens de privacyverklaring, behalve wat aantoonbaar nodig blijft voor wettelijke administratie of het geschil; en
8. leg uitkomst en reden beperkt vast.

Exacte tijdelijke melding — Nederlands:

> **Uw account is tijdelijk beperkt omdat wij een concreet signaal hebben dat u mogelijk jonger bent dan 18.** Buddy is alleen voor volwassenen. Neem contact op via info@kocaexpress.com. Stuur geen identiteitsdocument per e-mail.

English:

> **Your account has been temporarily restricted because we received a specific indication that you may be under 18.** Buddy is for adults only. Contact info@kocaexpress.com. Do not email us an identity document.

## 7. Verzoek van een ouder of voogd

Publiceer bij support:

### Nederlands

> Denkt u dat uw minderjarige kind zonder uw toestemming een Buddy-abonnement heeft afgesloten? E-mail info@kocaexpress.com met het account-e-mailadres, de globale besteldatum en uw verzoek. Stuur geen kopie van een identiteitsdocument. Wij vragen alleen aanvullende informatie wanneer die noodzakelijk en proportioneel is en behandelen het abonnement, de betaling en de gegevens afzonderlijk.

### English

> Do you believe your minor child subscribed to Buddy without your permission? Email info@kocaexpress.com with the account email address, approximate order date and your request. Do not send a copy of an identity document. We request additional information only where necessary and proportionate, and assess the subscription, payment and data separately.

Verifieer dat de verzoeker bevoegd is zonder automatisch een volledige ID-kopie te vragen. Begin met accountkennis, betaalbewijs met afgeschermde gegevens of een korte verklaring. Als zwaarder bewijs echt noodzakelijk is, laat niet-relevante gegevens, waaronder BSN en documentnummer, afschermen en verwijder het bewijs na verificatie volgens een korte termijn.

## 8. Wanneer sterkere leeftijdscontrole nodig wordt

Herbeoordeel vóór iedere functie- of doelgroepwijziging. Sterkere verificatie kan noodzakelijk of proportioneel worden wanneer:

- wetgeving de aangeboden inhoud, dienst of transactie aan een minimumleeftijd bindt;
- Buddy volwassen- of anderszins schadelijke inhoud aanbiedt;
- misbruikgegevens aantonen dat veel minderjarigen de zelfverklaring omzeilen;
- een toezichthouder dit verlangt; of
- KocaExpress minderjarigen wil toelaten.

Kies dan een leeftijdsattributendienst die uitsluitend het antwoord **“18+ ja/nee”** teruggeeft, zonder identiteit, exacte geboortedatum of documentkopie met KocaExpress te delen. Voer eerst een DPIA/update, leveranciersbeoordeling, grondslaganalyse, bewaartermijn en beveiligingstest uit.

De Europese privacyvriendelijke leeftijdsverificatieblauwdruk is een mogelijk technisch uitgangspunt, geen algemene wettelijke verplichting voor Buddy.

**ONZEKER — jurist laten bevestigen:** of toekomstige Buddy-functies of beschikbare content een sectorspecifieke leeftijdsverificatieplicht activeren. Bij twijfel blijft de functie uit.

## 9. Als minderjarigen later worden toegelaten

De huidige documenten en zelfverklaring zijn daarvoor niet geschikt. Ontwerp dan eerst afzonderlijk:

- contractuele toestemming door ouder/voogd waar nodig;
- kindvriendelijke privacy-informatie;
- leeftijdsgeschikt product- en veiligheidsontwerp;
- moderatie en escalatie;
- gegevensminimalisatie en standaardinstellingen; en
- de AVG-grondslagen per verwerking.

In Nederland kan een kind bij een rechtstreeks aangeboden online dienst in beginsel pas vanaf 16 jaar zelf AVG-toestemming geven; onder 16 is bij een verwerking die daadwerkelijk op toestemming rust ouderlijke machtiging nodig. Dit zegt niet dat iedere andere contractuele of AVG-verwerking daardoor automatisch is toegestaan.

## 10. Release- en periodieke controle

- Checkbox staat bij iedere nieuwe registratie standaard uit.
- Accountaanmaak en checkout falen dicht zonder geldige verklaring.
- API en mobiele interface handhaven dezelfde poort als de website.
- De productteksten en advertenties richten zich niet op kinderen.
- Support kent de minderjarigen- en ouderroute.
- Er wordt geen ID-document per gewone e-mail gevraagd.
- Ieder kwartaal worden omzeilingssignalen en klachten beoordeeld zonder leeftijdsprofilering van alle gebruikers.
- Iedere nieuwe content- of actiefunctie krijgt vooraf een leeftijdsrisicobeoordeling.

## 11. Officiële bronnen

- [Burgerlijk Wetboek Boek 1, artikel 234 — handelingsbekwaamheid minderjarigen](https://wetten.overheid.nl/BWBR0002656/#Boek1_Titeldeel13_Afdeling1_Artikel234)
- [ACM ConsuWijzer — aankoop of abonnement door een kind](https://consument.acm.nl/aankoop-dienst-annuleren/aankoop-door-kind)
- [Autoriteit Persoonsgegevens — grondslag toestemming en kinderen](https://www.autoriteitpersoonsgegevens.nl/themas/basis-avg/avg-algemeen/grondslag-toestemming)
- [Europese Commissie — privacyvriendelijke EU-leeftijdsverificatie](https://digital-strategy.ec.europa.eu/en/policies/eu-age-verification)
- [AVG, met name artikelen 5, 8, 12 en 25](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)
