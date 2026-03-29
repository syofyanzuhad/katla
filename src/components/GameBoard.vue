<template>
  <div class="min-h-screen max-w-screen w-full bg-zinc-900 text-white flex flex-col items-center p-2 sm:p-4">
    <header class="w-full max-w-2xl relative mb-2 sm:mb-4">
      <button
        @click="openInfo"
        class="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-2 bg-zinc-700 hover:bg-zinc-600 rounded text-sm transition"
        aria-label="Info & Cara Main"
      >
        ℹ️
      </button>
      <div class="text-2xl sm:text-3xl font-bold text-center text-white">
        <span class="text-red-500 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">K</span>
        <span class="text-red-500 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">A</span>
        <span class="text-black [text-shadow:_2px_2px_4px_rgb(255_255_255_/_40%)]">T</span>
        <span class="text-white [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">L</span>
        <span class="text-green-500 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">L</span>
        <span class="text-green-500 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">A</span>
      </div>
      <div class="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2">
        <button
          @click="skipWord"
          class="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 rounded text-sm transition"
          aria-label="Skip kata ini"
        >
          🔄
        </button>
        <button
          @click="openStats"
          class="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 rounded text-sm transition"
          aria-label="Lihat Statistik"
        >
          📊
        </button>
      </div>
    </header>

    <!-- Win Streak Display -->
    <div v-if="userStats.currentStreak > 1" class="mb-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg shadow-lg animate-pulse-subtle">
      <div class="flex items-center justify-center gap-2 text-white">
        <span class="text-xl">🔥</span>
        <span class="font-bold">{{ userStats.currentStreak }} Win Streak!</span>
        <span class="text-xl">🔥</span>
      </div>
    </div>

      <div class="text-sm sm:text-base text-zinc-400 mb-2 sm:mb-4">
        <ul class="list-disc list-inside">
          <li><small>Masukkan kata dengan 5 huruf dan tekan ENTER.</small></li>
          <li><small>🟩: huruf dan posisi benar, 🟨: huruf benar posisi salah, ⬜️: huruf dan posisi salah.</small></li>
        </ul>
      </div>

    <div class="grid grid-rows-6 gap-1 sm:gap-2 min-h-[50vh] lg:min-h-[60vh]">
      <div v-for="(guessRow, rowIndex) in 6" :key="rowIndex" class="grid grid-cols-5 gap-1 sm:gap-2">
        <div
          v-for="colIndex in 5"
          :key="colIndex"
          class="w-15 h-15 sm:w-14 sm:h-14 lg:w-25 lg:h-25 border-2 text-xl sm:text-2xl flex items-center justify-center font-bold uppercase transition-all duration-500 ease-in-out transform"
          :class="[
            getBoxClass(rowIndex, colIndex - 1),
            getFlipClass(rowIndex, colIndex - 1),
            { 'animate-shake': shakeRowIndex === rowIndex }
          ]"
        >
          {{ getLetterDisplay(rowIndex, colIndex - 1) }}
        </div>
      </div>
    </div>

  <!-- Toast -->
  <div v-if="toast.show" class="fixed left-1/2 top-1/4 z-50 -translate-x-1/2 -translate-y-1/2 bg-zinc-800 text-white px-4 py-2 rounded-lg shadow-lg w-full max-w-xs transition-all duration-300" :class="toast.type === 'error' ? 'bg-red-600' : 'bg-zinc-800'">
    <div v-html="toast.message"></div>
  </div>

    <div class="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-center sm:max-w-[500px] px-2 w-full lg:w-full">
      <div class="flex justify-center gap-0.5 sm:gap-1">
        <button
          v-for="key in 'QWERTYUIOP'.split('')"
          :key="key"
          class="key"
          :class="[getKeyClass(key.toLowerCase()), { 'key-pressed': pressedKey === key.toLowerCase() }]"
          @click="pressKey(key)"
          @mousedown="pressedKey = key.toLowerCase()"
          @mouseup="pressedKey = ''"
          @mouseleave="pressedKey = ''"
        >
          {{ key }}
        </button>
      </div>
      <div class="flex justify-center gap-0.5 sm:gap-1">
        <button
          v-for="key in 'ASDFGHJKL'.split('')"
          :key="key"
          class="key"
          :class="[getKeyClass(key.toLowerCase()), { 'key-pressed': pressedKey === key.toLowerCase() }]"
          @click="pressKey(key)"
          @mousedown="pressedKey = key.toLowerCase()"
          @mouseup="pressedKey = ''"
          @mouseleave="pressedKey = ''"
        >
          {{ key }}
        </button>
      </div>
      <div class="flex justify-center gap-0.5 sm:gap-1">
        <button class="key bg-zinc-600"
          @click="pressEnter"
          :class="{ 'key-pressed': pressedKey === 'enter' }"
          @mousedown="pressedKey = 'enter'"
          @mouseup="pressedKey = ''"
          @mouseleave="pressedKey = ''"
        >ENTER</button>
        <button
          v-for="key in 'ZXCVBNM'.split('')"
          :key="key"
          class="key"
          :class="[getKeyClass(key.toLowerCase()), { 'key-pressed': pressedKey === key.toLowerCase() }]"
          @click="pressKey(key)"
          @mousedown="pressedKey = key.toLowerCase()"
          @mouseup="pressedKey = ''"
          @mouseleave="pressedKey = ''"
        >
          {{ key }}
        </button>
        <button class="key bg-zinc-600"
          @click="pressBackspace"
          :class="{ 'key-pressed': pressedKey === 'backspace' }"
          @mousedown="pressedKey = 'backspace'"
          @mouseup="pressedKey = ''"
          @mouseleave="pressedKey = ''"
        >⌫</button>
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

