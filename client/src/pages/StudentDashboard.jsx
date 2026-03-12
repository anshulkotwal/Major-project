import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
import { Brain, TrendingUp, Clock, Target, BookOpen, Zap, Timer, CreditCard, StickyNote, Trophy } from 'lucide-react'

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
    { icon: BookOpen, label: 'Take Quiz', color: 'blue', path: '/student/quiz' },
    { icon: CreditCard, label: 'Flashcards', color: 'purple', path: '/student/flashcards' },
    { icon: Timer, label: 'Study Timer', color: 'green', path: '/student/timer' },
    { icon: StickyNote, label: 'Quick Notes', color: 'yellow', path: '/student/notes' },
    { icon: Trophy, label: 'Leaderboard', color: 'orange', path: '/student/leaderboard' },
    { icon: Zap, label: 'Resources', color: 'pink', path: '/student/resources' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Your Learning Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Ready to learn?</p>
          </div>
          <button
            onClick={() => setShowChat(!showChat)}
            className="px-4 py-2 rounded-lg gradient-primary text-white flex items-center space-x-2"
          >
            <Brain className="w-5 h-5" />
            <span>AI Tutor</span>
          </button>
        </div>

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

        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(action.path)}
                className="glass dark:glass-dark rounded-xl p-6 cursor-pointer hover:shadow-xl transition"
              >
                <div className={`p-4 rounded-lg bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 w-fit mb-4`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg">{action.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>

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
