// ======================================
// Lógica do Formulário de Ouvidoria (Envio Provisório via WhatsApp)
// ======================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-ouvidoria');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // 1. Coleta os dados básicos
            const nome = document.getElementById('ouvidoria-nome').value.trim();
            const email = document.getElementById('ouvidoria-email').value.trim();
            const telefone = document.getElementById('ouvidoria-telefone').value.trim();
            
            // 2. Coleta assunto e mensagem
            const selectAssunto = document.getElementById('ouvidoria-assunto');
            const assuntoTexto = selectAssunto.options[selectAssunto.selectedIndex].text;
            const mensagem = document.getElementById('ouvidoria-mensagem').value.trim();

            // 3. (Futuro) Coleta campos ocultos de LGPD para envio ao backend
            const consentimentoData = document.getElementById('consentimento_data') ? document.getElementById('consentimento_data').value : new Date().toISOString();
            
            // 4. Monta a mensagem formatada para o WhatsApp
            let textoWhatsApp = `Olá, estou entrando em contato pela Ouvidoria do site.\n\n`;
            textoWhatsApp += `*Nome:* ${nome}\n`;
            textoWhatsApp += `*E-mail:* ${email}\n`;
            textoWhatsApp += `*Telefone:* ${telefone}\n`;
            textoWhatsApp += `*Assunto:* ${assuntoTexto}\n\n`;
            textoWhatsApp += `*Mensagem:*\n"${mensagem}"\n\n`;
            textoWhatsApp += `_Consentimento LGPD registrado em: ${consentimentoData}_`;

            // 5. Envia para o WhatsApp usando o número oficial da campanha
            const numeroCampanha = '5513996554500';
            const mensagemCodificada = encodeURIComponent(textoWhatsApp);
            
            // Redireciona
            const url = `https://wa.me/${numeroCampanha}?text=${mensagemCodificada}`;
            window.open(url, '_blank');
        });
    }
});
