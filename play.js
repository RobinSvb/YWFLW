// =====================
//  CONFIG GLOBAL (EDITA AQUÍ)
// =====================
window.CONFIG = {
  // Mundo / física
  GRAVITY: 0.5,
  JUMP_VY: -12.6,
  BASE_SPEED: 6,
  SPEED_GROWTH: 0.0008, // incremento por ms
  GROUND_OFFSET_Y: 50,

  // 🔽 escalas y tamaños (ajusta aquí)
  PLAYER_SIZE: 100,           // alto/ancho del jugador en px (prueba 28–44)
  CACTUS_SCALE: 0.05,       // 0.10–0.30 según cuán grande sea tu PNG
  BIRD_SCALE: 0.35,         // si usas pájaro
  CLOUD_SCALE: 0.5,         // nubes más pequeñas


  // Sprites PNG (rutas locales). Usa al menos fresa y cactus como pediste.
  SPRITES: {
    // Frames de carrera (puedes duplicar fresa si sólo tienes una imagen)
    playerRun: [
      'img/juego/fresa.png',
      'img/juego/fresa.png'
    ],
    // Sprite cuando está en el aire
    playerJump: 'img/juego/fresa.png',

    // Obstáculos
    cactus: 'img/juego/cactus.png',
    bird:   'img/juego/bird.png',      // opcional (si no existe, se usa placeholder)

    // Nubes con varios diseños (opcionales)
    clouds: [
      'img/juego/cloud1.png',
      'img/juego/cloud2.png',
      'img/juego/cloud3.png'
    ],

    ground: 'img/juego/fondo.jpg'     // opcional (textura repetible)
  }
};

