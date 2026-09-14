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

            // 2. Coleta a opção de "Como quer ajudar?"
            const selectAjudar = document.getElementById('como-ajudar');
            let ajudas = [];
            if (selectAjudar && selectAjudar.value !== "") {
                ajudas.push(selectAjudar.options[selectAjudar.selectedIndex].text);
            }

            // 3. Coleta a "Sua Mensagem" (se preenchida)
            let mensagemExtra = '';
            const textarea = document.getElementById('voluntario-mensagem');
            if (textarea && textarea.value.trim() !== "") {
                mensagemExtra = textarea.value.trim();
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

            // Captura o estado das checkboxes de LGPD e Comunicações
            const aceitaPolitica = document.querySelector('input[name="lgpd_politica"]').checked ? "Sim" : "Não";
            const aceitaComunicacao = document.querySelector('input[name="lgpd_comunicacoes"]').checked ? "Sim" : "Não";

            textoWhatsApp += `\n*Consentimento LGPD:* ${aceitaPolitica}\n`;
            textoWhatsApp += `*Aceita receber comunicações:* ${aceitaComunicacao}\n`;
            // 5. Envia para o WhatsApp usando o número oficial da campanha
            const numeroCampanha = '5513996554500';
            const mensagemCodificada = encodeURIComponent(textoWhatsApp);
            const url = `https://wa.me/${numeroCampanha}?text=${mensagemCodificada}`;
            window.open(url, '_blank');

            // 6. Exibe o modal de Obrigado
            const modalObrigado = document.getElementById('modal-obrigado-voluntario');
            if (modalObrigado) {
                modalObrigado.classList.add('visivel');
            }

            // Opcional: Limpar o formulário após o envio
            form.reset();
        });
    }

    // Lógica para fechar o Modal de Obrigado
    const modalObrigado = document.getElementById('modal-obrigado-voluntario');
    const btnFecharObrigado = document.getElementById('modal-btn-fechar-obrigado');
    const btnContinuarObrigado = document.getElementById('modal-btn-continuar-obrigado');

    function fecharModalObrigado(e) {
        if (e) e.preventDefault();
        if (modalObrigado) {
            modalObrigado.classList.remove('visivel');
        }
    }

    if (btnFecharObrigado) btnFecharObrigado.addEventListener('click', fecharModalObrigado);
    if (btnContinuarObrigado) btnContinuarObrigado.addEventListener('click', fecharModalObrigado);
    
    // Fechar ao clicar fora do modal
    if (modalObrigado) {
        modalObrigado.addEventListener('click', function(e) {
            if (e.target === modalObrigado) {
                fecharModalObrigado();
            }
        });
    }
});
