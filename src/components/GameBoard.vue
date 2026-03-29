<template>
  <div class="min-h-screen max-w-screen w-full transition-all duration-500 flex flex-col items-center p-2 sm:p-4 selection:bg-blue-500/30" :class="theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'">
    <header class="w-full max-w-2xl flex items-center justify-between mb-6 border-b pb-4 transition-colors duration-300" :class="theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'">
      <div class="flex items-center gap-2">
        <button
          @click="openInfo"
          class="p-2.5 bg-zinc-500/10 hover:bg-zinc-500/20 rounded-xl transition-all active:scale-95 group text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-300"
          aria-label="Info & Cara Main"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 group-hover:rotate-12 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </button>
      </div>

      <div class="flex flex-col items-center">
        <h1 class="text-3xl sm:text-4xl font-black tracking-tighter flex select-none">
          <span class="text-red-500 drop-shadow-sm">K</span>
          <span class="text-red-500 drop-shadow-sm">A</span>
          <span :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'">T</span>
          <span :class="theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'">L</span>
          <span class="text-green-500 drop-shadow-sm">L</span>
          <span class="text-green-500 drop-shadow-sm">A</span>
        </h1>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="toggleTheme"
          class="p-2.5 bg-zinc-500/10 hover:bg-zinc-500/20 rounded-xl transition-all active:scale-95 group text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-300"
          :aria-label="theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'"
        >
          <!-- Sun Icon -->
          <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 group-hover:rotate-45 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-4.773l1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
          <!-- Moon Icon -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 group-hover:-rotate-12 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        </button>
        <button
          @click="openStats"
          class="p-2.5 bg-zinc-500/10 hover:bg-zinc-500/20 rounded-xl transition-all active:scale-95 group text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-300"
          aria-label="Lihat Statistik"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 group-hover:scale-110 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Toolbar / Control Bar -->
    <div class="w-full max-w-md flex flex-wrap items-center justify-center gap-3 mb-8 px-2">
      <div class="flex p-1 bg-zinc-500/10 rounded-xl border border-zinc-500/20 backdrop-blur-sm">
        <button 
          @click="resetGame('daily')"
          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider"
          :class="gameMode === 'daily' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'"
        >
          {{ currentLanguage === 'id' ? 'Harian' : 'Daily' }}
        </button>
        <button 
          @click="resetGame('random')"
          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider"
          :class="gameMode === 'random' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'"
        >
          Random
        </button>
      </div>

      <button
        @click="toggleLanguage"
        class="flex items-center gap-2 px-4 py-2 bg-zinc-500/10 hover:bg-zinc-500/20 border border-zinc-500/20 rounded-xl text-xs font-bold transition-all active:scale-95 text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 opacity-70">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.996 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        <span class="tracking-widest uppercase">{{ currentLanguage }}</span>
      </button>

      <button
        @click="skipWord"
        class="flex items-center gap-2 px-4 py-2 bg-zinc-500/10 hover:bg-zinc-500/20 border border-zinc-500/20 rounded-xl text-xs font-bold transition-all active:scale-95 group text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-300"
        aria-label="Skip kata ini"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 opacity-70">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        <span class="uppercase tracking-widest">{{ currentLanguage === 'id' ? 'Ganti' : 'Skip' }}</span>
      </button>
    </div>

    <!-- Win Streak Display -->
    <div v-if="userStats.currentStreak > 1" class="mb-6 px-6 py-2 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-full shadow-xl shadow-orange-600/20 animate-pulse-subtle">
      <div class="flex items-center justify-center gap-2 text-white text-sm">
        <span class="animate-bounce">🔥</span>
        <span class="font-black italic tracking-widest uppercase">{{ userStats.currentStreak }} Streak!</span>
        <span class="animate-bounce">🔥</span>
      </div>
    </div>

    <!-- Main Game Grid -->
    <div
      class="grid gap-2 mb-8"
      :style="{ gridTemplateRows: `repeat(${MAX_ATTEMPTS}, minmax(0, 1fr))` }"
      role="grid"
      aria-label="Game board"
    >
      <div
        v-for="(guessRow, rowIndex) in MAX_ATTEMPTS"
        :key="rowIndex"
        class="grid gap-2"
        :style="{ gridTemplateColumns: `repeat(${WORD_LENGTH}, minmax(0, 1fr))` }"
        role="row"
        :aria-label="`Baris ${rowIndex + 1}`"
      >
        <div
          v-for="colIndex in WORD_LENGTH"
          :key="colIndex"
          class="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 rounded-lg text-2xl sm:text-3xl flex items-center justify-center font-black uppercase transition-all duration-300 select-none"
          :class="[
            getBoxClass(rowIndex, colIndex - 1),
            getFlipClass(rowIndex, colIndex - 1),
            { 'animate-shake': shakeRowIndex === rowIndex },
            { 'animate-pop': rowIndex === guesses.length && currentGuess.length === colIndex }
          ]"
          role="gridcell"
          :aria-label="getAriaLabel(rowIndex, colIndex - 1)"
          :aria-live="rowIndex === guesses.length ? 'polite' : 'off'"
        >
          {{ getLetterDisplay(rowIndex, colIndex - 1) }}
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="toast.show" class="fixed left-1/2 top-1/4 z-50 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300" 
           :class="toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-zinc-800/90 text-white'">
        <span v-if="toast.type === 'error'" class="text-xl">⚠️</span>
        <span v-else class="text-xl">✨</span>
        <div class="font-bold text-sm tracking-wide" v-html="toast.message"></div>
      </div>
    </Transition>

    <!-- Refined Keyboard -->
    <div class="mt-auto mb-4 space-y-2 w-full max-w-xl px-2">
      <div v-for="(row, rIdx) in ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']" :key="rIdx" class="flex justify-center gap-1.5">
        <button v-if="rIdx === 2" class="key action-key" @click="pressEnter" :class="{ 'active': pressedKey === 'enter' }">
          ENTER
        </button>
        
        <button
          v-for="key in row.split('')"
          :key="key"
          class="key"
          :class="[getKeyClass(key.toLowerCase()), { 'active': pressedKey === key.toLowerCase() }]"
          @click="pressKey(key)"
        >
          {{ key }}
        </button>

        <button v-if="rIdx === 2" class="key action-key" @click="pressBackspace" :class="{ 'active': pressedKey === 'backspace' }">
          <span class="text-xl">⌫</span>
        </button>
      </div>
    </div>

    <!-- footer -->
    <p class="mt-3 text-xs sm:text-sm text-zinc-400">
      Katla by <a href="//syofyanzuhad.dev" target="_blank" class="text-blue-400 hover:text-blue-300 transition duration-200">Syofyan Zuhad</a>
    </p>
  </div>

