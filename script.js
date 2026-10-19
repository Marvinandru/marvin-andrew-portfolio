/**
 * Marvin Andrew O. - Executive Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initExperienceFilter();
  initContactForm();
  initClipboardHandlers();
  initPrintCv();
  initScrollSpy();
});

/**
 * Dark / Light Theme Toggle with LocalStorage Persistence
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('marvin-theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('marvin-theme', newTheme);
  });
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on any nav link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on click outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Interactive Experience Timeline Filter
 */
function initExperienceFilter() {
  const filterButtons = document.querySelectorAll('#experienceFilter .filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (!filterButtons.length || !timelineItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      timelineItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * Copy to Clipboard Handlers
 */
function initClipboardHandlers() {
  const copyLinkedInBtn = document.getElementById('copyLinkedInBtn');
  if (!copyLinkedInBtn) return;

  copyLinkedInBtn.addEventListener('click', async () => {
    const linkedInUrl = 'https://linkedin.com/in/marvin-andrew-o';
    try {
      await navigator.clipboard.writeText(linkedInUrl);
      const originalTitle = copyLinkedInBtn.getAttribute('title') || 'Copy LinkedIn';
      copyLinkedInBtn.setAttribute('title', 'Copied to clipboard!');
      copyLinkedInBtn.style.background = 'var(--accent-emerald)';
      copyLinkedInBtn.style.color = '#ffffff';

      setTimeout(() => {
        copyLinkedInBtn.setAttribute('title', originalTitle);
        copyLinkedInBtn.style.background = '';
        copyLinkedInBtn.style.color = '';
      }, 2000);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  });
}

/**
 * Print / Save PDF Trigger
 */
function initPrintCv() {
  const printCvBtn = document.getElementById('printCvBtn');
  if (!printCvBtn) return;

  printCvBtn.addEventListener('click', () => {
    window.print();
  });
}

/**
 * Contact Form Submission with Mailto fallback
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusDiv = document.getElementById('formStatus');
  if (!form || !statusDiv) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const type = document.getElementById('inquiryType').value;
    const message = document.getElementById('messageContent').value;

    const subject = encodeURIComponent(`Executive Inquiry: ${type} - from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nOpportunity Type: ${type}\n\nMessage:\n${message}`);

    // Provide friendly confirmation
    statusDiv.className = 'form-status success';
    statusDiv.textContent = 'Opening your email client to dispatch this message directly to Marvin Andrew...';
    statusDiv.style.display = 'block';

    // Direct mailto
    setTimeout(() => {
      window.location.href = `mailto:marvinandrew.o@gmail.com?subject=${subject}&body=${body}`;
    }, 600);
  });
}

/**
 * Navbar blur and scrollspy
 */
function initScrollSpy() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}
