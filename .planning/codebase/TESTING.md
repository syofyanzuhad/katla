# Testing Patterns

## Overview
The project currently does not have an automated testing suite. A modern Vite-based testing stack is recommended to ensure game logic correctness and component reliability.

## Recommended Framework
- **Unit & Component Testing**: [Vitest](https://vitest.dev/) (native Vite support, Jest-compatible API).
- **Component Utilities**: `@vue/test-utils` for mounting and interacting with Vue 3 SFCs.
- **End-to-End (E2E)**: [Playwright](https://playwright.dev/) for full game flow verification (keyboard inputs, win/loss states).

## Testing Structure
- **Unit Tests**: Located in `src/utils/__tests__/*.test.js` (e.g., `userStats.test.js`).
- **Component Tests**: Located in `src/components/__tests__/*.spec.js` (e.g., `GameBoard.spec.js`).
- **E2E Tests**: Root `tests/e2e/` directory.

## Testing Strategy
### Unit Testing
Focus on business logic and persistence utilities:
- **`userStats.js`**: Verify UUID generation, stat calculations (win rate, streaks), and `localStorage` interactions.
- **Mocking**: Use Vitest's `vi.spyOn(Storage.prototype, 'getItem')` and `setItem` to mock `localStorage`.

### Component Testing
Ensure UI updates correctly based on game state:
- **`GameBoard.vue`**: Test keyboard input (physical and on-screen), word validation (length, dictionary), and state transitions (win/loss modals).
- **`StatsModal.vue`**: Verify props data rendering and event emission for closing/resetting stats.

### End-to-End Testing
Simulate full user journeys:
- Complete a game with a win/loss result.
- Verify share functionality (clipboard/social media links).
- Check persistence by reloading the page and verifying stats.

## Mocking & Coverage
- **API Requests**: Mock `fetch('/words.json')` to return a controlled set of words during tests.
- **Audio/Vibration**: Mock `window.Audio` and `navigator.vibrate` to avoid side effects.
- **Coverage**: Aim for high coverage on `src/utils/` and critical game logic in `src/components/GameBoard.vue`.
