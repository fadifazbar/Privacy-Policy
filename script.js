!-- FILE: script.js -->
// Theme handling, reveal on scroll, accordion, copy email, scroll-to-top, auto-versioning
(function(){
  const body = document.body;
  const loader = document.getElementById('loader');
  const toTop = document.getElementById('toTop');
  const emailLink = document.getElementById('emailLink');
  const copyBtn = document.getElementById('copyEmail');
  const lastUpdatedEl = document.getElementById('lastUpdated');
  const versionEl = document.getElementById('version');
  const policyVersion = document.getElementById('policyVersion');
  const yearEl = document.getElementById('year');

  // --- Auto-year
  yearEl.textContent = new Date().getFullYear();

  // --- Auto last-updated from server/time (keeps input if present)
  // If you want to set dynamically from build-time, replace below. We'll keep text if already exists.
  try{
    const existing = lastUpdatedEl.textContent.trim();
    if(!existing) lastUpdatedEl.textContent = new Date().toLocaleDateString();
  }catch(e){}

  // policy version
  (function setVersion(){
    const v = versionEl.textContent.trim() || '1.0';
    policyVersion.textContent = 'v' + v;
  })();

  // --- Theme: respects saved or prefers-color-scheme
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(localStorage.getItem('theme')){
    body.classList.toggle('dark', localStorage.getItem('theme') === 'dark');
  } else {
    body.classList.toggle('dark', prefersDark);
  }

  // Theme toggle handler (simple morph via class)
  themeToggle.addEventListener('click', ()=>{
    const nowDark = body.classList.toggle('dark');
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    // tiny icon feedback
    themeToggle.classList.add('pulse');
    setTimeout(()=> themeToggle.classList.remove('pulse'), 420);
  });

  // --- Loader fade
  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      if(loader) loader.style.opacity = '0';
      setTimeout(()=> loader && loader.remove(), 520);
      // reveal on load
      document.querySelectorAll('.reveal').forEach((el,i)=> setTimeout(()=> el.classList.add('visible'), 80*i));
    }, 600);
  });

  // --- IntersectionObserver for reveal on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  },{ threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // --- Accordion
  document.querySelectorAll('.acc-toggle').forEach(btn=>{
    btn.setAttribute('aria-expanded', 'false');
    const panel = btn.nextElementSibling;
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if(!expanded){
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = null;
      }
    });
  });

  // --- Copy email
  copyBtn.addEventListener('click', async ()=>{
    const email = emailLink.getAttribute('href').replace('mailto:','');
    try{
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = 'Copied!';
      setTimeout(()=> copyBtn.textContent = 'Copy', 1800);
    }catch(e){
      // fallback
      const range = document.createRange(); range.selectNode(emailLink);
      window.getSelection().removeAllRanges(); window.getSelection().addRange(range);
      try{ document.execCommand('copy'); copyBtn.textContent = 'Copied!'; setTimeout(()=> copyBtn.textContent = 'Copy', 1800); }catch(_){}
      window.getSelection().removeAllRanges();
    }
  });

  // --- Scroll to top
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 320) toTop.style.display = 'block'; else toTop.style.display = 'none';
  });
  toTop.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));

  // --- Smooth anchor link behavior
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({ behavior:'smooth', block:'center' });
      }
    });
  });

  // --- Tiny accessibility helpers: focus outlines for keyboard
  document.body.addEventListener('keydown', ()=> document.documentElement.classList.add('keyboard'), { once:true });

})();


/* EOF script.js */
