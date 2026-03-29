import { ref } from 'vue'
import { WORD_LENGTH, MAX_ATTEMPTS } from '../constants'

export function useGameLogic() {
  const targetWord = ref('')
  const validWords = ref([])
  const guesses = ref([])
  const currentGuess = ref('')
  const gameOver = ref(false)
  const usedKeys = ref({})
  const lastResult = ref('') // 'win' or 'lose'

  async function loadWords() {
    try {
      const response = await fetch('/words.json')
      const data = await response.json()
      validWords.value = data.words
      // Select a random word as target
      targetWord.value = validWords.value[Math.floor(Math.random() * validWords.value.length)]
    } catch (error) {
      console.error('Error loading words:', error)
      throw new Error('Error loading words. Please refresh the page.')
    }
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

  function resetGame() {
    guesses.value = []
    currentGuess.value = ''
    gameOver.value = false
    usedKeys.value = {}
    lastResult.value = ''
    // Load new word
    targetWord.value = validWords.value[Math.floor(Math.random() * validWords.value.length)]
  }

  return {
    targetWord,
    guesses,
    currentGuess,
    gameOver,
    usedKeys,
    lastResult,
    loadWords,
    submitGuess,
    getLetterStatuses,
    resetGame
  }
}
