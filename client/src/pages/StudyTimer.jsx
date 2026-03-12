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
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br ${
            isBreak ? 'from-green-400 to-emerald-500' : 'from-blue-400 to-indigo-500'
          } rounded-full blur-3xl transition-colors duration-1000`}
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-center">Study Timer</h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Pomodoro Technique: 25 min focus + 5 min break
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass dark:glass-dark rounded-xl p-8 relative overflow-hidden"
        >
          {/* Animated gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${
            isBreak 
              ? 'from-green-500/10 to-emerald-500/10' 
              : 'from-blue-500/10 to-indigo-500/10'
          } transition-colors duration-1000`} />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <motion.div 
                className={`inline-block px-6 py-2 rounded-full ${
                  isBreak ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                } text-white font-semibold mb-4 shadow-lg`}
                animate={{ 
                  scale: isActive ? [1, 1.05, 1] : 1,
                }}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              >
                {isBreak ? '☕ Break Time' : '📚 Focus Time'}
              </motion.div>
            </div>

            <div className="relative w-64 h-64 mx-auto mb-8">
              {/* Outer glow ring */}
              <motion.div
                className={`absolute inset-0 rounded-full ${
                  isBreak ? 'bg-green-500/20' : 'bg-blue-500/20'
                } blur-xl`}
                animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              />
              
              <svg className="transform -rotate-90 w-64 h-64 relative z-10">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <motion.circle
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
                  initial={false}
                  animate={{ 
                    strokeDashoffset: 2 * Math.PI * 120 * (1 - progress / 100),
                  }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div 
                    className="text-6xl font-bold"
                    animate={{ 
                      scale: seconds === 0 && isActive ? [1, 1.1, 1] : 1 
                    }}
                  >
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </motion.div>
                  <motion.div 
                    className="text-sm text-gray-500 mt-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isActive ? 'In Progress' : 'Paused'}
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.1, rotate: isActive ? 0 : 360 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggle}
                className={`p-6 rounded-full ${
                  isBreak 
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                    : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                } text-white hover:shadow-2xl transition-shadow`}
              >
                {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: -360 }}
                whileTap={{ scale: 0.9 }}
                onClick={reset}
                className="p-6 rounded-full glass dark:glass-dark hover:shadow-xl transition-shadow"
              >
                <RotateCcw className="w-8 h-8" />
              </motion.button>
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={startFocus}
                disabled={!isBreak}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                25 min Focus
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={startBreak}
                disabled={isBreak}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                5 min Break
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass dark:glass-dark rounded-xl p-6 relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-semibold mb-4">Today's Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10"
              >
                <motion.p 
                  className="text-4xl font-bold"
                  key={sessions}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  {sessions}
                </motion.p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10"
              >
                <motion.p 
                  className="text-4xl font-bold"
                  key={sessions * 25}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  {sessions * 25}
                </motion.p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Minutes Studied</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

export default StudyTimer
