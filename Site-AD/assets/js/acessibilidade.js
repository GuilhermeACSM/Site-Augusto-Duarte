(function () {
  'use strict';
  if (window.__a11y_init) return;
  window.__a11y_init = true;

  var a11yToggle = document.getElementById('a11y-toggle');
  var a11yMenu = document.getElementById('a11y-menu');
  var a11yFechar = document.getElementById('a11y-fechar');
  var btnAltoContraste = document.getElementById('btn-alto-contraste');
  var btnFonteAumentar = document.getElementById('btn-fonte-aumentar');
  var btnFonteDiminuir = document.getElementById('btn-fonte-diminuir');

  var menuAberto = false;
  var fontScale = 1;
  var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], details summary';
  var lastFocusedElement;

  function handleFocusTrap(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      toggleMenu();
      return;
    }
    if (e.key !== 'Tab' && e.keyCode !== 9) {
      return;
    }
    
    var focusableElements = Array.prototype.slice.call(a11yMenu.querySelectorAll(focusableElementsString)).filter(function(el) {
        return el.offsetParent !== null;
    });
    
    if (focusableElements.length === 0) return;
    var firstFocusableElement = focusableElements[0];
    var lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) { 
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else { 
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  }

  function toggleMenu() {
    menuAberto = !menuAberto;
    a11yMenu.classList.toggle('active', menuAberto);
    a11yMenu.setAttribute('aria-hidden', !menuAberto);
    a11yToggle.setAttribute('aria-expanded', menuAberto);

    if (menuAberto) {
      lastFocusedElement = document.activeElement;
      a11yMenu.addEventListener('keydown', handleFocusTrap);
      
      var focusableElements = Array.prototype.slice.call(a11yMenu.querySelectorAll(focusableElementsString)).filter(function(el) {
          return el.offsetParent !== null;
      });
      if (focusableElements.length > 0) {
        setTimeout(function() { focusableElements[0].focus(); }, 100);
      }
    } else {
      a11yMenu.removeEventListener('keydown', handleFocusTrap);
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }
  }

  if (a11yToggle && a11yMenu && a11yFechar) {
    a11yToggle.addEventListener('click', toggleMenu);
    a11yFechar.addEventListener('click', toggleMenu);

    document.addEventListener('click', function(event) {
      if (menuAberto && !a11yMenu.contains(event.target) && !a11yToggle.contains(event.target)) {
        toggleMenu();
      }
    });

    var tooltip = document.createElement('div');
    tooltip.className = 'a11y-tooltip';
    tooltip.id = 'a11y-shortcut-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.innerHTML = 'Atalho de Acessibilidade: <strong>Alt + A</strong>';
    document.body.appendChild(tooltip);

    function positionTooltip() {
      if (!a11yToggle) return;
      var rect = a11yToggle.getBoundingClientRect();
      var tooltipLeft = Math.max(16, rect.left);
      var tooltipBottom = (window.innerHeight - rect.top + 12);
      tooltip.style.left = tooltipLeft + 'px';
      tooltip.style.bottom = tooltipBottom + 'px';
    }
    positionTooltip();
    window.addEventListener('resize', positionTooltip);

    // === CÓDIGO NOVO DO TOOLTIP ===
    var tooltipTimeout;

    function showTooltipCondition() {
        var hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
        var hasAcceptedLGPD = localStorage.getItem('lgpd_consentimento');
        
        // Exibe o tooltip APENAS em Desktops (telas maiores que 1024px)
        if (window.innerWidth > 1024) {
            if (hasSeenModal && hasAcceptedLGPD) {
                positionTooltip();
                tooltip.classList.add('visivel');
                
                clearTimeout(tooltipTimeout);
                tooltipTimeout = setTimeout(hideTooltip, 8000);
            }
        }
    }

    showTooltipCondition();
    window.addEventListener('liberarTooltip', showTooltipCondition);

    function hideTooltip() {
      if (!tooltip) return;
      clearTimeout(tooltipTimeout);
      tooltip.classList.remove('visivel');
      setTimeout(function() {
        if (tooltip && tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
      }, 400);
    }

    a11yToggle.addEventListener('click', hideTooltip);
    document.addEventListener('keydown', function(e) {
      if (e.altKey && e.key && e.key.toLowerCase() === 'a') {
        hideTooltip();
      }
    });
  }

  window.addEventListener('DOMContentLoaded', function () {
    var savedFontScale = localStorage.getItem('font-scale');
    if (savedFontScale) {
      fontScale = parseFloat(savedFontScale);
      document.documentElement.style.fontSize = (fontScale * 100) + '%';
      if (fontScale > 1) {
        document.body.classList.add('fonte-aumentada');
      }
    }
  });

  function updateFontSize(scaleDelta) {
    fontScale += scaleDelta;
    fontScale = Math.max(0.8, Math.min(fontScale, 1.5));
    document.documentElement.style.fontSize = (fontScale * 100) + '%';
    localStorage.setItem('font-scale', fontScale);
    
    if (fontScale > 1) {
      document.body.classList.add('fonte-aumentada');
    } else {
      document.body.classList.remove('fonte-aumentada');
    }
  }

  if (btnFonteAumentar) {
    btnFonteAumentar.addEventListener('click', function () { updateFontSize(0.1); });
  }
  if (btnFonteDiminuir) {
    btnFonteDiminuir.addEventListener('click', function () { updateFontSize(-0.1); });
  }

  var btnFonteAumentarTop = document.getElementById('top-btn-fonte-aumentar');
  var btnFonteDiminuirTop = document.getElementById('top-btn-fonte-diminuir');
  
  if (btnFonteAumentarTop) {
    btnFonteAumentarTop.addEventListener('click', function () { updateFontSize(0.1); });
  }
  if (btnFonteDiminuirTop) {
    btnFonteDiminuirTop.addEventListener('click', function () { updateFontSize(-0.1); });
  }

  var btnDaltonismo = document.getElementById('btn-daltonismo');
  var btnDislexia = document.getElementById('btn-dislexia');
  var btnCursor = document.getElementById('btn-cursor');
  var btnEspacamento = document.getElementById('btn-espacamento');
  var btnMascara = document.getElementById('btn-mascara');
  var btnAnimacoes = document.getElementById('btn-animacoes');
  var btnDestacarLinks = document.getElementById('btn-destacar-links');

  function bindToggle(botoes, classeCss, chaveStorage) {
      if (!botoes || botoes.length === 0) return;

      const validos = botoes.filter(b => b !== null);
      if (validos.length === 0) return;

      let ativo = localStorage.getItem(chaveStorage) === 'true' ||
                  (chaveStorage === 'a11y_links_destacados' && localStorage.getItem('a11y_destacar_links') === 'true');

      if (ativo) {
          document.body.classList.add(classeCss);
          if (classeCss === 'destacar-links') document.body.classList.add('links-destacados');
      }

      validos.forEach(btn => {
          btn.classList.toggle('ativo', ativo);
          btn.setAttribute('aria-pressed', ativo);
          
          btn.addEventListener('click', () => {
              ativo = document.body.classList.toggle(classeCss);
              if (classeCss === 'destacar-links') {
                  document.body.classList.toggle('links-destacados', ativo);
                  localStorage.setItem('a11y_destacar_links', ativo);
              }
              localStorage.setItem(chaveStorage, ativo);
              
              validos.forEach(b => {
                  b.classList.toggle('ativo', ativo);
                  b.setAttribute('aria-pressed', ativo);
              });
          });
      });
  }

  bindToggle([btnDislexia], 'fonte-dislexia', 'a11y_dislexia');
  bindToggle([btnCursor], 'cursor-grande', 'a11y_cursor');
  bindToggle([btnEspacamento], 'espacamento-texto', 'a11y_espacamento');
  bindToggle([btnMascara], 'mascara-leitura', 'a11y_mascara');
  bindToggle([btnAnimacoes, document.getElementById('top-btn-animacoes')], 'sem-animacao', 'a11y_animacao');
  bindToggle([btnDestacarLinks], 'destacar-links', 'a11y_links_destacados');

  var readingMask = document.createElement('div');
  readingMask.className = 'reading-mask';
  document.body.appendChild(readingMask);

  document.addEventListener('mousemove', function(e) {
      if (document.body.classList.contains('mascara-leitura')) {
          readingMask.style.top = e.clientY + 'px';
      }
  });

  const atalhos = { '1': 'conteudo-principal', '2': 'menu-principal', '3': 'rodape-principal' };
  document.addEventListener('keydown', function(e) {
      if (e.altKey && !e.ctrlKey && !e.shiftKey) {
          var key = e.key.toLowerCase();
          if (atalhos[key]) {
              e.preventDefault();
              var el = document.getElementById(atalhos[key]);
              if (el) { el.setAttribute('tabindex', '-1'); el.focus(); el.scrollIntoView(); }
          } else if (key === 'a') {
              e.preventDefault();
              if(typeof toggleMenu === 'function') {
                toggleMenu();
                if(menuAberto && document.getElementById('btn-fonte-aumentar')) {
                  document.getElementById('btn-fonte-aumentar').focus();
                }
              }
          }
      }
  });

  function injectSVGFilters() {
    if (document.getElementById('a11y-filters')) return;
    var container = document.createElement('div');
    container.id = 'a11y-filters';
    container.style.display = 'none';
    container.setAttribute('aria-hidden', 'true');
    container.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0  0.558, 0.442, 0, 0, 0  0, 0.242, 0.758, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0  0.7, 0.3, 0, 0, 0  0, 0.3, 0.7, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05,  0, 0, 0  0,  0.433, 0.567, 0, 0  0,  0.475, 0.525, 0, 0  0,  0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
    `;
    document.body.insertBefore(container, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSVGFilters);
  } else {
    injectSVGFilters();
  }

  var THEME_KEY = 'a11y_color_theme';
  var colorControls = [
    { id: 'btn-alto-contraste', theme: 'high-contrast' },
    { id: 'top-btn-alto-contraste', theme: 'high-contrast' },
    { id: 'btn-alto-contraste-claro', theme: 'high-contrast-light' },
    { id: 'btn-daltonismo', theme: 'grayscale' },
    { id: 'top-btn-daltonismo', theme: 'grayscale' },
    { id: 'btn-protanopia', theme: 'protanopia' },
    { id: 'btn-deuteranopia', theme: 'deuteranopia' },
    { id: 'btn-tritanopia', theme: 'tritanopia' }
  ];

  function applyColorTheme(theme) {
    var themes = ['high-contrast', 'high-contrast-light', 'grayscale', 'protanopia', 'deuteranopia', 'tritanopia'];
    themes.forEach(function(t) {
      document.documentElement.classList.remove('theme-' + t);
    });

    colorControls.forEach(function(ctrl) {
      var btn = document.getElementById(ctrl.id);
      if (btn) {
        btn.setAttribute('aria-pressed', 'false');
        btn.classList.remove('ativo');
      }
    });

    if (theme) {
      document.documentElement.classList.add('theme-' + theme);
      localStorage.setItem(THEME_KEY, theme);
      
      colorControls.forEach(function(ctrl) {
        if (ctrl.theme === theme || (ctrl.id === 'top-btn-alto-contraste' && (theme === 'high-contrast' || theme === 'high-contrast-light'))) {
          var btn = document.getElementById(ctrl.id);
          if (btn) {
            btn.setAttribute('aria-pressed', 'true');
            btn.classList.add('ativo');
          }
        }
      });
    } else {
      localStorage.removeItem(THEME_KEY);
    }
  }

  function toggleColorTheme(theme) {
    var current = localStorage.getItem(THEME_KEY);
    applyColorTheme(current === theme ? null : theme);
  }

  window.addEventListener('DOMContentLoaded', function () {
    var savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) applyColorTheme(savedTheme);

    colorControls.forEach(function(ctrl) {
      var btn = document.getElementById(ctrl.id);
      if (btn) {
        btn.addEventListener('click', function() {
          if (ctrl.id === 'top-btn-alto-contraste') {
            var current = localStorage.getItem(THEME_KEY);
            if (current === 'high-contrast') {
              applyColorTheme('high-contrast-light');
            } else if (current === 'high-contrast-light') {
              applyColorTheme(null);
            } else {
              applyColorTheme('high-contrast');
            }
          } else {
            toggleColorTheme(ctrl.theme);
          }
        });
      }
    });
  });

})();