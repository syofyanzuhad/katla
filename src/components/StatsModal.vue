<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="stats-title">
    <div ref="modalRef" class="bg-zinc-900 text-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative border border-zinc-800 transition-all duration-500 scale-in">
      <button
        @click="$emit('close')"
        aria-label="Tutup"
        class="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white hover:bg-white/10 transition-all rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 id="stats-title" class="text-3xl font-black mb-8 text-center tracking-tighter uppercase">Statistik</h2>

      <!-- Summary Stats Cards -->
      <div class="grid grid-cols-4 gap-3 mb-10" role="list">
        <div v-for="(val, label) in { 'Main': stats.totalGames, 'Menang': winRate + '%', 'Streak': stats.currentStreak, 'Max': stats.maxStreak }" :key="label" 
             class="bg-zinc-800/50 p-3 rounded-2xl border border-white/5 text-center flex flex-col justify-center" role="listitem">
          <div class="text-2xl font-black tracking-tight text-blue-400">{{ val }}</div>
          <div class="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">{{ label }}</div>
        </div>
      </div>

      <!-- Guess Distribution -->
      <div class="mb-10">
        <h3 class="text-sm font-black uppercase tracking-widest text-zinc-400 mb-4 px-1">Distribusi Tebakan</h3>
        <div class="space-y-2.5" role="list" aria-label="Grafik distribusi tebakan">
          <div v-for="i in 6" :key="i" class="flex items-center gap-3" role="listitem">
            <div class="text-xs font-black w-4 text-zinc-500" aria-hidden="true">{{ i }}</div>
            <div class="flex-1 h-6 bg-zinc-800/50 rounded-lg overflow-hidden border border-white/5">
              <div
                class="h-full bg-gradient-to-r from-green-600 to-green-400 text-white text-right pr-2.5 flex items-center justify-end text-[10px] font-black transition-all duration-1000 shadow-lg shadow-green-900/20"
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
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="bg-green-500/10 rounded-2xl p-4 text-center border border-green-500/20">
          <div class="text-2xl font-black text-green-400">{{ stats.wins }}</div>
          <div class="text-[10px] font-bold uppercase tracking-widest text-green-500/60 mt-1">Berhasil</div>
        </div>
        <div class="bg-red-500/10 rounded-2xl p-4 text-center border border-red-500/20">
          <div class="text-2xl font-black text-red-400">{{ stats.losses }}</div>
          <div class="text-[10px] font-bold uppercase tracking-widest text-red-500/60 mt-1">Gagal</div>
        </div>
      </div>

      <!-- Reset Button -->
      <button
        v-if="showResetButton"
        @click="$emit('reset-stats')"
        class="w-full py-4 bg-zinc-800 hover:bg-red-600/20 hover:text-red-400 hover:border-red-600/30 border border-white/5 text-zinc-400 rounded-2xl transition-all text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-red-500 outline-none"
      >
        Reset Statistik
      </button>
      
      <div class="text-[9px] text-zinc-600 text-center mt-6 uppercase tracking-[0.2em] font-bold opacity-50">
        ID: {{ userId.substring(0, 12) }}
      </div>
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
@keyframes scale-in {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.scale-in {
  animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
</style>
