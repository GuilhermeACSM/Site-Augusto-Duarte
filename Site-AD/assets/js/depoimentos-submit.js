// ======================================
// Lógica do Formulário de Depoimentos (Envio Provisório via WhatsApp)
// ======================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-depoimento');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // 1. Coleta os dados básicos
            const nome = document.getElementById('nome').value.trim();
            const ocupacao = document.getElementById('ocupacao').value.trim();
            const cidade = document.getElementById('cidade').value.trim();
            const mensagem = document.getElementById('mensagem-depoimento').value.trim();

            // 2. Verifica a foto
            const inputFoto = document.getElementById('foto-perfil');
            const temFoto = inputFoto.files && inputFoto.files.length > 0 ? "Sim" : "Não";

            // 3. (Futuro) Coleta campos ocultos de LGPD para envio ao backend
            const consentimentoData = document.getElementById('consentimento_data') ? document.getElementById('consentimento_data').value : new Date().toISOString();
            
            // 4. Monta a mensagem formatada para o WhatsApp
            let textoWhatsApp = `Olá, estou enviando um novo depoimento pelo site.\n\n`;
            textoWhatsApp += `*Nome:* ${nome}\n`;
            textoWhatsApp += `*Ocupação:* ${ocupacao}\n`;
            textoWhatsApp += `*Cidade:* ${cidade}\n`;
            textoWhatsApp += `*Enviou foto?:* ${temFoto}\n\n`;
            textoWhatsApp += `*Depoimento:*\n"${mensagem}"\n\n`;
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
