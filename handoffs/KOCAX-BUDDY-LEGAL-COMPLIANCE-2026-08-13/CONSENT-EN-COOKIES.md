# KocaX Buddy — cookies, lokale opslag en toestemming

**Conceptversie:** 1.0  
**Peildatum:** 13 augustus 2026  
**Aanbieder:** `<<INVULLEN: volledige naam eigenaar volgens actueel KvK-uittreksel>>`, handelend onder de naam KocaExpress  
**Contact:** info@kocaexpress.com · +31 6 19312603

> Publiceer dit beleid alleen als een productie-scan bevestigt dat de website exact deze technieken gebruikt. “Cookie” betekent hieronder ook vergelijkbare toegang tot of opslag op het apparaat, zoals localStorage, pixels en SDK-identifiers.

## 1. Privacyvriendelijke launchkeuze

KocaX Buddy start **zonder analytics, advertenties, marketingpixels, sessiereplay, heatmaps, social-media-embeds of niet-noodzakelijke personalisatie**. Alleen techniek die strikt noodzakelijk is om de door de gebruiker gevraagde dienst veilig te leveren, wordt vóór toestemming gebruikt.

Bij deze configuratie is geen toestemmingsbanner nodig. Toon geen misleidende banner met alleen “Accepteren” voor noodzakelijke cookies. Plaats in footer, registratie en accountinstellingen een link **“Cookies en apparaatopslag”** naar dit beleid.

Het ontbreken van een banner is alleen verdedigbaar zolang een technische scan bevestigt dat geen opt-inplichtige techniek vóór een keuze wordt geladen.

## 2. Wat zonder opt-in mag

Artikel 11.7a Telecommunicatiewet staat opslag of uitlezing zonder toestemming alleen toe wanneer zij:

- uitsluitend nodig is om communicatie over een elektronisch communicatienetwerk uit te voeren; of
- strikt noodzakelijk is om de informatiedienst te leveren waarom de gebruiker uitdrukkelijk heeft gevraagd.

Nederland kent daarnaast een beperkte uitzondering voor analytics met geen of slechts geringe gevolgen voor de persoonlijke levenssfeer. KocaExpress gebruikt die uitzondering bij launch niet. “Cookieless” of “privacyvriendelijk” betekent niet automatisch dat een analyticsdienst is vrijgesteld.

De AVG blijft daarnaast gelden voor persoonsgegevens in noodzakelijke cookies en logs. Gebruik gegevens niet stilzwijgend voor analytics, marketing of profilering.

## 3. Productiespecificatie noodzakelijke opslag

Gebruik uitsluitend de onderstaande first-partynamen en doelen. Als de gekozen authenticatie- of hostingsoftware andere namen afdwingt, moet de productielijst vóór publicatie worden bijgewerkt; gebruik geen brede categorie als vervanging voor de echte namen.

| Naam | Type | Doel | Levensduur | Instellingen |
|---|---|---|---|---|
| `__Host-kxb_session` | Secure HTTP-cookie | Ingelogde sessie aan het account koppelen | sessie of maximaal 24 uur | `Secure; HttpOnly; SameSite=Lax; Path=/`; geen `Domain`; willekeurige opaque ID, geen naam/e-mail/chattekst |
| `__Host-kxb_csrf` | beveiligingscookie | Vervalste verzoeken blokkeren | maximaal 2 uur of einde sessie | `Secure; HttpOnly; SameSite=Strict; Path=/`; geen `Domain`; geen persoonsgegevens. Als de gekozen double-submitmethode JavaScripttoegang vereist, gebruik daarvoor aantoonbaar een afzonderlijke, niet-`HttpOnly` CSRF-tokennaam en pas deze tabel aan |
| `__Secure-kxb_auth_flow` | Secure HTTP-cookie | OAuth/magic-link-state en PKCE tijdens een door gebruiker gestarte login | maximaal 10 minuten | `Secure; HttpOnly; SameSite=Lax; Path=/auth`; single use |
| `__Host-kxb_locale` | first-party cookie | De uitdrukkelijk gekozen taal onthouden | maximaal 6 maanden | `Secure; SameSite=Lax; Path=/`; geen `Domain`; alleen `nl` of `en` |
| `__Host-kxb_cookie_choice` | first-party cookie, alleen als een voorkeurenscherm bestaat | Een weigering of keuze voor optionele doeleinden onthouden | maximaal 6 maanden, eerder opnieuw vragen bij materiële wijziging | `Secure; SameSite=Lax; Path=/`; geen `Domain`; categorieboolean en beleidsversie, geen unieke marketing-ID |
| `__Secure-kxb_checkout` | Secure HTTP-cookie | Eén door de gebruiker gestart checkoutproces aan een bestelling koppelen | maximaal 30 minuten | `Secure; HttpOnly; SameSite=Lax; Path=/checkout`; opaque ID; na afronding verwijderen |

