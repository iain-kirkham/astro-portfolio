# Cloud Resume Challenge Frontend

This repository contains the frontend implementation for the Cloud Resume Challenge. It provides the user interface for displaying my resume information fetched from the backend and features a dynamically updating visitor counter.
Please check out the [backend repository](https://github.com/iain-kirkham/cloud-resume-challenge-rust) for the backend code, and the Terraform configuration.

**Live Demo:** https://iainkirkham.dev

## ✨ Key Features:

 - **Portfolio Content:** Displays a curated selection of my projects, professional journey blog, and ways to connect.
 - **Dynamic Visitor Counter:** Implements a real-time updating visitor counter using React.js to interact with the Rust Lambda backend API.
 - **Responsive Design:** Built with Tailwind CSS to ensure a seamless experience across various devices and screen sizes.
 - **Modern Web Technologies:** Leverages Astro for a performant static site generation with React.js for interactive elements.
 - **Type Safety:** Utilises [TypeScript](https://www.typescriptlang.org/) for enhanced code quality and maintainability.
 - **End-to-End Testing:** Includes end-to-end tests using Playwright to ensure the application functions correctly from a user's perspective.

## 💻 Technologies Used:
 - **Static Site Generator:** [Astro](https://astro.build/)
 - **JavaScript Framework (for interactivity):** [React.js](https://react.dev/)
 - **Styling:** [Tailwind CSS](https://tailwindcss.com/)
 - **End-to-End Testing:** [Playwright](https://playwright.dev/)

## ⚠️ Requirements:

* **[Node.js](https://nodejs.org/en):** Version 18.x or higher.
* **[pnpm](https://pnpm.io/installation):** Package manager for JavaScript.

## Setup and Installation:

1. Install dependencies: `pnpm install`
2. Run the development server: `pnpm run dev` (Access at http://localhost:4321)
3. Build the static site: `pnpm run build` (Output in `dist/`)

## ⚙️ Testing:

This project includes end-to-end tests for the frontend, written with Playwright. These tests can be run using `pnpm exec playwright test`.

## 📁 Repository Structure:

```
├── .github/                  #Contains GitHub actions workflows for depolyment and testing
├── dist/                     #Website build output
├── playwright-report/        #Playwright testing reports
├── public/                   #Public assests such as fonts
├── src/                      #Website source folder
│   ├── blog/                 #Folder for markdown blogs
│   ├── components/           #Components for reuse
│   ├── data/                 #Scripts for data on website
│   ├── layouts/              #Layouts for reuse on website
│   ├── pages/                #Pages for website (uses file based routing)
│   │   ├── blog/             #Blog posts page
│   │   ├── projects/         #Project pages
│   │   └── tags/             #Tags for blog posts
│   ├── projects/             #Web page for projects
│   └── styles/               #CSS styling
│       ├── content.config.ts #Configuration for astro content
├── tests/
│   └── visitorcount.spec.ts  #Visitor count e2e playwright test
├── astro.config.mjs          #Astro configurations file
├── biome.json                #Configuration file for Biome formatter
├── package.json              #Website dependencies
├── playwright.config.ts      #Playwright config
└── pnpm-lock.yaml            #Pnpm package manager lockfile 
```