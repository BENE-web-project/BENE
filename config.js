// Pas hier je gegevens aan.
const CONFIG={
  email:"declercqbenedict@gmail.com",   // vervang door je zakelijke adres
  heroMedia:"",                         // leeg = zwart. Of een visual achter het logo: foto (.jpg/.webp) of korte loop (.mp4/.webm), bv. "media/hero.mp4"
  tiles:{portfolio:"media/elan-still-trein-scherper-v1.jpg",diensten:"media/diensten-still-v2.jpg",over:"media/over-still.jpg",contact:"media/contact-icoon-envolop-V2.jpg"},  // beeld per tegel op de homepagina, bv. "media/tile-portfolio.jpg"
  // Portfolio: groepen in deze volgorde, daarna alle werken.
  // Per werk: id (kort, zonder spaties), titel, groep, still (beeld 16:9 in media/, bv. 1600×900; leeg + YouTube-link = YouTube-thumbnail),
  // embedUrl (gewone YouTube- of Vimeo-link mag, bv. "https://youtu.be/XXXX"; leeg = "binnenkort", niet klikbaar), rol (één korte regel).
  // pagina: alleen invullen als het werk een eigen pagina heeft (Élan); anders gaat de link naar project.html?p=<id>.
  groepen:["Film","Commercieel","Documentaire","Animatie"],
  portfolio:[
    {id:"elan",        titel:"Élan",                groep:"Film",        still:"media/elan-still-trein-scherper-v1.jpg", embedUrl:"https://youtu.be/WVd7dfdBHQI", rol:"", pagina:"elan.html"},
    {id:"chase",       titel:"Chase scene",         groep:"Film",        still:"media/chase-still.webp", embedUrl:"https://youtu.be/ECrBQ3xFojo", rol:""},
    {id:"reclamespot", titel:"Reclamespot",         groep:"Commercieel", still:"media/reclamespot-thumbnail-still.webp", embedUrl:"https://youtu.be/aJWCYGtsVOg", rol:""},
    {id:"aftermovie",  titel:"Aftermovie",          groep:"Commercieel", still:"media/aftermovie-thumbnail-still.png", embedUrl:"https://youtu.be/ZxqHVHTUEAI", rol:""},
    // verborgen werken: // weghalen om terug te tonen
    // {id:"reportage",   titel:"Reportage",           groep:"Commercieel", still:"", embedUrl:"", rol:""},
    {id:"portret",     titel:"Documentair portret", groep:"Documentaire", still:"", embedUrl:"https://youtu.be/yCjzRUnFAU8", rol:""},
    {id:"3d",          titel:"3D-animatie",         groep:"Animatie",    still:"media/3D-animatie-thumbnail-still.webp", embedUrl:"https://youtu.be/J-K66dMtLfM", rol:""},
    // {id:"motion",      titel:"2D motion graphics",  groep:"Animatie",    still:"", embedUrl:"", rol:""}
  ],
  social:[{label:"Instagram",url:""},{label:"Vimeo",url:""}]   // later uitbreiden
};
