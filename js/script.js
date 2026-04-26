/* ═══════════════════════════════════════════
   script.js — Portfolio interactivity
   ═══════════════════════════════════════════ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // ─── Terminal typing animation ───
  initTerminalAnimation();

  // ─── Scroll reveal ───
  initScrollReveal();

  // ─── Project filter ───
  initProjectFilter();

  // ─── Contact form ───
  initContactForm();

  // ─── Mobile navigation ───
  initMobileNav();

  // ─── Active nav highlight on scroll ───
  initNavHighlight();

});


/* ═══════════════════════════════════════════
   TERMINAL ANIMATION
   Shows lines one by one with typing effect
   ═══════════════════════════════════════════ */
function initTerminalAnimation() {
  const lines = document.querySelectorAll('.terminal-line');
  let delay = 400;

  lines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('visible');
    }, delay);

    if (i < 3) {
      delay += 300;
    } else if (i < 7) {
      delay += 250;
    } else {
      delay += 200;
    }
  });
}


/* ═══════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════ */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 
  });

  revealElements.forEach(el => observer.observe(el));
}


/* ═══════════════════════════════════════════
   PROJECT FILTER
   ═══════════════════════════════════════════ */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Show/hide cards with animation
      projectCards.forEach(card => {
        const tags = card.dataset.tags;

        if (filter === 'all' || tags.includes(filter)) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';

          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}


/* ═══════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════ */
function initContactForm() {
  const submitBtn = document.getElementById('submitBtn');
  const responsePreview = document.getElementById('responsePreview');

  if (!submitBtn || !responsePreview) return;

  // Inicializar EmailJS con tu Public Key
  emailjs.init("NaoJ6-H2bGNZlYJsQ");

  submitBtn.addEventListener('click', () => {
    // Obtener valores del formulario
    const nombre = document.getElementById('contact-nombre').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const asunto = document.getElementById('contact-asunto').value.trim();
    const mensaje = document.getElementById('contact-mensaje').value.trim();

    // Validar campos obligatorios
    if (!nombre || !email || !mensaje) {
      responsePreview.style.display = 'block';
      responsePreview.innerHTML = '<span style="color:var(--red);font-weight:600;">HTTP 400 Bad Request</span><br>' +
        '<span class="json-bracket">{</span><br>' +
        '&nbsp;&nbsp;<span class="json-key">"status"</span>: <span class="json-string">"error"</span>,<br>' +
        '&nbsp;&nbsp;<span class="json-key">"message"</span>: <span class="json-string">"Completá nombre, email y mensaje."</span><br>' +
        '<span class="json-bracket">}</span>';
      return;
    }

    // Mostrar estado de envío
    submitBtn.textContent = 'Enviando...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    // Enviar email con EmailJS
    emailjs.send("service_fo3t8ly", "template_d58i3gc", {
      nombre: nombre,
      email: email,
      asunto: asunto || "Sin asunto",
      mensaje: mensaje
    })
    .then(() => {
      // Éxito
      responsePreview.style.display = 'block';
      responsePreview.innerHTML = '<span class="status-200">HTTP 200 OK</span><br>' +
        '<span class="json-bracket">{</span><br>' +
        '&nbsp;&nbsp;<span class="json-key">"status"</span>: <span class="json-string">"success"</span>,<br>' +
        '&nbsp;&nbsp;<span class="json-key">"message"</span>: <span class="json-string">"¡Gracias! Te respondo pronto."</span><br>' +
        '<span class="json-bracket">}</span>';

      // Limpiar formulario
      document.getElementById('contact-nombre').value = '';
      document.getElementById('contact-email').value = '';
      document.getElementById('contact-asunto').value = '';
      document.getElementById('contact-mensaje').value = '';

      submitBtn.textContent = 'Enviar Request →';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
    })
    .catch(() => {
      // Error
      responsePreview.style.display = 'block';
      responsePreview.innerHTML = '<span style="color:var(--red);font-weight:600;">HTTP 500 Internal Server Error</span><br>' +
        '<span class="json-bracket">{</span><br>' +
        '&nbsp;&nbsp;<span class="json-key">"status"</span>: <span class="json-string">"error"</span>,<br>' +
        '&nbsp;&nbsp;<span class="json-key">"message"</span>: <span class="json-string">"Error al enviar. Intentá de nuevo."</span><br>' +
        '<span class="json-bracket">}</span>';

      submitBtn.textContent = 'Enviar Request →';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
    });
  });
}


/* ═══════════════════════════════════════════
   MOBILE NAVIGATION
   Hamburger menu toggle
   ═══════════════════════════════════════════ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}


/* ═══════════════════════════════════════════
   NAV HIGHLIGHT
   Highlights the current section link in nav
   as the user scrolls
   ═══════════════════════════════════════════ */
function initNavHighlight() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + currentSection;
      link.style.color = isActive ? 'var(--accent)' : '';
    });
  });
}
