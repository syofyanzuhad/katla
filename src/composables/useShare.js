import { ref } from 'vue'

export function useShare() {
  const showShareMsg = ref(false)

  function getShareEmoji(status) {
    if (status === 'correct') return '🟩'
    if (status === 'present') return '🟨'
    return '⬜️'
  }

  function generateShareText({ lastResult, guesses, maxAttempts, targetWord, getLetterStatuses }) {
    let text = `Katla ${lastResult === 'win' ? guesses.length : 'X'}/${maxAttempts}\n\n`
    for (let i = 0; i < guesses.length; i++) {
      const guess = guesses[i]
      const statuses = getLetterStatuses(guess, targetWord.split(''))
      text += statuses.map(getShareEmoji).join('') + '\n'
    }
    if (lastResult === 'win') {
      text += '\n🎉 Selamat!'
    } else {
      text += `\nKata: ${targetWord.toUpperCase()}`
    }
    text += `\n${window.location.href}`
    return text
  }

  async function shareResult(shareData) {
    const text = generateShareText(shareData)
    try {
      await navigator.clipboard.writeText(text)
      showShareMsg.value = true
      setTimeout(() => showShareMsg.value = false, 2000)
    } catch (e) {
      console.error('Error sharing result:', e)
      alert('Gagal menyalin hasil ke clipboard')
    }
  }

  function openShare(app, shareData) {
    const text = encodeURIComponent(generateShareText(shareData))
    let url = ''
    if (app === 'whatsapp') {
      url = `https://wa.me/?text=${text}`
    } else if (app === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${text}`
    } else if (app === 'telegram') {
      url = `https://t.me/share/url?text=${text}`
    }
    if (url) {
      window.open(url, '_blank')
    }
  }

  return {
    showShareMsg,
    shareResult,
    openShare
  }
}
