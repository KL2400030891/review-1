# 🎨 Placement System Frontend

The frontend of the **Placement Interaction System** is built using **React 19** and **Vite**, featuring a premium design system based on Glassmorphism and modern CSS practices.

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## 🏗️ Architecture

- **Context API**: Used for authentication state management (`AuthContext`).
- **Framer Motion**: Handles all micro-interactions and page transitions.
- **Modern CSS**: Uses CSS variables for theming and Glassmorphism effects.
- **Atomic Routing**: Clean route definitions in `App.jsx`.

## 📂 Structure

- `src/components/`: Layouts and reusable UI elements.
- `src/pages/`: Feature-specific screens (Dashboards, Job views, etc.).
- `src/context/`: Global state providers.
- `src/data/`: Mock data for development and testing.

## 🧪 Development Notes

Currently, the system uses **Mock Authentication** to facilitate frontend-only development and testing. To transition to a live backend, update `AuthContext.jsx` and the API endpoints in the `pages/` directory.

---
*Powered by React & Vite*
