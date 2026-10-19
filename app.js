/* ═══════════════════════════════════════════════════════════
   MINTED MILLIONAIRES — app.js
   ═══════════════════════════════════════════════════════════ */
(() => {
  const C = window.MM_CONFIG || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── config → DOM ───────────────────────────────────── */
  const caText = C.CA || 'xxxxxxxxxxxxxxxxxxxxxxx';
  $('#caValue').textContent = caText;
  $$('[data-ca]').forEach(el => el.textContent = caText);
  $$('[data-x-link]').forEach(a => a.href = C.X_URL || '#');

  /* ── loader ─────────────────────────────────────────── */
  const loader = $('#loader'), loaderBar = $('#loaderBar'), loaderTxt = $('#loaderTxt');
  const msgs = ['MINTING…', 'LIGHTING THE FLAME…', 'ENTERING THE TRENCHES…', 'STILL HERE.'];
  let p = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + 6 + Math.random() * 14);
    loaderBar.style.width = p + '%';
    loaderTxt.textContent = msgs[Math.min(msgs.length - 1, Math.floor(p / 28))];
    if (p >= 100) { clearInterval(tick); setTimeout(startSite, 250); }
  }, 90);

  function startSite() {
    loader.classList.add('done');
    document.body.classList.add('ready');
    // hero entrance
    $$('.hero .reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), 120 + i * 110));
    const g = $$('.glitch');
    g.forEach((el, i) => setTimeout(() => el.classList.add('go'), 200 + i * 150));
    setInterval(() => {
      const el = g[Math.floor(Math.random() * g.length)];
      el.classList.remove('go'); void el.offsetWidth; el.classList.add('go');
    }, 4200);
    countUp();
  }

  /* ── nav ────────────────────────────────────────────── */
  const nav = $('#nav');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30), { passive: true });
  $('#burger').addEventListener('click', () => {
    const l = $('.nav__links');
    l.style.display = l.style.display === 'flex' ? 'none' : 'flex';
    Object.assign(l.style, { position: 'absolute', top: '100%', left: 0, right: 0, flexDirection: 'column', gap: '18px', padding: '20px 28px', background: 'rgba(6,16,12,.96)', borderBottom: '1px solid rgba(76,240,167,.2)' });
  });

  /* ── CA copy ────────────────────────────────────────── */
  const copyBtn = $('#caCopy');
  copyBtn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(caText); } catch (_) {}
    copyBtn.classList.add('ok'); copyBtn.lastElementChild.textContent = 'COPIED';
    toast('CA copied. Go get minted.');
    setTimeout(() => { copyBtn.classList.remove('ok'); copyBtn.lastElementChild.textContent = 'COPY'; }, 1800);
  });

  /* ── toast ──────────────────────────────────────────── */
  const toastEl = $('#toast'); let toastT;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  /* ── count up ───────────────────────────────────────── */
  function countUp() {
    $$('[data-count]').forEach(el => {
      const end = +el.dataset.count, t0 = performance.now(), dur = 1600;
      const step = now => {
        const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(end * e).toLocaleString('en-US');
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* ── reveal on scroll ───────────────────────────────── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      if (en.target.id === 'tweetCard') $$('[data-line]').forEach((l, i) => setTimeout(() => l.classList.add('in'), 300 + i * 260));
      if (en.target.id === 'wall') $$('.wall__tile').forEach((t, i) => setTimeout(() => t.classList.add('in'), i * 35));
      if (en.target.classList.contains('tl')) updateTimeline();
      io.unobserve(en.target);
    });
  }, { threshold: 0.18 });
  $$('.reveal:not(.hero .reveal)').forEach(el => io.observe(el));

  function updateTimeline() {
    const done = $$('.tl.in').length, total = $$('.tl').length;
    $('#timelineFill').style.height = (done / total * 100) + '%';
    $('#timelineFill').style.transition = 'height 1s cubic-bezier(.22,1,.36,1)';
  }

  /* ── wall of ghosts ─────────────────────────────────── */
  const wall = $('#wall');
  const hues = [0, 0, 0, 25, -30, 60, 0, 120, 0, 200, 0, -60, 0, 90, 0, 280, 0, 0, 160, 0, 0, 40, 0, 0];
  for (let i = 0; i < 24; i++) {
    const t = document.createElement('div');
    t.className = 'wall__tile';
    const h = hues[i % hues.length];
    const id = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
    t.innerHTML = `<img src="assets/mm.jpg" alt="Minted Millionaire #${id}" style="filter:hue-rotate(${h}deg) saturate(${h ? 1.15 : 1}) contrast(1.05)"><span>#${id}</span>`;
    wall.appendChild(t);
  }

  /* ── cursor glow + magnetic buttons ─────────────────── */
  const glow = $('#cursorGlow');
  let mx = innerWidth / 2, my = innerHeight / 2, gx = mx, gy = my;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  (function glowLoop() {
    gx += (mx - gx) * .12; gy += (my - gy) * .12;
    glow.style.transform = `translate(${gx}px, ${gy}px)`;
    requestAnimationFrame(glowLoop);
  })();

  if (!reduced) $$('.magnetic').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * .25, y = (e.clientY - r.top - r.height / 2) * .35;
      b.style.transform = `translate(${x}px, ${y}px)`;
    });
    b.addEventListener('pointerleave', () => b.style.transform = '');
  });

  /* ── 3D tilt (hero ghost + mint card) ───────────────── */
  function tilt(el, stage, max = 14) {
    if (reduced) return;
    const host = stage || el;
    host.addEventListener('pointermove', e => {
      const r = host.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.transform = `rotateY(${(px - .5) * max * 2}deg) rotateX(${(.5 - py) * max * 2}deg)`;
      el.style.setProperty('--gx', px * 100 + '%'); el.style.setProperty('--gy', py * 100 + '%');
      el.style.animation = 'none';
    });
    host.addEventListener('pointerleave', () => { el.style.transform = ''; el.style.animation = ''; });
  }
  tilt($('#ghostCard'), $('#ghostStage'), 12);
  tilt($('#mintCard'), null, 16);

  /* ── parallax on scroll (hero art) ──────────────────── */
  addEventListener('scroll', () => {
    const y = scrollY;
    const art = $('.hero__art'); if (art) art.style.transform = `translateY(${y * .18}px)`;
    const copy = $('.hero__copy'); if (copy) copy.style.transform = `translateY(${y * .08}px)`;
  }, { passive: true });

  /* ── mint UI ────────────────────────────────────────── */
  const M = Object.assign({ supply: 10000, minted: 0, maxPerWallet: 3, live: false }, C.MINT || {});
  const qtyVal = $('#qtyVal'); let qty = 1;
  $('#qtyMinus').onclick = () => { qty = Math.max(1, qty - 1); qtyVal.textContent = qty; };
  $('#qtyPlus').onclick = () => { qty = Math.min(M.maxPerWallet, qty + 1); qtyVal.textContent = qty; };
  $('#mintSupply').textContent = M.supply.toLocaleString('en-US');
  $('#mintedCount').textContent = M.minted.toLocaleString('en-US');
  const phase = $('#mintPhase');
  if (M.live) { phase.textContent = 'LIVE'; phase.className = 'chip chip--green'; }
  setTimeout(() => $('#mintBar').style.width = Math.max(1.2, M.minted / M.supply * 100) + '%', 800);

  // rolling preview id
  const pid = $('#mintPreviewId');
  setInterval(() => pid.textContent = '#' + String(Math.floor(Math.random() * M.supply) + 1).padStart(4, '0'), 900);
  setInterval(() => $('#pfpNum').textContent = String(Math.floor(Math.random() * M.supply) + 1).padStart(4, '0'), 2400);

  const mintBtn = $('#mintBtn'), mintTxt = $('#mintBtnTxt'), note = $('#mintNote');
  let wallet = null;
  function getProvider() {
    if (window.phantom?.solana?.isPhantom) return window.phantom.solana;
    if (window.solflare?.isSolflare) return window.solflare;
    if (window.backpack?.solana) return window.backpack.solana;
    if (window.solana) return window.solana;
    return null;
  }
  mintBtn.addEventListener('click', async () => {
    if (!wallet) {
      const prov = getProvider();
      if (!prov) { toast('No Solana wallet found. Install Phantom.'); window.open('https://phantom.app/', '_blank', 'noopener'); return; }
      try {
        mintTxt.textContent = 'CONNECTING…';
        const res = await prov.connect();
        wallet = (res?.publicKey || prov.publicKey).toString();
        mintTxt.textContent = `MINT ${qty} FREE`;
        note.textContent = `Connected: ${wallet.slice(0, 4)}…${wallet.slice(-4)}`;
        toast('Wallet connected. Ghost incoming.');
      } catch (e) { mintTxt.textContent = 'CONNECT WALLET'; toast('Connection cancelled.'); }
      return;
    }
    if (!M.live) { toast('Mint opens soon. Follow on X for the exact time.'); return; }
    // TODO: wire candy machine / mint transaction here using M.candyMachineId + M.rpc
    toast('Mint transaction — coming with the candy machine wiring.');
  });
  $('#qtyMinus').addEventListener('click', () => wallet && (mintTxt.textContent = `MINT ${qty} FREE`));
  $('#qtyPlus').addEventListener('click', () => wallet && (mintTxt.textContent = `MINT ${qty} FREE`));

  /* ── BG: floating pixels ────────────────────────────── */
  const pc = $('#bgPixels'), px = pc.getContext('2d');
  let W, H, pixels = [];
  function resize() {
    W = pc.width = cc.width = innerWidth; H = pc.height = cc.height = innerHeight;
    const n = Math.min(160, Math.floor(W * H / 9000));
    pixels = Array.from({ length: n }, () => newPix(true));
    buildChart();
  }
  function newPix(init) {
    const s = [4, 6, 8, 10, 14][Math.floor(Math.random() * 5)];
    return { x: Math.random() * W, y: init ? Math.random() * H : H + 20, s, v: .15 + Math.random() * .5, a: Math.random() * .5 + .1, w: Math.random() * 6.28, cream: Math.random() < .12 };
  }
  function drawPixels(t) {
    px.clearRect(0, 0, W, H);
    for (const p of pixels) {
      p.y -= p.v; p.w += .01;
      const dx = Math.sin(p.w + t / 1800) * 10;
      const flick = .6 + Math.sin(t / 300 + p.w * 4) * .4;
      px.globalAlpha = p.a * flick;
      px.fillStyle = p.cream ? '#f4f1dd' : '#4cf0a7';
      px.fillRect(Math.round(p.x + dx), Math.round(p.y), p.s, p.s);
      if (p.y < -20) Object.assign(p, newPix(false));
    }
    px.globalAlpha = 1;
  }

  /* ── BG: rising candle chart ────────────────────────── */
  const cc = $('#bgChart'), cx = cc.getContext('2d');
  let candles = [], chartT = 0;
  function buildChart() {
    candles = []; let price = H * .72;
    const cw = 14, n = Math.ceil(W / cw) + 4;
    for (let i = 0; i < n; i++) {
      const up = Math.random() < .62;
      const body = 6 + Math.random() * 40;
      const o = price, c = up ? price - body : price + body * .6;
      candles.push({ o, c, h: Math.min(o, c) - Math.random() * 18, l: Math.max(o, c) + Math.random() * 18, up });
      price = c; if (price < H * .25) price = H * .72; if (price > H * .9) price = H * .7;
    }
  }
  function drawChart(t) {
    cx.clearRect(0, 0, W, H);
    chartT += .25; const cw = 14, off = (chartT % cw);
    if (chartT > cw && Math.floor(chartT / cw) !== Math.floor((chartT - .25) / cw)) {
      candles.shift();
      const last = candles[candles.length - 1], up = Math.random() < .62, body = 6 + Math.random() * 40;
      let c = up ? last.c - body : last.c + body * .6; if (c < H * .25) c = H * .7; if (c > H * .9) c = H * .7;
      candles.push({ o: last.c, c, h: Math.min(last.c, c) - Math.random() * 18, l: Math.max(last.c, c) + Math.random() * 18, up });
    }
    cx.lineWidth = 1;
    candles.forEach((k, i) => {
      const x = i * cw - off;
      const col = k.up ? 'rgba(76,240,167,' : 'rgba(255,90,120,';
      cx.strokeStyle = col + '.22)'; cx.fillStyle = col + (k.up ? '.16)' : '.1)');
      cx.beginPath(); cx.moveTo(x + cw / 2, k.h); cx.lineTo(x + cw / 2, k.l); cx.stroke();
      cx.fillRect(x + 3, Math.min(k.o, k.c), cw - 6, Math.max(2, Math.abs(k.o - k.c)));
    });
  }

  addEventListener('resize', resize); resize();
  let last = 0;
  (function loop(t) {
    if (!reduced && document.visibilityState === 'visible' && t - last > 16) {
      last = t; drawPixels(t); drawChart(t);
    }
    requestAnimationFrame(loop);
  })(0);

  /* ── GSAP extras (optional, guarded) ────────────────── */
  if (window.gsap && window.ScrollTrigger && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.cult__bg span', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: '.cult', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.to('.marquee__track', { x: '-=40', ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  }
})();