<!-- Modal Pop Up -->
<div v-if="showModal" class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
  <div class="bg-white text-black rounded-lg shadow-lg p-6 max-w-xs w-full text-center relative">
    <button @click="showModal = false" aria-label="Tutup" class="absolute top-2 right-2 text-xl text-zinc-500 hover:text-zinc-800 transition p-1 rounded-full focus:outline-none">
      &times;
    </button>
    <h2 class="text-xl font-bold mb-2">
      {{ lastResult === 'win' ? '🎉 Selamat!' : '😢 Kamu kalah.' }}
    </h2>
    <p v-if="lastResult === 'win'">
      Kamu menang!<br>
      <span class="text-sm text-gray-600">Kata: <span class="font-mono font-bold">{{ targetWord.toUpperCase() }}</span></span>
      <br>
      <a :href="`/kbbi/${targetWord}`" class="text-blue-500 hover:text-blue-400 transition duration-200">Cek artinya di KBBI</a>
    </p>
    <p v-else>
      Kata: <span class="font-mono font-bold">{{ targetWord.toUpperCase() }}</span><br>
      <a :href="`/kbbi/${targetWord}`" class="text-blue-500 hover:text-blue-400 transition duration-200">Lihat di KBBI</a>
    </p>
    <button @click="shareResult" class="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer">Salin Hasil</button>
    <button @click="resetGame" class="ml-1 mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition cursor-pointer">Lanjut</button>
    <div v-if="showShareMsg" class="mt-2 text-green-700 text-sm">Hasil disalin ke clipboard!</div>
    <p class="text-sm mt-4">Bagikan ke:</p>
    <div class="flex justify-center gap-2 mt-4">
      <!-- bagikan ke -->
      <button @click="openShare('whatsapp')" class="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer text-sm">WhatsApp</button>
      <button @click="openShare('twitter')" class="px-3 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition cursor-pointer text-sm">Twitter</button>
      <button @click="openShare('telegram')" class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer text-sm">Telegram</button>
    </div>
  </div>
