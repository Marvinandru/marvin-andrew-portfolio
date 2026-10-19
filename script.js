/**
 * Marvin Andrew O. — Moonex Freelancer Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDownloadCv();
  initContactForm();
  initHeaderScroll();
  initServiceHover();
});

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
  const form = document.getElementById('moonexContactForm');
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

/**
 * Sticky Header elevation on scroll
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.backgroundColor = 'rgba(12, 13, 16, 0.95)';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
    } else {
      header.style.backgroundColor = 'rgba(12, 13, 16, 0.88)';
      header.style.boxShadow = 'none';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  });
}

/**
 * Interactive Services Accordion / Rows
 */
function initServiceHover() {
  const rows = document.querySelectorAll('.service-row');
  rows.forEach(row => {
    row.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
