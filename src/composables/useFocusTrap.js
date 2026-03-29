import { onMounted, onUnmounted, watch, ref } from 'vue'

export function useFocusTrap(targetRef, active) {
  const firstFocusableElement = ref(null)
  const lastFocusableElement = ref(null)

  function getFocusableElements() {
    if (!targetRef.value) return []
    return targetRef.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  }

  function handleKeyDown(e) {
    if (e.key !== 'Tab' || !active.value) return

    const focusableElements = getFocusableElements()
    if (focusableElements.length === 0) return

    firstFocusableElement.value = focusableElements[0]
    lastFocusableElement.value = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement.value) {
        lastFocusableElement.value.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastFocusableElement.value) {
        firstFocusableElement.value.focus()
        e.preventDefault()
      }
    }
  }

  watch(active, (isActive) => {
    if (isActive) {
      setTimeout(() => {
        const focusableElements = getFocusableElements()
        if (focusableElements.length > 0) {
          focusableElements[0].focus()
        }
      }, 50)
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  return {
    handleKeyDown
  }
}
