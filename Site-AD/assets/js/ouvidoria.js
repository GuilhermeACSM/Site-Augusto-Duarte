document.addEventListener('DOMContentLoaded', function () {
  var faqBtns = document.querySelectorAll('.faq-btn');

  faqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      var panelId = this.getAttribute('aria-controls');
      var panel = document.getElementById(panelId);

      if (isExpanded) {
        this.setAttribute('aria-expanded', 'false');
        if (panel) panel.hidden = true;
      } else {
        this.setAttribute('aria-expanded', 'true');
        if (panel) panel.hidden = false;
      }
    });
  });

  var formSelects = document.querySelectorAll('.form-select');
  formSelects.forEach(function(select) {
    select.addEventListener('change', function() {
      if (this.value !== "") {
        this.style.color = 'var(--color-text)';
      } else {
        this.style.color = 'var(--color-muted)';
      }
    });
    // Trigger on load
    if (select.value !== "") {
      select.style.color = 'var(--color-text)';
    } else {
      select.style.color = 'var(--color-muted)';
    }
  });
});
