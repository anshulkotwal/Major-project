import { useState, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react'
import { motion } from 'framer-motion'

const StudyTimer = () => {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(0)

  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false)
            if (!isBreak) {
              setSessions(sessions + 1)
              // Start break
              setIsBreak(true)
              setMinutes(5)
            } else {
              // Break completed
              setIsBreak(false)
              setMinutes(25)
            }
            // Play notification sound (optional)
            return
          }
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, minutes, seconds, isBreak, sessions])

  const toggle = () => setIsActive(!isActive)

  const reset = () => {
    setIsActive(false)
    setMinutes(isBreak ? 5 : 25)
    setSeconds(0)
  }

  const startBreak = () => {
    setIsActive(false)
    setIsBreak(true)
    setMinutes(5)
    setSeconds(0)
  }

  const startFocus = () => {
    setIsActive(false)
    setIsBreak(false)
    setMinutes(25)
    setSeconds(0)
  }

  const progress = isBreak
    ? ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100
    : ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Study Timer</h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Pomodoro Technique: 25 min focus + 5 min break
        </p>

        <div className="glass dark:glass-dark rounded-xl p-8">
          <div className="text-center mb-8">
            <div className={`inline-block px-6 py-2 rounded-full ${isBreak ? 'bg-green-500' : 'bg-blue-500'} text-white font-semibold mb-4`}>
              {isBreak ? '☕ Break Time' : '📚 Focus Time'}
            </div>
          </div>

          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="transform -rotate-90 w-64 h-64">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                className={isBreak ? 'text-green-500' : 'text-blue-500'}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {isActive ? 'In Progress' : 'Paused'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              className={`p-6 rounded-full ${isBreak ? 'bg-green-500' : 'bg-blue-500'} text-white hover:shadow-lg`}
            >
              {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={reset}
              className="p-6 rounded-full glass dark:glass-dark hover:shadow-lg"
            >
              <RotateCcw className="w-8 h-8" />
            </motion.button>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={startFocus}
              disabled={!isBreak}
              className="px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              25 min Focus
            </button>
            <button
              onClick={startBreak}
              disabled={isBreak}
              className="px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
            >
              5 min Break
            </button>
          </div>
        </div>

        <div className="glass dark:glass-dark rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Today's Progress</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{sessions}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{sessions * 25}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Minutes Studied</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default StudyTimer
