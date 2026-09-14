[🇧🇷 Português](./README.md) | [🇺🇸 English](./README.en.md)

# 🟠 Augusto Duarte — Site Oficial de Pré-Campanha

> *"Não basta prometer — é preciso entregar."*

Repositório do site institucional do pré-candidato a **Deputado Estadual por São Paulo** pelo partido **NOVO (30)**. Desenvolvido com foco em acessibilidade, performance, SEO e identidade visual forte para transmitir a trajetória de quem legislou e governou com responsabilidade.

Este repositório contém dois projetos distintos, que compartilham a mesma identidade visual e base de código, mas possuem propósitos e tamanhos diferentes:

1. **Site-AD**: O projeto completo e abrangente.
2. **Site-AD-MVP**: A versão Produto Mínimo Viável (MVP), mais enxuta e direta.

---

## 🌐 Sobre os Projetos

O objetivo de ambos os sites é apresentar ao eleitor a trajetória, o legado, a visão e incentivar a participação na pré-campanha de **Augusto Duarte Moreira Neto**.

### 1. Site-AD (Projeto Completo)
A versão completa do site, contendo todas as páginas e seções de engajamento da campanha, incluindo:
- **Páginas exclusivas**: Últimas Notícias, Agenda, Depoimentos, Galeria, Materiais, Ouvidoria e Área Restrita.
- **Seções detalhadas**: Hero completo, navegação extensa, formulário de Newsletter no rodapé, e histórico rico sobre o candidato.
- **Estrutura**: Todas as subpáginas estão organizadas dentro da pasta `/pages/`.

### 2. Site-AD-MVP (Produto Mínimo Viável)
Uma versão otimizada, focada estritamente na conversão rápida e na entrega da mensagem principal. Ideal para lançamentos iniciais ou campanhas focadas em tráfego rápido.
- **Páginas reduzidas**: Contém apenas as páginas fundamentais (Início, Trajetória, Legado, Visão Estadual, Voluntário, Privacidade, Mapa do Site e Acessibilidade).
- **Seções enxutas**: Removeu áreas dinâmicas ou que requerem atualização constante (Notícias, Depoimentos, Newsletter), substituindo-as por uma seção de convite direto para as **Redes Sociais** ("Minha TV é a Internet").
- **Estrutura**: Para facilitar hospedagem simples, todas as páginas ficam na pasta raiz (`/`).

> **Nota:** As melhorias de SEO (Meta tags, JSON-LD, Twitter Cards), ferramentas avançadas de acessibilidade, Modal de boas-vindas e novos layouts visuais de seções introduzidas no MVP foram retrocompatibilizadas e incorporadas ao **Site-AD**.

---

## 🛠️ Tecnologias

| Tecnologia | Finalidade |
|---|---|
| **HTML5** | Estrutura semântica com tags modernas (`<main>`, `<article>`, `<time>`, `<address>`) e Otimização para SEO (Schema.org) |
| **CSS3** | Design system com variáveis (Custom Properties), Flexbox, Grid e responsividade mobile-first |
| **JavaScript** | Menu mobile, controle do Modal, Aceite de Cookies (LGPD) e Menu de Acessibilidade (ARIA) |
| **Google Fonts** | Tipografia premium — Bebas Neue (títulos) + Inter (corpo) |
| **Phosphor Icons** | Iconografia moderna e consistente |

> **Zero frameworks. Zero dependências de build.** Os sites são puramente estáticos — leves, rápidos e hospedáveis em qualquer servidor.

---

## 📁 Estrutura do Repositório

```
Site-Augusto-Duarte/
├── Site-AD/                    ← Versão Completa do Site
│   ├── index.html
│   ├── pages/                  ← (Todas as 14 subpáginas)
│   └── assets/                 ← (CSS, Imagens, JS e Fontes)
│
└── Site-AD-MVP/                ← Versão Mínima Viável (MVP)
    ├── index.html
    ├── trajetoria.html         ← (Subpáginas na raiz)
    ├── voluntario.html
    └── assets/                 ← (CSS, Imagens, JS e Fontes)
```

---

## 🎨 Design System

Os projetos foram construídos sobre um **Design System próprio** com tokens semânticos reutilizáveis:
- **Paleta de cores:** Laranja NOVO, Azul Institucional, Amarelo, Verde e Branco
- **Tipografia:** Bebas Neue para títulos de impacto, Inter para leitura confortável
- **Espaçamento:** Escala harmônica com variáveis (`--space-2` até `--space-28`)
- **Componentes:** Botões, cards, seções, banners e navegação — reutilizáveis entre páginas

---

## ♿ Acessibilidade e SEO

Ambos os projetos possuem recursos avançados de acessibilidade:
- Menu Flutuante de Acessibilidade (Contraste escuro/claro, Fonte para dislexia, Espaçamento, Cursor, Destacar Links)
- VLibras Integrado
- Filtros de Daltonismo (Protanopia, Deuteranopia, Tritanopia) em SVG
- Skip link para navegação por teclado e Atributos ARIA
- Texto alternativo validado em todas as imagens
- Integração completa com metatags (Open Graph, Twitter Cards) e `application/ld+json`

---

## 🚀 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/GuilhermeACSM/Site-Augusto-Duarte.git
   ```

2. Escolha o projeto e abra o arquivo `index.html` no navegador:
   - Para o completo: `Site-AD/index.html`
   - Para o MVP: `Site-AD-MVP/index.html`

> Não é necessário instalar dependências como npm ou yarn para rodar a aplicação em si. O projeto é 100% estático.

---

---

## 👤 Créditos

- **Design & Desenvolvimento:** Anna Clara Sbrama dos Santos | Guilherme Augusto C. S. Moreira
- **Candidato:** Augusto Duarte Moreira Neto
- **Partido:** NOVO 30 — São Paulo

---

## 📄 Licença e Direitos Autorais

Este repositório é público e o código-fonte (estruturas HTML, CSS, e lógicas em JS) pode ser visualizado e utilizado para fins de estudo, portfólio e inspiração estrutural.

No entanto, **todos os direitos autorais sobre a identidade visual, logotipos, imagens, fotografias e textos (copywriting)** pertencem exclusivamente à campanha de Augusto Duarte. 
- 🚫 **Não é permitido** o uso, cópia ou distribuição da marca, fotos ou textos do candidato para outros fins.

---

<p align="center">
  <strong>NOVO 30 · Deputado Estadual · SP</strong><br>
  <sub>Propaganda eleitoral conforme Lei nº 9.504/97</sub>
</p>
