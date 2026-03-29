# External Integrations

## APIs & External URLs
- **KBBI (Kamus Besar Bahasa Indonesia)**:
  - **URL**: `https://kbbi.kemdikbud.go.id/entri/${word}`
  - **Usage**: Redirects users to the KBBI website to see word definitions after a game.
  - **Implementation**: Handled in `src/router.js` via `KbbiRedirect` component and in `src/components/GameBoard.vue`.

## Social Sharing
- **WhatsApp**:
  - **URL**: `https://wa.me/?text=${text}`
  - **Usage**: Sharing game results with formatted emojis.
- **Twitter/X**:
  - **URL**: `https://twitter.com/intent/tweet?text=${text}`
  - **Usage**: Sharing game results.
- **Telegram**:
  - **URL**: `https://t.me/share/url?text=${text}`
  - **Usage**: Sharing game results.

## Data Persistence & Identity
- **Local Storage**:
  - **katla_user_id**: Stores a randomly generated UUID v4 for persistent user identity.
  - **katla_user_stats**: Stores user wins, losses, current and max streaks, and guess distribution.
  - **katla_game_history**: Stores details for the last 100 played games.

## Potential/Future Integrations
- **Appwrite**:
  - **Package**: `appwrite` (^18.0.0)
  - **Status**: Present in `package.json` but currently unused.
  - **Likely Purpose**: Intended for cloud synchronization of user statistics and leaderboard functionality.

## Native Browser APIs
- **Web Share API**: Uses `navigator.clipboard` for result copying.
- **Vibration API**: Uses `navigator.vibrate` for haptic feedback on errors and key presses.
- **PWA (Progressive Web App)**:
  - **Manifest**: `public/katla.png`, `public/robots.txt`, `public/vite.svg`.
  - **Service Workers**: Managed by `vite-plugin-pwa` for offline capabilities and installation.