Bij de analytics-loze launch zonder voorkeurenscherm wordt `__Host-kxb_cookie_choice` niet geplaatst. Een rechtstreeks in de browser gebruikte Supabase-client kan bijvoorbeeld een anders genoemd authenticatietoken in webopslag zetten. Dat past niet stilzwijgend in deze tabel: implementeer authenticatie via een beveiligde server-/BFF-sessie of vermeld en beoordeel de feitelijke Supabase-opslag vóór live.

### Niet als cookie opslaan

- chatprompts of Buddy-antwoorden;
- geheugenitems of embeddings;
- volledige betaalkaartgegevens of CVC;
- geboortedatum of identiteitsdocument;
- advertentie-ID, fingerprint of cross-site-ID;
- volledige e-mail of naam wanneer een willekeurig sessie-ID volstaat.

Gebruik sessionStorage alleen voor vluchtige, door de gebruiker ingevoerde niet-gevoelige interface-state. Wis dit bij uitloggen, sluiten van de sessie en accountverwijdering. Zet geen chatinhoud in localStorage, browsercache of service-worker-cache.

## 4. Betaal- en externe leveranciers

Laad de betaalprovider pas nadat de gebruiker zelf **“Verder naar betalen”** kiest. Embed geen betaalwidget, fraude-SDK of providerpixel op gewone informatie-, registratie- of chatpagina’s.

Cookies die aantoonbaar strikt noodzakelijk zijn voor de door de gebruiker gestarte betaling kunnen zonder opt-in vallen. Dat geldt niet automatisch voor iedere cookie van een betaalprovider. Inventariseer vóór live per naam, domein, doel en duur. Blokkeer marketing-, attribution- en cross-sitecookies van de betaalprovider.

Laad geen externe chat-, video-, kaart-, lettertype- of social-mediaresource die het apparaat uitleest voordat noodzaak of geldige opt-in is vastgesteld. Host essentiële fonts en assets bij voorkeur zelf.

## 5. Exacte UI bij analytics-loze launch

Geen pop-upbanner. Toon in het cookiebeleid bovenaan:

### Nederlands

> **Buddy gebruikt alleen noodzakelijke cookies en apparaatopslag.** Die zijn nodig om u veilig te laten inloggen, uw taalkeuze te onthouden en een door u gestart betaalproces uit te voeren. Wij gebruiken bij launch geen analytics-, advertentie- of marketingcookies. Daarom vragen wij geen cookie-opt-in.

Knop in accountinstellingen:

> **Noodzakelijke opslag bekijken**

### English

> **Buddy uses only necessary cookies and device storage.** They are needed to let you sign in securely, remember your language choice and complete a payment process you started. At launch, we do not use analytics, advertising or marketing cookies. That is why we do not ask for cookie opt-in.

Account button:

> **View necessary storage**

## 6. Als later optionele techniek wordt toegevoegd

Optionele techniek blijft geblokkeerd tot een actieve keuze. Vooraf aangevinkte vakjes, stilzwijgen, doorscrollen en doorgaan met de site zijn geen toestemming. Accepteren en weigeren staan op dezelfde eerste laag, zijn visueel gelijkwaardig en vereisen even weinig stappen.

### Eerste laag — Nederlands

> **Uw keuze over optionele cookies**
>
> Buddy gebruikt noodzakelijke cookies om veilig te werken. Met uw toestemming gebruiken wij daarnaast de hieronder genoemde optionele doeleinden. Weigeren heeft geen gevolgen voor de basisdienst. U kunt uw keuze later even eenvoudig wijzigen.

Knoppen, in deze volgorde en gelijke stijl:

> **Alleen noodzakelijk**  
> **Keuze instellen**  
> **Alles accepteren**

### First layer — English

> **Your choice about optional cookies**
>
> Buddy uses necessary cookies to work securely. With your consent, we also use the optional purposes described below. Refusing does not affect the core service. You can change your choice just as easily later.

Buttons, in this order and with equal styling:

> **Necessary only**  
> **Set preferences**  
> **Accept all**

### Tweede laag — doelgerichte keuzes

Laat geen leverancierslijst als vervanging voor doeleinden zien. Iedere schakelaar staat standaard uit.

Nederlands:

