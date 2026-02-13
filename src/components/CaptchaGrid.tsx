import { useState } from 'react'
import type { GridTile } from '../types'

type Props = {
  tiles: GridTile[]
  selectedId: string | null
  onSelect: (id: string) => void
  disabled?: boolean
}

/** Single tile: shows image or fallback colored block with label. */
function Tile({
  tile,
  selected,
  onSelect,
  disabled,
}: {
  tile: GridTile
  selected: boolean
  onSelect: () => void
  disabled?: boolean
}) {
  const [imgError, setImgError] = useState(false)
  const showFallback = imgError

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`
        aspect-square w-full rounded-lg border-2 transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2
        ${selected ? 'border-pink-500 ring-2 ring-pink-300 scale-[1.02]' : 'border-gray-200 hover:border-pink-200'}
      `}
      aria-pressed={selected}
      aria-label={tile.isMe ? 'Select the person you like' : `Decoy image ${tile.id}`}
    >
      {showFallback ? (
        <div
          className="h-full w-full rounded-md flex items-center justify-center text-white text-xs font-medium"
          style={{ backgroundColor: tile.isMe ? '#ec4899' : '#94a3b8' }}
        >
          {tile.isMe ? 'Me' : tile.id.replace('decoy-', '')}
        </div>
      ) : (
        <img
          src={tile.src}
          alt=""
          className="h-full w-full object-cover rounded-md"
          onError={() => setImgError(true)}
        />
      )}
    </button>
  )
}

export function CaptchaGrid({ tiles, selectedId, onSelect, disabled }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          tile={tile}
          selected={selectedId === tile.id}
          onSelect={() => onSelect(tile.id)}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
