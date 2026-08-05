const CONFIG = {
  // ---- names ----
  girlfriendName: "Gileen",
  myName: "Hanz",

  // ---- music ----
  // Add one song or several. Files live in assets/ (e.g. assets/music.mp3).
  // If you only have one song, just keep a single entry — the
  // prev/next buttons will simply replay it.
  songs: [
    { title: "Twilight Zone", artist: "Ariana Grande", src: "assets/Twilight Zone.mp3", art: "assets/images/photo1.jpg" },
    { title: "Thousand Years", artist: "John Michael Howell", src: "assets/Thousand Years.mp3", art: "assets/images/photo1.jpg" }
  ],

  // ---- love letter section ----
  letterParagraph:
`Happy birthday to the person I love so, so much.

I really, really love you. More than I probably know how to put into words. Every little thing you do makes me happy, even the things you probably don't think much about. The way you take care of me, the way you make me feel loved, and all the little moments we share mean so much to me.

Sometimes I still can't believe that you chose me. I know I'm far from perfect, but somehow, out of everyone, you still chose me. And I'll always be grateful for that.

I know I can be immature sometimes, and I know I mess up. I'll never deny those things. I still have so much to learn, and I know I have a lot of growing to do. But I promise I'll always keep working on myself—not just for me, but for both of us. I want to become someone who can love you better, understand you better, and be better for you.

We've only known each other for about a year, and we haven't even been together for that long, but somehow it feels like I've known you and been with you for a lifetime. Being with you feels so natural, like you've always been someone meant to be in my life.

You matter so much to me, and I never want to lose you. One thing you can always count on is that I'll be there. No matter how hard things get, no matter what we go through, I'll always want to stay beside you and work through things with you.

The way I love you may not always be the most mature, and I know I have my flaws, but it is real. It is sincere, and it comes from a heart that genuinely wants nothing but the best for you. In the moments where I mess up or don't know how to show it properly, I hope you can be patient with me and still see just how deeply I care about you.

I want you to know that I'll always want you. I'll always want to be beside you, take care of you, make you happy, and keep making memories with you.

I hope your birthday is as beautiful as you are to me. And no matter how many birthdays come after this one, I hope I'll still be right here, celebrating every single one with you.

I love you. Really, really, really much.
Happy birthday, my love.
`,

  // ---- "why I love you" cards ----
  reasons: [
    { icon: "🌹", title: "Your Smile", text: "The way it brightens your whole face and somehow makes even my hardest days feel a little lighter." },
    { icon: "🌠", title: "Your Soul", text: "The gentle way you treat people, even strangers, tells me everything about your heart." },
    { icon: "🌸", title: "Your Kindness", text: "Loud, real, and completely unfiltered — it's my favorite sound in the world." },
    { icon: "💐", title: "Your Eyes", text: "The warm brown in them that makes everything feel a little softer whenever I look at you." },
    { icon: "💕", title: "Your Heart", text: "You feel things so fully, and you let me feel them with you." },
    { icon: "💖", title: "Simply You", text: "Not one part I love more than another — just all of you, exactly as you are." }
  ],

  // ---- photo memories ----
  // add as many as you like — the carousel adapts automatically.
  // "src" should point to a file inside assets/images/
  // "caption" is the short word shown on the floating card
  // "message" is the longer note shown when she taps the photo
  memories: [
    { src: "assets/images/babies.jpg", message: "miii babiesss"},
    { src: "assets/images/kumag.jpg", message: "Kahit mukha akong burat, okay lang—basta ikaw, ang ganda mo. ❤️" },
    { src: "assets/images/brown.jpg", message: "Your eyes... hay ambot kanindot jud. klaro kaayong brownish oh"},
    { src: "assets/images/beautiful.jpg", message: "Every time I look at this one, I remember exactly how lucky I felt standing next to you." },
    { src: "assets/images/you.jpg", message: "Just you, being you. That's always been my favorite thing to look at." },
    { src: "assets/images/fav.jpg", message: "Out of every photo on my phone, this one has always been my favorite and you know it." },
    { src: "assets/images/always.jpg", message: "No matter how much time passes, this moment with you stays one of my favorites." },
    { src: "assets/images/us2.jpg", message: "This is what I want more of — just us, making little memories like this one." },
    { src: "assets/images/firstdate.jpg", message: "Our first hangout made me realize there was so much more to you than the first feeling I had. Seeing how kind you were, how gently you treated the people around you, only made me want to know you more. Somehow, the more I saw your heart, the more I found myself wanting you in my life." },
    { src: "assets/images/gwen.jpg", message: "hehe you’re the Gwen/MJ to my Peter—my favorite person, my home, and the one I’d choose in every universe." },
    { src: "assets/images/joshua.jpg", message: "The day I got you, Joshua. HAHAHA. It’s funny kay gi-screenshot ra nako ni nga pic sa imo story kay mauwaw pa kaayo ko ato mangayo ug pics nimo." },
    { src: "assets/images/joshua2.jpg", message: "You sending pics like this. Seeing how you take care of Joshua makes me so happy. It’s one of those little things that makes me love you even more." }
  ],

  // ---- the hidden message revealed by the "Click Me" bloom ----
  secretMessage:
`If I had to choose again, in every lifetime,
every universe, every version of this story...

I'd still choose you.
I love you so much!`,
};

