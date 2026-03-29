import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getUserId, getUserStats, recordGameResult, resetAllStats } from '../../src/utils/userStats'

describe('userStats', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('generates a new user ID if none exists', () => {
    const userId = getUserId()
    expect(userId).toBeDefined()
    expect(typeof userId).toBe('string')
    expect(userId.length).toBeGreaterThan(0)
    expect(localStorage.getItem('katla_user_id')).toBe(userId)
  })

  it('retrieves an existing user ID', () => {
    const existingId = 'test-id'
    localStorage.setItem('katla_user_id', existingId)
    const userId = getUserId()
    expect(userId).toBe(existingId)
  })

  it('returns default stats if none exist', () => {
    const stats = getUserStats()
    expect(stats.totalGames).toBe(0)
    expect(stats.wins).toBe(0)
    expect(stats.currentStreak).toBe(0)
  })

  it('records a win correctly', () => {
    recordGameResult(true, 3)
    const stats = getUserStats()
    expect(stats.totalGames).toBe(1)
    expect(stats.wins).toBe(1)
    expect(stats.currentStreak).toBe(1)
    expect(stats.guessDistribution[3]).toBe(1)
  })

  it('records a loss correctly', () => {
    recordGameResult(false, 6)
    const stats = getUserStats()
    expect(stats.totalGames).toBe(1)
    expect(stats.wins).toBe(0)
    expect(stats.currentStreak).toBe(0)
    expect(stats.losses).toBe(1)
  })

  it('updates streaks correctly', () => {
    recordGameResult(true, 3)
    recordGameResult(true, 4)
    let stats = getUserStats()
    expect(stats.currentStreak).toBe(2)
    expect(stats.maxStreak).toBe(2)

    recordGameResult(false, 6)
    stats = getUserStats()
    expect(stats.currentStreak).toBe(0)
    expect(stats.maxStreak).toBe(2)
  })

  it('resets all stats', () => {
    recordGameResult(true, 3)
    resetAllStats()
    const stats = getUserStats()
    expect(stats.totalGames).toBe(0)
    expect(localStorage.getItem('katla_game_history')).toBeNull()
  })

  it('handles corrupted localStorage data', () => {
    localStorage.setItem('katla_user_stats', 'invalid-json')
    const stats = getUserStats()
    expect(stats.totalGames).toBe(0) // Should return default stats on error
  })
})
