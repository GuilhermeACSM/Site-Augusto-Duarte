document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-bem-vindo');
    if (!modal) return;

    const btnFechar = document.getElementById('modal-btn-fechar');
    const btnContinuar = document.getElementById('modal-btn-continuar');

    let lastFocusedElement = null;

    const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');

    function abrirModal(trigger) {
        lastFocusedElement = trigger || document.activeElement;
        modal.classList.add('visivel');
        
        setTimeout(() => {
            if (btnFechar) btnFechar.focus();
        }, 100);
    }

    if (!hasSeenModal) {
        setTimeout(() => {
            abrirModal(null);
        }, 1500);
    }

    function fecharModal() {
        modal.classList.remove('visivel');
        sessionStorage.setItem('hasSeenWelcomeModal', 'true');
        
        // VERIFICAÇÃO: Mostra o LGPD ou libera o Tooltip
        const bannerLgpd = document.getElementById('banner-lgpd');
        if (bannerLgpd && !localStorage.getItem('lgpd_consentimento')) {
            bannerLgpd.classList.add('visivel');
        } else {
            window.dispatchEvent(new Event('liberarTooltip'));
        }

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    if (btnFechar) {
        btnFechar.addEventListener('click', fecharModal);
    }

    if (btnContinuar) {
        btnContinuar.addEventListener('click', (e) => {
            e.preventDefault();
            fecharModal();
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fecharModal();
            return;
        }

        if (e.key === 'Tab') {
            const focusableElements = modal.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) { 
                if (document.activeElement === firstElement || document.activeElement === modal) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { 
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });

    const badgeFlutuante = document.getElementById('badge-flutuante');
    if (badgeFlutuante) {
        badgeFlutuante.addEventListener('click', (e) => {
            const modalBemVindo = document.getElementById('modal-bem-vindo');
            if (modalBemVindo) {
                e.preventDefault();
                abrirModal(badgeFlutuante);
            }
        });
    }

    const seloCampanhaBtn = document.getElementById('selo-campanha-btn');
    if (seloCampanhaBtn) {
        seloCampanhaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            abrirModal(seloCampanhaBtn);
        });
    }
});