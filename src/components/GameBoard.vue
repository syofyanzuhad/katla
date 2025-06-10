<template>
  <div class="min-h-screen max-w-screen w-full bg-zinc-900 text-white flex flex-col items-center p-2 sm:p-4">
    <header class="text-2xl sm:text-3xl font-bold text-center text-white mb-2 sm:mb-4">
      <span class="text-red-500 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">K</span>
      <span class="text-red-500 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">A</span>
      <span class="text-black [text-shadow:_2px_2px_4px_rgb(255_255_255_/_40%)]">T</span>
      <span class="text-white [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">L</span>
      <span class="text-green-500 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">L</span>
      <span class="text-green-500 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">A</span>
    </header>
      <div class="text-sm sm:text-base text-zinc-400 mb-2 sm:mb-4">
          <p>Selamat datang di permainan kata!</p>
          <p>Masukkan kata 5 huruf dan tekan ENTER.</p>
          <p>🟩: huruf dan posisi benar, 🟨: huruf benar posisi salah, ⬜️: huruf dan posisi salah</p>
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

  <p class="mt-3 text-xs sm:text-sm text-zinc-400" v-html="message"></p>

    <div class="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-center sm:max-w-[500px] px-2 w-full lg:w-full">
      <div class="flex justify-center gap-0.5 sm:gap-1">
        <button
          v-for="key in 'QWERTYUIOP'.split('')"
          :key="key"
          class="key"
          :class="getKeyClass(key.toLowerCase())"
          @click="pressKey(key)"
        >
          {{ key }}
        </button>
      </div>
      <div class="flex justify-center gap-0.5 sm:gap-1">
        <button
          v-for="key in 'ASDFGHJKL'.split('')"
          :key="key"
          class="key"
          :class="getKeyClass(key.toLowerCase())"
          @click="pressKey(key)"
        >
          {{ key }}
        </button>
      </div>
      <div class="flex justify-center gap-0.5 sm:gap-1">
        <button class="key bg-zinc-600" @click="pressEnter">ENTER</button>
        <button
          v-for="key in 'ZXCVBNM'.split('')"
          :key="key"
          class="key"
          :class="getKeyClass(key.toLowerCase())"
          @click="pressKey(key)"
        >
          {{ key }}
        </button>
        <button class="key bg-zinc-600" @click="pressBackspace">⌫</button>
      </div>
    </div>

    <!-- footer -->
    <p class="mt-3 text-xs sm:text-sm text-zinc-400">
      Katla by <a href="//syofyanzuhad.dev" target="_blank" class="text-blue-400 hover:text-blue-300 transition duration-200">Syofyan Zuhad</a>
    </p>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import confetti from 'canvas-confetti'

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
  const shakeRowIndex = ref(null)

  const usedKeys = ref({})

  async function loadWords() {
    try {
      const response = await fetch('/words.json')
      const data = await response.json()
      validWords.value = data.words
      // Select a random word as target
      targetWord.value = validWords.value[Math.floor(Math.random() * validWords.value.length)]
      console.log(targetWord.value)
    } catch (error) {
      console.error('Error loading words:', error)
      message.value = 'Error loading words. Please refresh the page.'
    }
  }

  function submitGuess() {
    if (currentGuess.value.length !== 5) {
      message.value = 'Kata harus 5 huruf.'
      shakeRowIndex.value = guesses.value.length
      resetShake()
      errorAudio.currentTime = 0
      errorAudio.play()
      return
    }

    const guess = currentGuess.value.toLowerCase()
    if (!validWords.value.includes(guess)) {
      message.value = 'Kata tidak ada dalam kamus.'
      shakeRowIndex.value = guesses.value.length
      resetShake()
      errorAudio.currentTime = 0
      errorAudio.play()
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
      message.value = `🎉 Selamat! Kamu menang! Cek artinya di <a href="https://kbbi.kemdikbud.go.id/entri/${targetWord.value}" target="_blank" class="text-blue-500 hover:text-blue-400 transition duration-200">KBBI</a>`
      gameOver.value = true
      successAudio.play()
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      return
    }

    if (guesses.value.length >= maxAttempts) {
      message.value = `😢 Kamu kalah. Kata: ${targetWord.value.toUpperCase()} - <a href="https://kbbi.kemdikbud.go.id/entri/${targetWord.value}" target="_blank" class="text-blue-500 hover:text-blue-400 transition duration-200">Lihat di KBBI</a>`
      gameOver.value = true
    }
  }

  function pressKey(key) {
    if (gameOver.value || currentGuess.value.length >= 5 || guesses.value.length >= maxAttempts) return
    currentGuess.value += key.toLowerCase()
    audio.currentTime = 0
    audio.play()
  }

  function pressBackspace() {
    if (currentGuess.value.length > 0 && !gameOver.value) {
      currentGuess.value = currentGuess.value.slice(0, -1)
    }
    audio.currentTime = 0
    audio.play()
  }

  function pressEnter() {
    if (!gameOver.value) submitGuess()
    audio.currentTime = 0
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
    } else if (key === 'backspace') {
      pressBackspace()
    } else if (/^[a-z]$/.test(key)) {
      pressKey(key)
    }
  }

  onMounted(() => {
    loadWords()
    window.addEventListener('keydown', handlePhysicalKeyboard)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handlePhysicalKeyboard)
  })
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
</style>
