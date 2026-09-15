/**
 * Menu Mobile — Toggle de navegação
 * Controla aria-expanded no botão e a classe .aberto no nav mobile.
 */
(function () {
  'use strict';

  var toggle = document.querySelector('.botao-menu');
  var mobileNav = document.getElementById('nav-mobile');

  if (!toggle || !mobileNav) {
    
    return;
  }

  

  // Destaca o link da página atual no menu mobile caso não esteja marcado no HTML
  try {
    var currentPath = window.location.pathname;
    var currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1).split('?')[0].split('#')[0] || 'index.html';
    if (currentPage === '' || currentPage === '/') currentPage = 'index.html';

    var links = mobileNav.querySelectorAll('a[href]');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      var hrefPage = href.substring(href.lastIndexOf('/') + 1).split('?')[0].split('#')[0];
      if (!hrefPage || hrefPage === '.' || hrefPage === '..') hrefPage = 'index.html';

      if (hrefPage === currentPage) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('ativo');
      }
    });
  } catch (e) {}

  function fecharMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileNav.classList.remove('aberto');
  }

  // Usa apenas o evento click. O preventDefault garante que touch não cause click duplo na maioria dos casos.
  // Usaremos uma variável simples de bloqueio (debounce) para evitar duplicação rápida no mobile.
  var isToggling = false;
  
  function handleMenuToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (isToggling) return;
    isToggling = true;
    setTimeout(function() { isToggling = false; }, 300); // 300ms debounce
    
    if (mobileNav.classList.contains('aberto')) {
      fecharMenu();
    } else {
      toggle.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      mobileNav.classList.add('aberto');
    }
  }

  toggle.addEventListener('click', handleMenuToggle);

  document.addEventListener('mousedown', function (event) {
    if (!mobileNav.classList.contains('aberto')) return;
    
    var isClickInsideMenu = mobileNav.contains(event.target);
    var isClickOnToggle = toggle.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle) {
      fecharMenu();
    }
  });

  // Armadilha de Foco (Focus Trap) para Acessibilidade
  document.addEventListener('keydown', function(event) {
    var isMenuAberto = mobileNav.classList.contains('aberto');
    if (!isMenuAberto) return;

    if (event.key === 'Escape') {
      fecharMenu();
      toggle.focus();
      return;
    }

    if (event.key === 'Tab') {
      // Pega todos os links e botões dentro do menu mobile que não estejam escondidos (neste caso os visíveis)
      var focusableElements = mobileNav.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
      var firstElement = toggle; 
      var lastElement = focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : toggle;

      if (event.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else { // Só Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  var cabecalho = document.querySelector('.cabecalho');
  var ultimoScroll = 0;

  if (cabecalho) {
    window.addEventListener('scroll', function () {
      var scrollAtual = window.pageYOffset || document.documentElement.scrollTop;

      // Se rolou para baixo e passou de 80px, esconde. Se rolou para cima, mostra.
      if (scrollAtual > ultimoScroll && scrollAtual > 80 && !mobileNav.classList.contains("aberto")) {
        cabecalho.classList.add('escondido');
      } else {
        cabecalho.classList.remove('escondido');
      }
      ultimoScroll = scrollAtual <= 0 ? 0 : scrollAtual;
    }, { passive: true });
  }

  // Intersection Observer para o botão do cabeçalho
  var cabecalhoCta = document.getElementById('cabecalho-cta');
  var heroCta = document.getElementById('hero-cta-btn');
  
  if (cabecalhoCta && heroCta) {
    // Começa oculto por padrão (a animação de saída/entrada cuidará de mostrar quando rolar)
    cabecalhoCta.classList.add('oculto-header');

    var ctaObserver = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        cabecalhoCta.classList.add('oculto-header');
      } else {
        cabecalhoCta.classList.remove('oculto-header');
      }
    }, { rootMargin: "-80px 0px 0px 0px", threshold: 0 }); // -80px is the header height
    
    ctaObserver.observe(heroCta);
  }
})();
