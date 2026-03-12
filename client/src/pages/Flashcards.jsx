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
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 100, 0],
            y: [0, -100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl"
        />
      </div>

      <div className="space-y-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold">Flashcards</h1>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={shuffleCards}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg glass dark:glass-dark hover:shadow-lg"
          >
            <Shuffle className="w-5 h-5" />
            <span>Shuffle</span>
          </motion.button>
        </motion.div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {Object.keys(flashcardsData).map((subject, idx) => (
            <motion.button
              key={subject}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubjectChange(subject)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedSubject === subject
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'glass dark:glass-dark hover:shadow-md'
              }`}
            >
              {subject}
            </motion.button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-4 text-gray-600 dark:text-gray-400"
          >
            Card {currentCard + 1} of {cards.length}
          </motion.div>

          <motion.div
            className="relative h-96 cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute w-full h-full"
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card */}
              <motion.div
                className="absolute w-full h-full glass dark:glass-dark rounded-xl p-8 flex flex-col items-center justify-center shadow-2xl"
                style={{ backfaceVisibility: 'hidden' }}
                whileHover={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RotateCw className="w-8 h-8 text-gray-400 mb-4" />
                </motion.div>
                <h2 className="text-3xl font-bold text-center mb-4">{cards[currentCard].front}</h2>
                <motion.p 
                  className="text-sm text-gray-500 mt-4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to flip
                </motion.p>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-xl" />
              </motion.div>

              {/* Back of card */}
              <motion.div
                className="absolute w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl p-8 flex items-center justify-center shadow-2xl"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="relative">
                  <p className="text-2xl font-semibold text-white text-center">{cards[currentCard].back}</p>
                  
                  {/* Sparkle effects */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="flex justify-center space-x-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevCard}
              className="p-4 rounded-full glass dark:glass-dark hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextCard}
              className="p-4 rounded-full glass dark:glass-dark hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {cards.map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentCard 
                    ? 'bg-blue-500 w-8' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Flashcards
