import { useState, useCallback } from 'react'
import { SWIPE_CARDS } from './config/cards'
import { Landing } from './components/Landing'
import { SwipeCard } from './components/SwipeCard'
import { OneMoreGameScreen } from './components/OneMoreGameScreen'
import { PuzzleScreen } from './components/PuzzleScreen'
import { SuccessScreen } from './components/SuccessScreen'

type Screen = 'landing' | 'cards' | 'oneMoreGame' | 'puzzle' | 'success'

function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [cardIndex, setCardIndex] = useState(0)

  const handleStart = useCallback(() => {
    setScreen('cards')
    setCardIndex(0)
  }, [])

  const handleSwipeRight = useCallback(() => {
    if (cardIndex >= SWIPE_CARDS.length - 1) {
      setScreen('oneMoreGame')
    } else {
      setCardIndex((i) => i + 1)
    }
  }, [cardIndex])

  const handleOneMoreGameStart = useCallback(() => {
    setScreen('puzzle')
  }, [])

  const handlePuzzleSolve = useCallback(() => {
    setScreen('success')
  }, [])

  const handleReplay = useCallback(() => {
    setScreen('landing')
    setCardIndex(0)
  }, [])

  if (screen === 'landing') {
    return <Landing onStart={handleStart} />
  }

  if (screen === 'oneMoreGame') {
    return <OneMoreGameScreen onStart={handleOneMoreGameStart} />
  }

  if (screen === 'puzzle') {
    return <PuzzleScreen onSolve={handlePuzzleSolve} />
  }

  if (screen === 'success') {
    return <SuccessScreen onReplay={handleReplay} />
  }

  const card = SWIPE_CARDS[cardIndex]
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center p-4 py-8">
      <p className="text-sm text-gray-500 mb-4">
        {cardIndex + 1} of {SWIPE_CARDS.length}
      </p>
      <SwipeCard
        key={cardIndex}
        image={card.image}
        text={card.text}
        onSwipeRight={handleSwipeRight}
      />
    </div>
  )
}

export default App
