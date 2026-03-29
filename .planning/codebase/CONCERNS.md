# Codebase Concerns

## Technical Debt

### Dependency Management
- **Unused Dependency:** `appwrite` is included in `package.json` but not used in the codebase.
- **Outdated Vue:** `package.json` specifies `vue: ^3.0.0`, which is significantly behind current releases (3.5.x).
- **Missing Testing Infrastructure:** There are no tests (Vitest, Cypress, or Jest) configured. This is a critical gap for a logic-heavy game.

### Architecture
- **"God Component":** `src/components/GameBoard.vue` handles game logic, state management, UI, audio, and modals in a single ~300-line script block. This should be refactored into composables (e.g., `useGameLogic`, `useAudio`, `useShare`).
- **Logic Duplication:** `getLetterStatuses` is used to calculate results and also determining UI states (key colors, box colors). This leads to redundant computations.
- **Inline Component:** `KbbiRedirect` in `router.js` is defined as a template string rather than a Single File Component (SFC).

### Maintainability
- **Hardcoded Constants:** Word length (5) and max attempts (6) are hardcoded across multiple functions and templates. These should be centralized constants.
- **Inconsistent Animation Handling:** Some animations like `slide-up` (in `PwaInstallBanner.vue`) are referenced but not defined within the SFC, leading to "mystery CSS" dependency.

## Known Issues & Bugs

### Potential Runtime Errors
- **Reference Error in `onUnmounted`:** `GameBoard.vue` attempts to clear `warnInterval` even though the interval definition is commented out or missing, which may throw a `ReferenceError` on component unmount.
- **Insecure UUID Generation:** `userStats.js` uses `Math.random()` for UUIDs. Modern browsers provide `crypto.randomUUID()` which is more reliable.
- **Lack of Error Handling:** `JSON.parse` for `localStorage` data in `userStats.js` is not wrapped in try-catch. If storage data is corrupted, the application will crash on load.

### Game Logic
- **Missing Uniqueness for Stats:** `recordGameResult` does not check if a result has already been recorded for a specific game instance, potentially allowing for "duplicate" stat recording if triggered multiple times.

## Security

### Data Integrity
- **Local Persistence Only:** Game progress and user stats are stored only in `localStorage`. There is no cloud synchronization or backup mechanism, meaning stats are lost if the user clears browser data.

### Analytics
- **Redundant Scripts:** `index.html` loads two separate Umami analytics scripts (`cloud.umami.is` and a self-hosted instance). This may lead to duplicate tracking or unnecessary network overhead.

## Performance

### Initial Load
- **Fetched Word Dictionary:** `words.json` (138KB) is fetched in its entirety on mount. While acceptable now, this pattern doesn't scale well if the dictionary grows significantly or if multiple languages are added.

### UI Reactivity
- **Redundant Computations:** UI methods like `getBoxClass` and `getKeyClass` perform status calculations on every render, which could impact performance on lower-end devices as the game progresses.

## Fragile Areas

### Accessibility (a11y)
- **Modal Focus:** Focus management for `StatsModal` and `InfoModal` is likely missing (focus is not trapped within the modal when open).
- **Grid Navigation:** Keyboard navigation is limited to letter input; screen reader support for the game's state (correct/present/absent) is lacking.

### Responsiveness
- **Fixed Grid Dimensions:** CSS classes for grid items (e.g., `w-15 h-15`) might be too rigid for very small screens or unusual aspect ratios.
