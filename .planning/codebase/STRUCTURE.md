# Directory Structure

## Layout
The codebase is structured as a standard Vite-powered Vue 3 project with clearly separated concerns for assets, components, and utilities.

- **`/`**: Project root. Contains configuration files for building, linting, and environment setup.
- **`/public/`**: Static public assets that are served as-is by Vite.
    - **`words.json`**: Core word database for the game.
    - **`*.mp3`**: Sound effects for game interactions.
    - **`katla.png`**: PWA manifest icon.
- **`/src/`**: Main source code for the application.
    - **`/assets/`**: Images and static source assets processed by Vite.
    - **`/components/`**: Reusable Vue SFC components.
    - **`/utils/`**: Shared JavaScript logic, persistence managers, and business rules.
- **`/.planning/`**: Architectural documentation and planning resources.

## Key Locations
- **`src/main.js`**: Application bootstrapping and global library registration.
- **`src/App.vue`**: Root component managing the high-level layout and router view.
- **`src/components/GameBoard.vue`**: Primary game container and state holder.
- **`src/utils/userStats.js`**: Centralized logic for persistence and stats management.
- **`vite.config.js`**: Build pipeline, PWA configuration, and Tailwind CSS integration.

## Naming Conventions
- **Vue Components**: `PascalCase.vue` (e.g., `StatsModal.vue`).
- **Scripts/Utilities**: `camelCase.js` (e.g., `userStats.js`).
- **Styles**: Standard CSS and utility-first Tailwind classes.
- **Routing**: `src/router.js` uses standard Vue Router path conventions.
- **Assets**: `kebab-case` for static files in `/public`.
