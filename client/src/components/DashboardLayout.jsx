import { Link, useNavigate } from 'react-router-dom'
import { Brain, Home, BarChart3, BookOpen, Settings, LogOut, Moon, Sun } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen gradient-bg">
      <nav className="glass dark:glass-dark border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold">LearnAI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.name}
              </span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 min-h-screen glass dark:glass-dark border-r border-gray-200 dark:border-gray-700 p-4">
          <nav className="space-y-2">
            <Link
              to={`/${user?.role}`}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to={`/${user?.role}/performance`}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Performance</span>
            </Link>
            <Link
              to={`/${user?.role}/resources`}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <BookOpen className="w-5 h-5" />
              <span>Resources</span>
            </Link>
            <Link
              to={`/${user?.role}/settings`}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
