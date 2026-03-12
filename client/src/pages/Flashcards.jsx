import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { RotateCw, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react'
import { motion } from 'framer-motion'

const flashcardsData = {
  Mathematics: [
    { front: 'Pythagorean Theorem', back: 'a² + b² = c²' },
    { front: 'Area of Circle', back: 'πr²' },
    { front: 'Quadratic Formula', back: 'x = (-b ± √(b²-4ac)) / 2a' },
    { front: 'Slope Formula', back: '(y₂-y₁)/(x₂-x₁)' },
    { front: 'Distance Formula', back: '√((x₂-x₁)² + (y₂-y₁)²)' }
  ],
  Physics: [
    { front: 'Newton\'s 2nd Law', back: 'F = ma (Force = mass × acceleration)' },
    { front: 'Kinetic Energy', back: 'KE = ½mv²' },
    { front: 'Potential Energy', back: 'PE = mgh' },
    { front: 'Ohm\'s Law', back: 'V = IR (Voltage = Current × Resistance)' },
    { front: 'Power Formula', back: 'P = W/t (Power = Work/time)' }
  ],
  Chemistry: [
    { front: 'Avogadro\'s Number', back: '6.022 × 10²³ molecules/mol' },
    { front: 'pH Formula', back: 'pH = -log[H⁺]' },
    { front: 'Ideal Gas Law', back: 'PV = nRT' },
    { front: 'Molarity', back: 'M = moles/liters' },
    { front: 'Density', back: 'ρ = mass/volume' }
  ],
  Programming: [
    { front: 'Array in JavaScript', back: 'let arr = [1, 2, 3]' },
    { front: 'Function Declaration', back: 'function name() { }' },
    { front: 'For Loop', back: 'for(let i=0; i<n; i++) { }' },
    { front: 'If Statement', back: 'if (condition) { }' },
    { front: 'Object Creation', back: 'let obj = { key: value }' }
  ]
}

const Flashcards = () => {
  const [selectedSubject, setSelectedSubject] = useState('Mathematics')
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [cards, setCards] = useState(flashcardsData[selectedSubject])

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject)
    setCards(flashcardsData[subject])
    setCurrentCard(0)
    setIsFlipped(false)
  }

  const nextCard = () => {
    setIsFlipped(false)
    setCurrentCard((prev) => (prev + 1) % cards.length)
  }

  const prevCard = () => {
    setIsFlipped(false)
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length)
  }

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setCurrentCard(0)
    setIsFlipped(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Flashcards</h1>
          <button
            onClick={shuffleCards}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg glass dark:glass-dark hover:shadow-lg"
          >
            <Shuffle className="w-5 h-5" />
            <span>Shuffle</span>
          </button>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {Object.keys(flashcardsData).map((subject) => (
            <button
              key={subject}
              onClick={() => handleSubjectChange(subject)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                selectedSubject === subject
                  ? 'bg-blue-500 text-white'
                  : 'glass dark:glass-dark'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-4 text-gray-600 dark:text-gray-400">
            Card {currentCard + 1} of {cards.length}
          </div>

          <motion.div
            className="relative h-96 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              className="absolute w-full h-full"
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="absolute w-full h-full glass dark:glass-dark rounded-xl p-8 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <RotateCw className="w-8 h-8 text-gray-400 mb-4" />
                <h2 className="text-3xl font-bold text-center">{cards[currentCard].front}</h2>
                <p className="text-sm text-gray-500 mt-4">Click to flip</p>
              </div>

              <div
                className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 flex items-center justify-center"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <p className="text-2xl font-semibold text-white text-center">{cards[currentCard].back}</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={prevCard}
              className="p-4 rounded-full glass dark:glass-dark hover:shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextCard}
              className="p-4 rounded-full glass dark:glass-dark hover:shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Flashcards
