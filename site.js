/* gedeeld: footerjaar, contact, werken (portfolio + projectpagina), home-beelden, geluid */
document.getElementById('yr').textContent=new Date().getFullYear();
const mail=document.getElementById('mail');
if(mail){mail.textContent=CONFIG.email;mail.href='mailto:'+CONFIG.email}
document.querySelectorAll('.mailto').forEach(a=>a.href='mailto:'+CONFIG.email);
const soc=document.getElementById('social');
if(soc)soc.innerHTML=CONFIG.social.map(s=>s.url?`<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`:`<span class="todo">${s.label} — link invullen in config.js</span>`).join('');

/* Werken: één lijst in config.js. Projectpagina = project.html?p=<id> (Élan: elan.html, body data-p="elan") */
const werk=id=>(CONFIG.portfolio||[]).find(w=>w.id===id);
const werkLink=w=>w.pagina||'project.html?p='+encodeURIComponent(w.id);
const rolHTML=w=>w.rol?w.rol:'<span class="todo">Mijn rol — in te vullen in config.js</span>';
/* Gewone YouTube-/Vimeo-link -> embed-adres dat meteen afspeelt */
function embedSrc(u){
  let m=u.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if(m)return`https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0`;
  m=u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if(m)return`https://player.vimeo.com/video/${m[1]}?autoplay=1`;
  return u+(u.includes('?')?'&':'?')+'autoplay=1';
}
const iframeHTML=w=>`<iframe src="${embedSrc(w.embedUrl)}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen title="${w.titel}"></iframe>`;
function soundOff(){if(Sound.on)Sound.toggle().then(soundUI)}

/* Videospeler als laag bovenop de pagina (portfolio). Sluiten: knop, Esc of naast de video klikken. */
function openPlayer(w){
  let d=document.getElementById('player');
  if(!d){
    d=document.createElement('dialog');d.id='player';d.className='player';
    d.innerHTML='<div class="player-in"><div class="player-top"><span class="player-t"></span><button class="player-x" type="button">Sluiten ✕</button></div><div class="player-v"></div></div>';
    document.body.append(d);
    d.querySelector('.player-x').onclick=()=>d.close();
    d.addEventListener('click',e=>{if(e.target===d)d.close()});
    d.addEventListener('close',()=>{d.querySelector('.player-v').innerHTML=''});   // video stopt
  }
  d.querySelector('.player-t').textContent=w.titel;
  d.querySelector('.player-v').innerHTML=iframeHTML(w);
  d.showModal();soundOff();
}

const wp=document.getElementById('work');
if(wp){
  const w=werk(new URLSearchParams(location.search).get('p'));
  if(!w){document.title='Niet gevonden — BENE';wp.innerHTML='<p class="label"><a href="portfolio.html">← Portfolio</a></p><h1>Niet gevonden</h1><p class="lead">Dit werk bestaat niet (meer).</p>'}
  else{
    document.title=w.titel+' — BENE';
    document.body.dataset.p=w.id;
    wp.querySelector('#wGroep').textContent=w.groep;
    wp.querySelector('#wTitel').textContent=w.titel;
    wp.querySelector('#wRol').innerHTML=rolHTML(w);
    const st=wp.querySelector('#wStill');
    if(w.still)st.style.backgroundImage=`url("${w.still}")`;else{st.classList.add('todo');st.textContent='still'}
  }
}

const fp=document.getElementById('filmPlay');
if(fp){
  const w=werk(document.body.dataset.p),url=w&&w.embedUrl;
  if(!url)fp.outerHTML='<span class="todo">Video volgt</span>';
  else fp.onclick=()=>{document.getElementById('frame').innerHTML=iframeHTML(w);soundOff()};
}