> **Noodzakelijk — altijd actief**  
> Nodig voor inloggen, beveiliging, taalkeuze en een door u gestart betaalproces. Deze opslag kan niet worden uitgeschakeld zolang u de gevraagde functie gebruikt.
>
> **Analytics — uit**  
> Helpt ons begrijpen welke pagina’s en functies worden gebruikt. Pas activeren nadat leverancier, gegevens, bewaartermijn en doorgifte in dit beleid zijn genoemd.
>
> **Personalisatie — uit**  
> Onthoudt niet-noodzakelijke voorkeuren op dit apparaat. Langetermijngeheugen in Buddy heeft een afzonderlijke toestemming per item en valt nooit onder deze cookieschakelaar.
>
> **Marketing — uit**  
> Meet campagnes of toont gepersonaliseerde reclame. KocaExpress gebruikt dit bij launch niet.

Knoppen:

> **Selectie opslaan**  
> **Alles weigeren**

English:

> **Necessary — always active**  
> Required for sign-in, security, language choice and a payment process you started. This storage cannot be disabled while you use the requested feature.
>
> **Analytics — off**  
> Helps us understand which pages and features are used. Activate only after this policy identifies the provider, data, retention period and transfer.
>
> **Personalisation — off**  
> Remembers non-essential preferences on this device. Buddy long-term memory requires separate consent for each item and is never covered by this cookie switch.
>
> **Marketing — off**  
> Measures campaigns or shows personalised advertising. KocaExpress does not use this at launch.

Buttons:

> **Save selection**  
> **Reject all**

## 7. Toestemming intrekken

Plaats een blijvende footer- en accountlink **“Cookiekeuze wijzigen”** / **“Change cookie choices”**. Eén klik opent hetzelfde voorkeurenscherm. Na intrekking:

- blokkeert KocaExpress het betreffende script onmiddellijk voor toekomstig gebruik;
- verwijdert KocaExpress first-party optionele cookies en localStorage voor zover technisch mogelijk;
- roept KocaExpress beschikbare vendor-consent-revocation en verwijder-API’s aan;
- legt alleen de nieuwe keuze, beleidsversie en tijd vast; en
- legt uit dat reeds rechtmatige verwerking niet met terugwerkende kracht verdwijnt en hoe een AVG-verwijderverzoek kan worden gedaan.

Het verwijderen van cookies via browserinstellingen mag niet de enige intrekkingsroute zijn.

## 8. Consentbewijs en bewaartermijn

Bewaar alleen:

- gepseudonimiseerd account- of consent-ID;
- gekozen doeleinden;
- datum en tijd;
- versie van tekst en leverancierslijst;
- bron/interface;
- intrekking of wijziging.

Bewaar consentbewijs zolang de toestemming wordt gebruikt en daarna maximaal zolang noodzakelijk voor toezicht of rechtsvorderingen. Stel een concrete termijn vast in de privacyverklaring; gebruik geen onbeperkte bewaring. Vraag opnieuw toestemming bij een nieuw doel, nieuwe niet-vergelijkbare leverancier of andere materiële wijziging.

## 9. Release-gate en controle

Vóór iedere productie-release:

1. scan als nieuwe bezoeker vóór en na login, checkout en chat;
2. inspecteer cookies, localStorage, sessionStorage, IndexedDB, service workers en netwerkrequests;
3. test zonder keuze en na **“Alleen noodzakelijk”**;
4. verifieer dat optionele tags niet slechts “anoniem” worden geladen maar echt geblokkeerd zijn;
5. vergelijk bevindingen met deze tabel;
6. bewaar scanrapport, datum, versie en screenshots;
7. blokkeer livegang bij een onbekende derde-partijtracker of onbekende apparaatopslag.

**BLOKKEREND VOOR LIVE:** de productie-app moet aantoonbaar analytics-loos zijn of een correct werkende opt-inlaag hebben. Een CMP-banner zonder voorafgaande technische blokkade is onvoldoende.

## 10. Officiële bronnen

- [Telecommunicatiewet, artikel 11.7a](https://wetten.overheid.nl/BWBR0009950/#Hoofdstuk11_Artikel11.7a)
- [Autoriteit Persoonsgegevens — cookies](https://www.autoriteitpersoonsgegevens.nl/themas/internet-slimme-apparaten/cookies)
- [Autoriteit Persoonsgegevens — cookiebeleid voor organisaties](https://www.autoriteitpersoonsgegevens.nl/themas/internet-slimme-apparaten/cookies/cookies-en-uw-organisatie-zorg-voor-een-goed-beleid)
- [Autoriteit Persoonsgegevens — heldere cookiebanners](https://www.autoriteitpersoonsgegevens.nl/themas/internet-slimme-apparaten/cookies/heldere-cookiebanners)
- [AVG — toestemming, informatie en gegevensminimalisatie](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)
