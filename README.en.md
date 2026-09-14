[🇧🇷 Português](./README.md) | [🇺🇸 English](./README.en.md)

# 🟠 Augusto Duarte — Official Pre-Campaign Website

> *"It's not enough to promise — you have to deliver."*

Repository of the institutional website for the pre-candidate for **State Deputy for São Paulo** for the **NOVO (30)** party. Developed with a focus on accessibility, performance, SEO, and strong visual identity to convey the trajectory of someone who has legislated and governed responsibly.

This repository contains two distinct projects that share the same visual identity and codebase, but have different purposes and sizes:

1. **Site-AD**: The full and comprehensive project.
2. **Site-AD-MVP**: The Minimum Viable Product (MVP) version, leaner and more direct.

---

## 🌐 About the Projects

The goal of both sites is to present to the voter the trajectory, legacy, vision, and to encourage participation in the pre-campaign of **Augusto Duarte Moreira Neto**.

### 1. Site-AD (Full Project)
The complete version of the site, containing all pages and campaign engagement sections, including:
- **Exclusive pages**: Latest News, Schedule, Testimonials, Gallery, Materials, Ombudsman, and Restricted Area.
- **Detailed sections**: Full Hero, extensive navigation, Newsletter form in the footer, and rich history about the candidate.
- **Structure**: All subpages are organized within the `/pages/` folder.

### 2. Site-AD-MVP (Minimum Viable Product)
An optimized version, strictly focused on fast conversion and delivering the main message. Ideal for initial launches or campaigns focused on quick traffic.
- **Reduced pages**: Contains only the fundamental pages (Home, Trajectory, Legacy, State Vision, Volunteer, Privacy, Sitemap, and Accessibility).
- **Lean sections**: Removed dynamic areas or those requiring constant updates (News, Testimonials, Newsletter), replacing them with a direct invitation section for **Social Media** ("My TV is the Internet").
- **Structure**: To facilitate simple hosting, all pages are in the root folder (`/`).

> **Note:** The SEO improvements (Meta tags, JSON-LD, Twitter Cards), advanced accessibility tools, Welcome Modal, and new visual layouts of sections introduced in the MVP were backported and incorporated into **Site-AD**.

---

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure with modern tags (`<main>`, `<article>`, `<time>`, `<address>`) and SEO Optimization (Schema.org) |
| **CSS3** | Design system with variables (Custom Properties), Flexbox, Grid, and mobile-first responsiveness |
| **JavaScript** | Mobile menu, Modal control, Cookie Acceptance (LGPD), and Accessibility Menu (ARIA) |
| **Google Fonts** | Premium typography — Bebas Neue (headings) + Inter (body) |
| **Phosphor Icons** | Modern and consistent iconography |

> **Zero frameworks. Zero build dependencies.** The sites are purely static — light, fast, and hostable on any server.

---

## 📁 Repository Structure

```
Site-Augusto-Duarte/
├── Site-AD/                    ← Full Website Version
│   ├── index.html
│   ├── pages/                  ← (All 14 subpages)
│   └── assets/                 ← (CSS, Images, JS, and Fonts)
│
└── Site-AD-MVP/                ← Minimum Viable Product (MVP) Version
    ├── index.html
    ├── trajetoria.html         ← (Subpages in root)
    ├── voluntario.html
    └── assets/                 ← (CSS, Images, JS, and Fonts)
```

---

## 🎨 Design System

The projects were built on a **custom Design System** with reusable semantic tokens:
- **Color palette:** NOVO Orange, Institutional Blue, Yellow, Green, and White
- **Typography:** Bebas Neue for impact headings, Inter for comfortable reading
- **Spacing:** Harmonic scale with variables (`--space-2` to `--space-28`)
- **Components:** Buttons, cards, sections, banners, and navigation — reusable across pages

---

## ♿ Accessibility and SEO

Both projects have advanced accessibility features:
- Floating Accessibility Menu (Dark/light contrast, Dyslexia font, Spacing, Cursor, Highlight Links)
- Integrated VLibras (Brazilian Sign Language)
- Color Blindness Filters (Protanopia, Deuteranopia, Tritanopia) in SVG
- Skip link for keyboard navigation and ARIA Attributes
- Validated alternative text on all images
- Full integration with meta tags (Open Graph, Twitter Cards) and `application/ld+json`

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/GuilhermeACSM/Site-Augusto-Duarte.git
   ```

2. Choose the project and open the `index.html` file in your browser:
   - For the full site: `Site-AD/index.html`
   - For the MVP: `Site-AD-MVP/index.html`

> No need to install dependencies like npm or yarn to run the application itself. The project is 100% static.

---

---

## 👤 Credits

- **Design & Development:** Anna Clara Sbrama dos Santos | Guilherme Augusto C. S. Moreira
- **Candidate:** Augusto Duarte Moreira Neto
- **Party:** NOVO 30 — São Paulo

---

## 📄 License and Copyright

This repository is public and the source code (HTML, CSS structures, and JS logic) can be viewed and used for study, portfolio, and structural inspiration purposes.

However, **all copyrights to the visual identity, logos, images, photographs, and texts (copywriting)** belong exclusively to Augusto Duarte's campaign. 
- 🚫 **It is not allowed** to use, copy, or distribute the brand, photos, or texts of the candidate for other purposes.

---

<p align="center">
  <strong>NOVO 30 · State Deputy · SP</strong><br>
  <sub>Electoral advertising according to Law nº 9.504/97 (Brazil)</sub>
</p>
