# 🟠 Augusto Duarte — Site Oficial de Pré-Campanha

> *"Não basta prometer — é preciso entregar."*

Site institucional do pré-candidato a **Deputado Estadual por São Paulo** pelo partido **NOVO (30)**. Desenvolvido com foco em acessibilidade, performance e identidade visual forte para transmitir a trajetória de quem legislou e governou com responsabilidade.

---

## 🌐 Sobre o Projeto

Este projeto é o site oficial da pré-campanha de **Augusto Duarte Moreira Neto** — ex-vereador em Santos, ex-Secretário Municipal de Habitação e agora pré-candidato a Deputado Estadual.

O objetivo é apresentar ao eleitor:

- **A trajetória** — do plenário à gestão pública, e da gestão à Alesp.
- **O legado comprovado** — leis aprovadas, resultados na Secretaria de Habitação e entregas reais.
- **A visão estadual** — pautas que o candidato defende para São Paulo.
- **O convite à participação** — para voluntários, apoiadores e cidadãos que compartilham os mesmos valores.

---

## 🛠️ Tecnologias

| Tecnologia | Finalidade |
|---|---|
| **HTML5** | Estrutura semântica com tags modernas (`<main>`, `<article>`, `<time>`, `<address>`) |
| **CSS3** | Design system com variáveis (Custom Properties), Flexbox, Grid e responsividade mobile-first |
| **JavaScript** | Menu mobile com acessibilidade (ARIA) |
| **Google Fonts** | Tipografia premium — Bebas Neue (títulos) + Inter (corpo) |
| **Phosphor Icons** | Iconografia moderna e consistente |

> **Zero frameworks. Zero dependências de build.** O site é puramente estático — leve, rápido e hospedável em qualquer servidor.

---

## 📁 Estrutura do Projeto

```
Site-AD/
├── index.html                  ← Página inicial (Home)
├── pages/
│   ├── trajetoria.html         ← Trajetória política
│   ├── legado.html             ← Legado em Santos
│   ├── visao.html              ← Visão Estadual (em breve)
│   └── voluntario.html         ← Junte-se à Campanha (em breve)
├── assets/
│   ├── css/
│   │   ├── global.css          ← Design system (tokens, reset, componentes globais)
│   │   ├── index.css           ← Estilos específicos da Home
│   │   ├── trajetoria.css      ← Estilos específicos da Trajetória
│   │   └── legado.css          ← Estilos específicos do Legado
│   ├── js/
│   │   └── menu.js             ← Lógica do menu hambúrguer (mobile)
│   └── images/                 ← Fotos, logotipos e assets visuais
```

---

## 🎨 Design System

O projeto foi construído sobre um **Design System próprio** com tokens semânticos reutilizáveis:

- **Paleta de cores:** Laranja NOVO, Azul Institucional, Amarelo, Verde e Branco
- **Tipografia:** Bebas Neue para títulos de impacto, Inter para leitura confortável
- **Espaçamento:** Escala harmônica com variáveis (`--space-2` até `--space-28`)
- **Componentes:** Botões, cards, seções, banners e navegação — tudo reutilizável entre páginas

---

## ♿ Acessibilidade

- Skip link para navegação por teclado
- Atributos ARIA em todos os elementos interativos
- Texto alternativo em todas as imagens
- Contraste de cores validado
- Fontes responsivas com `clamp()` para leitura confortável em qualquer dispositivo

---

## 📱 Responsividade

O site foi projetado com a abordagem **mobile-first**, garantindo uma experiência impecável em:

- 📱 **Celulares** — layout empilhado, menu hambúrguer, fontes ampliadas
- 📟 **Tablets** — grades intermediárias, navegação adaptada
- 🖥️ **Desktops** — layout completo com foto no banner, navegação horizontal e rodapé em colunas

---

## 🚀 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/GuilhermeACSM/Site-Augusto-Duarte.git
   ```

2. Abra o arquivo `Site-AD/index.html` no navegador.

> Não é necessário instalar nada. O projeto é 100% estático.

---

## 👤 Créditos

- **Design & Desenvolvimento:** Anna Clara Sbrama dos Santos | Guilherme Augusto C. S. Moreira
- **Candidato:** Augusto Duarte Moreira Neto
- **Partido:** NOVO 30 — São Paulo

---

<p align="center">
  <strong>NOVO 30 · Deputado Estadual · SP</strong><br>
  <sub>Propaganda eleitoral conforme Lei nº 9.504/97</sub>
</p>
