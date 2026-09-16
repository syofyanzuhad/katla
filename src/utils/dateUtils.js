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

export function getDayNumber() {
  // Epoch: Jan 20, 2022 (Katla inception)
  const epoch = new Date(2022, 0, 20)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffTime = today.getTime() - epoch.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
  return diffDays > 0 ? diffDays : 1
}