/* ===========================================================
   Below this line: site behavior. Safe to leave alone.
   =========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  buildMemories();
  buildReasons();
  initReveal();
  initAmbient();
  initPlayer();
  initBloom();
  initHeartGate();
  initIntro();
  initMemoryModal();
  initMemoryCarousel();
  initLetter();
});

function prefersReducedMotion(){
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function fadeAudio(audioEl, from, to, duration, onComplete){
  if (!audioEl) return;
  if (duration <= 0){
    audioEl.volume = to;
    if (onComplete) onComplete();
    return;
  }
  const start = performance.now();
  function step(now){
    const p = Math.min((now - start) / duration, 1);
    audioEl.volume = from + (to - from) * p;
    if (p < 1) requestAnimationFrame(step);
    else if (onComplete) onComplete();
  }
  requestAnimationFrame(step);
}

/* ---------- fill in text content from CONFIG ---------- */
function applyConfig(){
  document.title = `I LOVE YOU! — for ${CONFIG.girlfriendName}`;

  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  set("letterParagraph", CONFIG.letterParagraph);
  set("secretMessage", CONFIG.secretMessage);
  set("finaleName", `— ${CONFIG.myName}`);
}

/* ---------- build the floating, continuously-drifting memory carousel ---------- */
function buildMemories(){
  const track = document.getElementById("memoryGrid");
  if (!track || !CONFIG.memories || !CONFIG.memories.length) return;

  // the track is duplicated once so the marquee can loop seamlessly
  // (translateX(-50%) lands exactly on the start of the clone set)
  const total = CONFIG.memories.length;
  const loopItems = [...CONFIG.memories, ...CONFIG.memories];

  loopItems.forEach((memory, i) => {
    const isClone = i >= total;

    const card = document.createElement("figure");
    card.className = "memory-card";
    if (isClone){
      card.classList.add("is-visible");
      card.setAttribute("aria-hidden", "true");
    } else {
      card.setAttribute("data-reveal-card", "");
    }

    const photo = document.createElement("div");
    photo.className = "memory-card-photo";
    photo.style.setProperty("--float-delay", `${(i % total) * 0.45}s`);
    photo.setAttribute("role", "button");
    photo.setAttribute("aria-label", memory.caption ? `Open memory: ${memory.caption}` : "Open memory");
    if (!isClone) photo.tabIndex = 0;

    const img = document.createElement("img");
    img.src = memory.src;
    img.alt = memory.caption || `memory ${(i % total) + 1}`;
    img.loading = "lazy";
    img.onerror = () => photo.classList.add("img-missing");

    const openThisMemory = () => openMemoryModal(memory);
    photo.addEventListener("click", openThisMemory);
    photo.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " "){
        e.preventDefault();
        openThisMemory();
      }
    });

    photo.appendChild(img);
    card.appendChild(photo);
    track.appendChild(card);
  });
}

/* ---------- memory lightbox: tap a photo, see it + its message ---------- */
let memoryModalEl, memoryModalImgEl, memoryModalMessageEl, memoryModalCloseEl, memoryModalBackdropEl, memoryModalLastFocus;

function initMemoryModal(){
  memoryModalEl = document.getElementById("memoryModal");
  memoryModalImgEl = document.getElementById("memoryModalImg");
  memoryModalMessageEl = document.getElementById("memoryModalMessage");
  memoryModalCloseEl = document.getElementById("memoryModalClose");
  memoryModalBackdropEl = document.getElementById("memoryModalBackdrop");
  if (!memoryModalEl) return;

  memoryModalCloseEl.addEventListener("click", closeMemoryModal);
  memoryModalBackdropEl.addEventListener("click", closeMemoryModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && memoryModalEl.classList.contains("is-open")) closeMemoryModal();
  });
}