(function(){
  let started = false; // evita inicialización doble
  function start(){
    if(started) return; started = true;

    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score');
    const bestEl = document.getElementById('best');
    const speedEl = document.getElementById('speed');
    const toggleBtn = document.getElementById('toggle');
    const restartBtn = document.getElementById('restart');

    // =========
    // Carga robusta de imágenes (si falta una, usa un pixel transparente)
    // =========
    const IMAGES = {};
    const transparentPixel = (()=>{
      const c=document.createElement('canvas'); c.width=c.height=1; return c.toDataURL('image/png');
    })();
    function loadImage(src){
      return new Promise(res=>{
        const img=new Image();
        img.onload=()=>res(img);
        img.onerror=()=>{ const f=new Image(); f.onload=()=>res(f); f.src=transparentPixel; };
        img.src=src;
      });
    }
    async function preload(){
      const S = CONFIG.SPRITES;
      if(Array.isArray(S.playerRun) && S.playerRun.length){ IMAGES.playerRun = await Promise.all(S.playerRun.map(loadImage)); }
      else { IMAGES.playerRun = [await loadImage(S.playerRun||transparentPixel)]; }
      IMAGES.playerJump = await loadImage(S.playerJump||transparentPixel);
      IMAGES.cactus     = await loadImage(S.cactus||transparentPixel);
      IMAGES.bird       = await loadImage(S.bird||transparentPixel);
      IMAGES.clouds     = (S.clouds && S.clouds.length) ? await Promise.all(S.clouds.map(loadImage)) : [await loadImage(transparentPixel)];
      IMAGES.ground     = S.ground ? await loadImage(S.ground) : null;
    }

    // --- Utils
    const clamp = (v,min,max)=> Math.max(min, Math.min(max, v));
    const rand = (a,b)=> a + Math.random()*(b-a);
    const fmt = n => (''+Math.floor(n)).padStart(5,'0');
    const pick = arr => arr[Math.floor(Math.random()*arr.length)];

    // --- Game constants (desde CONFIG)
    const GROUND_Y = canvas.height - CONFIG.GROUND_OFFSET_Y; // baseline

    // --- World state
    let running = true;
    let gameOver = false;
    let tPrev = 0;
    let speed = CONFIG.BASE_SPEED;       // world scroll speed (increases over time)
    let score = 0;
    let hi = +localStorage.getItem('runner_best') || 0;

    const player = {
        x: 80,
        y: GROUND_Y - CONFIG.PLAYER_SIZE,
        w: CONFIG.PLAYER_SIZE,
        h: CONFIG.PLAYER_SIZE,
        vy: 0, onGround: true, duck: false, anim: 0
    };

    /** Obstacles: {x,y,w,h,type,img,flap} */
    const obstacles = [];
    /** Clouds: {x,y,v,img} */
    const clouds = [];
    /** Particles for dust */
    const dust = [];

    function reset(){
      speed = CONFIG.BASE_SPEED; score = 0; gameOver = false; running = true;
       player.y = GROUND_Y - CONFIG.PLAYER_SIZE; player.vy = 0; player.onGround = true; player.duck = false; player.h = CONFIG.PLAYER_SIZE;
      obstacles.length = 0; clouds.length = 0; dust.length = 0;
      for (let i=0;i<6;i++) {
        const img = pick(IMAGES.clouds);
        const w = (img.width  || 48) * CONFIG.CLOUD_SCALE;
        const h = (img.height || 24) * CONFIG.CLOUD_SCALE;
        clouds.push({ x: rand(0,canvas.width), y: rand(20,120), v: rand(.2,.6), img, w, h });
        for (const c of clouds) ctx.drawImage(c.img, c.x, c.y, c.w, c.h);
}
      
      
    }

    function spawnObstacle(){
      const isBird = Math.random() < 0.25 && speed > 8.5 && IMAGES.bird && IMAGES.bird.width>1; // sólo si hay sprite
      if(isBird){
        const y = [GROUND_Y-80, GROUND_Y-110, GROUND_Y-50][Math.floor(rand(0,3))];
        const img = IMAGES.bird;
        const w = (img.width  || 46) * CONFIG.BIRD_SCALE;
        const h = (img.height || 26) * CONFIG.BIRD_SCALE;
        obstacles.push({x: canvas.width + rand(20,120), y: y, w, h, type: 'bird', img, flap:0});
      } else {
            const img = IMAGES.cactus;
            const w = (img.width  || 20) * CONFIG.CACTUS_SCALE;
            const h = (img.height || 36) * CONFIG.CACTUS_SCALE;
            const n = Math.floor(rand(1,4));
            for (let i=0;i<n;i++){
                obstacles.push({
                x: canvas.width + (i*(w+8)) + rand(0,15),
                y: GROUND_Y - h, w, h, type: 'cactus', img
    });
  }
      }
    }

    let spawnTimer = 0;

    function addDust(){
      dust.push({x: player.x-4 + Math.random()*8, y: GROUND_Y-2, vx: -rand(1,2), life: rand(16,26)});
    }

    function update(dt){
      if(!running || gameOver) return;

      // increase difficulty gradually
      speed += dt * CONFIG.SPEED_GROWTH; // slow ramp
      score += dt * 0.01 * speed;
      if(score > hi){ hi = score; localStorage.setItem('runner_best', Math.floor(hi)); }

      // spawn obstacles
      spawnTimer -= dt;
      if(spawnTimer <= 0){
        spawnObstacle();
        const base = clamp(1200 - speed*70, 520, 1000); // ms between spawns
        spawnTimer = rand(base*0.6, base*1.3);
      }

      // player physics
      player.vy += CONFIG.GRAVITY;
      player.y += player.vy;
      const targetH = player.duck && player.onGround ? 28 : 44;
      player.h += Math.sign(targetH - player.h) * Math.min(2, Math.abs(targetH - player.h));

      if(player.y + player.h >= GROUND_Y){
        player.y = GROUND_Y - player.h; player.vy = 0; player.onGround = true;
        if(Math.random()<0.4) addDust();
      } else {
        player.onGround = false;
      }

      // move clouds
      for(const c of clouds){ c.x -= c.v * speed; if(c.x < -80){ c.x = canvas.width + rand(0,100); c.y = rand(20,120); c.img = pick(IMAGES.clouds);} }

      // move dust
      for(let i=dust.length-1;i>=0;i--){
        const p = dust[i]; p.x += p.vx; p.life -= 1; if(p.life<=0) dust.splice(i,1);
      }

      // move obstacles and cull
      for(let i=obstacles.length-1;i>=0;i--){
        const o = obstacles[i];
        o.x -= speed;
        if(o.type==='bird'){ o.flap += dt*0.02; o.y += Math.sin(o.flap)*0.6; }
        if(o.x + o.w < -10) obstacles.splice(i,1);
      }

      // collisions
      for(const o of obstacles){
        if(rectsOverlap(player.x, player.y, player.w, player.h, o.x, o.y, o.w, o.h)){
          gameOver = true; running = false; break;
        }
      }
    }

    function rectsOverlap(x1,y1,w1,h1,x2,y2,w2,h2){
      return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
    }

    function drawGround(){
      if(IMAGES.ground && IMAGES.ground.width>1){
        const img = IMAGES.ground; let x= -((performance.now()/6)%img.width);
        for(; x<canvas.width; x+=img.width){ ctx.drawImage(img, x, GROUND_Y, img.width, img.height); }
      } else {
        ctx.strokeStyle = '#bbb';
        ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, GROUND_Y+1); ctx.lineTo(canvas.width, GROUND_Y+1); ctx.stroke();
        ctx.lineWidth = 1; ctx.strokeStyle = '#d9d9d9';
        for(let x=0;x<canvas.width;x+=18){
          ctx.beginPath(); ctx.moveTo(x - (performance.now()/20)%18, GROUND_Y+2); ctx.lineTo(x - (performance.now()/20)%18 + 6, GROUND_Y+2); ctx.stroke();
        }
      }
    }

    function drawPlayer(){
      const {x,y,w,h} = player;
      let img;
      if(!player.onGround) img = IMAGES.playerJump;
      else img = IMAGES.playerRun[ Math.floor((performance.now()/90)%IMAGES.playerRun.length) ] || IMAGES.playerRun[0];
      const scale = Math.min(w / (img.width||w), h / (img.height||h));
      const dw = (img.width||w) * scale;
      const dh = (img.height||h) * scale;
      const dx = x + (w-dw)/2;
      const dy = y + (h-dh);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function drawObstacle(o){ ctx.drawImage(o.img, o.x, o.y, o.w, o.h); }

    function drawSky(){
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      for(const c of clouds){ ctx.drawImage(c.img, c.x, c.y); }
    }

    function drawDust(){
      ctx.fillStyle = 'rgba(0,0,0,.12)';
      for(const p of dust){ ctx.fillRect(p.x, p.y, 2, 2); }
    }

    function drawHUD(){
      scoreEl.textContent = fmt(score);
      bestEl.textContent = fmt(hi);
      speedEl.textContent = speed.toFixed(1);

      if(gameOver){
        ctx.save();
        ctx.fillStyle = 'rgba(0,0,0,.6)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.font = '700 24px system-ui, -apple-system, Segoe UI, Roboto, Arial';
        ctx.fillText('¡Game Over!', canvas.width/2, canvas.height/2 - 8);
        ctx.font = '15px system-ui, -apple-system, Segoe UI, Roboto, Arial';
        ctx.fillText('Presiona R o Reiniciar', canvas.width/2, canvas.height/2 + 18);
        ctx.restore();
      }
    }

    function loop(ts){
      const dt = Math.min(50, ts - tPrev || 16.6667); // clamp delta
      tPrev = ts;
      update(dt);

      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawSky();
      drawGround();
      for(const o of obstacles) drawObstacle(o);
      drawDust();
      drawPlayer();
      drawHUD();

      requestAnimationFrame(loop);
    }

    // --- Controles
    function jump(){ if(!gameOver && player.onGround){ player.vy = CONFIG.JUMP_VY; player.onGround = false; } }
    function setDuck(d){ player.duck = !!d; }

    window.addEventListener('keydown', (e)=>{
      if(e.code==='Space' || e.code==='ArrowUp'){ e.preventDefault(); jump(); }
      if(e.code==='ArrowDown'){ setDuck(true); }
      if(e.key==='p' || e.key==='P'){ running = !running; }
      if(e.key==='r' || e.key==='R'){ reset(); }
    });
    window.addEventListener('keyup', (e)=>{ if(e.code==='ArrowDown'){ setDuck(false); } });

    // jQuery Mobile: eventos táctiles
    $(document).on('pagecreate', '#page-game', function(){
      $('#btnJump').on('tap', function(e){ e.preventDefault(); jump(); });
      $('#btnDuck').on('vmousedown', function(e){ e.preventDefault(); setDuck(true); });
      $('#btnDuck').on('vmouseup vmousecancel vmouseout', function(e){ e.preventDefault(); setDuck(false); });
      $('#btnLeft').on('tap', function(e){ e.preventDefault(); running = !running; $('#toggle').text(running? '⏯️ Pausa':'▶️ Reanudar'); });
    });

    toggleBtn.addEventListener('click', ()=>{ running = !running; toggleBtn.textContent = running? '⏯️ Pausa':'▶️ Reanudar';});
    restartBtn.addEventListener('click', reset);

    // Inicio (espera a que jQuery Mobile muestre la página)
    (async function init(){
      await preload();
      reset();
      requestAnimationFrame(loop);
    })();
  }

  // Asegura inicio cuando la página jQM esté visible
  $(document).on('pageshow', '#page-game', start);
  // Fallback si jQM no dispara (carga directa del HTML sin transiciones)
  window.addEventListener('DOMContentLoaded', start);
})();