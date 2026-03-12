import { motion } from 'framer-motion'
import { Flame, Trophy, Star, Zap } from 'lucide-react'

const StreakTracker = () => {
  const streak = 7 // Mock data
  const badges = [
    { icon: Flame, label: '7 Day Streak', color: 'orange', unlocked: true },
    { icon: Trophy, label: 'Quiz Master', color: 'yellow', unlocked: true },
    { icon: Star, label: 'Top Performer', color: 'blue', unlocked: false },
    { icon: Zap, label: 'Speed Learner', color: 'purple', unlocked: true }
  ]

  return (
    <div className="glass dark:glass-dark rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Your Achievements</h3>
      
      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white">
        <div className="flex items-center space-x-3">
          <Flame className="w-8 h-8 animate-pulse" />
          <div>
            <p className="text-2xl font-bold">{streak} Days</p>
            <p className="text-sm opacity-90">Current Streak 🔥</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-90">Keep it up!</p>
          <p className="text-xs">Study today to maintain</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-lg text-center ${
              badge.unlocked
                ? `bg-gradient-to-br from-${badge.color}-500 to-${badge.color}-600 text-white`
                : 'bg-gray-200 dark:bg-gray-800 opacity-50'
            }`}
          >
            <badge.icon className="w-8 h-8 mx-auto mb-2" />
            <p className="text-xs font-semibold">{badge.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default StreakTracker
