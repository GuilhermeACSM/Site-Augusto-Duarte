// ======================================
// Lógica do Formulário de Voluntário
// ======================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-voluntario');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // 1. Coleta os dados básicos
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const bairro = document.getElementById('bairro').value.trim();

            // 2. Coleta as opções de "Quer Ajudar?" (se marcada)
            const querAjudar = document.getElementById('check-ajudar').checked;
            let ajudas = [];
            if (querAjudar) {
                const checkboxesAjudar = document.querySelectorAll('input[name="como_ajudar"]:checked');
                checkboxesAjudar.forEach(cb => {
                    const labelSpan = cb.nextElementSibling.nextElementSibling;
                    if (labelSpan) {
                        ajudas.push(labelSpan.textContent.trim());
                    }
                });
            }

            // 3. Coleta a "Sua Mensagem" (se marcada)
            const querMensagem = document.getElementById('check-mensagem').checked;
            let mensagemExtra = '';
            if (querMensagem) {
                const textarea = document.querySelector('textarea[name="mensagem"]');
                if (textarea) {
                    mensagemExtra = textarea.value.trim();
                }
            }

            // 4. Monta a mensagem formatada para o WhatsApp
            let textoWhatsApp = `Olá, gostaria de ser voluntário na campanha!\n\n`;
            textoWhatsApp += `*Nome:* ${nome}\n`;
            textoWhatsApp += `*E-mail:* ${email}\n`;
            textoWhatsApp += `*Telefone:* ${telefone}\n`;
            textoWhatsApp += `*Bairro/Cidade:* ${bairro}\n`;

            if (ajudas.length > 0) {
                textoWhatsApp += `\n*Como quero ajudar:*\n`;
                ajudas.forEach(ajuda => {
                    textoWhatsApp += `- ${ajuda}\n`;
                });
            }

            if (mensagemExtra) {
                textoWhatsApp += `\n*Sua Mensagem:*\n"${mensagemExtra}"\n`;
            }

            // 5. Envia para o WhatsApp usando o número oficial da campanha
            const numeroCampanha = '5513996554500';
            const mensagemCodificada = encodeURIComponent(textoWhatsApp);
            const url = `https://wa.me/${numeroCampanha}?text=${mensagemCodificada}`;
            window.open(url, '_blank');
        });
    }
});
