/**
 * Menu Mobile — Toggle de navegação
 * Controla aria-expanded no botão e a classe .aberto no nav mobile.
 */
(function () {
  'use strict';

  var toggle = document.querySelector('.botao-menu');
  var mobileNav = document.getElementById('nav-mobile');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav.setAttribute('aria-hidden', String(expanded));
    mobileNav.classList.toggle('aberto', !expanded);
  });
})();