function openMemoryModal(memory){
  if (!memoryModalEl) return;
  memoryModalLastFocus = document.activeElement;

  memoryModalImgEl.src = memory.src;
  memoryModalImgEl.alt = memory.caption || "";
  memoryModalMessageEl.textContent = memory.message || memory.caption || "";

  memoryModalEl.classList.add("is-open");
  memoryModalEl.setAttribute("aria-hidden", "false");

  const carousel = document.getElementById("memoryCarousel");
  if (carousel) carousel.classList.add("is-paused");

  document.body.style.overflow = "hidden";
  memoryModalCloseEl.focus();
}

function closeMemoryModal(){
  if (!memoryModalEl) return;
  memoryModalEl.classList.remove("is-open");
  memoryModalEl.setAttribute("aria-hidden", "true");

  const carousel = document.getElementById("memoryCarousel");
  if (carousel) carousel.classList.remove("is-paused");

  document.body.style.overflow = "";
  if (memoryModalLastFocus) memoryModalLastFocus.focus();
}

/* ---------- floating carousel drift + ‹ › controls, all in one smooth rAF loop ---------- */
function initMemoryCarousel(){
  const carousel = document.getElementById("memoryCarousel");
  const track = document.getElementById("memoryGrid");
  const prevBtn = document.getElementById("memoryPrev");
  const nextBtn = document.getElementById("memoryNext");
  if (!carousel || !track) return;

  const reduceMotion = prefersReducedMotion();

  const BASE_SPEED  = 34;   // px/sec — the gentle everyday drift
  const BOOST_SPEED = 340;  // px/sec — while fast-forwarding/rewinding
  const EASE_RATE   = 4;    // how quickly speed eases toward its target each second

  let pos = 0;              // current translateX, always between -half and 0
  let half = 0;             // width of one full (non-duplicated) set of cards
  let targetSpeed = BASE_SPEED;
  let currentSpeed = BASE_SPEED;
  let direction = -1;       // -1 = normal left drift, +1 = reversed while the ‹ button is boosting
  let hovering = false;
  let lastTime = null;
  let revertTimer = null;

  function measure(){ half = track.scrollWidth / 2; }
  measure();
  window.addEventListener("resize", measure);

  // reduced-motion: skip the continuous drift/easing loop entirely, but the
  // cards still need to be positioned and the ‹ › buttons still need to work —
  // clicking them just jumps straight to the next/previous card, no animation.
  if (reduceMotion){
    track.style.transform = `translateX(${pos}px)`;

    function jump(dir){
      if (half <= 0) measure();
      const first = track.firstElementChild;
      const cardWidth = first ? first.getBoundingClientRect().width : 250;
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0") || 0;
      pos += dir * (cardWidth + gap);
      if (pos <= -half) pos += half;
      if (pos > 0) pos -= half;
      track.style.transform = `translateX(${pos}px)`;
    }

    if (prevBtn) prevBtn.addEventListener("click", () => jump(1));
    if (nextBtn) nextBtn.addEventListener("click", () => jump(-1));
    return;
  }

  function isPaused(){
    return hovering || carousel.classList.contains("is-paused");
  }

  function frame(now){
    if (lastTime === null) lastTime = now;
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    // ease the current speed toward whatever it should be right now — this
    // is what makes pressing an arrow feel like a smooth push, not a snap
    const wantedSpeed = isPaused() ? 0 : targetSpeed;
    currentSpeed += (wantedSpeed - currentSpeed) * Math.min(EASE_RATE * dt, 1);

    if (half > 0 && Math.abs(currentSpeed) > 0.4){
      pos += direction * currentSpeed * dt;
      if (pos <= -half) pos += half;
      if (pos > 0) pos -= half;
      track.style.transform = `translateX(${pos}px)`;
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  carousel.addEventListener("mouseenter", () => { hovering = true; });
  carousel.addEventListener("mouseleave", () => { hovering = false; });

  function boost(dir){
    clearTimeout(revertTimer);
    direction = dir;
    targetSpeed = BOOST_SPEED;
    revertTimer = setTimeout(() => {
      targetSpeed = BASE_SPEED;
      direction = -1;   // always settle back into the normal leftward drift — never stays reversed
    }, 900);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => boost(1));   // ‹ reverses: carousel moves right, showing previous photos
  if (nextBtn) nextBtn.addEventListener("click", () => boost(-1));  // › keeps/boosts the normal left drift, showing next photos
}

/* ---------- build "why I love you" cards ---------- */
function buildReasons(){
  const grid = document.getElementById("reasonsGrid");
  if (!grid) return;

  CONFIG.reasons.forEach((reason) => {
    const card = document.createElement("div");
    card.className = "reason-card";
    card.setAttribute("data-reveal-card", "");

    if (reason.icon){
      const icon = document.createElement("span");
      icon.className = "reason-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = reason.icon;
      card.appendChild(icon);
    }

    const title = document.createElement("h3");
    title.className = "reason-title";
    title.textContent = reason.title;

    const text = document.createElement("p");
    text.className = "reason-text";
    text.textContent = reason.text;

    card.appendChild(title);
    card.appendChild(text);
    grid.appendChild(card);
  });
}

/* ---------- scroll reveal (IntersectionObserver) ---------- */
function initReveal(){
  const targets = document.querySelectorAll("[data-reveal], [data-reveal-card]");
  if (!("IntersectionObserver" in window)){
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  targets.forEach(el => observer.observe(el));
}

/* ---------- ambient petals + tiny glowing particles ---------- */
function initAmbient(){
  const layer = document.getElementById("ambient");
  if (!layer) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const petalKinds = ["pt-rose", "pt-rose", "pt-dusty", "pt-dusty", "pt-burgundy"];
  const maxOnScreen = window.innerWidth < 640 ? 11 : 19;
  let active = 0;

  function spawnPetal(){
    if (active >= maxOnScreen){
      setTimeout(spawnPetal, 500);
      return;
    }

    const el = document.createElement("span");
    const kind = petalKinds[Math.floor(Math.random() * petalKinds.length)];
    el.className = `petal ${kind}`;

    // vary size, blur, opacity, and speed for a sense of depth
    const size = 8 + Math.random() * 16;               // 8–24px
    const blur = Math.random() < 0.35 ? (Math.random() * 2.2).toFixed(1) : 0;
    const maxOpacity = (0.35 + Math.random() * 0.5).toFixed(2); // 0.35–0.85
    const duration = (5 + Math.random() * 10).toFixed(1) + "s"; // 5–15s
    const left = Math.random() * 100;
    const drift = (Math.random() * 140 - 70).toFixed(0) + "px";

    el.style.width = size + "px";
    el.style.height = size * 1.05 + "px";
    el.style.left = left + "vw";
    el.style.filter = blur ? `blur(${blur}px)` : "none";
    el.style.setProperty("--maxop", maxOpacity);
    el.style.setProperty("--drift", drift);
    el.style.animationDuration = duration;
    el.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;

    layer.appendChild(el);
    active++;

    const life = parseFloat(duration) * 1000 + 400;
    setTimeout(() => { el.remove(); active--; }, life);

    setTimeout(spawnPetal, 600 + Math.random() * 1000);
  }

  function spawnSpark(){
    const el = document.createElement("span");
    el.className = "spark";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = Math.random() * 100 + "vh";
    el.style.animationDuration = (2.5 + Math.random() * 2.5).toFixed(1) + "s";

    layer.appendChild(el);
    const life = 5500;
    setTimeout(() => el.remove(), life);

    setTimeout(spawnSpark, 900 + Math.random() * 1400);
  }

  // a few bigger, warmer glimmers sprinkled in on top of the tiny sparks — kept rare so it stays subtle
  function spawnShine(){
    const el = document.createElement("span");
    el.className = "shine";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = Math.random() * 100 + "vh";
    el.style.animationDuration = (3 + Math.random() * 2.2).toFixed(1) + "s";

    layer.appendChild(el);
    const life = 6000;
    setTimeout(() => el.remove(), life);

    setTimeout(spawnShine, 2400 + Math.random() * 2800);
  }

  for (let i = 0; i < 6; i++) setTimeout(spawnPetal, i * 400);
  for (let i = 0; i < 3; i++) setTimeout(spawnSpark, i * 700);
  for (let i = 0; i < 2; i++) setTimeout(spawnShine, 1200 + i * 1500);
}

/* ---------- hero heart-tap gate: explode → flash → reveal ---------- */
function initHeartGate(){
  const gate = document.getElementById("heartGate");
  const btn = document.getElementById("heartBtn");
  const hint = document.getElementById("heartHint");
  if (!gate || !btn) return;

  const reduceMotion = prefersReducedMotion();

  // lock scrolling until she's tapped the heart
  if (!reduceMotion) document.documentElement.classList.add("pre-reveal");

  btn.addEventListener("click", () => {
    btn.disabled = true;
    if (hint) hint.classList.add("hide");

    const rect = btn.getBoundingClientRect();
    openHero(rect.left + rect.width / 2, rect.top + rect.height / 2, { gateEl: gate, reduceMotion });
  });
}

/* shared "open the birthday site" sequence: burst of flowers → white flash →
   reveal the hero text + music player. Used by the hero's own heart button,
   and also triggered automatically once the cake/heart intro finishes —
   so there's only ever one heart she has to actually tap. */
function openHero(originX, originY, { gateEl, reduceMotion } = {}){
  const heroInner = document.getElementById("heroInner");
  const scrollHint = document.getElementById("heroScrollHint");
  const flash = document.getElementById("flashOverlay");
  const burstLayer = document.getElementById("burstLayer");

  // try to start the background music on this user gesture — most reliable moment to do it
  const audio = document.getElementById("audio");
  if (audio && audio.paused){
    audio.play().then(() => setPlayingUI(true)).catch(() => {});
  }

  if (reduceMotion){
    if (gateEl) gateEl.setAttribute("hidden", "");
    document.documentElement.classList.remove("pre-reveal");
    revealHero(heroInner, scrollHint);
    revealPlayer();
    return;
  }

  spawnBurst(burstLayer, originX, originY);

  if (gateEl) gateEl.classList.add("exploding");
  setTimeout(() => { if (gateEl) gateEl.setAttribute("hidden", ""); }, 550);

  // let the flowers fully burst and drift before the light comes in
  setTimeout(() => { flash.classList.add("flash-in"); }, 1750);

  // hold at full white a beat longer for a more dramatic pause
  setTimeout(() => {
    flash.classList.remove("flash-in");
    flash.classList.add("flash-out");
    document.documentElement.classList.remove("pre-reveal");
    revealHero(heroInner, scrollHint);
    revealPlayer();
  }, 2650);

  // matches the slower flash-out transition in CSS (2.8s)
  setTimeout(() => { flash.classList.remove("flash-out"); }, 5450);
}

/* ===========================================================================
   OPENING SEQUENCE
   black screen → cake builds itself → candle appears → candle lights →
   tap the cake to blow it out → fade to black → heart fades in → pink aura →
   heartbeat pulses reveal the site's real colors underneath → tap the heart
   to enter (reuses openHero() above, so there's only ever one heart-tap moment)
   =========================================================================== */
function initIntro(){
  const introGate  = document.getElementById("introGate");
  const backdrop   = document.getElementById("introBackdrop");
  const introTap   = document.getElementById("introTap");
  const cakeScene  = document.getElementById("cakeScene");
  const cake       = document.getElementById("cake");
  const cakeHint   = document.getElementById("cakeHint");
  const heartWrap  = document.getElementById("introHeartWrap");
  const heartBtn   = document.getElementById("introHeartBtn");
  const heartHint  = document.getElementById("introHeartHint");
  const cakeSong   = document.getElementById("cakeSongAudio");
  const lightSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/match-strike-trimmed.mp3");
  lightSound.volume = 0.55;
  const blowSound  = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/blow-out.mp3");
  blowSound.volume = 0.55;
  const heroGate   = document.getElementById("heartGate");

  if (!introGate || !introTap || !cakeScene || !cake || !heartWrap || !heartBtn) return;

  const reduceMotion = prefersReducedMotion();
  let stopIntroSparkles = null;

  // gentle sparkles twinkling over the black backdrop, started the moment she taps in
  function startIntroSparkles(){
    const layer = document.getElementById("introSparkles");
    if (!layer || reduceMotion) return;

    let running = true;
    function spawn(){
      if (!running) return;
      const el = document.createElement("span");
      el.className = "intro-spark";
      el.style.left = Math.random() * 100 + "%";
      el.style.top = Math.random() * 100 + "%";
      const dur = (2.2 + Math.random() * 2.2).toFixed(1) + "s";
      el.style.animationDuration = dur;
      el.style.setProperty("--maxop", (0.45 + Math.random() * 0.4).toFixed(2));

      layer.appendChild(el);
      setTimeout(() => el.remove(), parseFloat(dur) * 1000 + 200);
      if (running) setTimeout(spawn, 500 + Math.random() * 700);
    }
    for (let i = 0; i < 4; i++) setTimeout(spawn, i * 350);

    stopIntroSparkles = () => { running = false; };
  }

  // the hero has its own heart-tap fallback baked in; keep it out of sight
  // while this intro runs so she only ever sees one heart, not two.
  if (heroGate) heroGate.setAttribute("hidden", "");

  introTap.addEventListener("click", () => {
    introTap.classList.add("fade-out");
    setTimeout(() => { introTap.hidden = true; }, reduceMotion ? 0 : 500);

    // this tap is our one guaranteed user gesture — start the birthday song now
    if (cakeSong){
      cakeSong.volume = 0;
      cakeSong.play().then(() => fadeAudio(cakeSong, 0, 0.55, reduceMotion ? 0 : 1400)).catch(() => {});
    }

    startIntroSparkles();
    buildCake();
  }, { once: true });

  function buildCake(){
    cakeScene.hidden = false;

    if (reduceMotion){
      cake.classList.add("show-tier3", "show-tier2", "show-tier1", "show-drips", "show-candle", "lit");
      if (lightSound){ lightSound.currentTime = 0; lightSound.play().catch(() => {}); }
      cakeHint.classList.add("is-visible");
      armCakeTap();
      return;
    }

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    (async () => {
      await wait(250);
      cake.classList.add("show-tier3");
      await wait(550);
      cake.classList.add("show-tier2");
      await wait(500);
      cake.classList.add("show-tier1");
      await wait(450);
      cake.classList.add("show-drips");
      await wait(900);              // a beat to admire the finished cake
      cake.classList.add("show-candle");
      await wait(700);
      cake.classList.add("lit");
      if (lightSound){ lightSound.currentTime = 0; lightSound.play().catch(() => {}); }
      await wait(400);
      cakeHint.classList.add("is-visible");
      armCakeTap();
    })();
  }

  function armCakeTap(){
    cake.addEventListener("click", blowCandle);
    cake.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " "){ e.preventDefault(); blowCandle(); }
    });
  }

  function blowCandle(){
    if (!cake.classList.contains("lit") || cake.classList.contains("blown")) return;

    cake.classList.add("blown");
    cakeHint.classList.remove("is-visible");

    if (blowSound){
      blowSound.currentTime = 0;
      blowSound.play().catch(() => {});
    }

    const pause = reduceMotion ? 0 : 750; // short cinematic pause after blowing it out
    setTimeout(() => {
      cakeScene.classList.add("fade-out");
      const fadeTime = reduceMotion ? 0 : 900;
      setTimeout(() => {
        cakeScene.hidden = true;
        showHeart();
      }, fadeTime);
    }, pause);
  }

  function showHeart(){
    heartWrap.hidden = false;
    requestAnimationFrame(() => heartWrap.classList.add("is-visible"));

    // the heart is here — gradually let go of the birthday song since a
    // different song takes over the moment she taps it. Pause it once the
    // fade finishes so it doesn't keep silently playing in the background.
    if (cakeSong) fadeAudio(cakeSong, cakeSong.volume, 0, reduceMotion ? 0 : 2500, () => cakeSong.pause());

    if (reduceMotion){
      backdrop.style.transition = "none";
      backdrop.classList.add("reveal-4");
      readyHeart();
      return;
    }

    // let her see the heart glow and beat a couple of times before the
    // site's colors start returning underneath it
    setTimeout(driveColorReveal, 1300);
  }

  function driveColorReveal(){
    const steps = ["reveal-1", "reveal-2", "reveal-3", "reveal-4"];
    const beat = 1900; // roughly matches the heartbeat's pulse cycle
    steps.forEach((cls, i) => {
      setTimeout(() => backdrop.classList.add(cls), i * beat);
    });
    setTimeout(readyHeart, steps.length * beat + 300);
  }

  function readyHeart(){
    if (heartHint) heartHint.classList.add("is-visible");
    heartBtn.addEventListener("click", enterSite, { once: true });
  }

  function enterSite(){
    heartBtn.disabled = true;
    if (heartHint) heartHint.classList.add("hide");
    if (stopIntroSparkles) stopIntroSparkles();

    const rect = heartBtn.getBoundingClientRect();
    openHero(rect.left + rect.width / 2, rect.top + rect.height / 2, { gateEl: null, reduceMotion });

    introGate.classList.add("curtain-fade");
    setTimeout(() => { introGate.hidden = true; }, reduceMotion ? 0 : 3600);
  }
}