<!-- Info Modal -->
<InfoModal
  :show="showInfoModal"
  @close="closeInfo"
/>

<!-- Stats Modal -->
<StatsModal
  :show="showStatsModal"
  :stats="userStats"
  :userId="userId"
  :showResetButton="true"
  @close="closeStats"
  @reset-stats="handleResetStats"
/>

<!-- Result Modal Pop Up -->
<Transition name="scale">
<div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
  <div class="bg-zinc-900 text-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center relative border border-zinc-800 scale-in transition-all duration-500">
    <button @click="showModal = false" aria-label="Tutup" class="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white hover:bg-white/10 transition-all rounded-xl focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <div class="mb-6">
      <div v-if="lastResult === 'win'" class="text-5xl mb-4 animate-bounce">🎉</div>
      <div v-else class="text-5xl mb-4 animate-pulse">😢</div>
      
      <h2 class="text-3xl font-black tracking-tighter uppercase mb-2">
        {{ lastResult === 'win' ? (currentLanguage === 'id' ? 'Selamat!' : 'Splendid!') : (currentLanguage === 'id' ? 'Sayang Sekali' : 'Good Try') }}
      </h2>
      
      <div class="inline-block px-4 py-1.5 bg-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400 border border-white/5">
        {{ lastResult === 'win' ? (currentLanguage === 'id' ? 'Kamu Menang' : 'You Won') : (currentLanguage === 'id' ? 'Kamu Kalah' : 'You Lost') }}
      </div>
    </div>

    <div class="bg-zinc-800/50 p-6 rounded-2xl border border-white/5 mb-8">
      <p class="text-[10px] uppercase font-black tracking-widest text-zinc-500 mb-2">
        {{ currentLanguage === 'id' ? 'Kata yang benar' : 'The correct word' }}
      </p>
      <div class="text-3xl font-black tracking-widest uppercase text-blue-400 mb-4">{{ targetWord }}</div>
      <a :href="`/kbbi/${targetWord}`" target="_blank" class="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors group">
        <span>{{ currentLanguage === 'id' ? 'Lihat di KBBI' : 'Look up meaning' }}</span>
        <span class="group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <button @click="shareResult" class="flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] shadow-lg shadow-green-900/20 active:scale-95">
        <span>{{ currentLanguage === 'id' ? 'Salin Hasil' : 'Share Result' }}</span>
      </button>
      <button @click="resetGame(gameMode)" class="flex items-center justify-center gap-2 py-4 bg-zinc-800 hover:bg-zinc-700 text-white border border-white/5 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] active:scale-95">
        <span>{{ currentLanguage === 'id' ? 'Main Lagi' : 'Play Again' }}</span>
      </button>
    </div>

    <Transition name="fade">
      <div v-if="showShareMsg" class="mt-4 py-2 px-4 bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-600/30">
        {{ currentLanguage === 'id' ? 'Hasil disalin ke clipboard!' : 'Copied to clipboard!' }}
      </div>
    </Transition>
  </div>
