import { useState, useCallback, useMemo, useEffect } from 'react'

const PUZZLE_IMAGE = '/images/puzzle.png'
const COLS = 2
const ROWS = 2

/** Shuffle array (Fisher–Yates). */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const CORRECT_ORDER = [0, 1, 2, 3]

/** Background position for each piece index in a 2x2 grid (piece 0 = top-left, 1 = top-right, etc.). */
const PIECE_POSITIONS: [string, string][] = [
  ['0%', '0%'],
  ['100%', '0%'],
  ['0%', '100%'],
  ['100%', '100%'],
]

type Props = {
  onSolve: () => void
}

export function PuzzleScreen({ onSolve }: Props) {
  const [order, setOrder] = useState<number[]>(() => shuffle(CORRECT_ORDER))
  const [selected, setSelected] = useState<number | null>(null)

  const isSolved = useMemo(() => order.every((v, i) => v === i), [order])

  const handleSlotClick = useCallback(
    (slot: number) => {
      if (selected === null) {
        setSelected(slot)
        return
      }
      if (selected === slot) {
        setSelected(null)
        return
      }
      setOrder((prev) => {
        const next = [...prev]
        ;[next[selected], next[slot]] = [next[slot], next[selected]]
        return next
      })
      setSelected(null)
    },
    [selected]
  )

  if (isSolved) {
    return <PuzzleSolvedScreen onContinue={onSolve} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center p-4">
      <p className="text-gray-700 mb-4 text-center">
        Put the picture in the right order. Click two tiles to swap them.
      </p>
      <div
        className="grid gap-1 rounded-xl overflow-hidden shadow-xl border-2 border-gray-200"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {order.map((pieceIndex, slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => handleSlotClick(slot)}
            className={`
              w-28 h-28 sm:w-36 sm:h-36 bg-gray-200 border-2 transition-all
              focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2
              ${selected === slot ? 'border-pink-500 ring-2 ring-pink-300 scale-105' : 'border-transparent'}
            `}
            style={{
              backgroundImage: `url(${PUZZLE_IMAGE})`,
              backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
              backgroundPosition: `${PIECE_POSITIONS[pieceIndex][0]} ${PIECE_POSITIONS[pieceIndex][1]}`,
            }}
            aria-label={`Tile ${slot + 1}, click to select then click another to swap`}
          />
        ))}
      </div>
    </div>
  )
}

type PuzzleSolvedProps = {
  onContinue: () => void
}

/** After puzzle is solved: heart appears, becomes clickable after a short delay; message below. */
function PuzzleSolvedScreen({ onContinue }: PuzzleSolvedProps) {
  const [heartClickable, setHeartClickable] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeartClickable(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center p-6 text-center">
      <p className="text-lg text-gray-700 mb-2">You did it! 💕</p>
      <img
        src={PUZZLE_IMAGE}
        alt="Us"
        className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-xl shadow-lg mb-4"
      />
      <button
        type="button"
        onClick={heartClickable ? onContinue : undefined}
        disabled={!heartClickable}
        className={`
          text-6xl sm:text-7xl mb-6 transition-transform
          ${heartClickable ? 'cursor-pointer hover:scale-110 focus:scale-110 focus:outline-none' : 'cursor-default opacity-90'}
        `}
        aria-label="Click to continue"
        title={heartClickable ? 'Click to continue' : 'Just a moment...'}
      >
        💝
      </button>
      {heartClickable && (
        <p className="text-gray-700 max-w-md text-sm leading-relaxed">
          this year I asked ai le3mlna sora m3 b3d... eza alla rad next year bkun 3na kteeeeeer souar m3 b3d bala mniet el ai ya helweh
        </p>
      )}
    </div>
  )
}