function revealPlayer(){
  const player = document.getElementById("player");
  if (!player || player.dataset.state === "disabled") return;
  player.hidden = false;
  requestAnimationFrame(() => player.classList.add("is-visible"));
}

function revealHero(heroInner, scrollHint){
  // let the soft diagonal sunray glow fade in now that the site is actually entered
  const sunray = document.getElementById("sunray");
  if (sunray) sunray.classList.add("is-visible");

  if (heroInner){
    heroInner.hidden = false;
    requestAnimationFrame(() => {
      heroInner.querySelectorAll("[data-hero-reveal]").forEach((el, i) => {
        setTimeout(() => el.classList.add("is-visible"), i * 260);
      });
    });
  }

  setTimeout(() => {
    if (scrollHint){
      scrollHint.hidden = false;
      requestAnimationFrame(() => scrollHint.classList.add("is-visible"));
    }
  }, 2200);
}

function spawnBurst(layer, x, y){
  if (!layer) return;
  const emojis = ["🌸", "🌹", "🌷", "💐", "🌺", "🌼"];
  const count = window.innerWidth < 640 ? 20 : 30;

  for (let i = 0; i < count; i++){
    const el = document.createElement("span");
    el.className = "burst-petal";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 260;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rot = (Math.random() * 720 - 360).toFixed(0) + "deg";
    const size = 20 + Math.random() * 22;
    const duration = (0.9 + Math.random() * 0.6).toFixed(2) + "s";
    const delay = (Math.random() * 0.15).toFixed(2) + "s";

    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.fontSize = size + "px";
    el.style.setProperty("--tx", tx + "px");
    el.style.setProperty("--ty", ty + "px");
    el.style.setProperty("--rot", rot);
    el.style.animationDuration = duration;
    el.style.animationDelay = delay;

    layer.appendChild(el);
    setTimeout(() => el.remove(), 1900);
  }
}

