import { useState, useRef, useCallback, useEffect } from 'react'

type Props = {
  image: string
  text: string
  onSwipeRight: () => void
}

const SWIPE_THRESHOLD = 80
const BOUNCE_DURATION = 300

/**
 * Single card: drag to swipe. Right swipe triggers onSwipeRight; left swipe bounces back.
 * Uses pointer events (work on iPhone) and a native touch listener to prevent iOS page scroll when swiping.
 */
export function SwipeCard({ image, text, onSwipeRight }: Props) {
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const draggingRef = useRef(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    startX.current = e.clientX
    draggingRef.current = true
    setIsDragging(true)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const dx = e.clientX - startX.current
    setOffset(Math.max(0, dx))
  }, [])

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false
    setIsDragging(false)
    if (offset >= SWIPE_THRESHOLD) {
      onSwipeRight()
    } else {
      setOffset(0)
    }
  }, [offset, onSwipeRight])

  const handlePointerCancel = useCallback(() => {
    draggingRef.current = false
    setIsDragging(false)
    setOffset(0)
  }, [])

  /* Prevent iOS Safari from scrolling the page when user swipes the card (passive: false + preventDefault). */
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const onTouchMove = (e: TouchEvent) => {
      if (draggingRef.current) e.preventDefault()
    }
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => el.removeEventListener('touchmove', onTouchMove)
  }, [])

  return (
    <div className="w-full max-w-sm mx-auto px-2">
      <div
        ref={cardRef}
        className="relative rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 select-none touch-none"
        style={{ userSelect: 'none', touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div
          className="relative transition-transform duration-75 ease-out"
          style={{
            transform: `translateX(${offset}px)`,
            transitionProperty: isDragging ? 'none' : 'transform',
            transitionDuration: isDragging ? '0ms' : `${BOUNCE_DURATION}ms`,
          }}
        >
          <div className="aspect-[3/4] relative bg-gray-100">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            {offset > 0 && (
              <div
                className="absolute inset-y-0 left-0 w-24 flex items-center justify-center bg-green-500/90 text-white font-bold text-lg"
                aria-hidden
              >
                ✓
              </div>
            )}
          </div>
          <p className="p-4 text-center text-gray-700 font-medium text-lg">
            {text}
          </p>
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-gray-500">
        Swipe right →
      </p>
    </div>
  )
}
