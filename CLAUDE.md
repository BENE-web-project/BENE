# BENE — portfolio-website van Benedict De Clercq (Gent)

Freelance videograaf, fotograaf, sounddesigner en componist (film, media, games). Statische site in HTML/CSS/JS, geen build-stap, geen frameworks, geen reclame. Gehost gratis (GitHub Pages / Cloudflare Pages), eigen .be-domein later. Taal van de site: Nederlands. Gebruiker (Benedict, "yoyo") werkt hands-on en iteratief en wil beknopte, praktische antwoorden.

## Structuur
- index.html (home), portfolio.html, project.html (sjabloon: project.html?p=<id>), elan.html (eigen pagina van Élan), diensten.html, over.html, contact.html, 404.html
- style.css (alle stijl), site.js (gedeeld: footer, contact, werken/portfolio/projectpagina, home-beelden, geluid), hero.js (logo-canvas op home), config.js (e-mail, heroMedia, tiles, groepen, portfolio, social)
- logo.png = uitsnede van zijn logo (witte horizontale lijnen op transparant). Liefst later vervangen door SVG/hogere resolutie.
- Pagina's zijn handgeschreven; header/footer staan in elk bestand identiek (geluidsknop staat naast <nav>, niet erin). Wijzig je het menu, wijzig het overal.
- favicon.svg = vier witte lijnen op zwart. Layout: één zijmarge --g en max-breedte --max in style.css; header, inhoud en footer lijnen daarop uit.

## Beslissingen (niet terugdraaien zonder te vragen)
- Stijl: zwart-wit, dunne lijnen, grotesk + monospace. Het logo is de basis. De stijl staat LOS van de kortfilm Élan: Élan is één project in het portfolio en bepaalt de look niet. Geen schreeflettertype, geen gouden accent.
- Menu: Home, Portfolio, Diensten, Over, Contact (+ geluidsknop). Echte aparte pagina's, geen ankerlinks. "Werk" heet "Portfolio".
- Home: logo-canvas in 5 horizontale lijnen. Bewegingen bewust ZACHT (hij werd er misselijk van): kleine uitslag, trage veer. Elke lijn = één toon (G mineur-drieklank: G, B♭, D, G, B♭).
- Geluid is altijd opt-in via de knop, nooit automatisch. Tonen zacht en rond (sine, lange uitloop, begrensd tempo). prefers-reduced-motion respecteren.
- Home: hero achter het logo is ZWART (heroMedia leeg). Daaronder vloeit een gradient van zwart in de tegels. Portfoliotegel is schermvullend met gradient vanuit zwart. Diensten/Over/Contact staan eronder als drie kleinere tegels (4:3) binnen de marges, tekst onder het beeld (bewust klein: weinig scherp materiaal); op gsm onder elkaar. Portfolio heeft media/elan-still-trein-scherper-v1.jpg (proef; vorige versie media/elan-still-trein.jpg), Diensten media/diensten-still-v2.jpg, Over media/over-still.jpg, Contact media/contact-icoon-envolop-V2.jpg (envelop in logostijl). Kleine tegels: lever beelden aan op 1200×900 (4:3). Uitsnede per tegel via background-position in style.css. Beelden lichten zacht op bij het scrollen.
- Beelden: zet ze in media/ en gebruik een webversie (JPG of WebP ±2000px breed, <300 KB); bestandsnamen liefst zonder accenten. Lever je al een lichte WebP/JPG aan, dan niet opnieuw comprimeren.
- Tagline "Video · Foto · Geluid & muziek" is voorlopig; hij is er niet van overtuigd.
- A/B-geluid (ruw vs sounddesign) is geschrapt (te moeilijk).
- Geen nummers (01, 02…) bij klikbare titels (home-tegels, portfolio). Diensten-lijst heeft ze nog.
- Portfolio = werken gegroepeerd op soort, in de volgorde van config.js → groepen: Film, Commercieel, Documentair, Animatie. Per groep een monospace-kop met dunne lijn, daaronder kaarten (still 16:9 + titel + één regel rol).
- Werken staan in config.js → portfolio: {id, titel, groep, still, embedUrl, rol, pagina?}. Werk toevoegen = regel toevoegen. still leeg = streepjes; rol leeg = .todo-placeholder.
- Embed-systeem: alleen werken met een ingevuld embedUrl zijn klikbaar (anders "binnenkort"). embedUrl mag een gewone YouTube-/Vimeo-link zijn (youtu.be/…); site.js zet die om (YouTube via youtube-nocookie). In het portfolio toont hover een playknop en opent een klik de video als laag bovenop de pagina (<dialog>; sluiten met knop, Esc of klik ernaast; video stopt bij sluiten). Ctrl/cmd-klik opent de projectpagina: project.html?p=<id> (grote speler met iframe, still, rol), of `pagina` als die is ingevuld (Élan → elan.html, body data-p="elan"). Leeg embedUrl toont "Video volgt" in de speler; onbekend id toont "Niet gevonden". filmEmbedUrl bestaat niet meer.
- Der Übermensch en Perpetuum worden NIET getoond.
- Placeholders zijn gemarkeerd met de klasse `.todo` (gestippelde rand).

## Nog open
- Beeld voor hero en tegels; stills/synopsis/credits van Élan; Instagram- en andere sociale links (config.js)
- Portfolio invullen: stills, embedUrls en rol per werk (config.js → portfolio); Élan, Chase scene, Reclamespot en Aftermovie hebben al still + YouTube-link; Reportage is tijdelijk verborgen (uitgecommentarieerd in config.js)
- Tagline, Over-tekst in zijn eigen woorden, definitieve domeinnaam (bene.be? check beschikbaarheid + BOIP-merkcontrole; eigen naam in footer houden)
- Meerdere kleine projecten kunnen later een eigen pagina krijgen (kopieer elan.html)

## Werkwijze
- Test na elke wijziging op desktop en gsm-breedte (390px), zonder consolefouten en zonder horizontale scroll.
- Houd bestanden klein en leesbaar; hij wil zelf kunnen bijsturen via config.js.