</div>
</Transition>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import confetti from 'canvas-confetti'
  import { getUserId, recordGameResult, addGameToHistory, getUserStats, resetAllStats } from '../utils/userStats'
  import StatsModal from './StatsModal.vue'
  import InfoModal from './InfoModal.vue'
  import { useGameLogic } from '../composables/useGameLogic'
  import { useAudio } from '../composables/useAudio'
  import { useShare } from '../composables/useShare'
  import { useTheme } from '../composables/useTheme'
  import { WORD_LENGTH, MAX_ATTEMPTS } from '../constants'
  import { getTodaySeed } from '../utils/dateUtils'

  const { theme, toggleTheme } = useTheme()

  const {
    targetWord,
    guesses,
    currentGuess,
    gameOver,
    usedKeys,
    lastResult,
    gameMode,
    currentLanguage,
    loadWords,
    submitGuess: submitGuessLogic,
    getLetterStatuses,
    resetGame: resetGameLogic,
    toggleLanguage
  } = useGameLogic()

  const {
    playKeySound,
    playSuccessSound,
    playErrorSound,
    playFlipSound
  } = useAudio()

  const {
    showShareMsg,
    shareResult: shareResultLogic,
    openShare: openShareLogic
  } = useShare()

  const shakeRowIndex = ref(null)
  const showModal = ref(false)
  const toast = ref({ show: false, message: '', type: 'info' })
  const showStatsModal = ref(false)
  const showInfoModal = ref(false)
  const userStats = ref(getUserStats())
  const userId = ref(getUserId())
  const pressedKey = ref('')

  async function shareResult() {
    await shareResultLogic({
      lastResult: lastResult.value,
      guesses: guesses.value,
      maxAttempts: MAX_ATTEMPTS,
      targetWord: targetWord.value,
      getLetterStatuses
    })
  }

  function openShare(app) {
    openShareLogic(app, {
      lastResult: lastResult.value,
      guesses: guesses.value,
      maxAttempts: MAX_ATTEMPTS,
      targetWord: targetWord.value,
      getLetterStatuses
    })
  }

  function showToast(message, type = 'info', duration = 3000) {
    toast.value = { show: true, message, type }
    setTimeout(() => {
      toast.value.show = false
    }, duration)
  }

  function submitGuess() {
    submitGuessLogic({
      onInvalid: (msg, type) => {
        showToast(msg, 'error')
        shakeRowIndex.value = guesses.value.length
        resetShake()
        playErrorSound()
        if (navigator.vibrate) navigator.vibrate(150)
      },
      onWin: () => {
        showToast(`🎉 Selamat! Kamu menang! Cek artinya di <a href="/kbbi/${targetWord.value}" class="text-blue-400 hover:text-blue-300 transition duration-200">KBBI</a>`, 'success')
        showModal.value = true
        recordGameResult(true, guesses.value.length, gameMode.value, getTodaySeed())
        addGameToHistory({
          word: targetWord.value,
          won: true,
          guesses: guesses.value,
          guessCount: guesses.value.length
        })
        userStats.value = getUserStats()
        playSuccessSound()
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      },
      onLoss: () => {
        showToast(`😢 Kamu kalah. Kata: ${targetWord.value.toUpperCase()} - <a href="/kbbi/${targetWord.value}" class="text-blue-400 hover:text-blue-300 transition duration-200">Lihat di KBBI</a>`, 'error')
        showModal.value = true
        recordGameResult(false, guesses.value.length, gameMode.value, getTodaySeed())
        addGameToHistory({
          word: targetWord.value,
          won: false,
          guesses: guesses.value,
          guessCount: guesses.value.length
        })
        userStats.value = getUserStats()
      },
      onFlip: () => {
        playFlipSound()
      }
    })
  }

  function pressKey(key) {
    if (gameOver.value || currentGuess.value.length >= WORD_LENGTH || guesses.value.length >= MAX_ATTEMPTS) return
    currentGuess.value += key.toLowerCase()
    playKeySound()
    pressedKey.value = key.toLowerCase()
    setTimeout(() => { pressedKey.value = '' }, 120)
    if (navigator.vibrate) navigator.vibrate(30)
  }

  function pressBackspace() {
    if (currentGuess.value.length > 0 && !gameOver.value) {
      currentGuess.value = currentGuess.value.slice(0, -1)
    }
    playKeySound()
    pressedKey.value = 'backspace'
    setTimeout(() => { pressedKey.value = '' }, 120)
    if (navigator.vibrate) navigator.vibrate(30)
  }

  function pressEnter() {
    if (!gameOver.value) submitGuess()
    playKeySound()
    pressedKey.value = 'enter'
    setTimeout(() => { pressedKey.value = '' }, 120)
    if (navigator.vibrate) navigator.vibrate(30)
  }

  function resetShake() {
    setTimeout(() => {
      shakeRowIndex.value = null
    }, 500)
  }

  function getLetterDisplay(row, col) {
    if (row === guesses.value.length) {
      return currentGuess.value[col]?.toUpperCase() || ''
    }
    return guesses.value[row]?.[col]?.toUpperCase() || ''
  }

  function getAriaLabel(row, col) {
    const letter = getLetterDisplay(row, col)
    if (!letter) return 'Kosong'

    if (row < guesses.value.length) {
      const statuses = getLetterStatuses(guesses.value[row], targetWord.value.split(''))
      const status = statuses[col]
      let statusText = ''
      if (status === 'correct') statusText = 'Benar'
      if (status === 'present') statusText = 'Salah posisi'
      if (status === 'absent') statusText = 'Tidak ada'
      return `${letter}, ${statusText}`
    }

    return letter
  }

  function getBoxClass(row, col) {
    const guessRow = guesses.value[row]
    if (!guessRow) return 'border-zinc-600'

    const statuses = getLetterStatuses(guessRow, targetWord.value.split(''))
    const status = statuses[col]

    return {
      'bg-green-600 border-green-600 text-white': status === 'correct',
      'bg-yellow-500 border-yellow-500 text-white': status === 'present',
      'bg-zinc-700 border-zinc-700 text-white': status === 'absent'
    }
  }

  function getFlipClass(row, col) {
    const guessRow = guesses.value[row]
    if (!guessRow) return ''
    return 'animate-flip'
  }

  function getKeyClass(letter) {
    const status = usedKeys.value[letter]
    return {
      'bg-green-600 text-white': status === 'correct',
      'bg-yellow-500 text-white': status === 'present',
      'bg-zinc-700 text-white': status === 'absent',
      'bg-zinc-600 text-white': !status
    }
  }

  function handlePhysicalKeyboard(e) {
    if (gameOver.value) return

    const key = e.key.toLowerCase()

    if (key === 'enter') {
      pressEnter()
    } else if (key === 'backspace') {
      pressBackspace()
    } else if (/^[a-z]$/.test(key)) {
      pressKey(key)
    }
  }

  onMounted(() => {
    loadWords()
    window.addEventListener('keydown', handlePhysicalKeyboard)

    console.log('%cUser ID: ' + userId.value, 'color: blue; font-weight: bold;')
    console.warn('%cJangan curang!','color: red; font-size: 2em; font-weight: bold;')
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handlePhysicalKeyboard)
  })

  function resetGame(mode = 'random') {
    resetGameLogic(mode)
    toast.value = { show: false, message: '', type: 'info' }
    showModal.value = false
    shakeRowIndex.value = null
  }

  function openStats() {
    userStats.value = getUserStats()
    showStatsModal.value = true
  }

  function closeStats() {
    showStatsModal.value = false
  }

  function handleResetStats() {
    if (confirm('Yakin ingin reset semua statistik? Aksi ini tidak bisa dibatalkan!')) {
      resetAllStats()
      userStats.value = getUserStats()
      showToast('Statistik berhasil direset!', 'info')
    }
  }

  function openInfo() {
    showInfoModal.value = true
  }

  function closeInfo() {
    showInfoModal.value = false
  }

  function skipWord() {
    const confirmMsg = currentLanguage.value === 'id' 
      ? 'Muat kata baru? (Ini akan beralih ke mode Random)' 
      : 'Load new word? (This will switch to Random mode)'
    const toastMsg = currentLanguage.value === 'id'
      ? 'Kata baru dimuat! 🎯'
      : 'New word loaded! 🎯'

    if (confirm(confirmMsg)) {
      resetGame('random')
      showToast(toastMsg, 'info')
    }
  }
