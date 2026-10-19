/* ═══════════════════════════════════════════════════════════
   MINTED MILLIONAIRES — app.js
   ═══════════════════════════════════════════════════════════ */
(() => {
  const C = window.MM_CONFIG || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = n => String(n).padStart(2, '0');
  const short = w => w ? `${w.slice(0, 4)}…${w.slice(-4)}` : '';

  /* ── config → DOM ───────────────────────────────────── */
  const caText = C.CA || 'xxxxxxxxxxxxxxxxxxxxxxx';
  const caIsPlaceholder = /^x+$/i.test(caText);
  $('#caValue').textContent = caText;
  $$('[data-ca]').forEach(el => el.textContent = caText);
  $$('[data-x-link]').forEach(a => a.href = C.X_URL || '#');

  /* ── loader ─────────────────────────────────────────── */
  const loader = $('#loader'), loaderBar = $('#loaderBar'), loaderTxt = $('#loaderTxt');
  const msgs = ['MINTING…', 'LIGHTING THE FLAME…', 'OPENING THE VAULT…', 'STILL HERE.'];
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
    $$('.hero .reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), 120 + i * 110));
    const g = $$('.glitch');
    g.forEach((el, i) => setTimeout(() => el.classList.add('go'), 200 + i * 150));
    setInterval(() => { const el = g[Math.floor(Math.random() * g.length)]; el.classList.remove('go'); void el.offsetWidth; el.classList.add('go'); }, 4200);
    countUp();
  }

  /* ── nav / progress / active link ───────────────────── */
  const nav = $('#nav'), navLinks = $('#navLinks'), progress = $('#progress span');
  const sections = ['prophecy', 'cult', 'vault', 'ways', 'path'].map(id => document.getElementById(id));
  addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 30);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
    let cur = null;
    sections.forEach(s => { if (s && s.getBoundingClientRect().top < innerHeight * .45) cur = s.id; });
    $$('a', navLinks).forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
    const y = scrollY;
    const art = $('.hero__art'); if (art && y < innerHeight) art.style.transform = `translateY(${y * .18}px)`;
    const copy = $('.hero__copy'); if (copy && y < innerHeight) copy.style.transform = `translateY(${y * .08}px)`;
  }, { passive: true });
  $('#burger').addEventListener('click', () => navLinks.classList.toggle('open'));
  $$('a', navLinks).forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

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
  function toast(msg, err = false) {
    toastEl.textContent = msg; toastEl.classList.toggle('err', err); toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), 3200);
  }

  /* ── count up ───────────────────────────────────────── */
  function countUp() {
    $$('[data-count]').forEach(el => {
      const end = +el.dataset.count, t0 = performance.now(), dur = 1400;
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
      if (en.target.classList.contains('prophecy__stage')) { runTerminal(); }
      if (en.target.id === 'vaultGrid') $$('.nft').forEach((t, i) => setTimeout(() => t.classList.add('in'), i * 45));
      if (en.target.classList.contains('tl')) updateTimeline();
      io.unobserve(en.target);
    });
  }, { threshold: 0.15 });
  $$('.reveal:not(.hero .reveal)').forEach(el => io.observe(el));

  function updateTimeline() {
    const done = $$('.tl.in').length, total = $$('.tl').length;
    $('#timelineFill').style.height = (done / total * 100) + '%';
  }

  /* ── terminal typewriter + tweet lines ──────────────── */
  const tweetLines = [
    'millionaires will be minted via referrals.',
    'millionaires will be minted via memecoins.',
    'millionaires will be minted via creator fees.',
    'millionaires will be minted via holder rewards.',
    'millionaires will be minted via callout rewards.',
  ];
  let terminalRan = false;
  async function runTerminal() {
    if (terminalRan) return; terminalRan = true;
    const body = $('#terminalBody');
    const sleep = ms => new Promise(r => setTimeout(r, reduced ? 0 : ms));
    const addLine = (cls = '') => { const d = document.createElement('div'); d.className = 'terminal__line ' + cls; body.appendChild(d); return d; };
    await sleep(900);
    const sig = addLine('terminal__line--ok'); sig.textContent = '▸ signal acquired — @a1lon9 — 22:58 UTC';
    await sleep(600);
    const domLines = $$('[data-line]');
    for (let i = 0; i < tweetLines.length; i++) {
      const l = addLine('terminal__line--sig');
      const cur = document.createElement('span'); cur.className = 'terminal__cursor';
      l.appendChild(cur);
      const txt = tweetLines[i]; const [head, tail] = txt.split(' via ');
      let out = '';
      for (const ch of txt) {
        out += ch;
        const idx = out.indexOf(' via ');
        l.innerHTML = idx >= 0 ? `${out.slice(0, idx + 5)}<b>${out.slice(idx + 5)}</b>` : out;
        l.appendChild(cur);
        await sleep(18 + Math.random() * 22);
      }
      cur.remove();
      domLines[i]?.classList.add('in');
      await sleep(260);
    }
    await sleep(500);
    const end = addLine('terminal__line--ok'); end.textContent = '▸ 5 lines. 0 images. 1 ghost caught fire.';
    const c = addLine(); c.innerHTML = '<i>$</i> <span class="terminal__cursor"></span>';
  }

  /* ── 3D ring carousel ───────────────────────────────── */
  const ring = $('#ring'), N = 12, R = 330;
  const NFTS = (C.NFTS || []).slice();
  for (let i = 0; i < N; i++) {
    const n = NFTS[i % NFTS.length] || { id: i + 1, hue: 0, image: 'assets/mm.jpg' };
    const t = document.createElement('div'); t.className = 'ring__tile';
    t.style.transform = `rotateY(${i * 360 / N}deg) translateZ(${R}px)`;
    t.innerHTML = `<img src="${n.image}" alt="Ghost #${pad(n.id)}" style="filter:hue-rotate(${n.hue}deg)"><span>#${pad(n.id)}</span>`;
    ring.appendChild(t);
  }

  /* ── VAULT: 12 ghosts, holders only, one each ───────── */
  const CL = Object.assign({ DEV_MODE: true, MIN_HOLD: 1, RPC: 'https://api.mainnet-beta.solana.com', ENDPOINT: '' }, C.CLAIM || {});
  const LS_KEY = 'mm_claims_v1';
  const localClaims = (() => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch (_) { return {}; } })();
  NFTS.forEach(n => { if (!n.claimed && localClaims[n.id]) n.claimed = localClaims[n.id]; });

  const grid = $('#vaultGrid');
  const state = { wallet: null, provider: null, balance: null, holder: false, selected: null, busy: false };

  function renderGrid() {
    grid.innerHTML = '';
    NFTS.forEach(n => {
      const el = document.createElement('article');
      const mine = n.claimed && state.wallet && n.claimed === state.wallet;
      el.className = 'nft' + (n.claimed ? ' claimed' : '') + (mine ? ' mine' : '') + (state.selected === n.id ? ' selected' : '');
      el.dataset.id = n.id;
      el.style.setProperty('--hue', n.hue + 'deg');
      el.innerHTML = `
        <div class="nft__img"><img src="${n.image}" alt="Ghost #${pad(n.id)} — ${n.name}" draggable="false"><div class="nft__glare"></div>
          ${n.claimed ? `<div class="nft__stamp">${mine ? 'YOURS' : 'TAKEN'}</div>` : ''}</div>
        <div class="nft__meta">
          <span class="nft__id">GHOST #${pad(n.id)}</span>
          <span class="nft__name">${n.name}</span>
          ${n.claimed ? `<span class="nft__owner">${mine ? 'claimed by you' : 'held by ' + short(n.claimed)}</span>` : `<span class="nft__status">${state.selected === n.id ? 'SELECTED' : 'AVAILABLE'}</span>`}
        </div>`;
      if (!n.claimed) {
        el.addEventListener('click', () => select(n.id));
        tilt(el, null, 10);
      }
      grid.appendChild(el);
    });
    if (grid.classList.contains('in') || $$('.nft.in').length) $$('.nft').forEach(t => t.classList.add('in'));
    updatePanel();
  }

  function select(id) {
    if (state.busy) return;
    state.selected = state.selected === id ? null : id;
    $$('.nft').forEach(el => {
      const on = +el.dataset.id === state.selected;
      el.classList.toggle('selected', on);
      const s = $('.nft__status', el); if (s) s.textContent = on ? 'SELECTED' : 'AVAILABLE';
    });
    updatePanel();
    if (state.selected) stepTo(state.holder ? 4 : (state.wallet ? 2 : 1));
  }

  const left = () => NFTS.filter(n => !n.claimed).length;
  const claimedByMe = () => NFTS.find(n => n.claimed && n.claimed === state.wallet);

  function updatePanel() {
    const n = NFTS.find(x => x.id === state.selected);
    const pv = $('#claimPreview');
    if (n) pv.innerHTML = `<img src="${n.image}" alt="" style="filter:hue-rotate(${n.hue}deg)"><span class="claim__tag">GHOST #${pad(n.id)}</span>`;
    else pv.innerHTML = `<div class="claim__empty"><img src="assets/mm.jpg" alt="" /><span>PICK A GHOST</span></div>`;
    $('#claimName').textContent = n ? `#${pad(n.id)} ${n.name}` : '—';
    const l = left();
    $('#claimLeft').textContent = l; $('#heroLeft').textContent = l; const ct = $('#claimTotal'); if (ct) ct.textContent = NFTS.length;
    $('#claimBar').style.width = ((NFTS.length - l) / NFTS.length * 100) + '%';
    $('#claimWallet').textContent = state.wallet ? short(state.wallet) : 'not connected';
    $('#claimHold').textContent = state.balance == null ? '—' : state.balance.toLocaleString('en-US', { maximumFractionDigits: 2 });

    const btn = $('#claimBtn'), txt = $('#claimBtnTxt'), note = $('#claimNote');
    btn.disabled = false;
    const mine = claimedByMe();
    if (!state.wallet) { txt.textContent = 'CONNECT WALLET'; note.textContent = 'You only sign a message. We never ask for keys or approvals.'; }
    else if (mine) { txt.textContent = `GHOST #${pad(mine.id)} IS YOURS`; btn.disabled = true; note.textContent = 'One ghost per holder. Set it as your PFP and show up.'; }
    else if (!state.holder) { txt.textContent = 'NOT A HOLDER YET'; btn.disabled = true; note.textContent = `Hold at least ${CL.MIN_HOLD} $MM in this wallet, then reconnect.`; }
    else if (!n) { txt.textContent = 'PICK A GHOST'; btn.disabled = true; note.textContent = 'Choose any ghost that is still free.'; }
    else if (l === 0) { txt.textContent = 'VAULT EMPTY'; btn.disabled = true; note.textContent = 'All twelve ghosts are taken. More get drawn in Phase 3.'; }
    else { txt.textContent = `CLAIM GHOST #${pad(n.id)}`; note.textContent = CL.ENDPOINT ? 'Sign the message in your wallet to claim.' : 'Demo mode: the claim is recorded in this browser until the backend is wired.'; }
  }

  function stepTo(k) {
    $$('.gate__step').forEach(s => {
      const i = +s.dataset.step;
      s.classList.toggle('done', i < k); s.classList.toggle('on', i === k);
    });
  }
  stepTo(1);
  $('#gateHoldTxt').textContent = CL.DEV_MODE ? 'balance check: dev mode' : `min ${CL.MIN_HOLD} $MM · checked on-chain`;

  function getProvider() {
    if (window.phantom?.solana?.isPhantom) return window.phantom.solana;
    if (window.solflare?.isSolflare) return window.solflare;
    if (window.backpack?.solana) return window.backpack.solana;
    if (window.solana) return window.solana;
    return null;
  }

  async function tokenBalance(owner) {
    const body = { jsonrpc: '2.0', id: 1, method: 'getTokenAccountsByOwner', params: [owner, { mint: caText }, { encoding: 'jsonParsed' }] };
    const r = await fetch(CL.RPC, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    const j = await r.json();
    if (j.error) throw new Error(j.error.message || 'rpc error');
    return (j.result?.value || []).reduce((s, a) => s + (a.account?.data?.parsed?.info?.tokenAmount?.uiAmount || 0), 0);
  }

  async function connect() {
    const prov = getProvider();
    if (!prov) { toast('No Solana wallet found. Install Phantom.', true); window.open('https://phantom.app/', '_blank', 'noopener'); return; }
    try {
      state.busy = true; $('#claimBtnTxt').textContent = 'CONNECTING…';
      const res = await prov.connect();
      state.provider = prov;
      state.wallet = (res?.publicKey || prov.publicKey).toString();
      stepTo(2); $('#claimBtnTxt').textContent = 'CHECKING $MM…';
      if (CL.DEV_MODE || caIsPlaceholder) {
        state.balance = null; state.holder = true;
        toast('Connected. Holder check skipped (dev mode).');
      } else {
        try {
          state.balance = await tokenBalance(state.wallet);
          state.holder = state.balance >= CL.MIN_HOLD;
          toast(state.holder ? 'Holder verified. Pick your ghost.' : 'This wallet holds no $MM yet.', !state.holder);
        } catch (e) {
          state.balance = null; state.holder = false;
          toast('Could not read balance from RPC. Try again.', true);
        }
      }
      stepTo(state.holder ? (state.selected ? 4 : 3) : 2);
      prov.on?.('disconnect', () => { state.wallet = null; state.holder = false; state.balance = null; stepTo(1); renderGrid(); });
    } catch (e) {
      toast('Connection cancelled.', true);
    } finally { state.busy = false; renderGrid(); }
  }

  async function claim() {
    const n = NFTS.find(x => x.id === state.selected);
    if (!n || n.claimed || !state.holder || !state.wallet) return;
    state.busy = true; $('#claimBtn').disabled = true; $('#claimBtnTxt').textContent = 'SIGN IN WALLET…';
    try {
      const message = `Minted Millionaires — claim Ghost #${pad(n.id)} "${n.name}"\nwallet: ${state.wallet}\nts: ${Date.now()}`;
      let signature = null;
      if (state.provider?.signMessage) {
        const sig = await state.provider.signMessage(new TextEncoder().encode(message), 'utf8');
        const bytes = sig?.signature || sig;
        signature = btoa(String.fromCharCode(...new Uint8Array(bytes)));
      }
      if (CL.ENDPOINT) {
        $('#claimBtnTxt').textContent = 'CLAIMING…';
        const r = await fetch(CL.ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ wallet: state.wallet, nftId: n.id, message, signature }) });
        if (!r.ok) throw new Error((await r.text()) || 'claim failed');
      } else {
        await new Promise(r => setTimeout(r, 900));
        localClaims[n.id] = state.wallet;
        try { localStorage.setItem(LS_KEY, JSON.stringify(localClaims)); } catch (_) {}
      }
      n.claimed = state.wallet; state.selected = null;
      stepTo(5); burst();
      toast(`Ghost #${pad(n.id)} is yours. Set it as your PFP. 👻🔥`);
    } catch (e) {
      toast(e?.message?.includes('rejected') ? 'Signature rejected.' : 'Claim failed. Try again.', true);
    } finally { state.busy = false; renderGrid(); }
  }

  $('#claimBtn').addEventListener('click', () => {
    if (state.busy) return;
    if (!state.wallet) return connect();
    if (state.holder && state.selected) return claim();
  });

  function burst() {
    if (reduced) return;
    const host = $('#claimPreview'); const r = host.getBoundingClientRect();
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('span');
      const size = 6 + Math.random() * 8;
      Object.assign(s.style, { position: 'fixed', left: r.left + r.width / 2 + 'px', top: r.top + r.height / 2 + 'px', width: size + 'px', height: size + 'px', background: Math.random() < .3 ? '#f4f1dd' : '#4cf0a7', zIndex: 70, pointerEvents: 'none', boxShadow: '0 0 10px #4cf0a7' });
      document.body.appendChild(s);
      const a = Math.random() * 6.28, d = 120 + Math.random() * 220;
      s.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d + 80}px) scale(0)`, opacity: 0 }], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.22,1,.36,1)' }).onfinish = () => s.remove();
    }
  }

  renderGrid();
  io.observe(grid);

  /* ── cursor glow + ring + magnetic buttons ──────────── */
  const glow = $('#cursorGlow'), cring = $('#cursorRing');
  let mx = innerWidth / 2, my = innerHeight / 2, gx = mx, gy = my;
  addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY;
    cring.style.transform = `translate(${mx}px, ${my}px)`;
    cring.classList.toggle('hot', !!e.target.closest('a, button, .nft, .ring__tile'));
  }, { passive: true });
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

  /* ── 3D tilt ────────────────────────────────────────── */
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

  /* ── BG: floating pixels ────────────────────────────── */
  const pc = $('#bgPixels'), px = pc.getContext('2d');
  const cc = $('#bgChart'), cx = cc.getContext('2d');
  let W, H, pixels = [], candles = [], chartT = 0;
  function resize() {
    W = pc.width = cc.width = innerWidth; H = pc.height = cc.height = innerHeight;
    pixels = Array.from({ length: Math.min(160, Math.floor(W * H / 9000)) }, () => newPix(true));
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
      const dx = Math.sin(p.w + t / 1800) * 10, flick = .6 + Math.sin(t / 300 + p.w * 4) * .4;
      px.globalAlpha = p.a * flick; px.fillStyle = p.cream ? '#f4f1dd' : '#4cf0a7';
      px.fillRect(Math.round(p.x + dx), Math.round(p.y), p.s, p.s);
      if (p.y < -20) Object.assign(p, newPix(false));
    }
    px.globalAlpha = 1;
  }
  function mkCandle(prev) {
    const up = Math.random() < .62, body = 6 + Math.random() * 40;
    let c = up ? prev - body : prev + body * .6; if (c < H * .25) c = H * .7; if (c > H * .9) c = H * .7;
    return { o: prev, c, h: Math.min(prev, c) - Math.random() * 18, l: Math.max(prev, c) + Math.random() * 18, up };
  }
  function buildChart() {
    candles = []; let price = H * .72; const cw = 14, n = Math.ceil(W / cw) + 4;
    for (let i = 0; i < n; i++) { const k = mkCandle(price); candles.push(k); price = k.c; }
  }
  function drawChart() {
    cx.clearRect(0, 0, W, H);
    chartT += .25; const cw = 14, off = chartT % cw;
    if (Math.floor(chartT / cw) !== Math.floor((chartT - .25) / cw)) { candles.shift(); candles.push(mkCandle(candles[candles.length - 1].c)); }
    cx.lineWidth = 1;
    candles.forEach((k, i) => {
      const x = i * cw - off, col = k.up ? 'rgba(76,240,167,' : 'rgba(255,90,120,';
      cx.strokeStyle = col + '.22)'; cx.fillStyle = col + (k.up ? '.16)' : '.1)');
      cx.beginPath(); cx.moveTo(x + cw / 2, k.h); cx.lineTo(x + cw / 2, k.l); cx.stroke();
      cx.fillRect(x + 3, Math.min(k.o, k.c), cw - 6, Math.max(2, Math.abs(k.o - k.c)));
    });
  }
  addEventListener('resize', resize); resize();
  let last = 0;
  (function loop(t) {
    if (!reduced && document.visibilityState === 'visible' && t - last > 16) { last = t; drawPixels(t); drawChart(); }
    requestAnimationFrame(loop);
  })(0);

  /* ── GSAP: stacking cards + parallax words ──────────── */
  if (window.gsap && window.ScrollTrigger && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    const cards = gsap.utils.toArray('.scard');
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, {
        scale: 1 - (cards.length - 1 - i) * .04, filter: 'brightness(.6)', ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top+=110', scrub: true },
      });
    });
    gsap.utils.toArray('.bigword').forEach(w => {
      gsap.to(w, { yPercent: 40, ease: 'none', scrollTrigger: { trigger: w.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    gsap.to('.cult__bg span', { yPercent: 30, ease: 'none', scrollTrigger: { trigger: '.cult', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.utils.toArray('.chapter__num').forEach(n => {
      gsap.from(n, { xPercent: -20, opacity: 0, ease: 'none', scrollTrigger: { trigger: n.parentElement, start: 'top 90%', end: 'top 40%', scrub: true } });
    });
  }
})();
