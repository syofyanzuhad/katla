<script setup>
import GameBoard from './components/GameBoard.vue'
import PwaInstallBanner from './components/PwaInstallBanner.vue'
</script>

<template>
  <GameBoard />
  <PwaInstallBanner />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
