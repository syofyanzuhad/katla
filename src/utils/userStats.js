/**
 * User Statistics Management
 * Mengelola statistik pengguna menggunakan localStorage
 */

// Generate UUID v4
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Get atau create user ID
export function getUserId() {
  let userId = localStorage.getItem('katla_user_id')
  if (!userId) {
    userId = generateUUID()
    localStorage.setItem('katla_user_id', userId)
  }
  return userId
}

// Get user stats
export function getUserStats() {
  const statsJson = localStorage.getItem('katla_user_stats')
  const defaultStats = {
    totalGames: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    },
    lastPlayed: null,
    lastDailyGame: null // Format: YYYYMMDD
  }

  if (!statsJson) return defaultStats

  try {
    return { ...defaultStats, ...JSON.parse(statsJson) }
  } catch (error) {
    console.error('Error parsing user stats:', error)
    return defaultStats
  }
}

// Save user stats
export function saveUserStats(stats) {
  localStorage.setItem('katla_user_stats', JSON.stringify(stats))
}

// Record game result
export function recordGameResult(won, guessCount, mode = 'random', seed = null) {
  const stats = getUserStats()

  // Prevent duplicate daily game records
  if (mode === 'daily' && seed) {
    if (stats.lastDailyGame === seed) {
      console.warn('Daily game already recorded for today.')
      return stats
    }
    stats.lastDailyGame = seed
  }

  stats.totalGames++
  stats.lastPlayed = new Date().toISOString()

  if (won) {
    stats.wins++
    stats.currentStreak++
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak)

    // Record guess distribution (1-6)
    if (guessCount >= 1 && guessCount <= 6) {
      stats.guessDistribution[guessCount]++
    }
  } else {
    stats.losses++
    stats.currentStreak = 0
  }

  saveUserStats(stats)
  return stats
}

// Get game history
export function getGameHistory() {
  const historyJson = localStorage.getItem('katla_game_history')
  if (!historyJson) return []
  try {
    return JSON.parse(historyJson)
  } catch (error) {
    console.error('Error parsing game history:', error)
    return []
  }
}

// Add game to history
export function addGameToHistory(gameData) {
  const history = getGameHistory()

  const newGame = {
    id: generateUUID(),
    userId: getUserId(),
    word: gameData.word,
    won: gameData.won,
    guesses: gameData.guesses,
    guessCount: gameData.guessCount,
    timestamp: new Date().toISOString()
  }

  history.unshift(newGame) // Add to beginning

  // Keep only last 100 games
  if (history.length > 100) {
    history.splice(100)
  }

  localStorage.setItem('katla_game_history', JSON.stringify(history))
  return newGame
}

// Save today's daily state
export function saveDailyState(seed, state) {
  const dailyStates = getDailyStates()
  dailyStates[seed] = {
    ...state,
    timestamp: new Date().toISOString()
  }
  localStorage.setItem('katla_daily_states', JSON.stringify(dailyStates))
}

// Get daily states
function getDailyStates() {
  const statesJson = localStorage.getItem('katla_daily_states')
  if (!statesJson) return {}
  try {
    return JSON.parse(statesJson)
  } catch (e) {
    return {}
  }
}

// Get today's state
export function getDailyState(seed) {
  const states = getDailyStates()
  return states[seed] || null
}

// Calculate win rate
export function getWinRate() {
  const stats = getUserStats()
  if (stats.totalGames === 0) return 0
  return Math.round((stats.wins / stats.totalGames) * 100)
}

// Reset all stats (optional - for testing)
export function resetAllStats() {
  localStorage.removeItem('katla_user_stats')
  localStorage.removeItem('katla_game_history')
  // Note: We don't remove user_id to keep the same user identity
}
