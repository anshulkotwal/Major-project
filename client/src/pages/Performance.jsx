import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { TrendingUp, Award, Clock, Target, BookOpen, Brain } from 'lucide-react'
import { motion } from 'framer-motion'

const Performance = () => {
  const [timeRange, setTimeRange] = useState('week')
  
  // Mock data
  const stats = [
    { icon: Award, label: 'Average Score', value: '85%', color: 'blue', trend: '+5%' },
    { icon: Clock, label: 'Study Time', value: '24h', color: 'purple', trend: '+3h' },
    { icon: Target, label: 'Goals Completed', value: '12/15', color: 'green', trend: '80%' },
    { icon: Brain, label: 'Topics Mastered', value: '8', color: 'pink', trend: '+2' }
  ]

  const recentTests = [
    { subject: 'Mathematics', score: 92, date: '2 days ago', trend: 'up' },
    { subject: 'Physics', score: 78, date: '5 days ago', trend: 'down' },
    { subject: 'Chemistry', score: 88, date: '1 week ago', trend: 'up' },
    { subject: 'English', score: 95, date: '1 week ago', trend: 'up' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Performance Analytics</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass dark:glass-dark rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-500 text-sm font-semibold">{stat.trend}</span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass dark:glass-dark rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Test Scores</h2>
          <div className="space-y-4">
            {recentTests.map((test, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <BookOpen className="w-8 h-8 text-blue-500" />
                  <div>
                    <h3 className="font-semibold">{test.subject}</h3>
                    <p className="text-sm text-gray-500">{test.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-2xl font-bold ${test.score >= 80 ? 'text-green-500' : 'text-yellow-500'}`}>
                    {test.score}%
                  </span>
                  <TrendingUp className={`w-5 h-5 ${test.trend === 'up' ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Performance
