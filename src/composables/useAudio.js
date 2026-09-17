import { ref } from 'vue'

const soundEnabled = ref(localStorage.getItem('katla_sound_enabled') !== 'false')

export function useAudio() {
  const audio = new Audio('/button-16a.mp3')
  const successAudio = new Audio('/goodresult-82807.mp3')
  const errorAudio = new Audio('/error-10-206498.mp3')
  const flipAudio = new Audio('/pageturn-102978.mp3')

  function toggleSound() {
    soundEnabled.value = !soundEnabled.value
    localStorage.setItem('katla_sound_enabled', String(soundEnabled.value))
  }

  function playKeySound() {
    if (!soundEnabled.value) return
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  function playSuccessSound() {
    if (!soundEnabled.value) return
    successAudio.currentTime = 0
    successAudio.play().catch(() => {})
  }

  function playErrorSound() {
    if (!soundEnabled.value) return
    errorAudio.currentTime = 0
    errorAudio.play().catch(() => {})
  }

  function playFlipSound() {
    if (!soundEnabled.value) return
    flipAudio.currentTime = 0
    flipAudio.play().catch(() => {})
  }

  return {
    soundEnabled,
    toggleSound,
    playKeySound,
    playSuccessSound,
    playErrorSound,
    playFlipSound
  }
}

