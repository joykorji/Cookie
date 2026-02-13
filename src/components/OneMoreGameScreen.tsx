type Props = {
  onStart: () => void
}

export function OneMoreGameScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center p-6 text-center">
      <p className="text-xl text-gray-700 mb-6">
        There's one more game you need to play...
      </p>
      <button
        type="button"
        onClick={onStart}
        className="px-8 py-4 rounded-2xl bg-pink-500 text-white font-semibold text-lg hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 transition-colors"
      >
        Let's go
      </button>
    </div>
  )
}
