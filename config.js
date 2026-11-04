// Pas hier je gegevens aan.
const CONFIG={
  email:"declercqbenedict@gmail.com",   // vervang door je zakelijke adres
  heroMedia:"",                         // leeg = zwart. Of een visual achter het logo: foto (.jpg/.webp) of korte loop (.mp4/.webm), bv. "media/hero.mp4"
  tiles:{portfolio:"media/elan-still-trein-scherper-v1.jpg",diensten:"media/diensten-still-v2.jpg",over:"media/over-still.jpg",contact:"media/contact-icoon-envolop-V2.jpg"},  // beeld per tegel op de homepagina, bv. "media/tile-portfolio.jpg"
  projects:[                           // portfolio: één regel per project (bovenaan = eerst). img = beeld 16:9 (bv. 1600×900), url leeg = "binnenkort"
    {title:"Élan",           type:"Kortfilm",                        img:"media/elan-still-trein-scherper-v1.jpg", url:"elan.html"},
    {title:"Der Übermensch", type:"Documentaire · motion graphics",  img:"", url:""},
    {title:"Perpetuum",      type:"Compositie · piano",              img:"", url:""}
  ],
  filmEmbedUrl:"",                      // bv. "https://player.vimeo.com/video/XXXX"
  social:[{label:"Instagram",url:""},{label:"Vimeo",url:""}]   // later uitbreiden
};
