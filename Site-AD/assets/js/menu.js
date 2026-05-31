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

  // Smart Sticky Header
  var cabecalho = document.querySelector('.cabecalho');
  var ultimoScroll = 0;

  if (cabecalho) {
    window.addEventListener('scroll', function () {
      var scrollAtual = window.pageYOffset || document.documentElement.scrollTop;
      
      // Se rolou para baixo e passou de 80px, esconde. Se rolou para cima, mostra.
      if (scrollAtual > ultimoScroll && scrollAtual > 80) {
        cabecalho.classList.add('escondido');
      } else {
        cabecalho.classList.remove('escondido');
      }
      ultimoScroll = scrollAtual <= 0 ? 0 : scrollAtual;
    }, { passive: true });
  }
})();