/* ---------- music player (with optional playlist) ---------- */
let audioEl, audioSource, toggleBtn, prevBtn, nextBtn, iconPlay, iconPause,
    progressBar, progressFill, currentEl, durationEl, artEl, titleEl, artistEl;
let trackIndex = 0;

function initPlayer(){
  audioEl = document.getElementById("audio");
  audioSource = document.getElementById("audioSource");
  toggleBtn = document.getElementById("playerToggle");
  prevBtn = document.getElementById("playerPrev");
  nextBtn = document.getElementById("playerNext");
  iconPlay = document.getElementById("iconPlay");
  iconPause = document.getElementById("iconPause");
  progressBar = document.getElementById("playerProgress");
  progressFill = document.getElementById("playerProgressFill");
  currentEl = document.getElementById("playerCurrent");
  durationEl = document.getElementById("playerDuration");
  artEl = document.getElementById("playerArt");
  titleEl = document.getElementById("playerSongTitle");
  artistEl = document.getElementById("playerArtist");

  const player = document.getElementById("player");
  if (!audioEl || !player || !CONFIG.songs || !CONFIG.songs.length) {
    if (player) player.dataset.state = "disabled";
    return;
  }

  loadTrack(0, { autoplay: false });

  audioEl.addEventListener("error", () => {
    player.dataset.state = "disabled";
  });

  toggleBtn.addEventListener("click", () => {
    if (audioEl.paused){
      audioEl.play().then(() => setPlayingUI(true)).catch(() => {});
    } else {
      audioEl.pause();
      setPlayingUI(false);
    }
  });

  if (prevBtn){
    prevBtn.addEventListener("click", () => {
      const wasPlaying = !audioEl.paused;
      const newIndex = (trackIndex - 1 + CONFIG.songs.length) % CONFIG.songs.length;
      loadTrack(newIndex, { autoplay: wasPlaying });
    });
  }

  if (nextBtn){
    nextBtn.addEventListener("click", () => {
      const wasPlaying = !audioEl.paused;
      const newIndex = (trackIndex + 1) % CONFIG.songs.length;
      loadTrack(newIndex, { autoplay: wasPlaying });
    });
  }

  audioEl.addEventListener("timeupdate", () => {
    if (!audioEl.duration) return;
    const pct = (audioEl.currentTime / audioEl.duration) * 100;
    progressFill.style.width = pct + "%";
    progressBar.setAttribute("aria-valuenow", pct.toFixed(0));
    currentEl.textContent = formatTime(audioEl.currentTime);
  });

  audioEl.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audioEl.duration);
  });

  audioEl.addEventListener("ended", () => {
    if (CONFIG.songs.length > 1){
      const newIndex = (trackIndex + 1) % CONFIG.songs.length;
      loadTrack(newIndex, { autoplay: true });
    } else {
      setPlayingUI(false);
    }
  });

  const seek = (clientX) => {
    if (!audioEl.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    audioEl.currentTime = ratio * audioEl.duration;
  };

  progressBar.addEventListener("click", (e) => seek(e.clientX));
  progressBar.addEventListener("touchstart", (e) => {
    if (e.touches[0]) seek(e.touches[0].clientX);
  }, { passive: true });

  progressBar.addEventListener("keydown", (e) => {
    if (!audioEl.duration) return;
    if (e.key === "ArrowRight") audioEl.currentTime = Math.min(audioEl.currentTime + 5, audioEl.duration);
    if (e.key === "ArrowLeft") audioEl.currentTime = Math.max(audioEl.currentTime - 5, 0);
  });
}