</script>

<style scoped>
  .key.bg-green-600 { background-color: #538d4e !important; }
  .key.bg-yellow-500 { background-color: #b59f3b !important; }
  .key.bg-zinc-700 { background-color: #3a3a3c !important; }
  
  .light .key.bg-zinc-700 { background-color: #787c7e !important; }

  .key:hover {
    filter: brightness(1.1);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .key.active {
    transform: scale(0.95);
    filter: brightness(0.9);
  }

  /* Box Status Colors */
  .bg-green-600 { background-color: #538d4e !important; border-color: #538d4e !important; }
  .bg-yellow-500 { background-color: #b59f3b !important; border-color: #b59f3b !important; }
  .bg-zinc-700 { background-color: #3a3a3c !important; border-color: #3a3a3c !important; }
  
  .light .bg-zinc-700 { background-color: #787c7e !important; border-color: #787c7e !important; }
  .light .border-zinc-600 { border-color: #d4d4d8; }
  .dark .border-zinc-600 { border-color: #3f3f46; }

  /* Toast Transition */
  .toast-enter-active, .toast-leave-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .toast-enter-from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  .toast-leave-to {
    opacity: 0;
    transform: translate(-50%, -20px);
  }

  /* Fade and Scale Transitions */
  .fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }

  .scale-enter-active, .scale-leave-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  .scale-enter-from, .scale-leave-to { transform: scale(0.9); opacity: 0; }

  @keyframes scale-in {
    0% { transform: scale(0.9); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  .scale-in {
    animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes pulse-subtle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.02); }
  }
  .animate-pulse-subtle {
    animation: pulse-subtle 2s ease-in-out infinite;
  }
</style>
