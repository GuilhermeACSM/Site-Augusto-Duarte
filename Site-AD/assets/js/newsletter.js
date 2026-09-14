// ======================================
// Lógica de Cadastro na Newsletter (Rodapé)
// ======================================

document.addEventListener('DOMContentLoaded', () => {
    // Pode haver mais de um formulário de newsletter (ex: modal e rodapé),
    // então pegamos todos com a classe .rodape-newsletter
    const formsNewsletter = document.querySelectorAll('.rodape-newsletter');

    formsNewsletter.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // 1. Coleta o email
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value.trim() : '';

            // 2. (Futuro) Coleta os campos ocultos da LGPD
            const consentimentoData = new Date().toISOString();
            
            // 3. Simula envio (futuramente será um fetch para API/Resend)
            if (email) {
                // Remove mensagem de erro se houver
                const errorMsg = form.querySelector('.msg-erro');
                if (errorMsg) errorMsg.remove();

                // Feedback visual de sucesso
                const btn = form.querySelector('button[type="submit"]');
                const textoOriginal = btn.innerHTML;
                
                btn.innerHTML = '<i class="ph ph-check-circle"></i> Cadastrado!';
                btn.classList.add('sucesso');
                btn.disabled = true;
                emailInput.disabled = true;

                // Restaura o botão após 3 segundos
                setTimeout(() => {
                    btn.innerHTML = textoOriginal;
                    btn.classList.remove('sucesso');
                    btn.disabled = false;
                    emailInput.disabled = false;
                    form.reset();
                }, 3000);

                // Salva no localStorage como "cache" temporário do sistema
                let listaEmails = JSON.parse(localStorage.getItem('emails_newsletter') || '[]');
                if (!listaEmails.includes(email)) {
                    listaEmails.push({
                        email: email,
                        data: consentimentoData,
                        aceite_comunicacoes: true // Implícito pela ação de inscrever-se
                    });
                    localStorage.setItem('emails_newsletter', JSON.stringify(listaEmails));
                }
            }
        });
    });
});
