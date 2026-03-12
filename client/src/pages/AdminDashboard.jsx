import DashboardLayout from '../components/DashboardLayout'
import { Users, BookOpen, Activity, Settings } from 'lucide-react'

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass dark:glass-dark rounded-xl p-6">
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-gray-600 dark:text-gray-400 text-sm">Total Users</h3>
            <p className="text-3xl font-bold">1,234</p>
          </div>
          <div className="glass dark:glass-dark rounded-xl p-6">
            <BookOpen className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-gray-600 dark:text-gray-400 text-sm">Active Courses</h3>
            <p className="text-3xl font-bold">45</p>
          </div>
          <div className="glass dark:glass-dark rounded-xl p-6">
            <Activity className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-gray-600 dark:text-gray-400 text-sm">Active Sessions</h3>
            <p className="text-3xl font-bold">89</p>
          </div>
          <div className="glass dark:glass-dark rounded-xl p-6">
            <Settings className="w-8 h-8 text-pink-500 mb-2" />
            <h3 className="text-gray-600 dark:text-gray-400 text-sm">System Health</h3>
            <p className="text-3xl font-bold text-green-500">Good</p>
          </div>
        </div>

        <div className="glass dark:glass-dark rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Platform Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed analytics and monitoring tools coming soon...
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
