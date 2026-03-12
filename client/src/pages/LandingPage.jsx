import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, Sparkles, TrendingUp, Users, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const LandingPage = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen gradient-bg">
      <nav className="fixed w-full z-50 glass dark:glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold">LearnAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-lg gradient-primary text-white">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent gradient-primary">
              AI-Powered Learning
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Personalized education that adapts to your learning style. Get AI-powered recommendations, 
              real-time tutoring, and track your progress.
            </p>
            <Link to="/register" className="inline-block px-8 py-4 rounded-lg gradient-primary text-white text-lg font-semibold hover:shadow-lg transition">
              Start Learning Free
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-16"
          >
            <div className="glass dark:glass-dark rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-24 h-24 text-white animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'AI Tutor', desc: 'Get instant help from our intelligent AI assistant' },
              { icon: TrendingUp, title: 'Progress Tracking', desc: 'Monitor your learning journey with detailed analytics' },
              { icon: Users, title: 'Personalized Path', desc: 'Custom study plans tailored to your needs' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="glass dark:glass-dark rounded-xl p-6 hover:shadow-xl transition"
              >
                <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8">Join thousands of students already learning smarter with AI</p>
          <Link to="/register" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:shadow-lg transition">
            Get Started Now
          </Link>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 LearnAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
