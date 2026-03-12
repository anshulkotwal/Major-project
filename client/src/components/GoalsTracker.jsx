import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Plus, Check } from 'lucide-react'

const GoalsTracker = () => {
  const [goals, setGoals] = useState([
    { id: 1, text: 'Complete 5 quizzes', progress: 3, total: 5, completed: false },
    { id: 2, text: 'Study for 2 hours', progress: 1.5, total: 2, completed: false },
    { id: 3, text: 'Review flashcards', progress: 1, total: 1, completed: true }
  ])

  return (
    <div className="glass dark:glass-dark rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Today's Goals</h3>
        <button className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-lg ${
              goal.completed
                ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {goal.completed ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Target className="w-5 h-5 text-blue-500" />
                )}
                <span className={goal.completed ? 'line-through text-gray-500' : 'font-medium'}>
                  {goal.text}
                </span>
              </div>
              <span className="text-sm font-semibold">
                {goal.progress}/{goal.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(goal.progress / goal.total) * 100}%` }}
                className={`h-2 rounded-full ${
                  goal.completed ? 'bg-green-500' : 'bg-blue-500'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
        <p className="text-sm text-blue-600 dark:text-blue-400">
          🎯 {goals.filter(g => g.completed).length} of {goals.length} goals completed!
        </p>
      </div>
    </div>
  )
}

export default GoalsTracker
