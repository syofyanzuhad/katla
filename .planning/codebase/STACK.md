# Technology Stack

## Core
- **Frontend Framework**: Vue.js 3
- **Language**: JavaScript (ESM)
- **Runtime**: Browser (Local Storage for persistence)
- **Build Tool**: Vite 6
- **Styling**: TailwindCSS 4 (with @tailwindcss/vite)

## State & Storage
- **Local Storage**: Managed in `src/utils/userStats.js` for:
  - User statistics (wins, losses, streaks)
  - Game history (last 100 games)
  - User identity (UUID)
- **Static Data**: `public/words.json` (138KB word list)

## Utilities & Libraries
- **Routing**: Vue Router 4
- **Animations**: `canvas-confetti` (for win celebrations)
- **PWA Support**: `vite-plugin-pwa` (with manifest and service worker auto-update)
- **Icons**: `/katla.png` (512x512)

## CSS Frameworks
- **TailwindCSS 4**: Used for all UI styling with modern CSS-in-JS/Vite integration.
- **PostCSS**: Used for CSS transformations (via Autoprefixer).

## Deployment & Configuration
- **Vite Configuration**: `vite.config.js` (Plugins: Vue, Tailwind, PWA)
- **Package Manager**: npm (v10.x+ recommended)
- **Environment**: Client-side single-page application (SPA)
