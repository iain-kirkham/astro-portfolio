# Cloud Resume Challenge Frontend

This repository contains the frontend implementation for my Cloud Resume Challenge website. It provides the user interface for resume content, project/blog pages, and a dynamically updating visitor counter.

For backend and infrastructure code, see the [backend repository](https://github.com/iain-kirkham/cloud-resume-challenge-rust).

**Live Demo:** https://iainkirkham.dev

## ✨ Key Features

- **Portfolio Content:** Displays a curated selection of projects, blog posts, and contact links.
- **Dynamic Visitor Counter:** Uses React to call the Rust Lambda API and update counts in real time.
- **Responsive Design:** Built with Tailwind CSS for consistent behavior across device sizes.
- **Modern Web Stack:** Astro for static pages with selective React interactivity.
- **Type Safety:** TypeScript used across the frontend codebase.
- **End-to-End Testing:** Playwright tests validate user-facing behavior.

## 🚀 Performance Optimisations

- **Font fallback optimisation (Fontaine):** `FontaineTransform.vite(...)` is configured in `astro.config.mjs` to generate metric-compatible fallbacks (using Arial) and reduce layout shift while custom fonts load.
- **Efficient font loading:** Fonts are preloaded in `src/layouts/BaseLayout.astro`, and `font-display: swap` is used in `src/styles/global.css`.
- **Inlining at build time:** `playformInline()` in `astro.config.mjs` inlines eligible assets to reduce extra requests.
- **Asset minimisation/compression:** `playformCompress()` in `astro.config.mjs` compresses build output for smaller payloads.
- **Static-first rendering:** Astro's static output keeps runtime JavaScript low by default, with hydration only where needed.

## 💻 Technologies Used

- **Static Site Generator:** [Astro](https://astro.build/)
- **Interactivity:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Testing:** [Playwright](https://playwright.dev/)

## ⚠️ Requirements

* **[Node.js](https://nodejs.org/en):** Version 22.x or higher.
* **[pnpm](https://pnpm.io/installation):** Package manager for JavaScript.

## Setup and Installation

1. Install dependencies: `pnpm install`
2. Run the development server: `pnpm run dev` (Access at http://localhost:4321)
3. Build the static site: `pnpm run build` (Output in `dist/`)

## ⚙️ Testing

This project includes end-to-end tests for the frontend, written with Playwright. These tests can be run using `pnpm exec playwright test`.

## 📁 Repository Structure

```
├── .github/                  # Contains GitHub Actions workflows for deployment and testing
├── dist/                     #Website build output
├── playwright-report/        #Playwright testing reports
├── public/                   # Public assets such as fonts
├── src/                      # Website source folder
│   ├── blog/                 # Markdown blog content
│   ├── components/           # Reusable components
│   ├── data/                 # Shared data utilities
│   ├── layouts/              # Reusable page layouts
│   ├── pages/                # Pages (file-based routing)
│   │   ├── blog/             #Blog posts page
│   │   ├── projects/         #Project pages
│   │   └── tags/             #Tags for blog posts
│   ├── projects/             # Project content
│   ├── content.config.ts     # Configuration for Astro content
│   └── styles/               # Global styles
├── tests/
│   └── visitorcount.spec.ts  #Visitor count e2e playwright test
├── astro.config.mjs          #Astro configurations file
├── biome.json                #Configuration file for Biome formatter
├── package.json              #Website dependencies
├── playwright.config.ts      #Playwright config
└── pnpm-lock.yaml            #Pnpm package manager lockfile 
```