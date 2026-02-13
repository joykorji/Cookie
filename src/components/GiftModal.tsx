import { useRef, useState, useCallback, useEffect } from 'react'
import { getRandomPositionInBounds } from '../utils/noButtonPosition'

type Props = {
  onYes: () => void
  onClose?: () => void
}

/**
 * Modal with the gift question. NO button runs away on hover/click (and on mobile, on tap).
 * YES button grows with each NO attempt. Focus is trapped inside the modal.
 */
export function GiftModal({ onYes }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [yesScale, setYesScale] = useState(1)
  const noAttempts = useRef(0)

  const moveNoButton = useCallback(() => {
    const modal = modalRef.current
    if (!modal) return
    const w = modal.offsetWidth
    const h = modal.offsetHeight
    const padding = 16
    const btnW = 88
    const btnH = 44
    const pos = getRandomPositionInBounds(w, h, btnW, btnH, padding)
    setNoPosition(pos)
  }, [])

  // Initial position; reposition NO if modal is resized
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return
    const ro = new ResizeObserver(() => moveNoButton())
    ro.observe(modal)
    moveNoButton()
    return () => ro.disconnect()
  }, [moveNoButton])

  // Focus trap: keep focus inside modal
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return
    const focusables = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    modal.addEventListener('keydown', handleKeyDown)
    return () => modal.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNoClick = () => {
    noAttempts.current += 1
    setYesScale((s) => Math.min(s + 0.15, 2.5))
    moveNoButton()
  }

  const handleNoPointerEnter = () => {
    moveNoButton()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative rounded-2xl bg-white p-6 shadow-xl max-w-sm w-full min-h-[200px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-lg font-semibold text-gray-800 mb-4 pr-20">
          Would you accept a small gift from meeeeeee… even though I'm not your official valentino? 😇
        </h2>

        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button
            type="button"
            onClick={onYes}
            className="px-6 py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 transition-transform duration-200"
            style={{ transform: `scale(${yesScale})` }}
          >
            YES
          </button>
          <button
            type="button"
            onClick={handleNoClick}
            onPointerEnter={handleNoPointerEnter}
            className="absolute px-5 py-2.5 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 transition-all duration-150"
            style={{ left: noPosition.x, top: noPosition.y }}
            aria-hidden="true"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  )
}
