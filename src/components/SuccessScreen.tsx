import { useEffect, useState } from 'react'

type Props = {
  onReplay: () => void
}

/** Lightweight CSS-only confetti: a few divs animated with keyframes. */
function Confetti() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const colors = ['#ec4899', '#f472b6', '#fbbf24', '#34d399', '#60a5fa']
  const count = 12

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 animate-confetti"
          style={{
            left: `${10 + (i * 7)}%`,
            top: '-10px',
            backgroundColor: colors[i % colors.length],
            animationDelay: `${i * 0.15}s`,
            borderRadius: i % 2 === 0 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  )
}

export function SuccessScreen({ onReplay }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <Confetti />
      <div className="relative z-10 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-pink-600 mb-4">Yay!! 💝</h2>
        <p className="text-lg text-gray-700 mb-8">You just made my day.</p>
        <button
          type="button"
          onClick={onReplay}
          className="px-6 py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
        >
          Replay
        </button>
      </div>
    </div>
  )
}
