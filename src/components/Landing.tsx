type Props = {
  onStart: () => void
}

export function Landing({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
        Hi Cookie! 🍪
      </h1>
      <p className="text-gray-600 text-lg mb-2">
        hey a small coding project for youuuu
      </p>
      <p className="text-gray-600 text-lg mb-10">
        since it's valentine let's remember enek ahla bnt bl 3alam klooo 💕
      </p>
      <button
        type="button"
        onClick={onStart}
        className="px-8 py-4 rounded-2xl bg-pink-500 text-white font-semibold text-lg hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 transition-colors"
      >
        Let's go →
      </button>
    </div>
  )
}
