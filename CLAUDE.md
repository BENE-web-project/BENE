# BENE — portfolio-website van Benedict De Clercq (Gent)

Freelance videograaf, fotograaf, sounddesigner en componist (film, media, games). Statische site in HTML/CSS/JS, geen build-stap, geen frameworks, geen reclame. Gehost gratis (GitHub Pages / Cloudflare Pages), eigen .be-domein later. Taal van de site: Nederlands. Gebruiker (Benedict, "yoyo") werkt hands-on en iteratief en wil beknopte, praktische antwoorden.

## Structuur
- index.html (home), portfolio.html, elan.html (projectpagina), diensten.html, over.html, contact.html, 404.html
- style.css (alle stijl), site.js (gedeeld: footer, contact, filmembed, geluid), hero.js (logo-canvas op home), config.js (e-mail, filmEmbedUrl, heroMedia, tiles, social)
- logo.png = uitsnede van zijn logo (witte horizontale lijnen op transparant). Liefst later vervangen door SVG/hogere resolutie.
- Pagina's zijn handgeschreven; header/footer staan in elk bestand identiek (geluidsknop staat naast <nav>, niet erin). Wijzig je het menu, wijzig het overal.
- favicon.svg = vier witte lijnen op zwart. Layout: één zijmarge --g en max-breedte --max in style.css; header, inhoud en footer lijnen daarop uit.

## Beslissingen (niet terugdraaien zonder te vragen)
- Stijl: zwart-wit, dunne lijnen, grotesk + monospace. Het logo is de basis. De stijl staat LOS van de kortfilm Élan: Élan is één project in het portfolio en bepaalt de look niet. Geen schreeflettertype, geen gouden accent.
- Menu: Home, Portfolio, Diensten, Over, Contact (+ geluidsknop). Echte aparte pagina's, geen ankerlinks. "Werk" heet "Portfolio".
- Home: logo-canvas in 5 horizontale lijnen. Bewegingen bewust ZACHT (hij werd er misselijk van): kleine uitslag, trage veer. Elke lijn = één toon (G mineur-drieklank: G, B♭, D, G, B♭).
- Geluid is altijd opt-in via de knop, nooit automatisch. Tonen zacht en rond (sine, lange uitloop, begrensd tempo). prefers-reduced-motion respecteren.
- Home: hero achter het logo is ZWART (heroMedia leeg). Daaronder vloeit een gradient van zwart in de tegels. Portfoliotegel is schermvullend met gradient vanuit zwart. Diensten/Over/Contact staan eronder als drie kleinere tegels (4:3) binnen de marges, tekst onder het beeld (bewust klein: weinig scherp materiaal); op gsm onder elkaar. Portfolio heeft media/elan-still-trein-scherper-v1.jpg (proef; vorige versie media/elan-still-trein.jpg), Diensten media/diensten.jpg; Over/Contact nog streepjes-placeholders. Uitsnede op gsm per tegel via background-position in style.css. Beelden lichten zacht op bij het scrollen.
- Beelden: zet ze in media/ en gebruik een webversie (JPG ±2000px breed, <300 KB); bestandsnamen liefst zonder accenten.
- Tagline "Video · Foto · Geluid & muziek" is voorlopig; hij is er niet van overtuigd.
- A/B-geluid (ruw vs sounddesign) is geschrapt (te moeilijk).
- Placeholders zijn gemarkeerd met de klasse `.todo` (gestippelde rand).

## Nog open
- Beeld voor hero en tegels; stills/synopsis/credits van Élan; Instagram- en andere sociale links (config.js)
- Volledige portfoliolijst (hij heeft meer werk dan Élan, Der Übermensch, Perpetuum)
- Tagline, Over-tekst in zijn eigen woorden, definitieve domeinnaam (bene.be? check beschikbaarheid + BOIP-merkcontrole; eigen naam in footer houden)
- Meerdere kleine projecten kunnen later een eigen pagina krijgen (kopieer elan.html)

## Werkwijze
- Test na elke wijziging op desktop en gsm-breedte (390px), zonder consolefouten en zonder horizontale scroll.
- Houd bestanden klein en leesbaar; hij wil zelf kunnen bijsturen via config.js.
