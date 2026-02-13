/**
 * Image paths for the CAPTCHA grid.
 * Place your photo at public/images/me.jpg and decoys at public/images/decoy1.jpg ... decoy8.jpg.
 * If images fail to load, the grid shows colored fallback blocks with labels.
 */
export const ME_IMAGE = '/images/me.jpg'
export const DECOY_IMAGES = [
  '/images/decoy1.jpg',
  '/images/decoy2.jpg',
  '/images/decoy3.jpg',
  '/images/decoy4.jpg',
  '/images/decoy5.jpg',
  '/images/decoy6.jpg',
  '/images/decoy7.jpg',
  '/images/decoy8.jpg',
]

/** Shuffle array (Fisher–Yates) so the "me" tile appears in a random grid position each time. */
export function shuffleGrid<T>(array: T[]): T[] {
  const out = [...array]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Build 9 tiles: 1 "me" + 8 decoys, then shuffle. */
export function buildGrid(): { src: string; isMe: boolean; id: string }[] {
  const me = { src: ME_IMAGE, isMe: true, id: 'me' }
  const decoys = DECOY_IMAGES.map((src, i) => ({ src, isMe: false, id: `decoy-${i}` }))
  return shuffleGrid([me, ...decoys])
}
