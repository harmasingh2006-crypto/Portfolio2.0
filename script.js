/* ===================================================
   HARMAN SINGH PORTFOLIO — JAVASCRIPT
   =================================================== */

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveLink();
});

/* ---- Mobile hamburger ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---- Active nav link on scroll ---- */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.pageYOffset + 120;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

/* ---- Fade-in on scroll (Intersection Observer) ---- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Apply fade-in to all major elements
const fadeTargets = [
  '.about-card', '.skill-category', '.project-card', '.contact-item',
  '.section-header', '.contact-form', '.contact-tagline'
];
fadeTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(el);
  });
});

/* ---- Contact form handler ---- */
function handleFormSubmit(event) {
  event.preventDefault();
  const btn  = document.getElementById('submit-btn');
  const note = document.getElementById('form-note');
  const form = document.getElementById('contact-form');

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  btn.disabled = true;
  btn.textContent = 'Sending…';

  // Encode and open mailto link (works without a server)
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:harmasingh2006@gmail.com?subject=${subject}&body=${body}`;

  setTimeout(() => {
    note.textContent = '✅ Your email client has been opened. Thank you for reaching out!';
    btn.disabled = false;
    btn.textContent = 'Send Message ✉️';
    form.reset();
  }, 800);
}

/* ---- Smooth typing effect on hero greeting ---- */
window.addEventListener('DOMContentLoaded', () => {
  const greeting = document.querySelector('.hero-greeting');
  const text     = greeting.textContent;
  greeting.textContent = '';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      greeting.textContent += text[i++];
      setTimeout(type, 55);
    }
  };
  setTimeout(type, 400);

  /* Hero entrance animation */
  const heroEl = document.querySelector('.hero-text');
  heroEl.style.opacity = '0';
  heroEl.style.transform = 'translateY(30px)';
  heroEl.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  setTimeout(() => {
    heroEl.style.opacity = '1';
    heroEl.style.transform = 'translateY(0)';
  }, 200);

  /* Avatar entrance */
  const avatarWrapper = document.querySelector('.hero-image-wrapper');
  avatarWrapper.style.opacity = '0';
  avatarWrapper.style.transform = 'scale(0.9)';
  avatarWrapper.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
  setTimeout(() => {
    avatarWrapper.style.opacity = '1';
    avatarWrapper.style.transform = 'scale(1)';
  }, 300);
});

/* ---- Pill hover ripple on skills ---- */
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    pill.style.transform = 'scale(0.94)';
    setTimeout(() => { pill.style.transform = ''; }, 150);
  });
});
