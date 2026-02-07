/* ═══════════════════════════════════════════════════
   Core Landing Page - JavaScript
   Slider, Accordion, Smooth Scroll, Animations
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ═══ DATA ═══
  const services = [
    { id:1, title:"Webs de Conversión", desc:"Sitios web diseñados para convertir visitantes en clientes. Velocidad, diseño premium y enfoque en resultados.", image:"images/core-web-conversion-turismo.png", pos:"right" },
    { id:2, title:"App de Pedidos y E-commerce", desc:"Plataformas de pedidos que se sienten como apps nativas. Experiencia fluida para tus clientes.", image:"images/core-app-pedidos-cafe.png", pos:"left" },
    { id:3, title:"Core Wallet Cards", desc:"Tarjetas de fidelización para Apple y Google Wallet. Moderniza la relación con tus clientes.", image:"images/core-wallet-card-barberia.png", pos:"right" },
    { id:4, title:"Sistema de Reservas Online", desc:"Gestión de citas y reservas integrada. Ideal para restaurantes, clínicas y consultores.", image:"images/core-reservas-restaurante.png", pos:"left" }
  ];

  // ═══ NAVBAR ═══
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    mobileToggle.innerHTML = isOpen
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  });

  // Smooth scroll with offset
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      mobileMenu.classList.remove('open');
      const href = a.getAttribute('href');
      if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      const target = document.querySelector(href);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ═══ SLIDER ═══
  const AUTO_INTERVAL = 10000;
  const RESUME_DELAY = 5000;
  const SWIPE_THRESHOLD = 50;

  let current = 0;
  let phase = 'visible'; // visible | exiting | entering
  let autoTimer = null;
  let resumeTimer = null;
  let isHovered = false;
  let progressKey = 0;

  const slideContent = document.getElementById('slideContent');
  const slideTitle = document.getElementById('slideTitle');
  const slideDesc = document.getElementById('slideDesc');
  const slideCta = document.getElementById('slideCta');
  const slideImg = document.getElementById('slideImg');
  const slideImgWrap = document.getElementById('slideImgWrap');
  const slideText = document.getElementById('slideText');
  const dotsContainer = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const sliderWrapper = document.getElementById('sliderWrapper');

  function renderSlide() {
    const s = services[current];
    slideTitle.textContent = s.title;
    slideDesc.textContent = s.desc;
    slideImg.src = s.image;
    slideImg.alt = s.title;

    // Layout direction
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      slideContent.classList.remove('reverse');
      slideContent.style.flexDirection = 'column';
    } else {
      slideContent.style.flexDirection = '';
      slideContent.classList.toggle('reverse', s.pos === 'left');
    }
  }

  function renderDots() {
    dotsContainer.innerHTML = '';
    services.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Ir al servicio ${i + 1}`);
      if (i === current) {
        dot.innerHTML = '<span class="dot-bg"></span><span class="dot-fill" id="dotFill"></span>';
      }
      dot.addEventListener('click', () => manualNav(i));
      dotsContainer.appendChild(dot);
    });
    startDotProgress();
  }

  function startDotProgress() {
    const fill = document.getElementById('dotFill');
    if (!fill) return;
    progressKey++;
    fill.style.animation = 'none';
    fill.offsetHeight; // reflow
    if (!isHovered && phase === 'visible') {
      fill.style.animation = `dotFill ${AUTO_INTERVAL}ms linear forwards`;
      fill.style.opacity = '1';
    } else {
      fill.style.width = '100%';
      fill.style.opacity = '0.5';
    }
  }

  function pauseDotProgress() {
    const fill = document.getElementById('dotFill');
    if (!fill) return;
    fill.style.animation = 'none';
    fill.style.width = '100%';
    fill.style.opacity = '0.5';
  }

  function doNavigate(newIndex) {
    if (phase !== 'visible') return;
    phase = 'exiting';
    slideContent.classList.add('exiting');
    slideContent.classList.remove('entering');

    setTimeout(() => {
      current = newIndex;
      renderSlide();
      slideContent.classList.remove('exiting');
      slideContent.classList.add('entering');
      phase = 'entering';
      renderDots();

      setTimeout(() => {
        slideContent.classList.remove('entering');
        phase = 'visible';
      }, 700);
    }, 300);
  }

  function clearTimers() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
  }

  function startAuto() {
    clearTimers();
    renderDots();
    autoTimer = setInterval(() => {
      if (phase === 'visible' && !isHovered) {
        doNavigate((current + 1) % services.length);
      }
    }, AUTO_INTERVAL);
  }

  function pauseAndResume() {
    clearTimers();
    pauseDotProgress();
    resumeTimer = setTimeout(() => {
      if (!isHovered) startAuto();
    }, RESUME_DELAY);
  }

  function manualNav(idx) {
    doNavigate(idx);
    pauseAndResume();
  }

  prevBtn.addEventListener('click', () => manualNav(current === 0 ? services.length - 1 : current - 1));
  nextBtn.addEventListener('click', () => manualNav(current === services.length - 1 ? 0 : current + 1));

  // Hover
  sliderWrapper.addEventListener('mouseenter', () => { isHovered = true; pauseDotProgress(); });
  sliderWrapper.addEventListener('mouseleave', () => { isHovered = false; if (!resumeTimer) startAuto(); });

  // Touch / Swipe
  let touchStartX = 0, touchStartY = 0, touchDelta = 0, isSwiping = false;
  sliderWrapper.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchDelta = 0;
    isSwiping = false;
    isHovered = true;
    pauseDotProgress();
  }, { passive: true });

  sliderWrapper.addEventListener('touchmove', e => {
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (!isSwiping && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      isSwiping = true;
    }
    if (isSwiping) {
      e.preventDefault();
      touchDelta = dx;
    }
  }, { passive: false });

  sliderWrapper.addEventListener('touchend', () => {
    isHovered = false;
    if (isSwiping && phase === 'visible') {
      if (touchDelta < -SWIPE_THRESHOLD) manualNav((current + 1) % services.length);
      else if (touchDelta > SWIPE_THRESHOLD) manualNav(current === 0 ? services.length - 1 : current - 1);
      else pauseAndResume();
    } else {
      pauseAndResume();
    }
    isSwiping = false;
    touchDelta = 0;
  });

  // Init slider
  renderSlide();
  startAuto();

  // ═══ FAQ ACCORDION ═══
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-content').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ═══ SCROLL REVEAL ═══
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el));

  // ═══ HERO PARALLAX ═══
  const heroParallax = document.getElementById('heroParallax');
  if (heroParallax) {
    window.addEventListener('scroll', () => {
      if (heroParallax.getBoundingClientRect().bottom > 0) {
        heroParallax.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    }, { passive: true });
  }

  // ═══ CONTACT FORM ═══
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name'), email = data.get('email'), message = data.get('message');
    if (!name || !email || !message) { alert('Por favor completa todos los campos'); return; }

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    // Simulate - replace with real endpoint
    setTimeout(() => {
      submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg> Enviado';
      form.reset();
      setTimeout(() => {
        submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg> Enviar consulta';
        submitBtn.disabled = false;
      }, 3000);
    }, 800);
  });

  // Handle window resize for slider layout
  window.addEventListener('resize', () => { renderSlide(); });

});
