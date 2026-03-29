<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'
import PwaInstallBanner from './components/PwaInstallBanner.vue'

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW()

const close = () => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <router-view />
  <PwaInstallBanner />

  <!-- PWA Update Notification -->
  <Transition name="slide-up">
    <div v-if="offlineReady || needRefresh" 
      class="fixed left-1/2 -translate-x-1/2 bottom-20 w-[95vw] max-w-md mx-auto flex flex-col gap-3 p-4 bg-zinc-900/90 text-white rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md z-[60]">
      <div class="flex items-start gap-3">
        <span class="text-2xl">{{ offlineReady ? '✨' : '🚀' }}</span>
        <div class="flex-1">
          <p class="font-bold text-sm">
            {{ offlineReady ? 'Ready to play offline!' : 'New version available!' }}
          </p>
          <p class="text-xs text-zinc-400 mt-0.5">
            {{ offlineReady ? 'App is now cached and ready.' : 'A new update is ready to improve your experience.' }}
          </p>
        </div>
        <button @click="close" class="text-zinc-500 hover:text-white p-1 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
      <div v-if="needRefresh" class="flex gap-2 mt-1">
        <button @click="updateServiceWorker()" 
          class="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/20">
          Update Now
        </button>
      </div>
    </div>
  </Transition>
</template>

<style>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.slide-up-enter-from {
  transform: translate(-50%, 100%);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translate(-50%, 100%);
  opacity: 0;
}
</style>
