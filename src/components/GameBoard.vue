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
            <p>Gunakan tombol keyboard atau klik tombol di bawah untuk memasukkan huruf.</p>
        </div>
  
      <div class="grid grid-rows-6 gap-1 sm:gap-2 min-h-[50vh] lg:min-h-[60vh]">
        <div v-for="(guessRow, rowIndex) in 6" :key="rowIndex" class="grid grid-cols-5 gap-1 sm:gap-2">
          <div
            v-for="colIndex in 5"
            :key="colIndex"
            class="w-15 h-15 sm:w-14 sm:h-14 lg:w-25 lg:h-25 border-2 text-xl sm:text-2xl flex items-center justify-center font-bold uppercase transition-all duration-500 ease-in-out transform"
            :class="[getBoxClass(rowIndex, colIndex - 1), getFlipClass(rowIndex, colIndex - 1)]"
          >
            {{ getLetterDisplay(rowIndex, colIndex - 1) }}
          </div>
        </div>
      </div>
  
      <div class="mt-5 sm:mt-6 space-y-1 sm:space-y-2 text-center sm:max-w-[500px] px-2 w-full lg:w-full">
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
  
      <p class="mt-2 text-xs sm:text-sm text-zinc-400">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
//   import { Client, Databases } from 'appwrite';
//   const client = new Client();
// client
//     .setEndpoint('https://fra.cloud.appwrite.io/v1')
//     .setProject('64c0a269c34f9d4c04ad');

    // const databases = new Databases(client);

  const targetWord = 'cinta'
    // const targetWord = ref('')
    // databases.listDocuments(
    //     '682c25c1002bd7f5f138',
    //     '682c25cb00129b47d29a',
    //     [
    //         Query.equal('date', new Date().toISOString().split('T')[0]),
    //         Query.limit(1)
    //     ]
    // ).then((response) => {
    //     targetWord.value = response.documents[0].word
    //     console.log(targetWord.value)
    // }).catch((error) => {
    //     console.error(error);
    // });
  const guesses = ref([])
  const currentGuess = ref('')
  const maxAttempts = 6
  const gameOver = ref(false)
  const message = ref('')
  const audio = new Audio('https://www.soundjay.com/button/sounds/button-16.mp3')
  
  const usedKeys = ref({})
  
  function submitGuess() {
    if (currentGuess.value.length !== 5) {
      message.value = 'Kata harus 5 huruf.'
      return
    }
  
    const guess = currentGuess.value.toLowerCase().split('')
    guesses.value.push(guess)
    guess.forEach((letter, index) => {
      if (targetWord[index] === letter) {
        usedKeys.value[letter] = 'correct'
      } else if (targetWord.includes(letter)) {
        if (usedKeys.value[letter] !== 'correct') usedKeys.value[letter] = 'present'
      } else {
        usedKeys.value[letter] = 'absent'
      }
    })
  
    currentGuess.value = ''
  
    if (guess.join('') === targetWord) {
      message.value = '🎉 Selamat! Kamu menang!'
      gameOver.value = true
      return
    }
  
    if (guesses.value.length >= maxAttempts) {
      message.value = `😢 Kamu kalah. Kata: ${targetWord.toUpperCase()}`
      gameOver.value = true
    }
  }
  
  function pressKey(key) {
    if (gameOver.value || currentGuess.value.length >= 5 || guesses.value.length >= maxAttempts) return
    currentGuess.value += key.toLowerCase()
    playSound()
  }
  
  function pressBackspace() {
    if (gameOver.value) return
    currentGuess.value = currentGuess.value.slice(0, -1)
    playSound()
  }
  
  function pressEnter() {
    if (!gameOver.value) submitGuess()
  }
  
  function getLetter(row, col) {
    return guesses.value[row]?.[col] || ''
  }
  
  function getLetterDisplay(row, col) {
    if (row === guesses.value.length) {
      return currentGuess.value[col]?.toUpperCase() || ''
    }
    return guesses.value[row]?.[col]?.toUpperCase() || ''
  }
  
  function getBoxClass(row, col) {
    const guessRow = guesses.value[row]
    if (!guessRow) return 'border-zinc-600'
  
    const letter = guessRow[col]
    const correctLetter = targetWord[col]
    const isCorrect = letter === correctLetter
    const isPresent = !isCorrect && targetWord.includes(letter)
  
    return {
      'bg-green-600 border-green-600 text-white': isCorrect,
      'bg-yellow-500 border-yellow-500 text-white': isPresent,
      'bg-zinc-700 border-zinc-700 text-white': !isCorrect && !isPresent,
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
    }
  }
  
  function playSound() {
    if (audio.paused) return
    audio.currentTime = 0
    audio.play()
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
  </style>
  