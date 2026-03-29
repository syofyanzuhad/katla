import { ref } from 'vue'
import { WORD_LENGTH, MAX_ATTEMPTS } from '../constants'
import { getTodaySeed } from '../utils/dateUtils'

export function useGameLogic() {
  const targetWord = ref('')
  const validWords = ref([])
  const guesses = ref([])
  const currentGuess = ref('')
  const gameOver = ref(false)
  const usedKeys = ref({})
  const lastResult = ref('') // 'win' or 'lose'
  const gameMode = ref(localStorage.getItem('katla-mode') || 'daily') // 'daily' or 'random'
  const currentLanguage = ref(localStorage.getItem('katla-lang') || 'id')

  let cachedWords = { id: null, en: null }

  // Simple seeded random to get consistent word for daily mode
  function getSeededRandom(seed) {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  async function loadWords(mode = null, lang = null) {
    if (lang) {
      currentLanguage.value = lang
    } else if (!localStorage.getItem('katla-lang')) {
      currentLanguage.value = 'id'
    }
    
    if (mode) {
      gameMode.value = mode
      localStorage.setItem('katla-mode', mode)
    }
    
    if (cachedWords[currentLanguage.value]) {
      validWords.value = cachedWords[currentLanguage.value]
      selectTargetWord()
      return
    }

    try {
      const response = await fetch(`/words_${currentLanguage.value}.json`)
      const data = await response.json()
      cachedWords[currentLanguage.value] = data.words
      validWords.value = cachedWords[currentLanguage.value]
      selectTargetWord()
    } catch (error) {
      console.error('Error loading words:', error)
      throw new Error(`Error loading ${currentLanguage.value} words. Please refresh the page.`)
    }
  }

  function toggleLanguage() {
    currentLanguage.value = currentLanguage.value === 'id' ? 'en' : 'id'
    localStorage.setItem('katla-lang', currentLanguage.value)
    loadWords(gameMode.value)
  }

  function selectTargetWord() {
    if (gameMode.value === 'daily') {
      const seed = getTodaySeed()
      const index = Math.floor(getSeededRandom(seed) * validWords.value.length)
      targetWord.value = validWords.value[index]
    } else {
      targetWord.value = validWords.value[Math.floor(Math.random() * validWords.value.length)]
    }
  }

  function loadDailyState(state) {
    if (!state) return
    guesses.value = state.guesses || []
    gameOver.value = state.gameOver || false
    lastResult.value = state.lastResult || ''
    
    // Reconstruct used keys
    usedKeys.value = {}
    guesses.value.forEach(guess => {
      const statuses = getLetterStatuses(guess, targetWord.value.split(''))
      guess.forEach((letter, i) => {
        if (statuses[i] === 'correct') {
          usedKeys.value[letter] = 'correct'
        } else if (statuses[i] === 'present' && usedKeys.value[letter] !== 'correct') {
          usedKeys.value[letter] = 'present'
        } else if (!usedKeys.value[letter]) {
          usedKeys.value[letter] = 'absent'
        }
      })
    })
  }


  function getLetterStatuses(guess, target) {
    const statuses = Array(WORD_LENGTH).fill('absent')
    const targetUsed = Array(WORD_LENGTH).fill(false)

    // First pass: correct letters
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guess[i] === target[i]) {
        statuses[i] = 'correct'
        targetUsed[i] = true
      }
    }

    // Second pass: present letters
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (statuses[i] === 'correct') continue
      for (let j = 0; j < WORD_LENGTH; j++) {
        if (!targetUsed[j] && guess[i] === target[j]) {
          statuses[i] = 'present'
          targetUsed[j] = true
          break
        }
      }
    }

    return statuses
  }

  function submitGuess({ onValid, onInvalid, onWin, onLoss, onFlip }) {
    if (currentGuess.value.length !== WORD_LENGTH) {
      onInvalid('Kata harus ' + WORD_LENGTH + ' huruf.', 'length')
      return
    }

    const guess = currentGuess.value.toLowerCase()
    if (!validWords.value.includes(guess)) {
      onInvalid('Kata tidak ada dalam kamus.', 'not_found')
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
      gameOver.value = true
      lastResult.value = 'win'
      onWin()
      return
    } else {
      onFlip()
    }

    if (guesses.value.length >= MAX_ATTEMPTS) {
      gameOver.value = true
      lastResult.value = 'lose'
      onLoss()
    }
  }

  function resetGame(mode = 'random') {
    gameMode.value = mode
    localStorage.setItem('katla-mode', mode)
    guesses.value = []
    currentGuess.value = ''
    gameOver.value = false
    usedKeys.value = {}
    lastResult.value = ''
    selectTargetWord()
  }

  return {
    targetWord,
    guesses,
    currentGuess,
    gameOver,
    usedKeys,
    lastResult,
    gameMode,
    currentLanguage,
    loadWords,
    submitGuess,
    getLetterStatuses,
    resetGame,
    toggleLanguage,
    loadDailyState
  }
}