</div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import confetti from 'canvas-confetti'
  import { getUserId, recordGameResult, addGameToHistory, getUserStats, resetAllStats } from '../utils/userStats'
  import StatsModal from './StatsModal.vue'
  import InfoModal from './InfoModal.vue'

  const targetWord = ref('')
  const validWords = ref([])
  const guesses = ref([])
  const currentGuess = ref('')
  const maxAttempts = 6
  const gameOver = ref(false)
  const message = ref('')
  const audio = new Audio('/button-16a.mp3')
  const successAudio = new Audio('/goodresult-82807.mp3')
  const errorAudio = new Audio('/error-10-206498.mp3')
  const flipAudio = new Audio('/pageturn-102978.mp3')
  const shakeRowIndex = ref(null)

  const showModal = ref(false)
  const lastResult = ref('') // 'win' atau 'lose'
  const showShareMsg = ref(false)
  const toast = ref({ show: false, message: '', type: 'info' })
  const showStatsModal = ref(false)
  const showInfoModal = ref(false)
  const userStats = ref(getUserStats())
  const userId = ref(getUserId())

  function getShareEmoji(status) {
    if (status === 'correct') return '🟩'
    if (status === 'present') return '🟨'
    return '⬜️'
  }

  function generateShareText() {
    let text = `Katla ${lastResult.value === 'win' ? guesses.value.length : 'X'}/${maxAttempts}\n\n`
    for (let i = 0; i < guesses.value.length; i++) {
      const guess = guesses.value[i]
      const statuses = getLetterStatuses(guess, targetWord.value.split(''))
      text += statuses.map(getShareEmoji).join('') + '\n'
    }
    if (lastResult.value === 'win') {
      text += '\n🎉 Selamat!'
    } else {
      text += `\nKata: ${targetWord.value.toUpperCase()}`
    }
    text += `\n${window.location.href}`
    return text
  }

  async function shareResult() {
    const text = generateShareText()
    try {
      await navigator.clipboard.writeText(text)
      showShareMsg.value = true
      setTimeout(() => showShareMsg.value = false, 2000)
    } catch (e) {
      alert('Gagal menyalin hasil ke clipboard')
    }
  }

  function openShare(app) {
    const text = encodeURIComponent(generateShareText())
    let url = ''
    if (app === 'whatsapp') {
      url = `https://wa.me/?text=${text}`
    } else if (app === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${text}`
    } else if (app === 'telegram') {
      url = `https://t.me/share/url?text=${text}`
    }
    window.open(url, '_blank')
  }

  const usedKeys = ref({})
  const pressedKey = ref('')

  async function loadWords() {
    try {
      const response = await fetch('/words.json')
      const data = await response.json()
      validWords.value = data.words
      // Select a random word as target
      targetWord.value = validWords.value[Math.floor(Math.random() * validWords.value.length)]
      // console.log('%csrc/components/GameBoard.vue:164 targetWord.value', 'color: #007acc;', targetWord.value);
    } catch (error) {
      console.error('Error loading words:', error)
      message.value = 'Error loading words. Please refresh the page.'
    }
  }

  function showToast(message, type = 'info', duration = 3000) {
    toast.value = { show: true, message, type }
    setTimeout(() => {
      toast.value.show = false
    }, duration)
  }

  function submitGuess() {
    if (currentGuess.value.length !== 5) {
      showToast('Kata harus 5 huruf.', 'error')
      shakeRowIndex.value = guesses.value.length
      resetShake()
      errorAudio.currentTime = 0
      errorAudio.play()
      if (navigator.vibrate) navigator.vibrate(150)
      return
    }

    const guess = currentGuess.value.toLowerCase()
    if (!validWords.value.includes(guess)) {
      showToast('Kata tidak ada dalam kamus.', 'error')
      shakeRowIndex.value = guesses.value.length
      resetShake()
      errorAudio.currentTime = 0
      errorAudio.play()
      if (navigator.vibrate) navigator.vibrate(150)
      return
    }

    const guessArray = guess.split('')
    const statuses = getLetterStatuses(guessArray, targetWord.value.split(''))
    guesses.value.push(guessArray)

    guessArray.forEach((letter, i) => {
      if (statuses[i] === 'correct') {
        usedKeys.value[letter] = 'correct'
      } else if (statuses[i] === 'present' && usedKeys.value[letter] !== 'correct') {
        usedKeys.value[letter] = 'present'
      } else if (!usedKeys.value[letter]) {
        usedKeys.value[letter] = 'absent'
      }
    })

    currentGuess.value = ''

    if (guess === targetWord.value) {
      showToast(`🎉 Selamat! Kamu menang! Cek artinya di <a href="/kbbi/${targetWord.value}" class="text-blue-400 hover:text-blue-300 transition duration-200">KBBI</a>`, 'success')
      gameOver.value = true
      showModal.value = true
      lastResult.value = 'win'

      // Record stats
      recordGameResult(true, guesses.value.length)
      addGameToHistory({
        word: targetWord.value,
        won: true,
        guesses: guesses.value,
        guessCount: guesses.value.length
      })
      userStats.value = getUserStats() // Update stats display

      successAudio.play()
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      return
    } else {
      // console.log('flip')
      flipAudio.currentTime = 0
      flipAudio.play()
    }

    if (guesses.value.length >= maxAttempts) {
      showToast(`😢 Kamu kalah. Kata: ${targetWord.value.toUpperCase()} - <a href="/kbbi/${targetWord.value}" class="text-blue-400 hover:text-blue-300 transition duration-200">Lihat di KBBI</a>`, 'error')
      gameOver.value = true
      showModal.value = true
      lastResult.value = 'lose'

      // Record stats
      recordGameResult(false, guesses.value.length)
      addGameToHistory({
        word: targetWord.value,
        won: false,
        guesses: guesses.value,
        guessCount: guesses.value.length
      })
      userStats.value = getUserStats() // Update stats display
    }
  }

  function pressKey(key) {
    if (gameOver.value || currentGuess.value.length >= 5 || guesses.value.length >= maxAttempts) return
    currentGuess.value += key.toLowerCase()
    audio.currentTime = 0
    audio.play()
    pressedKey.value = key.toLowerCase()
    setTimeout(() => { pressedKey.value = '' }, 120)
    if (navigator.vibrate) navigator.vibrate(30)
  }

  function pressBackspace() {
    if (currentGuess.value.length > 0 && !gameOver.value) {
      currentGuess.value = currentGuess.value.slice(0, -1)
    }
    audio.currentTime = 0
    audio.play()
    pressedKey.value = 'backspace'
    setTimeout(() => { pressedKey.value = '' }, 120)
    if (navigator.vibrate) navigator.vibrate(30)
  }

  function pressEnter() {
    if (!gameOver.value) submitGuess()
    audio.currentTime = 0
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

  function getLetterStatuses(guess, target) {
    const statuses = Array(5).fill('absent')
    const targetUsed = Array(5).fill(false)

    // First pass: correct letters
    for (let i = 0; i < 5; i++) {
      if (guess[i] === target[i]) {
        statuses[i] = 'correct'
        targetUsed[i] = true
      }
    }

    // Second pass: present letters
    for (let i = 0; i < 5; i++) {
      if (statuses[i] === 'correct') continue
      for (let j = 0; j < 5; j++) {
        if (!targetUsed[j] && guess[i] === target[j]) {
          statuses[i] = 'present'
          targetUsed[j] = true
          break
        }
      }
    }

    return statuses
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
      pressedKey.value = 'enter'
      setTimeout(() => { pressedKey.value = '' }, 120)
    } else if (key === 'backspace') {
      pressBackspace()
      pressedKey.value = 'backspace'
      setTimeout(() => { pressedKey.value = '' }, 120)
    } else if (/^[a-z]$/.test(key)) {
      pressKey(key)
    }
  }

  // let warnInterval = null
  onMounted(() => {
    loadWords()
    window.addEventListener('keydown', handlePhysicalKeyboard)

    // Initialize user tracking
    const userId = getUserId()
    const stats = getUserStats()
    console.log('%cUser ID: ' + userId, 'color: blue; font-weight: bold;')
    console.log('%cStats:', 'color: blue; font-weight: bold;', stats)

    // Peringatan untuk tidak mencari jawaban di console
    // Langsung tampilkan sekali
    console.warn('%cJangan curang!','color: red; font-size: 2em; font-weight: bold;')
    console.warn('%cMencontek jawaban di console mengurangi keseruan bermain Katla. Cobalah tebak sendiri dulu!','color: orange; font-size: 1.2em;')
    // warnInterval = setInterval(() => {
    //   console.warn('%cJangan curang!','color: red; font-size: 2em; font-weight: bold;')
    //   console.warn('%cMencontek jawaban di console mengurangi keseruan bermain Katla. Cobalah tebak sendiri dulu!','color: orange; font-size: 1.2em;')
    // }, 1000)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handlePhysicalKeyboard)
    if (warnInterval) clearInterval(warnInterval)
  })

  function resetGame() {
    guesses.value = []
    currentGuess.value = ''
    gameOver.value = false
    toast.value = { show: false, message: '', type: 'info' }
    usedKeys.value = {}
    showModal.value = false
    lastResult.value = ''
    showShareMsg.value = false
    shakeRowIndex.value = null
    loadWords()
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

  function getWinRateDisplay() {
    if (userStats.value.totalGames === 0) return 0
    return Math.round((userStats.value.wins / userStats.value.totalGames) * 100)
  }

  function openInfo() {
    showInfoModal.value = true
  }

  function closeInfo() {
    showInfoModal.value = false
  }

  function skipWord() {
    if (confirm('Muat kata baru?')) {
      // Reset game state tanpa record stats
      guesses.value = []
      currentGuess.value = ''
      gameOver.value = false
      toast.value = { show: false, message: '', type: 'info' }
      usedKeys.value = {}
      showModal.value = false
      lastResult.value = ''
      showShareMsg.value = false
      shakeRowIndex.value = null
      loadWords()
      showToast('Kata baru dimuat! 🎯', 'info')
    }
  }
</script>

<style scoped>
  .key {
    min-width: 1.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    font-weight: bold;
    font-size: 0.75rem;
    transition: transform 0.1s ease;
    background-color: #615f5f;
  }

  .key.bg-green-600 { background-color: #16a34a !important; } /* 🟩 */
  .key.bg-yellow-500 { background-color: #eab308 !important; } /* 🟨 */
  .key.bg-zinc-700 { background-color: #3f3f46 !important; } /* ⬜ */

  @media (min-width: 640px) {
    .key {
      min-width: 2.5rem;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
    }
  }

    @media (min-width: 1024px) {
        .key {
        min-width: 3rem;
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
        }
    }

  .key:hover {
    background-color: #3b3b42;
  }

  .key:active {
    transform: scale(0.95);
  }

  @keyframes flip {
    0% {
      transform: rotateX(0);
    }
    50% {
      transform: rotateX(90deg);
    }
    100% {
      transform: rotateX(0);
    }
  }

  .animate-flip {
    animation: flip 0.5s ease-in-out;
  }

  @keyframes shake {
  0% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

  .key-pressed {
    filter: brightness(0.8);
    transform: scale(0.95);
    transition: filter 0.05s, transform 0.05s;
  }

  @keyframes pulse-subtle {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.95;
      transform: scale(1.02);
    }
  }

  .animate-pulse-subtle {
    animation: pulse-subtle 2s ease-in-out infinite;
  }
</style>
