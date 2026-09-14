/**
 * Scroll Reveal — Animações de Entrada
 * Usa IntersectionObserver para detectar elementos e ativar animações.
 * Respeita prefers-reduced-motion.
 */
(function () {
  'use strict';

  // Respeita a preferência do usuário por movimentos reduzidos
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    // Se o usuário prefere menos movimentos, mostra tudo imediatamente
    var allReveal = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    for (var i = 0; i < allReveal.length; i++) {
      allReveal[i].classList.add('revealed');
    }
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observa todos os elementos com classe de animação
  var elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  elements.forEach(function (el) {
    observer.observe(el);
  });

  // ======================================
  // Counter Animation (Números de Impacto)
  // ======================================
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  var counters = document.querySelectorAll('[data-counter]');
  counters.forEach(function (el) {
    counterObserver.observe(el);
  });

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-counter'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800; // ms
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var easedProgress = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(easedProgress * target);
      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // ======================================
  // Newsletter Feedback
  // ======================================
  var newsletterForms = document.querySelectorAll('.rodape-newsletter');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var button = form.querySelector('button');

      if (input && input.value.trim()) {
        // Mostra feedback visual
        button.textContent = '✓ Inscrito!';
        button.style.background = '#38a169';
        input.value = '';
        input.disabled = true;
        button.disabled = true;

        // Restaura após 3 segundos
        setTimeout(function () {
          button.textContent = 'Inscrever';
          button.style.background = '';
          input.disabled = false;
          button.disabled = false;
        }, 3000);
      }
    });
  });
})();
