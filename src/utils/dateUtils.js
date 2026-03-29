/**
 * Date utilities for consistent game seeds
 */

export function getTodaySeed() {
  const now = new Date()
  // Generate a seed based on YYYYMMDD
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
}

export function getTodayDateString() {
  const now = new Date()
  return now.toISOString().split('T')[0]
}
