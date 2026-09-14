/**
 * Noticias.js
 * Gerencia a lógica do leitor de notícias (modal completo) e os filtros de categorias.
 */
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
  
    // ======================================
    // Filtros de Categoria (Página Completa)
    // ======================================
    const botoesFiltro = document.querySelectorAll('.filtro-btn');
    const cardsNoticia = document.querySelectorAll('.noticia-card');
  
    if (botoesFiltro.length > 0) {
      botoesFiltro.forEach(btn => {
        btn.addEventListener('click', function() {
          // Remove ativo de todos
          botoesFiltro.forEach(b => b.classList.remove('ativo'));
          // Adiciona no clicado
          this.classList.add('ativo');
  
          const categoria = this.getAttribute('data-categoria');
  
          // Filtra os cards
          cardsNoticia.forEach(card => {
            const tagCard = card.querySelector('.noticia-tag').textContent.trim().toLowerCase();
            
            if (categoria === 'todas' || tagCard === categoria) {
              card.style.display = 'flex';
              // Reaplica animação de reveal (opcional)
              card.classList.remove('revealed');
              setTimeout(() => card.classList.add('revealed'), 50);
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  
    // ======================================
    // Lógica do Modal Leitor de Notícia
    // ======================================
    const overlay = document.getElementById('modal-noticia-leitor');
    
    if (overlay) {
      const btnFechar = document.getElementById('modal-noticia-fechar');
      
      // Elementos internos do modal para receber conteúdo dinâmico
      const modalTag = overlay.querySelector('.modal-noticia-tag');
      const modalData = overlay.querySelector('.modal-noticia-data');
      const modalTitulo = overlay.querySelector('.modal-noticia-titulo');
      const modalTexto = overlay.querySelector('.modal-noticia-texto');
      const modalImagem = overlay.querySelector('.modal-noticia-imagem');
  
      // Banco de dados simulado das notícias (Na vida real viria de uma API ou JSON)
      const mockNoticias = {
        'noticia-1': {
          tag: 'Política',
          data: '15 de Agosto de 2026',
          titulo: 'Augusto Duarte defende redução de impostos para pequenos empresários',
          imagem: '../assets/images/webp/ad-banner-1.webp',
          conteudo: `
            <p>Em um encontro com lideranças do setor de comércio em São Paulo, o candidato a Deputado Estadual Augusto Duarte reafirmou seu compromisso com a classe empreendedora, defendendo propostas claras de desburocratização e redução da carga tributária estadual.</p>
            <p>"O pequeno empreendedor é o motor da nossa economia. Não podemos sufocar quem gera emprego e renda com impostos abusivos e processos morosos", destacou Augusto durante sua fala.</p>
            <p>A proposta, que faz parte de sua plataforma oficial, baseia-se na experiência de sua gestão pública em Santos, onde atuou focado na eficiência administrativa. O evento contou com a participação de mais de 300 microempresários.</p>
          `
        },
        'noticia-2': {
          tag: 'Campanha',
          data: '12 de Agosto de 2026',
          titulo: 'Encontro com lideranças em Santos reúne centenas de apoiadores',
          imagem: '../assets/images/webp/ad-oficial-1.webp',
          conteudo: `
            <p>Na noite desta quinta-feira, a orla de Santos foi palco de um encontro massivo de apoiadores da campanha de Augusto Duarte. O evento consolidou o apoio da Baixada Santista à sua candidatura para a Assembleia Legislativa.</p>
            <p>O foco do encontro foi debater soluções para a mobilidade urbana da região e a continuidade dos projetos de habitação, área na qual Augusto possui vasta experiência como ex-secretário.</p>
            <p>"É emocionante ver que as pessoas confiam no nosso trabalho. A Baixada Santista precisa de uma voz ativa e experiente na Alesp", concluiu o candidato, sendo ovacionado pelo público presente.</p>
          `
        },
        'noticia-3': {
          tag: 'Projetos',
          data: '08 de Agosto de 2026',
          titulo: 'Proposta de revitalização habitacional é apresentada na Alesp',
          imagem: '../assets/images/webp/ad-banner-1.webp',
          conteudo: `
            <p>Um dos pilares da visão estadual de Augusto Duarte acaba de ganhar forma. O projeto de revitalização habitacional foca na recuperação de áreas urbanas degradadas sem onerar o estado, através de Parcerias Público-Privadas.</p>
            <p>O modelo é inspirado em ações bem-sucedidas realizadas durante sua passagem pela Secretaria de Habitação. "A moradia digna é o princípio de uma sociedade estruturada. Podemos resolver isso com inteligência de mercado e responsabilidade social", afirmou.</p>
          `
        }
      };
  
      function abrirNoticia(id) {
        const dados = mockNoticias[id];
        if (!dados) return;
  
        // Preenche o modal
        modalTag.textContent = dados.tag;
        modalData.innerHTML = `<i class="ph-bold ph-calendar-blank"></i> ${dados.data}`;
        modalTitulo.textContent = dados.titulo;
        modalTexto.innerHTML = dados.conteudo;
        
        // Ajusta caminho da imagem dependendo de onde o modal é chamado (index vs subpage)
        const inPagesFolder = window.location.pathname.includes('/pages/');
        modalImagem.src = inPagesFolder ? dados.imagem : dados.imagem.replace('../', '');
        modalImagem.alt = dados.titulo;
  
        // Mostra o modal
        overlay.classList.add('visivel');
        document.body.style.overflow = 'hidden'; // Evita scroll atrás do modal
        
        // Foco para acessibilidade (com pequeno atraso para dar tempo da animação CSS)
        setTimeout(() => {
          btnFechar.focus();
        }, 100);
      }
  
      function fecharModal() {
        overlay.classList.remove('visivel');
        document.body.style.overflow = '';
      }
  
      // Adiciona o evento de clique e teclado em todos os botões/cards "Ler mais"
      const triggers = document.querySelectorAll('[data-noticia-id]');
      triggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
          e.preventDefault();
          const id = this.getAttribute('data-noticia-id');
          abrirNoticia(id);
        });

        trigger.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const id = this.getAttribute('data-noticia-id');
            abrirNoticia(id);
          }
        });
      });
  
      // ======================================
      // Acessibilidade: Focus Trap e Scroll
      // ======================================
      const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
      
      overlay.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          fecharModal();
          return;
        }

        if (e.key === 'Tab') {
          // Captura todos os elementos focáveis dentro do modal no momento
          let focusableElements = overlay.querySelectorAll(focusableElementsString);
          focusableElements = Array.prototype.slice.call(focusableElements);
          
          const firstTabStop = focusableElements[0];
          const lastTabStop = focusableElements[focusableElements.length - 1];

          // Shift + Tab
          if (e.shiftKey) {
            if (document.activeElement === firstTabStop) {
              e.preventDefault();
              lastTabStop.focus();
            }
          } 
          // Tab normal
          else {
            if (document.activeElement === lastTabStop) {
              e.preventDefault();
              firstTabStop.focus();
            }
          }
        }
      });

      // Botão fechar
      btnFechar.addEventListener('click', fecharModal);
  
      // Fechar no clique fora
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) fecharModal();
      });
    }
  });
