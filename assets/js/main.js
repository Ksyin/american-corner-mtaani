(function(){
  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if(!id || id === '#') return;
      const el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});

      // Close mobile menu after clicking a link
      const nav = document.querySelector('.nav');
      if(nav && nav.classList.contains('open')){
        closeNav(nav);
      }
    });
  });

  // Mobile menu toggle
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const linksWrap = document.getElementById('site-nav');

  function setExpanded(isOpen){
    if(!toggle) return;
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }

  function openNav(navEl){
    navEl.classList.add('open');
    setExpanded(true);
  }

  function closeNav(navEl){
    navEl.classList.remove('open');
    setExpanded(false);
  }

  if(nav && toggle && linksWrap){
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('open');
      if(isOpen) closeNav(nav);
      else openNav(nav);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      const isOpen = nav.classList.contains('open');
      if(!isOpen) return;
      const target = e.target;
      if(nav.contains(target)) return;
      closeNav(nav);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if(e.key !== 'Escape') return;
      if(nav.classList.contains('open')) closeNav(nav);
    });

    // Ensure menu doesn't stay open when switching to desktop width
    window.addEventListener('resize', () => {
      if(window.innerWidth > 860 && nav.classList.contains('open')){
        closeNav(nav);
      }
    });
  }

  // Auto-fill amount based on ticket type (if present)
  const ticket = document.querySelector('[data-ticket]');
  const amount = document.querySelector('[data-amount]');
  if(ticket && amount){
    const map = {
      "Early Bird (Before March 31st)": "KSh 1,200",
      "Single Ticket": "KSh 1,500",
      "Corporate Package (Group of 4)": "KSh 5,000"
    };
    const set = () => {
      const v = ticket.value;
      amount.value = map[v] || "";
    };
    ticket.addEventListener('change', set);
    set();
  }
})();