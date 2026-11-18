/*
 * TOOTHLESS — the tiny website dragon. No dependencies.
 * Artwork: procedurally generated 44x36 PNG frames, embedded below.
 * Install: <script src="toothless-pet.js" data-scale="2"></script>
 * Optional: data-roam="off" data-needy="off"
 * API: window.ToothlessPet.pet(), .fly(), .destroy()
 */
(function () {
  'use strict';
  if (window.ToothlessPet) return;
  const SCRIPT = document.currentScript;
  const read = (name) => SCRIPT ? SCRIPT.getAttribute(name) : null;
  const rawScale = Number(read('data-scale'));
  const SCALE = Number.isFinite(rawScale) && rawScale > 0
    ? Math.min(6, Math.max(1, rawScale)) : 2;
  const ROAM = read('data-roam') !== 'off';
  const NEEDY = read('data-needy') !== 'off';
  const RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FW = 44, FH = 36;
  const SHEET_SRC = 'data:image/png;base64,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';
  const HEART_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAQUlEQVR42mNgIAT+V878///Q+f9wduXM/wwMDAyM/ytn/mfwNGNg2H4KQxMTPhMZYUZhSLSnMzLBGOgSWB2GzAcAZyUaxiEbwBYAAAAASUVORK5CYII=';
  const durations = { idle: 150, pet: 140, fly: 85, ask: 160, look: 160 };
  const rows = { idle: 0, pet: 1, fly: 2, ask: 3, look: 3 };
  const counts = { idle: 8, pet: 6, fly: 6, ask: 4, look: 4 };
  const between = (a,b) => a + Math.random()*(b-a);
  const clamp = (v,a,b) => Math.min(b,Math.max(a,v));
  const smoothstep = (t) => t*t*(3-2*t);
  const sprite = new Image();
  const heartSprite = new Image();
  sprite.decoding='async';
  heartSprite.decoding='async';
  let destroyed = false, raf = 0;

  function load(image, src) {
    return new Promise((resolve, reject) => {
      image.onload=() => resolve(image);
      image.onerror=() => reject(new Error('Could not decode an embedded Toothless image'));
      image.src=src;
      if (image.complete && image.naturalWidth) resolve(image);
    });
  }

  function init() {
    if (destroyed) return;
    const w=FW*SCALE, h=FH*SCALE;
    const style=document.createElement('style');
    style.id='toothless-pet-css';
    style.textContent=`
      #toothless-pet { position:fixed; left:0; top:0; width:${w}px; height:${h}px;
        pointer-events:none; z-index:2147483000; will-change:transform; }
      #toothless-pet canvas { position:absolute; inset:0; width:${w}px; height:${h}px;
        image-rendering:pixelated; image-rendering:crisp-edges; pointer-events:none; }
      #toothless-pet .tp-hit { position:absolute; left:${10*SCALE}px; top:${7*SCALE}px;
        width:${24*SCALE}px; height:${25*SCALE}px; pointer-events:auto; cursor:pointer;
        border:0; padding:0; background:transparent; outline-offset:3px;
        -webkit-tap-highlight-color:transparent; touch-action:none; }
      #toothless-pet .tp-hit:focus-visible { outline:2px dashed #d9ed95; border-radius:10px; }
      #toothless-pet .tp-bubble { position:absolute; left:50%; top:-${24+12*SCALE}px;
        transform:translateX(-50%); white-space:nowrap; border:2px solid #151c2d;
        background:#f9f4d8; color:#17203a; padding:7px 10px; border-radius:7px;
        font: 700 10px/1.2 ui-monospace, monospace; letter-spacing:.4px;
        box-shadow:3px 3px 0 #151c2d; opacity:0; visibility:hidden; }
      #toothless-pet .tp-bubble::after { content:''; position:absolute;
        bottom:-8px; left:calc(50% - 5px); width:10px; height:10px;
        background:#f9f4d8; border-right:2px solid #151c2d;
        border-bottom:2px solid #151c2d; transform:rotate(45deg); }
      #toothless-pet .tp-askheart { position:absolute; left:50%;
        top:-${13*SCALE}px; width:${7*SCALE}px; height:${7*SCALE}px;
        image-rendering:pixelated; opacity:0; transform:translateX(-50%); }
      #toothless-pet .tp-heart { position:absolute; width:${7*SCALE}px;
        height:${7*SCALE}px; image-rendering:pixelated; pointer-events:none; }
    `;
    document.head.appendChild(style);
    const root=document.createElement('div'); root.id='toothless-pet';
    root.setAttribute('aria-label','Toothless, a little interactive pixel dragon');
    const canvas=document.createElement('canvas');canvas.width=FW;canvas.height=FH;
    const ctx=canvas.getContext('2d',{alpha:true});ctx.imageSmoothingEnabled=false;
    const bubble=document.createElement('div');bubble.className='tp-bubble';bubble.textContent='pet me?';
    const askHeart=document.createElement('img');askHeart.className='tp-askheart';askHeart.src=HEART_SRC;askHeart.alt='';
    const hit=document.createElement('button');hit.type='button';hit.className='tp-hit';hit.setAttribute('aria-label','Pet Toothless the dragon');
    root.append(canvas,hit,bubble,askHeart);
    document.body.appendChild(root);
    const initialMargin = window.innerWidth < 440 ? 14 : 22;
    let x=Math.max(1,innerWidth-w-initialMargin), y=Math.max(1,innerHeight-h-initialMargin);
    let state='idle', stateSince=performance.now(), lastRendered=-1, lastState='';
    let petUntil=0, askingUntil=0, askingSince=0, lastHeart=0;
    let nextAsk=NEEDY?performance.now()+6000:Infinity;
    let nextFly=ROAM&&!RM?performance.now()+between(14000,24000):Infinity;
    let flight=null, hovered=false, lastHoverMove=performance.now();
    let pointer=null;

    function paint(rowState,frameIndex) {
      const index=RM?0:frameIndex;
      if (rowState===lastState && index===lastRendered) return;
      ctx.clearRect(0,0,FW,FH);
      ctx.drawImage(sprite,index*FW,rows[rowState]*FH,FW,FH,0,0,FW,FH);
      lastState=rowState;lastRendered=index;
      root.dataset.state=rowState;root.dataset.frame=String(index);
    }

    function stopFlight() { flight=null; }
    function pet(ms=2200) {
      if (destroyed) return false;
      const now=performance.now();
      stopFlight();askingUntil=0;
      const wasPetting=now<petUntil;
      petUntil=Math.max(petUntil,now+ms);
      nextAsk=NEEDY?now+between(40000,70000):Infinity;
      nextFly=ROAM&&!RM?Math.max(nextFly,petUntil+between(7000,14000)):Infinity;
      state='pet';if(!wasPetting){stateSince=now;lastHeart=0;}
      paint('pet',0);
      return true;
    }

    function farDestination() {
      const m=innerWidth<440?12:22;
      const xlo=m, xhi=Math.max(m,innerWidth-w-m);
      const ylo=Math.min(innerHeight-h-m,Math.max(m,innerHeight*.30));
      const yhi=Math.max(ylo,innerHeight-h-m);
      let best={x,y,d:0};
      for(let k=0;k<55;k++) {
        const tx=between(xlo,xhi),ty=between(ylo,yhi);
        const d=Math.hypot(tx-x,ty-y);
        if(d>=160) return {x:tx,y:ty,d};
        if(d>best.d) best={x:tx,y:ty,d};
      }
      return null; // Very small viewports cannot guarantee a >=160px flight.
    }
    function fly() {
      if (destroyed||RM||hovered||pointer||performance.now()<petUntil||flight) return false;
      const target=farDestination();
      if (!target) return false;
      const now=performance.now();
      askingUntil=0;
      flight={ fromX:x,fromY:y,toX:target.x,toY:target.y,
               start:now,duration:900+target.d/450*1000 };
      state='fly';stateSince=now;
      paint('fly',0);
      return true;
    }

    function emitHeart() {
      const el=document.createElement('img');el.className='tp-heart';el.src=HEART_SRC;el.alt='';
      el.style.left=(13+between(-3,15))*SCALE+'px';
      el.style.top=(2+between(-2,4))*SCALE+'px';
      root.appendChild(el);
      const xdrift=between(-13,13)*SCALE;
      const keyframes=RM
        ? [{opacity:1},{opacity:0}]
        : [{transform:'translate3d(0,0,0) scale(.8)',opacity:1},
           {transform:`translate3d(${xdrift}px,${-32*SCALE}px,0) scale(1.2)`,opacity:0}];
      if (el.animate) {
        const animation=el.animate(keyframes,{duration:RM?600:between(950,1400),easing:'ease-out',fill:'forwards'});
        animation.onfinish=()=>el.remove();
        animation.oncancel=()=>el.remove();
      } else {
        el.style.opacity='0';setTimeout(()=>el.remove(),600);
      }
    }

    function tick(now) {
      if (destroyed) return;
      // Scheduled roaming never interrupts hover, touching, petting or another flight.
      if (now>=nextFly && !flight) {
        if (!hovered && !pointer && now>=petUntil) {
          fly();nextFly=now+between(20000,45000);
        } else nextFly=now+3000;
      }
      if(NEEDY && now>=nextAsk) {
        if (!hovered && !pointer && now>=petUntil && !flight) {
          askingSince=now;askingUntil=now+7000;
          nextAsk=now+between(20000,35000);
        } else nextAsk=now+3000;
      }
      let lift=0;
      if (flight) {
        const t=clamp((now-flight.start)/flight.duration,0,1);
        const u=smoothstep(t);
        x=flight.fromX+(flight.toX-flight.fromX)*u;
        y=flight.fromY+(flight.toY-flight.fromY)*u;
        lift=5*SCALE*Math.sin(Math.PI*t);
        if (t>=1) { x=flight.toX;y=flight.toY;flight=null;nextFly=now+between(20000,45000); }
      }
      let nextState;
      if (now<petUntil) nextState='pet';
      else if (flight) nextState='fly';
      else if (hovered && now-lastHoverMove>145) nextState='look';
      else if (now<askingUntil) nextState='ask';
      else nextState='idle';
      if (nextState!==state) { state=nextState;stateSince=now;lastRendered=-1; }
      const index=Math.floor((now-stateSince)/durations[state])%counts[state];
      paint(state,index);
      if(state==='ask'&&!RM) {
        const phase=(now-askingSince)/630*Math.PI*2;
        lift=Math.max(lift,Math.pow(Math.max(0,Math.sin(phase)),2)*3*SCALE);
      }
      root.style.transform=`translate3d(${Math.round(x)}px,${Math.round(y-lift)}px,0)`;
      const isAsking=state==='ask';
      bubble.style.opacity=isAsking?'1':'0';bubble.style.visibility=isAsking?'visible':'hidden';
      askHeart.style.opacity=isAsking?'1':'0';
      if (isAsking) {
        const pulse=RM?1:1+.16*Math.sin((now-askingSince)/180);
        askHeart.style.transform=`translateX(-50%) scale(${pulse})`;
      }
      if (state==='pet' && (lastHeart===0||now>=lastHeart)) {
        emitHeart();lastHeart=now+between(350,600);
      }
      raf=requestAnimationFrame(tick);
    }
    function enter() {
      hovered=true;lastHoverMove=performance.now()-200;
      if (flight) stopFlight();
    }
    function leave() { hovered=false; }
    function move(ev) {
      const now=performance.now();
      hovered=true;lastHoverMove=now;
      if(!pointer||pointer.id!==ev.pointerId) return;
      if(now-pointer.lastAt>450) pointer.distance=0;
      const delta=Math.hypot(ev.clientX-pointer.x,ev.clientY-pointer.y);
      pointer.x=ev.clientX;pointer.y=ev.clientY;pointer.lastAt=now;
      const r=hit.getBoundingClientRect();
      const inside=ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom;
      if (!inside) return;
      pointer.distance+=delta;
      if(pointer.distance>=28) {
        pointer.stroked=true;pointer.distance=0;
        pet(1100);
      }
    }
    function down(ev) {
      if(ev.button!==0) return;
      const now=performance.now();
      pointer={id:ev.pointerId,x:ev.clientX,y:ev.clientY,lastAt:now,distance:0,stroked:false};
      if (hit.setPointerCapture) hit.setPointerCapture(ev.pointerId);
    }
    function up(ev) {
      if(!pointer||pointer.id!==ev.pointerId) return;
      const stroked=pointer.stroked;
      pointer=null;
      if(!stroked) pet(2200);
    }
    function cancel() {pointer=null;}
    function keyboardClick(ev) { if(ev.detail===0) pet(2200); }
    function resize() {
      x=clamp(x,0,Math.max(0,innerWidth-w));
      y=clamp(y,0,Math.max(0,innerHeight-h));
      if(flight)stopFlight();
    }
    hit.addEventListener('pointerenter',enter);
    hit.addEventListener('pointerleave',leave);
    hit.addEventListener('pointerdown',down);
    hit.addEventListener('pointermove',move);
    hit.addEventListener('pointerup',up);
    hit.addEventListener('pointercancel',cancel);
    hit.addEventListener('click',keyboardClick);
    window.addEventListener('resize',resize);
    window.ToothlessPet={
      pet:() => pet(2200),
      fly,
      destroy:() => {
        if (destroyed) return;
        destroyed=true;cancelAnimationFrame(raf);
        window.removeEventListener('resize',resize);
        root.remove();style.remove();
        delete window.ToothlessPet;
      }
    };
    paint('idle',0);
    raf=requestAnimationFrame(tick);
    window.dispatchEvent(new CustomEvent('toothless:ready'));
  }

  Promise.all([load(sprite,SHEET_SRC),load(heartSprite,HEART_SRC)])
    .then(() => {
      if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
      else init();
    })
    .catch((error) => { console.error('[Toothless]',error); });
})();