function loadTrack(index, { autoplay }){
  const track = CONFIG.songs[index];
  if (!track) return;
  trackIndex = index;

  titleEl.textContent = track.title || "";
  artistEl.textContent = track.artist || "";
  if (track.art){
    artEl.src = track.art;
    artEl.parentElement.classList.remove("art-fallback");
  }

  audioSource.src = track.src;
  audioEl.load();
  progressFill.style.width = "0%";
  currentEl.textContent = "0:00";
  durationEl.textContent = "0:00";

  if (autoplay){
    audioEl.play().then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));
  } else {
    setPlayingUI(false);
  }
}

function setPlayingUI(isPlaying){
  if (!iconPlay || !iconPause) return;
  iconPlay.style.display = isPlaying ? "none" : "block";
  iconPause.style.display = isPlaying ? "block" : "none";
  toggleBtn.setAttribute("aria-label", isPlaying ? "Pause music" : "Play music");
}

function formatTime(seconds){
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/* ---------- love letter: tap the envelope, the letter floats in as a popup ---------- */
let letterModalLastFocus;

function initLetter(){
  const envelope = document.getElementById("envelopeBtn");
  const subtitle = document.getElementById("letterSubtitle");
  const modal = document.getElementById("letterModal");
  const paper = document.getElementById("letterPaper");
  const scrollArea = paper ? paper.querySelector(".letter-paper-scroll") : null;
  const backdrop = document.getElementById("letterModalBackdrop");
  const closeBtn = document.getElementById("letterModalClose");
  if (!envelope || !modal || !paper || !closeBtn) return;

  const reduceMotion = prefersReducedMotion();
  let flapOpened = false;  // whether the envelope is currently open/mid-opening
  let modalOpen = false;

  function openLetterModal(){
    if (modalOpen) return;
    modalOpen = true;
    letterModalLastFocus = document.activeElement;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    envelope.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLetterModal(){
    if (!modalOpen) return;
    modalOpen = false;

    // true reverse of opening: the letter fades/scales away while the
    // envelope seals itself back up at the same time
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    envelope.setAttribute("aria-expanded", "false");
    envelope.classList.remove("is-open");
    flapOpened = false;               // so the full open animation plays again next time
    if (subtitle) subtitle.textContent = "tap the envelope to open it";

    const restoreFocus = letterModalLastFocus || envelope;
    if (restoreFocus && restoreFocus.focus) restoreFocus.focus();

    // wait for the envelope's own re-sealing transition (its slowest piece,
    // ~1s) before unlocking background scroll and resetting scroll position
    const closeDuration = reduceMotion ? 0 : 1000;
    setTimeout(() => {
      document.body.style.overflow = "";
      if (scrollArea) scrollArea.scrollTop = 0;
    }, closeDuration);
  }

  envelope.addEventListener("click", () => {
    if (modalOpen) return;
    if (!flapOpened){
      flapOpened = true;
      envelope.classList.add("is-open");
      // let the flap-open + paper-peek animation play first, then float the letter in
      setTimeout(openLetterModal, reduceMotion ? 0 : 1000);
    } else {
      openLetterModal();
    }
  });

  closeBtn.addEventListener("click", closeLetterModal);
  backdrop.addEventListener("click", closeLetterModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOpen) closeLetterModal();
  });
}

/* ---------- the bloom / secret message reveal ---------- */
function initBloom(){
  const bloom = document.getElementById("bloomBtn");
  const message = document.getElementById("secretMessage");
  if (!bloom || !message) return;

  bloom.addEventListener("click", () => {
    bloom.classList.add("bloomed");
    bloom.setAttribute("aria-expanded", "true");
    setTimeout(() => message.classList.add("is-visible"), 400);
  }, { once: true });
}
