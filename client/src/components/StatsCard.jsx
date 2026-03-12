import { motion } from 'framer-motion'

const StatsCard = ({ icon: Icon, title, value, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    pink: 'from-pink-500 to-pink-600'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass dark:glass-dark rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  )
}

export default StatsCard
