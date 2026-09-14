/**
 * Carrossel de Depoimentos — Smooth Continuous Scroll
 * Uses CSS transform for buttery-smooth infinite scrolling.
 * Pauses on hover/touch/focus; supports prev/next buttons.
 */
(function () {
  'use strict';

  var container = document.querySelector('.carrossel-container');
  var track = document.querySelector('.carrossel-trilho');
  var prevBtn = document.querySelector('.carrossel-prev');
  var nextBtn = document.querySelector('.carrossel-next');

  if (!container || !track) return;

  var cards = track.querySelectorAll('.depoimento-card');
  if (cards.length === 0) return;

  // ── Configuration ──
  var SPEED = 0.5;            // pixels per frame (~30px/s at 60fps)
  var BUTTON_SCROLL_DURATION = 500; // ms for button click animation

  // ── State ──
  var offset = 0;             // current translateX offset (negative = scrolled right)
  var isRunning = true;
  var rafId = null;
  var originalCount = cards.length;
  var originalWidth = 0;      // total width of original set of cards

  // ── Clone cards on both sides for seamless loop ──
  var originalCards = Array.from(cards);

  // Append clones at the end
  originalCards.forEach(function (card) {
    var clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.add('carrossel-clone');
    track.appendChild(clone);
  });

  // Prepend clones at the start
  for (var i = originalCards.length - 1; i >= 0; i--) {
    var clone = originalCards[i].cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.add('carrossel-clone');
    track.insertBefore(clone, track.firstChild);
  }

  // ── Disable CSS scroll-snap (we control position via transform) ──
  container.style.overflow = 'hidden';
  container.style.scrollSnapType = 'none';
  track.style.transition = 'none';
  track.style.willChange = 'transform';

  // ── Make container keyboard-focusable ──
  container.setAttribute('tabindex', '0');
  container.setAttribute('role', 'region');
  container.setAttribute('aria-roledescription', 'carrossel');
  container.setAttribute('aria-label', 'Depoimentos — use as setas do teclado para navegar');

  // ── Measure ──
  function measure() {
    var gap = parseFloat(window.getComputedStyle(track).gap) || 24;
    var cardW = cards[0].offsetWidth;
    originalWidth = (cardW + gap) * originalCount;
  }

  function getCardStep() {
    var gap = parseFloat(window.getComputedStyle(track).gap) || 24;
    return cards[0].offsetWidth + gap;
  }

  measure();

  // Start offset: skip the prepended clones so user sees original cards first
  offset = -originalWidth;
  track.style.transform = 'translateX(' + offset + 'px)';

  // ── Seamless wrap ──
  function wrapOffset() {
    // Two sets: prepended clones | originals | appended clones
    // When we scroll past the originals into appended clones, jump back
    // When we scroll before the originals into prepended clones, jump forward
    if (offset <= -originalWidth * 2) {
      offset += originalWidth;
    } else if (offset >= 0) {
      offset -= originalWidth;
    }
  }

  // ── Auto-scroll animation loop ──
  function tick() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var semAnimacao = document.body.classList.contains('sem-animacao');
    var isAccessiblePaused = prefersReducedMotion || semAnimacao;

    if (isRunning && !isAccessiblePaused) {
      offset -= SPEED;
      wrapOffset();
      track.style.transform = 'translateX(' + offset + 'px)';
    }
    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);

  // ── Pause / Resume ──
  function pause() { isRunning = false; }
  function resume() { isRunning = true; }

  container.addEventListener('mouseenter', pause);
  container.addEventListener('mouseleave', resume);
  container.addEventListener('touchstart', pause, { passive: true });
  container.addEventListener('touchend', function () {
    // Small delay so the tap doesn't immediately scroll
    setTimeout(resume, 300);
  }, { passive: true });

  // ── Touch swipe support ──
  var touchStartX = 0;
  var touchOffsetStart = 0;

  container.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    touchOffsetStart = offset;
  }, { passive: true });

  container.addEventListener('touchmove', function (e) {
    var dx = e.touches[0].clientX - touchStartX;
    offset = touchOffsetStart + dx;
    wrapOffset();
    track.style.transform = 'translateX(' + offset + 'px)';
  }, { passive: true });

  // ── Button navigation (smooth animated jump) ──
  var wrapper = container.closest('.carrossel-wrapper');

  function isFocusInsideWrapper() {
    return wrapper && wrapper.contains(document.activeElement);
  }

  function animateToOffset(targetOffset, duration) {
    var startOffset = offset;
    var startTime = null;
    var diff = targetOffset - startOffset;

    // Pause auto-scroll during animation
    pause();

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      var ease = 1 - Math.pow(1 - progress, 3);

      offset = startOffset + diff * ease;
      wrapOffset();
      track.style.transform = 'translateX(' + offset + 'px)';

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        offset = targetOffset;
        wrapOffset();
        track.style.transform = 'translateX(' + offset + 'px)';
        // Only resume if focus is NOT inside the carousel
        if (!isFocusInsideWrapper()) {
          resume();
        }
      }
    }

    requestAnimationFrame(step);
  }

  if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', function () {
      animateToOffset(offset - getCardStep(), BUTTON_SCROLL_DURATION);
    });

    prevBtn.addEventListener('click', function () {
      animateToOffset(offset + getCardStep(), BUTTON_SCROLL_DURATION);
    });
  }

  // ── Focus management: pause when ANY element inside the wrapper has focus ──
  if (wrapper) {
    wrapper.addEventListener('focusin', pause);
    wrapper.addEventListener('focusout', function (e) {
      // Only resume if the new focused element is OUTSIDE the wrapper
      if (!wrapper.contains(e.relatedTarget)) {
        resume();
      }
    });
  }

  // ── Keyboard navigation on the container itself ──
  container.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
      e.preventDefault();
      animateToOffset(offset - getCardStep(), BUTTON_SCROLL_DURATION);
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
      e.preventDefault();
      animateToOffset(offset + getCardStep(), BUTTON_SCROLL_DURATION);
    }
  });

  // ── Recalculate on resize ──
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      measure();
      wrapOffset();
      track.style.transform = 'translateX(' + offset + 'px)';
    }, 150);
  });
})();
