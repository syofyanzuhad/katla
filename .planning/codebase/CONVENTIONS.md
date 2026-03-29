# Coding Conventions

## Overview
This project is a Vue 3 application built with Vite and Tailwind CSS. It follows modern Vue development practices, prioritizing the Composition API and utility-first styling.

## Architecture & Patterns
- **Component Model**: Vue 3 Single File Components (SFCs) using `<script setup>`.
- **Reactivity**: standard Vue `ref` and `computed` properties for state management.
- **Persistence**: Game statistics and history are managed via `localStorage` in the `src/utils/userStats.js` module.
- **Routing**: Vue Router for handling navigation (e.g., KBBI redirects).
- **Communication**: Props for parent-to-child and Emits for child-to-parent communication.

## Naming Conventions
- **Components**: PascalCase (e.g., `GameBoard.vue`, `StatsModal.vue`).
- **Files**: camelCase for JavaScript utilities (e.g., `userStats.js`).
- **Functions/Variables**: camelCase (e.g., `loadWords`, `targetWord`).
- **CSS Classes**: Tailwind CSS utility classes in HTML; minimal custom CSS using lowercase-hyphenated names if needed.

## Code Style
- **Indentation**: 2 spaces.
- **Semicolons**: Not used (ASI is relied upon).
- **Quotes**: Single quotes for JavaScript strings.
- **Directives**: Shorthand syntax preferred (`@click` instead of `v-on:click`, `:` instead of `v-bind:`).

## Error Handling
- **Asynchronous Operations**: `try...catch` blocks for `fetch` and other async calls.
- **User Feedback**: Reactive `toast` notifications for validation errors (e.g., word length, dictionary check).

## Styling
- **Utility-First**: Extensive use of Tailwind CSS directly in templates.
- **Responsive Design**: Mobile-first approach using Tailwind's breakpoint prefixes (e.g., `sm:`, `lg:`).
- **Interactive Elements**: Custom transition classes for keyboard and game board animations.
