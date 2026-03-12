import DashboardLayout from '../components/DashboardLayout'
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const Leaderboard = () => {
  const topLearners = [
    { rank: 1, name: 'Sarah Johnson', score: 2850, avatar: '👩', streak: 15, badge: 'gold' },
    { rank: 2, name: 'Mike Chen', score: 2720, avatar: '👨', streak: 12, badge: 'silver' },
    { rank: 3, name: 'Emma Davis', score: 2680, avatar: '👧', streak: 10, badge: 'bronze' },
    { rank: 4, name: 'You', score: 2450, avatar: '😊', streak: 7, badge: null },
    { rank: 5, name: 'Alex Kumar', score: 2380, avatar: '👦', streak: 8, badge: null },
    { rank: 6, name: 'Lisa Wang', score: 2290, avatar: '👩', streak: 6, badge: null },
    { rank: 7, name: 'Tom Brown', score: 2150, avatar: '👨', streak: 5, badge: null },
    { rank: 8, name: 'Nina Patel', score: 2080, avatar: '👧', streak: 4, badge: null }
  ]

  const getBadgeIcon = (badge) => {
    switch(badge) {
      case 'gold': return <Trophy className="w-6 h-6 text-yellow-500" />
      case 'silver': return <Medal className="w-6 h-6 text-gray-400" />
      case 'bronze': return <Award className="w-6 h-6 text-orange-600" />
      default: return null
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Compete with other learners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topLearners.slice(0, 3).map((learner, idx) => (
            <motion.div
              key={learner.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass dark:glass-dark rounded-xl p-6 text-center ${
                learner.rank === 1 ? 'ring-4 ring-yellow-500' :
                learner.rank === 2 ? 'ring-4 ring-gray-400' :
                'ring-4 ring-orange-600'
              }`}
            >
              <div className="text-6xl mb-3">{learner.avatar}</div>
              <div className="flex justify-center mb-2">
                {getBadgeIcon(learner.badge)}
              </div>
              <h3 className="font-bold text-lg mb-1">{learner.name}</h3>
              <p className="text-3xl font-bold text-blue-500 mb-2">{learner.score}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                🔥 {learner.streak} day streak
              </p>
            </motion.div>
          ))}
        </div>

        <div className="glass dark:glass-dark rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">All Rankings</h2>
          <div className="space-y-2">
            {topLearners.map((learner, idx) => (
              <motion.div
                key={learner.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  learner.name === 'You'
                    ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    learner.rank <= 3 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' : 'bg-gray-300 dark:bg-gray-700'
                  }`}>
                    {learner.rank}
                  </div>
                  <div className="text-3xl">{learner.avatar}</div>
                  <div>
                    <h4 className="font-semibold">{learner.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      🔥 {learner.streak} days
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold">{learner.score}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                  {learner.badge && getBadgeIcon(learner.badge)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass dark:glass-dark rounded-xl p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="flex items-center space-x-4">
            <TrendingUp className="w-12 h-12 text-purple-500" />
            <div>
              <h3 className="text-xl font-bold mb-1">Keep Learning!</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete quizzes and maintain your streak to climb the leaderboard!
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Leaderboard
