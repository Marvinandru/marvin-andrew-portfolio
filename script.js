/**
 * Marvin Andrew O. — Executive Portfolio Interactive Scripts
 * Powered by GSAP & ScrollTrigger Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDownloadCv();
  initContactForm();
  initCareerFilter();
  initGsapAnimations();
});

/**
 * GSAP & ScrollTrigger Animation Orchestration
 */
function initGsapAnimations() {
  // Graceful fallback if GSAP CDN fails to load
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded. Running in standard CSS mode.');
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Header reveal
  gsap.from('#header', {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });

  // 2. Hero Section Entrance Sequence
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.hero-status-pill', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.1
    })
    .from('.hero-headline', {
      opacity: 0,
      y: 28,
      duration: 0.8
    }, '-=0.4')
    .from('.hero-subtext', {
      opacity: 0,
      y: 20,
      duration: 0.7
    }, '-=0.5')
    .from('.hero-cta-wrapper > *', {
      opacity: 0,
      y: 15,
      stagger: 0.1,
      duration: 0.6
    }, '-=0.4')
    .from('.hero-social-row', {
      opacity: 0,
      y: 15,
      duration: 0.6
    }, '-=0.3')
    .from('.gsap-hero-card', {
      opacity: 0,
      x: 35,
      scale: 0.96,
      duration: 0.9,
      ease: 'power2.out'
    }, '-=0.8');

  // Floating micro-parallax for hero card on mouse move
  const heroCard = document.querySelector('.portrait-card-frame');
  const heroVisualBlock = document.querySelector('.hero-visual-block');
  if (heroCard && heroVisualBlock) {
    heroVisualBlock.addEventListener('mousemove', (e) => {
      const rect = heroVisualBlock.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(heroCard, {
        rotationY: x * 6,
        rotationX: -y * 6,
        ease: 'power1.out',
        duration: 0.5
      });
    });

    heroVisualBlock.addEventListener('mouseleave', () => {
      gsap.to(heroCard, {
        rotationY: 0,
        rotationX: 0,
        ease: 'power2.out',
        duration: 0.7
      });
    });
  }

  // 3. ScrollTrigger Reveal for Section Headers & Narratives
  if (typeof ScrollTrigger !== 'undefined') {
    document.querySelectorAll('.gsap-reveal').forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // 4. Stagger Cards (Startups, Skills, Passions, Education)
    const cardSections = ['#startups', '#skills', '#passions', '#education'];
    cardSections.forEach(sectionId => {
      const section = document.querySelector(sectionId);
      if (section) {
        const cards = section.querySelectorAll('.gsap-card');
        if (cards.length) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 35,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out'
          });
        }
      }
    });

    // 5. Rectangular Career Cards Sequential Slide In
    const careerCards = document.querySelectorAll('.gsap-career-card');
    if (careerCards.length) {
      gsap.from(careerCards, {
        scrollTrigger: {
          trigger: '#careerList',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 28,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }

    // 6. Services Rows Reveal
    const serviceRows = document.querySelectorAll('.service-row');
    if (serviceRows.length) {
      gsap.from(serviceRows, {
        scrollTrigger: {
          trigger: '.services-accordion',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 25,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }
  }
}

/**
 * Rectangular Career Filter Tabs
 */
function initCareerFilter() {
  const filterBtns = document.querySelectorAll('#careerFilter .career-tab-btn');
  const cards = document.querySelectorAll('.career-rect-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.getAttribute('data-category');

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.classList.remove('hidden');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, 
              { opacity: 0, y: 15 }, 
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
          }
        } else {
          card.classList.add('hidden');
        }
      });

      // Refresh ScrollTrigger after DOM changes
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  });
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });
}

/**
 * Download / Print CV Trigger
 */
function initDownloadCv() {
  const downloadBtn = document.getElementById('downloadCvBtn');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', () => {
    window.print();
  });
}

/**
 * Contact Form Handler with Direct Mailto Dispatch
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const topic = document.getElementById('topicInput').value;
    const body = document.getElementById('bodyInput').value.trim();

    const subject = encodeURIComponent(`Executive Inquiry: ${topic} — from ${name}`);
    const emailBody = encodeURIComponent(`Sender Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${body}`);

    feedback.className = 'form-feedback success';
    feedback.textContent = 'Launching your email client to deliver your message directly to Marvin Andrew...';
    feedback.style.display = 'block';

    setTimeout(() => {
      window.location.href = `mailto:marvinandrew.o@gmail.com?subject=${subject}&body=${emailBody}`;
    }, 500);
  });
}
