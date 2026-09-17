import { ref } from 'vue'
import { getDayNumber } from '../utils/dateUtils'

export function useShare() {
  const showShareMsg = ref(false)

  function getShareEmoji(status) {
    if (status === 'correct') return '🟩'
    if (status === 'present') return '🟨'
    return '⬜️'
  }

  function generateShareText({
    lastResult,
    guesses,
    maxAttempts,
    targetWord,
    getLetterStatuses,
    gameMode = 'daily',
    dayNumber = getDayNumber(),
    language = 'id'
  }) {
    const attempts = lastResult === 'win' ? guesses.length : 'X'
    let text = ''

    if (gameMode === 'daily') {
      const modeTitle = language === 'id' ? 'Katla Harian' : 'Katla Daily'
      text = `${modeTitle} #${dayNumber} ${attempts}/${maxAttempts}\n\n`
    } else {
      const modeTitle = language === 'id' ? 'Katla (Mode Acak)' : 'Katla (Random Mode)'
      text = `${modeTitle} ${attempts}/${maxAttempts}\n\n`
    }

    for (let i = 0; i < guesses.length; i++) {
      const guess = guesses[i]
      const statuses = getLetterStatuses(guess, targetWord.split(''))
      text += statuses.map(getShareEmoji).join('') + '\n'
    }

    text += '\n'
    if (gameMode === 'daily') {
      text += '#Katla #KatlaHariIni\n'
      text += `${window.location.origin}/`
    } else {
      text += '#Katla\n'
      text += `${window.location.origin}/?mode=random`
    }

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

  function generateStatsText(stats, language = 'id') {
    const winRate = stats.totalGames === 0 ? 0 : Math.round((stats.wins / stats.totalGames) * 100)
    let text = language === 'id' ? `📊 Statistik Katla\n\n` : `📊 Katla Statistics\n\n`
    text += language === 'id' ? `Main: ${stats.totalGames}\n` : `Played: ${stats.totalGames}\n`
    text += language === 'id' ? `Menang: ${winRate}%\n` : `Win: ${winRate}%\n`
    text += language === 'id' ? `Streak: ${stats.currentStreak}\n` : `Current Streak: ${stats.currentStreak}\n`
    text += language === 'id' ? `Max Streak: ${stats.maxStreak}\n\n` : `Max Streak: ${stats.maxStreak}\n\n`
    text += `#Katla #StatistikKatla\n`
    text += `${window.location.href}`
    return text
  }

  async function shareStats(stats, language = 'id') {
    const text = generateStatsText(stats, language)
    try {
      await navigator.clipboard.writeText(text)
      showShareMsg.value = true
      setTimeout(() => showShareMsg.value = false, 2000)
    } catch (e) {
      console.error('Error sharing stats:', e)
      alert('Gagal menyalin statistik ke clipboard')
    }
  }

  function openStatsShare(app, stats, language = 'id') {
    const text = encodeURIComponent(generateStatsText(stats, language))
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
    openShare,
    shareStats,
    openStatsShare
  }
}
