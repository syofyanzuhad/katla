<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" role="dialog" aria-modal="true" aria-labelledby="stats-title">
    <div ref="modalRef" class="bg-zinc-800 text-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
      <button
        @click="$emit('close')"
        aria-label="Tutup"
        class="absolute top-3 right-3 text-2xl text-zinc-400 hover:text-white transition p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        &times;
      </button>

      <h2 id="stats-title" class="text-2xl font-bold mb-6 text-center">Statistik</h2>

      <!-- Summary Stats -->
      <div class="grid grid-cols-4 gap-2 mb-6" role="list">
        <div class="text-center" role="listitem">
          <div class="text-3xl font-bold">{{ stats.totalGames }}</div>
          <div class="text-xs text-zinc-400">Main</div>
        </div>
        <div class="text-center" role="listitem">
          <div class="text-3xl font-bold">{{ winRate }}%</div>
          <div class="text-xs text-zinc-400">Menang</div>
        </div>
        <div class="text-center" role="listitem">
          <div class="text-3xl font-bold">{{ stats.currentStreak }}</div>
          <div class="text-xs text-zinc-400">Streak</div>
        </div>
        <div class="text-center" role="listitem">
          <div class="text-3xl font-bold">{{ stats.maxStreak }}</div>
          <div class="text-xs text-zinc-400">Max Streak</div>
        </div>
      </div>

      <!-- Guess Distribution -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-3">Distribusi Tebakan</h3>
        <div class="space-y-1" role="list" aria-label="Grafik distribusi tebakan">
          <div v-for="i in 6" :key="i" class="flex items-center gap-2" role="listitem">
            <div class="text-sm w-4" aria-hidden="true">{{ i }}</div>
            <div class="flex-1 bg-zinc-700 rounded overflow-hidden">
              <div
                class="bg-green-600 text-white text-right pr-2 py-1 text-xs font-bold transition-all duration-500"
                :style="{ width: getBarWidth(i) + '%', minWidth: stats.guessDistribution[i] > 0 ? '2rem' : '0' }"
                :aria-label="`Menebak dalam ${i} percobaan: ${stats.guessDistribution[i]} kali`"
              >
                {{ stats.guessDistribution[i] || '' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Win/Loss Stats -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="bg-green-900 bg-opacity-30 rounded-lg p-3 text-center border border-green-700">
          <div class="text-2xl font-bold text-green-400">{{ stats.wins }}</div>
          <div class="text-xs text-zinc-300">Menang</div>
        </div>
        <div class="bg-red-900 bg-opacity-30 rounded-lg p-3 text-center border border-red-700">
          <div class="text-2xl font-bold text-red-400">{{ stats.losses }}</div>
          <div class="text-xs text-zinc-300">Kalah</div>
        </div>
      </div>

      <!-- User ID (for debugging) -->
      <div class="text-xs text-zinc-500 text-center mt-4 font-mono">
        User ID: {{ userId.substring(0, 8) }}...
      </div>

      <!-- Reset Button (Optional) -->
      <button
        v-if="showResetButton"
        @click="$emit('reset-stats')"
        class="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm focus:ring-2 focus:ring-red-400"
      >
        Reset Semua Statistik
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, toRef } from 'vue'
import { useFocusTrap } from '../composables/useFocusTrap'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  stats: {
    type: Object,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  showResetButton: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close', 'reset-stats'])

const modalRef = ref(null)
useFocusTrap(modalRef, toRef(props, 'show'))

const winRate = computed(() => {
  if (props.stats.totalGames === 0) return 0
  return Math.round((props.stats.wins / props.stats.totalGames) * 100)
})

const maxDistribution = computed(() => {
  return Math.max(...Object.values(props.stats.guessDistribution))
})

function getBarWidth(guessNumber) {
  const count = props.stats.guessDistribution[guessNumber]
  if (count === 0) return 0
  if (maxDistribution.value === 0) return 0
  return (count / maxDistribution.value) * 100
}
</script>

<style scoped>
/* Animation for modal */
</style>
