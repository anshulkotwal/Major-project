import { motion } from 'framer-motion'
import { CheckCircle, Circle, Clock } from 'lucide-react'

const StudyPathCard = ({ studyPlan }) => {
  return (
    <div className="glass dark:glass-dark rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Study Path</h3>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{studyPlan.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${studyPlan.progress}%` }}
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </div>
      </div>

      <div className="space-y-3">
        {studyPlan.topics.map((topic, idx) => (
          <div key={idx} className="flex items-start space-x-3">
            {topic.status === 'completed' ? (
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-medium ${
                topic.status === 'completed' ? 'line-through text-gray-500' : ''
              }`}>
                {topic.name}
              </p>
              {topic.estimatedTime && (
                <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{topic.estimatedTime}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudyPathCard
