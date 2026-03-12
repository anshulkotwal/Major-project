import { AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

const WeakTopicsAlert = ({ topics }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass dark:glass-dark rounded-xl p-6 border-l-4 border-yellow-500"
    >
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold mb-2">Topics Needing Attention</h3>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm"
              >
                {topic._id} ({Math.round(topic.avgScore)}%)
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WeakTopicsAlert
