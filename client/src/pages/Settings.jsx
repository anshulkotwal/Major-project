import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { User, Bell, Lock, Palette, Globe } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const Settings = () => {
  const { user } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(false)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        <div className="glass dark:glass-dark rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <input
                type="text"
                defaultValue={user?.role}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 capitalize"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="glass dark:glass-dark rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toggle dark/light theme</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-8 rounded-full transition ${isDark ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${isDark ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>

        <div className="glass dark:glass-dark rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications about your progress</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-8 rounded-full transition ${notifications ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${notifications ? 'translate-x-6' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Updates</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get weekly progress reports via email</p>
              </div>
              <button
                onClick={() => setEmailUpdates(!emailUpdates)}
                className={`relative w-14 h-8 rounded-full transition ${emailUpdates ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${emailUpdates ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="glass dark:glass-dark rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>
          
          <button className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
            Change Password
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Settings
