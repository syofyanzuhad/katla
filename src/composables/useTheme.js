import { ref, onMounted } from 'vue'

export function useTheme() {
  const theme = ref(localStorage.getItem('katla-theme') || 'dark')

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('katla-theme', theme.value)
    applyTheme()
  }

  function applyTheme() {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.style.backgroundColor = '#18181b' // zinc-900
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.backgroundColor = '#f4f4f5' // zinc-100
    }
  }

  onMounted(() => {
    applyTheme()
  })

  return {
    theme,
    toggleTheme
  }
}
