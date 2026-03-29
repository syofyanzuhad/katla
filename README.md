# Katla 🟩

[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5a0fc8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Katla** is a premium, multi-language Wordle clone — guess the 5-letter word in 6 tries. It supports both **Indonesian** 🇮🇩 and **English** 🇺🇸, features daily and random game modes, and is fully installable as a Progressive Web App (PWA).

---

## ✨ Features

- 🎯 **5-letter word guessing** with up to 6 attempts
- 📅 **Daily mode** — one word per day, consistent for all players
- 🔀 **Random mode** — play as many rounds as you like
- 🇮🇩 **Indonesian & 🇺🇸 English** word lists with localized UI
- 📖 **KBBI integration** — tap any Indonesian word to look it up in the official dictionary
- 🎨 **Modern UI** — glassmorphism design, smooth animations (flip, pop, shake), dark theme
- 📊 **Statistics** — win rate, current streak, max streak, guess distribution chart
- ♿ **Accessibility** — full ARIA support, focus trapping in modals, keyboard navigation
- 📲 **PWA** — installable on mobile and desktop, works offline
- 🔊 **Sound effects** — audio feedback for key presses, wins, and errors
- 🏆 **Shareable results** — copy your colour-grid result with one tap

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Vue 3](https://vuejs.org/) with `<script setup>` |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Routing | [Vue Router 4](https://router.vuejs.org/) |
| PWA | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) |
| Confetti | [canvas-confetti](https://github.com/catdad/canvas-confetti) |
| Unit tests | [Vitest](https://vitest.dev/) + [@vue/test-utils](https://test-utils.vuejs.org/) |
| E2E tests | [Playwright](https://playwright.dev/) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20.19 or later
- [npm](https://www.npmjs.com/) v9 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/syofyanzuhad/katla.git
cd katla

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The compiled output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### End-to-End Tests

```bash
npm run e2e
```

---

## 🎮 How to Play

1. Type a valid 5-letter word using the on-screen keyboard or your physical keyboard.
2. Press **ENTER** to submit your guess.
3. The tiles change colour to give you hints:
   - 🟩 **Green** — correct letter, correct position
   - 🟨 **Yellow** — correct letter, wrong position
   - ⬜ **Grey** — letter is not in the word
4. Keep guessing until you find the word or run out of attempts.
5. Switch between **Indonesian** and **English** using the language button in the toolbar.
6. Toggle between **Daily** and **Random** modes using the mode button.

---

## 📁 Project Structure

```
katla/
├── public/
│   ├── words_id.json        # Indonesian word list
│   ├── words_en.json        # English word list
│   └── *.mp3                # Sound effects
├── src/
│   ├── components/
│   │   ├── GameBoard.vue    # Main game board & keyboard
│   │   ├── InfoModal.vue    # How-to-play modal
│   │   ├── StatsModal.vue   # Statistics modal
│   │   └── PwaInstallBanner.vue
│   ├── composables/
│   │   ├── useGameLogic.js  # Core game state & logic
│   │   ├── useShare.js      # Result sharing
│   │   ├── useTheme.js      # Dark/light theme
│   │   ├── useAudio.js      # Sound effects
│   │   └── useFocusTrap.js  # Accessibility focus trap
│   ├── utils/               # Date utilities & helpers
│   ├── constants.js         # WORD_LENGTH, MAX_ATTEMPTS
│   ├── router.js            # Vue Router config + KBBI redirect
│   └── main.js
├── tests/
│   ├── unit/                # Vitest unit tests
│   └── e2e/                 # Playwright e2e tests
├── vite.config.js
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

