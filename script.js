// Full "glow-up" interactivity & GSAP micro animations
// Keep this file deferred (script tag with defer).

// Safety: wrap in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // -- Helpers
  const q = (sel, ctx=document) => ctx.querySelector(sel);
  const qAll = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // -- GSAP register
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ---------- NAV TOGGLE ----------
  const navToggle = q('#nav-toggle');
  const navLinks = q('#nav-links');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  // Smooth scroll for internal links
  qAll('.nav-links a, .btn[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        if (navLinks.classList.contains('open')) { navLinks.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }
      }
    });
  });

  // ---------- MAGNETIC BUTTON (cursor attracting) ----------
  const magnets = qAll('.magnetic');
  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const mx = (e.clientX - rect.left) - rect.width / 2;
      const my = (e.clientY - rect.top) - rect.height / 2;
      gsap.to(btn, { x: mx * 0.12, y: my * 0.12, scale: 1.02, duration: 0.25, ease: "power3.out" });
    });
    btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }));
  });

  // ---------- HERO MICRO ANIMATIONS ----------
  if (window.gsap) {
    gsap.from('.logo-title', { opacity:0, y:18, duration:0.9, ease:'power3.out' });
    gsap.from('.lead', { opacity:0, y:12, duration:0.9, delay:0.12, ease:'power3.out' });
    gsap.from('.cta-row .btn', { opacity:0, y:12, stagger:0.08, delay:0.22, duration:0.8 });
    gsap.to('.floating-card', { y:"-=8", rotation:6, yoyo:true, repeat:-1, duration:3, ease:"sine.inOut", stagger:0.15, delay:0.3 });
  }

  // ---------- TAB SYSTEM + UNDERLINE ANIMATION ----------
  const tabs = qAll('.tab');
  const underline = q('.tab-underline');
  function updateUnderline(activeBtn){
    const rect = activeBtn.getBoundingClientRect();
    const parentRect = activeBtn.parentElement.getBoundingClientRect();
    const offset = rect.left - parentRect.left + (rect.width - 120)/2;
    if (underline) gsap.to(underline,{x:offset, duration:0.35, ease:"power3.out"});
  }
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      // panels
      const id = btn.dataset.tab;
      qAll('.panel').forEach(p => {
        if (p.dataset.panel === id) { p.classList.add('active'); p.removeAttribute('aria-hidden'); } 
        else { p.classList.remove('active'); p.setAttribute('aria-hidden','true'); }
      });
      updateUnderline(btn);
    });
  });
  // init underline on load
  const firstTab = document.querySelector('.tab.active') || tabs[0];
  if (firstTab) setTimeout(()=>updateUnderline(firstTab), 80);

  // ---------- SWIPEABLE GALLERY (light, pointer events) ----------
  const gallery = q('#gallery');
  if (gallery) {
    let isDown=false, startX=0, scrollLeft=0;
    gallery.addEventListener('pointerdown',(e)=>{ isDown=true; gallery.setPointerCapture(e.pointerId); startX=e.pageX; scrollLeft=gallery.scrollLeft; gallery.classList.add('dragging'); });
    gallery.addEventListener('pointermove',(e)=>{ if(!isDown) return; const x = e.pageX; const walk = (x - startX) * 1; gallery.scrollLeft = scrollLeft - walk; });
    gallery.addEventListener('pointerup',(e)=>{ isDown=false; gallery.releasePointerCapture(e.pointerId); gallery.classList.remove('dragging'); });
    gallery.addEventListener('pointerleave',()=>{ isDown=false; gallery.classList.remove('dragging'); });
  }

  // ---------- ACCORDION ----------
  qAll('.acc-head').forEach(head => {
    head.addEventListener('click', () => {
      const item = head.parentElement;
      const open = item.classList.contains('open');
      qAll('.acc-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
      head.setAttribute('aria-expanded', String(!open));
    });
  });

  // ---------- COUNTERS (observer) ----------
  const numEls = qAll('[data-target]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.getAttribute('data-target') || 0;
      let current = 0;
      const duration = 1400;
      const step = Math.max(1, Math.floor(target / (duration / 16)));
      const raf = () => {
        current += step;
        if (current < target) {
          el.textContent = current.toLocaleString();
          requestAnimationFrame(raf);
        } else {
          el.textContent = target.toLocaleString();
          // pulse neon
          gsap.fromTo(el,{scale:1},{scale:1.06,duration:0.12,yoyo:true,repeat:1,ease:"power1.inOut"});
        }
      };
      raf();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  numEls.forEach(n => counterObserver.observe(n));

  // ---------- MEMBER BREAKDOWN TOGGLE ----------
  const memberToggle = q('#member-toggle');
  const membersPanel = q('#members-panel');
  const memberCountEl = q('#member-count');
  function setMembersPanel(open){
    if (!membersPanel || !memberToggle) return;
    membersPanel.setAttribute('aria-hidden', String(!open));
    memberToggle.setAttribute('aria-pressed', String(open));
    // animate panel
    if (open) gsap.fromTo(membersPanel, {y:-8, opacity:0},{y:0,opacity:1,duration:.35,ease:'power3.out'});
  }
  memberToggle?.addEventListener('click', () => {
    const isOpen = membersPanel.getAttribute('aria-hidden') === 'false';
    setMembersPanel(!isOpen);
  });
  memberToggle?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); memberToggle.click(); } });

  // ---------- TAB HOVER: small preview (optional) ----------
  qAll('.tab').forEach(t => {
    t.addEventListener('mouseenter', () => gsap.to(t, { scale:1.03, duration:.18 }));
    t.addEventListener('mouseleave', () => gsap.to(t, { scale:1, duration:.18 }));
  });

  // ---------- make nav links highlight on scroll ----------
  const sections = qAll('main section[id]');
  function onScrollHighlight(){
    const y = window.scrollY + 140;
    let active = sections[0];
    sections.forEach(sec => { if (sec.offsetTop <= y) active = sec; });
    qAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + active.id));
  }
  window.addEventListener('scroll', onScrollHighlight);
  onScrollHighlight();

  // ---------- small enter animations for elements with data-animate ----------
  qAll('[data-animate]').forEach((el, i) => {
    gsap.from(el, { y: 18, opacity: 0, duration: 0.85, delay: 0.12 * i, ease: 'power3.out', scrollTrigger: { trigger: el, start: "top 85%" } });
  });

  // ---------- floating logo click micro interaction ----------
  const fLogo = q('.floating-logo');
  fLogo?.addEventListener('click', () => {
    gsap.fromTo(fLogo, { scale: 1 }, { scale: 1.12, duration: 0.16, yoyo: true, repeat: 1, ease: "power1.inOut" });
    // small ripple (visual)
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    fLogo.appendChild(ripple);
    gsap.fromTo(ripple, { opacity: 0.6, scale: 0 }, { opacity: 0, scale: 3, duration: 0.7, ease: "power1.out", onComplete: () => ripple.remove() });
  });

  // ---------- keyboard accessibility: Escape closes members panel & mobile nav ----------
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (membersPanel && membersPanel.getAttribute('aria-hidden') === 'false') setMembersPanel(false);
      if (navLinks.classList.contains('open')) { navLinks.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }
    }
  });

  // ---------- Finish: expose small API for dynamic updates ----------
  window.GVRE = {
    openMembersPanel: () => setMembersPanel(true),
    closeMembersPanel: () => setMembersPanel(false),
    setMemberCount: (n) => { if (memberCountEl) memberCountEl.textContent = Number(n).toLocaleString(); }
  };

  // init: ensure some counters inside members panel are observed when opening
  // (if panel already visible on load)
  if (membersPanel && membersPanel.getAttribute('aria-hidden') === 'false') {
    qAll('.mnum').forEach(el => counterObserver.observe(el));
  }
});
