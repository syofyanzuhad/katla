import { describe, it, expect } from 'vitest'
import { useGameLogic } from '../../src/composables/useGameLogic'

describe('useGameLogic - getLetterStatuses', () => {
  const { getLetterStatuses } = useGameLogic()

  it('defaults to Indonesian (id) language', () => {
    localStorage.clear()
    const { currentLanguage } = useGameLogic()
    expect(currentLanguage.value).toBe('id')
  })

  it('identifies correct letters in correct positions', () => {
    const target = 'APPLE'.split('')
    const guess = 'APPLE'.split('')
    const statuses = getLetterStatuses(guess, target)
    expect(statuses).toEqual(['correct', 'correct', 'correct', 'correct', 'correct'])
  })

  it('identifies present letters in wrong positions', () => {
    const target = 'APPLE'.split('')
    const guess = 'PLEAP'.split('')
    const statuses = getLetterStatuses(guess, target)
    // P: present, L: present, E: present, A: present, P: present
    expect(statuses).toEqual(['present', 'present', 'present', 'present', 'present'])
  })

  it('identifies absent letters', () => {
    const target = 'APPLE'.split('')
    const guess = 'BOOKS'.split('')
    const statuses = getLetterStatuses(guess, target)
    expect(statuses).toEqual(['absent', 'absent', 'absent', 'absent', 'absent'])
  })

  it('handles duplicate letters correctly - correct and absent', () => {
    const target = 'APPLE'.split('')
    const guess = 'APPLY'.split('')
    const statuses = getLetterStatuses(guess, target)
    // A: correct, P: correct, P: correct, L: correct, Y: absent
    expect(statuses).toEqual(['correct', 'correct', 'correct', 'correct', 'absent'])
  })

  it('handles duplicate letters correctly - present and absent', () => {
    const target = 'APPLE'.split('')
    const guess = 'PAPPA'.split('')
    const statuses = getLetterStatuses(guess, target)
    // P: present (for index 1/2), A: present (for index 0), P: correct (for index 1), P: present (already used?), A: absent
    // Target: A(0), P(1), P(2), L(3), E(4)
    // Guess: P(0), A(1), P(2), P(3), A(4)
    // Index 2: P matches P (correct)
    // Index 0: P is in target at index 1 (present)
    // Index 1: A is in target at index 0 (present)
    // Index 3: P is in target but both Ps already used? Yes. (absent)
    // Index 4: A is in target but A already used? Yes. (absent)
    
    // Let's re-run manually:
    // targetUsed: [F, F, F, F, F]
    // 1st pass (correct):
    // Guess[2](P) === Target[2](P) -> status[2]=correct, targetUsed[2]=T
    // 2nd pass (present):
    // Guess[0](P) -> Target[1] is P and !targetUsed[1] -> status[0]=present, targetUsed[1]=T
    // Guess[1](A) -> Target[0] is A and !targetUsed[0] -> status[1]=present, targetUsed[0]=T
    // Guess[3](P) -> No unused P in target -> status[3]=absent
    // Guess[4](A) -> No unused A in target -> status[1]=absent
    
    expect(statuses).toEqual(['present', 'present', 'correct', 'absent', 'absent'])
  })
})
