<template>
  <transition name="slide-up">
    <div v-if="showBanner"
      class="fixed left-1/2 -translate-x-1/2 bottom-4 w-[95vw] max-w-md mx-auto flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 text-white rounded-xl shadow-lg z-50 text-sm sm:text-base dark:shadow-zinc-800">
      <span class="flex-1">Install Katla for a better experience!</span>
      <button @click="installPwa" class="bg-green-600 hover:bg-green-700 text-white font-bold rounded px-4 py-2 transition-colors">Install</button>
      <button @click="closeBanner" class="ml-2 text-white text-xl leading-none hover:text-zinc-400">&times;</button>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showBanner = ref(false)
let deferredPrompt = null

function installPwa() {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then(() => {
      showBanner.value = false
      deferredPrompt = null
    })
  }
}

function closeBanner() {
  showBanner.value = false
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    showBanner.value = true
  })
  window.addEventListener('appinstalled', () => {
    showBanner.value = false
    deferredPrompt = null
  })
})
</script> 