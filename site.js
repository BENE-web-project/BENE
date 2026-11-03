/* gedeeld: footerjaar, contact, film-embed, geluid */
document.getElementById('yr').textContent=new Date().getFullYear();
const mail=document.getElementById('mail');
if(mail){mail.textContent=CONFIG.email;mail.href='mailto:'+CONFIG.email}
const soc=document.getElementById('social');
if(soc)soc.innerHTML=CONFIG.social.map(s=>s.url?`<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`:`<span class="todo">${s.label} — link invullen in config.js</span>`).join('');

const fp=document.getElementById('filmPlay');
if(fp)fp.onclick=()=>{
  if(!CONFIG.filmEmbedUrl){fp.insertAdjacentHTML('afterend','<span class="todo" style="position:absolute;bottom:14px;font-size:.8rem">film nog niet gekoppeld (config.js)</span>');return}
  const sep=CONFIG.filmEmbedUrl.includes('?')?'&':'?';
  document.getElementById('frame').innerHTML=`<iframe src="${CONFIG.filmEmbedUrl}${sep}autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  if(Sound.on)Sound.toggle().then(soundUI);
};

/* Homepagina: grote visual achter het logo + beeld per tegel (leeg = streepjes-placeholder) */
const hm=document.getElementById('heroMedia');
if(hm){
  const u=CONFIG.heroMedia;
  if(!u){hm.classList.add('empty');hm.innerHTML='<span class="todo">hero-visual: zie config.js</span>'}
  else if(/\.(mp4|webm)$/i.test(u))hm.innerHTML=`<video src="${u}" autoplay muted loop playsinline></video>`;
  else hm.style.backgroundImage=`url("${u}")`;
}
document.querySelectorAll('.tile').forEach(t=>{
  const u=(CONFIG.tiles||{})[t.dataset.k],v=t.querySelector('.vis');
  if(u)v.style.backgroundImage=`url("${u}")`;else v.classList.add('empty');
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
document.querySelectorAll('nav a,a.row').forEach((el,k)=>el.addEventListener('mouseenter',()=>Sound.pluck(k)));
