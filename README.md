# 🎬✨ KakureAnime — React CRUD Video Club

![KakureAnime Preview](./src/assets/kakureanime-preview.png)

KakureAnime is a modern **Single Page Application (SPA)** built with **React + Vite** that simulates a digital video club focused on anime and movie content.  
It implements a **full CRUD workflow** connected to a mock REST API (**JSON Server**) and follows a clean, modular, and scalable frontend architecture, suitable for academic evaluation, portfolio presentation, and technical interviews

---

## 🧠 Architectural Overview

- SPA architecture using React (functional components)
- Clear separation of concerns: UI components, route-level pages, and service layer
- Reusable and composable component system
- Centralized API access layer to avoid UI–API coupling
- Mock REST backend to simulate real-world integration
- Structure designed to be scalable and maintainable

---

## ✨ Core Features

- 📃 List of anime and movies
- 🔍 Detailed view for each item
- ➕ Create new entries
- ✏️ Edit existing entries
- ❌ Delete items
- 🧩 Reusable layout and UI components
- ⚡ Fast development and build process with Vite

---

## 🧰 Technology Stack

### Frontend
- React (functional components)
- React Hooks
- JavaScript ES6+
- CSS (global and component-level styling)

### Data Layer
- JSON Server (mock REST API)
- Centralized API service layer

### Tooling
- Vite (development server and bundler)
- ESLint (code quality and consistency)
- npm (dependency management)

---

## 📁 Project Structure (Real)

KAKUREANIME/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Carrousel.jsx
│   │   ├── Layout.jsx
│   │   ├── MovieCard.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── AddMovie.jsx
│   │   ├── EditMovie.jsx
│   │   ├── Home.jsx
│   │   ├── Location.jsx
│   │   ├── MovieDetail.jsx
│   │   └── Movies.jsx
│   ├── services/
│   │   └── moviesApi.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── db.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

---

## 📂 Folder Responsibilities

- src/components/  
  Reusable UI components (presentation-first), used across multiple pages.

- src/pages/  
  Route-level views responsible for orchestration (fetching data, rendering screens, handling user flows).

- src/services/  
  Data access layer. Centralizes all REST operations (GET, POST, PUT, DELETE) and keeps UI decoupled from API details.

---

## 🔌 API Layer

All backend communication is abstracted through `src/services/moviesApi.js`, which:
- Centralizes REST calls and keeps the UI clean
- Improves maintainability and consistency
- Makes future migration to a real backend straightforward

---

## ⚙️ Installation and Execution

Clone the repository:
- git clone https://github.com/Maria19761976/kakureAnime.git

Install dependencies:
- npm install

Start the frontend (Vite):
- npm run dev

Start the mock backend (JSON Server):
- npx json-server --watch db.json

---

## 🧪 Development Concepts Applied

- Component-based architecture
- Controlled forms (create/edit)
- State-driven rendering
- RESTful CRUD operations
- Modular, maintainable project structure
- Clean naming conventions
- Team-based collaboration workflow

---

## 👥 Team and Roles

- David Navarro Oliver — Scrum and coordination
- Maria Pérez Otero — Product and requirements
- Javier Galvañ — Frontend development
- Facundo Garavagalia — Frontend development


