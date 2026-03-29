<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="stats-title">
    <div ref="modalRef" class="bg-zinc-900 text-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative border border-zinc-800 transition-all duration-500 scale-in max-h-[90vh] overflow-y-auto">
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
        class="w-full py-4 bg-zinc-800 hover:bg-red-600/20 hover:text-red-400 hover:border-red-600/30 border border-white/5 text-zinc-400 rounded-2xl transition-all text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-red-500 outline-none mb-6"
      >
        Reset Statistik
      </button>

      <!-- Share Stats -->
      <div class="space-y-4 pt-6 border-t border-white/5">
        <button @click="handleShareStats" class="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-900/20 active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
          <span>Salin Statistik</span>
        </button>

        <div class="flex justify-center gap-3">
          <button @click="handleOpenStatsShare('whatsapp')" class="p-3 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white border border-green-500/20 rounded-xl transition-all active:scale-90" aria-label="Share stats to WhatsApp">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.191-1.624A11.722 11.722 0 0012.044 23.94h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </button>
          <button @click="handleOpenStatsShare('twitter')" class="p-3 bg-zinc-500/10 hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black hover:text-white border border-zinc-500/20 rounded-xl transition-all active:scale-90" aria-label="Share stats to X (Twitter)">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"/></svg>
          </button>
          <button @click="handleOpenStatsShare('telegram')" class="p-3 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500/20 rounded-xl transition-all active:scale-90" aria-label="Share stats to Telegram">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.441-.168.575-.337.767-.541.786-.448.041-.788-.297-1.223-.582-.68-.445-1.064-.722-1.725-1.157-.763-.503-.268-.78.166-1.233.114-.118 2.086-1.914 2.124-2.077.005-.02.009-.096-.03-.129-.039-.033-.097-.022-.139-.012-.06.014-.95.603-2.681 1.771-.254.174-.483.259-.688.253-.226-.006-.66-.129-.982-.232-.396-.126-.711-.19-.683-.401.014-.11.201-.223.562-.339 2.198-.956 3.663-1.587 4.395-1.893 2.09-.874 2.522-1.025 2.805-1.03.062 0 .201.015.291.097.076.069.097.162.105.233.008.074.011.223.001.32z"/></svg>
          </button>
        </div>

        <Transition name="fade">
          <div v-if="showShareMsg" class="py-2 text-center text-blue-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
            Statistik disalin!
          </div>
        </Transition>
      </div>
      
      <div class="text-[9px] text-zinc-600 text-center mt-6 uppercase tracking-[0.2em] font-bold opacity-50">
        ID: {{ userId.substring(0, 12) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, toRef } from 'vue'
import { useFocusTrap } from '../composables/useFocusTrap'
import { useShare } from '../composables/useShare'

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

const { showShareMsg, shareStats, openStatsShare } = useShare()

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

function handleShareStats() {
  shareStats(props.stats)
}

function handleOpenStatsShare(app) {
  openStatsShare(app, props.stats)
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
