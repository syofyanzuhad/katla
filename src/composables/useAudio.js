import { ref } from 'vue'

export function useAudio() {
  const audio = new Audio('/button-16a.mp3')
  const successAudio = new Audio('/goodresult-82807.mp3')
  const errorAudio = new Audio('/error-10-206498.mp3')
  const flipAudio = new Audio('/pageturn-102978.mp3')

  function playKeySound() {
    audio.currentTime = 0
    audio.play()
  }

  function playSuccessSound() {
    successAudio.currentTime = 0
    successAudio.play()
  }

  function playErrorSound() {
    errorAudio.currentTime = 0
    errorAudio.play()
  }

  function playFlipSound() {
    flipAudio.currentTime = 0
    flipAudio.play()
  }

  return {
    playKeySound,
    playSuccessSound,
    playErrorSound,
    playFlipSound
  }
}
