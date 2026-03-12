import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { CheckCircle, XCircle, Trophy, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import axios from 'axios'

const quizData = {
  Mathematics: [
    { q: 'What is 15 × 8?', options: ['120', '125', '115', '130'], correct: 0 },
    { q: 'Solve: 2x + 5 = 15', options: ['x = 5', 'x = 10', 'x = 7', 'x = 8'], correct: 0 },
    { q: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correct: 2 },
    { q: 'What is 25% of 200?', options: ['40', '50', '60', '45'], correct: 1 },
    { q: 'What is the value of π (pi) approximately?', options: ['3.14', '2.71', '1.41', '4.13'], correct: 0 }
  ],
  Physics: [
    { q: 'What is the speed of light?', options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10⁷ m/s', '3×10⁹ m/s'], correct: 0 },
    { q: 'What is Newton\'s first law?', options: ['F=ma', 'Inertia', 'Action-Reaction', 'Gravity'], correct: 1 },
    { q: 'Unit of force is?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 1 },
    { q: 'What is the formula for kinetic energy?', options: ['mgh', '½mv²', 'mv', 'ma'], correct: 1 },
    { q: 'Acceleration due to gravity?', options: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '11 m/s²'], correct: 0 }
  ],
  Chemistry: [
    { q: 'What is H₂O?', options: ['Hydrogen', 'Water', 'Oxygen', 'Acid'], correct: 1 },
    { q: 'Atomic number of Carbon?', options: ['4', '6', '8', '12'], correct: 1 },
    { q: 'What is NaCl?', options: ['Sugar', 'Salt', 'Acid', 'Base'], correct: 1 },
    { q: 'pH of pure water?', options: ['0', '7', '14', '1'], correct: 1 },
    { q: 'Noble gas is?', options: ['Oxygen', 'Nitrogen', 'Helium', 'Hydrogen'], correct: 2 }
  ],
  Programming: [
    { q: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], correct: 0 },
    { q: 'Which is not a programming language?', options: ['Python', 'Java', 'HTML', 'C++'], correct: 2 },
    { q: 'What is a variable?', options: ['A constant', 'A storage location', 'A function', 'A loop'], correct: 1 },
    { q: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'], correct: 1 },
    { q: 'Which symbol is used for comments in JavaScript?', options: ['//', '#', '/*', '<!--'], correct: 0 }
  ]
}

const Quiz = () => {
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const navigate = useNavigate()

  const startQuiz = (subject) => {
    setSelectedSubject(subject)
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setAnswers([])
    setTimeLeft(300)
  }

  const handleAnswer = (index) => {
    setSelectedAnswer(index)
    const isCorrect = index === quizData[selectedSubject][currentQuestion].correct
    
    setAnswers([...answers, { question: currentQuestion, selected: index, correct: isCorrect }])
    
    if (isCorrect) setScore(score + 1)

    setTimeout(() => {
      if (currentQuestion < quizData[selectedSubject].length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        submitQuiz()
      }
    }, 1000)
  }

  const submitQuiz = async () => {
    const finalScore = Math.round((score / quizData[selectedSubject].length) * 100)
    
    try {
      await axios.post('/api/quiz/submit', {
        topic: selectedSubject,
        score: finalScore,
        timeSpent: 300 - timeLeft,
        questionsAttempted: quizData[selectedSubject].length,
        correctAnswers: score
      })
    } catch (error) {
      console.error('Error submitting quiz:', error)
    }
    
    setShowResult(true)
  }

  if (!selectedSubject) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Take a Quiz</h1>
          <p className="text-gray-600 dark:text-gray-400">Choose a subject to test your knowledge</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.keys(quizData).map((subject, idx) => (
              <motion.div
                key={subject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => startQuiz(subject)}
                className="glass dark:glass-dark rounded-xl p-6 cursor-pointer hover:shadow-xl transition"
              >
                <div className="text-4xl mb-4">
                  {subject === 'Mathematics' && '📐'}
                  {subject === 'Physics' && '⚛️'}
                  {subject === 'Chemistry' && '🧪'}
                  {subject === 'Programming' && '💻'}
                </div>
                <h3 className="text-xl font-semibold mb-2">{subject}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {quizData[subject].length} Questions • 5 mins
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (showResult) {
    const percentage = Math.round((score / quizData[selectedSubject].length) * 100)
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass dark:glass-dark rounded-xl p-8 text-center"
          >
            <Trophy className={`w-24 h-24 mx-auto mb-6 ${percentage >= 80 ? 'text-yellow-500' : percentage >= 60 ? 'text-blue-500' : 'text-gray-500'}`} />
            <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
            <div className="text-6xl font-bold mb-4">{percentage}%</div>
            <p className="text-xl mb-6">You scored {score} out of {quizData[selectedSubject].length}</p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setSelectedSubject(null)}
                className="px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Take Another Quiz
              </button>
              <button
                onClick={() => navigate('/student')}
                className="px-6 py-3 rounded-lg glass dark:glass-dark hover:shadow-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    )
  }

  const question = quizData[selectedSubject][currentQuestion]

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{selectedSubject} Quiz</h2>
          <div className="flex items-center space-x-2 text-lg">
            <Clock className="w-5 h-5" />
            <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div className="glass dark:glass-dark rounded-xl p-8">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Question {currentQuestion + 1} of {quizData[selectedSubject].length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all"
                style={{ width: `${((currentQuestion + 1) / quizData[selectedSubject].length) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-6">{question.q}</h3>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-lg text-left transition ${
                  selectedAnswer === null
                    ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    : selectedAnswer === idx
                    ? idx === question.correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : idx === question.correct
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedAnswer !== null && (
                    idx === question.correct ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : selectedAnswer === idx ? (
                      <XCircle className="w-6 h-6" />
                    ) : null
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Quiz
