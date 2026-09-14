document.addEventListener('DOMContentLoaded', function() {
    const bannerLgpd = document.getElementById('banner-lgpd');
    const btnAceitar = document.getElementById('btn-aceitar-lgpd');
    const a11yWidget = document.getElementById('a11y-widget');

    // Função para liberar o widget de acessibilidade
    function checkInterfaceVisibility() {
        const hasAcceptedCookies = localStorage.getItem('lgpd_consentimento');
        const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
        
        if (hasAcceptedCookies && hasSeenModal && a11yWidget) {
            a11yWidget.classList.add('liberado');
        }
    }

    // Mostra o LGPD no load APENAS se o modal principal já tiver sido visto
    const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
    if (bannerLgpd && !localStorage.getItem('lgpd_consentimento') && hasSeenModal) {
        bannerLgpd.classList.add('visivel');
    }

    if (btnAceitar) {
        btnAceitar.addEventListener('click', function() {
            localStorage.setItem('lgpd_consentimento', 'true');
            bannerLgpd.classList.remove('visivel');
            checkInterfaceVisibility();
            
            // Avisa o site inteiro que o LGPD foi aceito para mostrar o Tooltip
            window.dispatchEvent(new Event('liberarTooltip'));
        });
    }

    // Observador para o Widget de Acessibilidade
    const observer = new MutationObserver(checkInterfaceVisibility);
    const modalBemVindo = document.getElementById('modal-bem-vindo');
    if (modalBemVindo) {
        observer.observe(modalBemVindo, { attributes: true, attributeFilter: ['class'] });
    }

    checkInterfaceVisibility();
});