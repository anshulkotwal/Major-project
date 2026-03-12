import { motion } from 'framer-motion'
import { ExternalLink, Video, FileText, BookOpen } from 'lucide-react'

const RecommendationCard = ({ recommendation }) => {
  const icons = {
    video: Video,
    article: FileText,
    topic: BookOpen
  }

  const Icon = icons[recommendation.type] || BookOpen

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass dark:glass-dark rounded-xl p-6 hover:shadow-xl transition"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          recommendation.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
          recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
          'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
        }`}>
          {recommendation.priority}
        </span>
      </div>

      <h4 className="font-semibold mb-2">{recommendation.content.title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {recommendation.content.description}
      </p>

      {recommendation.content.url && (
        <a
          href={recommendation.content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-blue-500 hover:underline text-sm"
        >
          <span>View Resource</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </motion.div>
  )
}

export default RecommendationCard
