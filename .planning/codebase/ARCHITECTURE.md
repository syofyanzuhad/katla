# Architecture

## Pattern
This codebase follows a **Vue 3 Single-Page Application (SPA)** architecture using the **Composition API**. It utilizes a component-based model where the UI and logic are encapsulated within Vue Single-File Components (SFCs).

## Layers

### 1. Presentation Layer (Vue Components)
- **`App.vue`**: The root component that manages the application shell, including the `router-view` and global UI elements like the `PwaInstallBanner`.
- **`GameBoard.vue`**: The core functional component. It manages the game state (guesses, current word, game status), handles user input (virtual and physical keyboard), and coordinates animations/sounds.
- **Modals (`StatsModal.vue`, `InfoModal.vue`)**: Specialized components for displaying information without navigating away from the game.

### 2. Logic/Utility Layer
- **`src/utils/userStats.js`**: Decouples the game logic from persistence and statistical calculations. It manages user identity (UUID generation) and game history.
- **`src/router.js`**: Defines the application's routing structure, including a functional redirect for KBBI lookups.

### 3. Data & Storage Layer
- **Local Storage**: Used via `userStats.js` for persistent storage of user IDs, game statistics, and history.
- **Static Assets**: `words.json` serves as the primary data source for valid game words, fetched asynchronously during the initialization of the `GameBoard`.

## Data Flow
1. **Initialization**: `main.js` mounts the Vue application. `GameBoard.vue` fetches the word list from `/words.json`.
2. **Game Loop**:
    - User input triggers state updates in `GameBoard.vue`.
    - Guesses are validated against the fetched word list.
    - Resulting statuses (correct, present, absent) are calculated and reflected in the UI (box colors, keyboard colors).
3. **Persistence**: Upon game completion (win or loss), `recordGameResult` and `addGameToHistory` are called in the utility layer, which updates `localStorage`.
4. **UI Synchronization**: Reactive state in Vue ensures that the UI (including stats modals) remains in sync with the underlying data.

## Abstractions
- **Persistence Abstraction**: `userStats.js` provides a clean API for statistics, shielding components from direct interaction with `localStorage`.
- **Game Status Logic**: Encapsulated within `getLetterStatuses` and reactive state variables in `GameBoard.vue`.

## Entry Points
- **Client Entry**: `src/main.js` (bootstraps the Vue app).
- **Template Entry**: `index.html`.
- **Style Entry**: `src/style.css` (Tailwind CSS imports).
