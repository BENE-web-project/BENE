/* Home: het logo, in vijf horizontale lijnen die op aanraking wegschuiven en terugveren. */
(function(){
  const cv=document.getElementById('logoCanvas'),c=cv.getContext('2d'),img=new Image(),N=5;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W,H,dpr,pad,lw,lh;const off=Array(N).fill(0),vel=Array(N).fill(0);let last=-1,idle=0;
  img.src='logo.png';
  function size(){
    dpr=devicePixelRatio||1;W=cv.clientWidth;pad=W*.06;lw=W-2*pad;lh=lw*img.height/img.width;H=lh+pad;
    cv.style.height=H+'px';cv.width=W*dpr;cv.height=H*dpr;c.setTransform(dpr,0,0,dpr,0,0);draw();
  }
  function draw(){
    c.clearRect(0,0,W,H);const sh=img.height/N,dh=lh/N;
    for(let i=0;i<N;i++)c.drawImage(img,0,i*sh,img.width,sh,pad+off[i],pad/2+i*dh,lw,dh);
  }
  function kick(i,dir,silent){vel[i]=(dir||(Math.random()<.5?-1:1))*Math.max(5,W*.009);if(!silent)Sound.strike(i);if(reduce)return;loop()}
  let running=false;
  function loop(){if(running)return;running=true;requestAnimationFrame(step)}
  function step(){
    let moving=false;
    for(let i=0;i<N;i++){off[i]+=vel[i];vel[i]+=-off[i]*.03;vel[i]*=.9;if(Math.abs(off[i])>.2||Math.abs(vel[i])>.2)moving=true;else{off[i]=0;vel[i]=0}}
    draw();running=false;if(moving)loop();
  }
  function band(e){const r=cv.getBoundingClientRect(),y=e.clientY-r.top-pad/2,b=Math.floor(y/(lh/N));return b>=0&&b<N?b:-1}
  // enkel de lijn die je aanraakt speelt (een nieuwe lijn = een nieuwe toon; vorige tonen klinken verder uit)
  function move(e){const b=band(e);if(b!==last){last=b;if(b>=0){const r=cv.getBoundingClientRect();kick(b,e.clientX-r.left<W/2?1:-1)}}}
  cv.addEventListener('pointermove',move);cv.addEventListener('pointerdown',move);cv.addEventListener('pointerleave',()=>last=-1);
  if(!reduce)setInterval(()=>{if(document.hidden)return;kick(Math.floor(Math.random()*N),0,true)},9000);
  addEventListener('resize',size);img.onload=size;
})();