/* Homepagina: visual achter het logo (leeg = zwart) + beeld per tegel (leeg = streepjes-placeholder) */
const hm=document.getElementById('heroMedia');
if(hm){
  const u=CONFIG.heroMedia;
  if(!u){/* leeg = gewoon zwart */}
  else if(/\.(mp4|webm)$/i.test(u))hm.innerHTML=`<video src="${u}" autoplay muted loop playsinline></video>`;
  else hm.style.backgroundImage=`url("${u}")`;
}
document.querySelectorAll('.tile').forEach(t=>{
  const u=(CONFIG.tiles||{})[t.dataset.k],v=t.querySelector('.vis');
  if(u)v.style.backgroundImage=`url("${u}")`;else v.classList.add('empty');
});

/* Portfolio: werken per groep. Alleen werken met embedUrl zijn klikbaar. */
const pj=document.getElementById('projects');
if(pj)pj.innerHTML=(CONFIG.groepen||[]).map(g=>{
  const ws=(CONFIG.portfolio||[]).filter(w=>w.groep===g);
  if(!ws.length)return'';
  return`<section class="group"><h2 class="group-h">${g}</h2><div class="projects">${ws.map(w=>{
    const vis=`<div class="vis${w.still?'':' empty'}"${w.still?` style="background-image:url('${w.still}')"`:''}>${w.embedUrl?'<span class="play-ico" aria-hidden="true">▶</span>':''}</div>`;
    const txt=`<div class="cap"><span class="t">${w.titel}</span><span class="d">${rolHTML(w)}</span>${w.embedUrl?'<span class="a">→</span>':'<span class="a soon">binnenkort</span>'}</div>`;
    return w.embedUrl?`<a class="project" href="${werkLink(w)}" data-id="${w.id}" aria-label="Speel ${w.titel} af">${vis}${txt}</a>`:`<div class="project soon">${vis}${txt}</div>`;
  }).join('')}</div></section>`;
}).join('');
/* Klik op een werk = video als laag; ctrl/cmd-klik of middelklik opent nog steeds de projectpagina */
if(pj)pj.addEventListener('click',e=>{
  const a=e.target.closest('a.project');
  if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.button)return;
  const w=werk(a.dataset.id);if(!w)return;
  e.preventDefault();openPlayer(w);
});

/* Geluid: opt-in. Vijf tonen = G mineur-drieklank (G, B♭, D, G, B♭), één per lijn van het logo. */
const Sound=(()=>{
  const NOTES=[196,233.08,293.66,392,466.16];
  let ctx,master,verb,on=false,built=false,lastT=0;
  function build(){
    ctx=new (window.AudioContext||window.webkitAudioContext)();
    master=ctx.createGain();master.gain.value=.4;
    const conv=ctx.createConvolver(),len=ctx.sampleRate*2.2,buf=ctx.createBuffer(2,len,ctx.sampleRate);
    for(let c=0;c<2;c++){const d=buf.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3)}
    conv.buffer=buf;verb=ctx.createGain();verb.gain.value=.3;
    master.connect(ctx.destination);master.connect(conv);conv.connect(verb);verb.connect(ctx.destination);
    built=true;
  }
  function pluck(i){
    if(!on||!built)return;
    if(ctx.currentTime-lastT<.35)return;lastT=ctx.currentTime;
    const f=NOTES[(i==null?Math.floor(Math.random()*NOTES.length):i)%NOTES.length],t=ctx.currentTime;
    [[1,.11],[2,.025]].forEach(([m,a])=>{
      const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=f*m;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(a,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+3);
      o.connect(g).connect(master);o.start(t);o.stop(t+3.1);
    });
  }
  async function toggle(){if(!built)build();if(ctx.state==='suspended')await ctx.resume();on=!on;return on}
  return{toggle,pluck,get on(){return on}};
})();
function soundUI(){const b=document.getElementById('sound');b.setAttribute('aria-pressed',Sound.on);b.textContent='geluid: '+(Sound.on?'aan':'uit')}
document.getElementById('sound').onclick=async()=>{await Sound.toggle();soundUI();if(Sound.on)Sound.pluck(0)};
document.querySelectorAll('nav a,a.row,a.project').forEach((el,k)=>el.addEventListener('mouseenter',()=>Sound.pluck(k)));
