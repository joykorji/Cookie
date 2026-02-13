/**
 * Generates a random position for the NO button within the modal bounds.
 * Used so the NO button "runs away" when the user tries to click/hover it—
 * we need to keep it inside the modal and avoid going off-screen.
 */
export function getRandomPositionInBounds(
  containerWidth: number,
  containerHeight: number,
  buttonWidth: number,
  buttonHeight: number,
  padding: number = 16,
  /** Optional: avoid overlapping too much with this point (e.g. last position or cursor) */
  avoidX?: number,
  avoidY?: number
): { x: number; y: number } {
  const minX = padding
  const minY = padding
  const maxX = Math.max(minX, containerWidth - buttonWidth - padding)
  const maxY = Math.max(minY, containerHeight - buttonHeight - padding)

  let x: number
  let y: number
  const maxAttempts = 20
  let attempts = 0

  do {
    x = minX + Math.random() * (maxX - minX)
    y = minY + Math.random() * (maxY - minY)
    attempts++
    // If we have an "avoid" point, try to get at least ~60px away so it's clearly moved
    if (avoidX == null || avoidY == null) break
    const dist = Math.hypot(x - avoidX, y - avoidY)
    if (dist >= 60 || attempts >= maxAttempts) break
  } while (true)

  return { x, y }
}
