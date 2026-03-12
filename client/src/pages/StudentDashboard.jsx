import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DashboardLayout from '../components/DashboardLayout'
import AIChat from '../components/AIChat'
import PerformanceChart from '../components/PerformanceChart'
import RecommendationCard from '../components/RecommendationCard'
import StudyPathCard from '../components/StudyPathCard'
import WeakTopicsAlert from '../components/WeakTopicsAlert'
import StatsCard from '../components/StatsCard'
import StreakTracker from '../components/StreakTracker'
import GoalsTracker from '../components/GoalsTracker'
import { Brain, TrendingUp, Clock, Target, BookOpen, Zap, Timer, CreditCard, StickyNote, Trophy, Sparkles } from 'lucide-react'

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard')
      setDashboardData(response.data)
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  const stats = dashboardData?.stats || {}

  const quickActions = [
    { icon: BookOpen, label: 'Take Quiz', color: 'from-blue-500 to-blue-600', path: '/student/quiz', emoji: '📝' },
    { icon: CreditCard, label: 'Flashcards', color: 'from-purple-500 to-purple-600', path: '/student/flashcards', emoji: '🎴' },
    { icon: Timer, label: 'Study Timer', color: 'from-green-500 to-green-600', path: '/student/timer', emoji: '⏱️' },
    { icon: StickyNote, label: 'Quick Notes', color: 'from-yellow-500 to-yellow-600', path: '/student/notes', emoji: '📝' },
    { icon: Trophy, label: 'Leaderboard', color: 'from-orange-500 to-orange-600', path: '/student/leaderboard', emoji: '🏆' },
    { icon: Zap, label: 'Resources', color: 'from-pink-500 to-pink-600', path: '/student/resources', emoji: '⚡' }
  ]

  return (
    <DashboardLayout>
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full blur-3xl"
        />
      </div>

      <div className="space-y-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
              Your Learning Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Ready to learn?</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChat(!showChat)}
            className="px-4 py-2 rounded-lg gradient-primary text-white flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Brain className="w-5 h-5" />
            <span>AI Tutor</span>
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={TrendingUp}
            title="Average Score"
            value={`${Math.round(stats.avgScore || 0)}%`}
            color="blue"
          />
          <StatsCard
            icon={Clock}
            title="Time Spent"
            value={`${Math.round((stats.totalTime || 0) / 60)}h`}
            color="purple"
          />
          <StatsCard
            icon={Target}
            title="Questions Solved"
            value={stats.totalQuestions || 0}
            color="green"
          />
          <StatsCard
            icon={Brain}
            title="Accuracy"
            value={`${Math.round(((stats.totalCorrect || 0) / (stats.totalQuestions || 1)) * 100)}%`}
            color="pink"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  z: 50
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(action.path)}
                className="glass dark:glass-dark rounded-xl p-6 cursor-pointer hover:shadow-2xl transition-all relative overflow-hidden group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <motion.div 
                  className={`p-4 rounded-lg bg-gradient-to-br ${action.color} w-fit mb-4 relative`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <action.icon className="w-8 h-8 text-white" />
                  <span className="absolute -top-2 -right-2 text-2xl">{action.emoji}</span>
                </motion.div>
                <h3 className="font-semibold text-lg">{action.label}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StreakTracker />
          <GoalsTracker />
        </div>

        {dashboardData?.weakTopics?.length > 0 && (
          <WeakTopicsAlert topics={dashboardData.weakTopics} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart data={dashboardData?.recentPerformance || []} />
          </div>
          <div>
            {dashboardData?.studyPlan && (
              <StudyPathCard studyPlan={dashboardData.studyPlan} />
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Personalized Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData?.recommendations?.map((rec) => (
              <RecommendationCard key={rec._id} recommendation={rec} />
            ))}
          </div>
        </div>
      </div>

      {showChat && (
        <motion.div
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: 400 }}
          className="fixed right-0 top-0 h-full w-full md:w-96 z-50"
        >
          <AIChat onClose={() => setShowChat(false)} />
        </motion.div>
      )}
    </DashboardLayout>
  )
}

export default StudentDashboard
