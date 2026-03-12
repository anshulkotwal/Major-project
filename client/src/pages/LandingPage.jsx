import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, Sparkles, TrendingUp, Users, Moon, Sun, Zap, Target, Award } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const LandingPage = () => {
  const { isDark, toggleTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen gradient-bg overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
        />
      </div>

      <nav className="fixed w-full z-50 glass dark:glass-dark backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-8 h-8 text-blue-500" />
              </motion.div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                LearnAI
              </span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme} 
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg gradient-primary text-white"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 relative">
        <motion.div 
          style={{ y, opacity }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-yellow-500" />
            </motion.div>
            
            <h1 className="text-7xl font-bold mb-6">
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                AI-Powered Learning
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Transform your education with personalized AI tutoring, interactive quizzes, 
              and gamified learning experiences.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/register">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl gradient-primary text-white text-lg font-semibold relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative">Start Learning Free</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 relative"
          >
            <motion.div
              animate={{ 
                rotateY: [0, 5, 0, -5, 0],
                rotateX: [0, 5, 0, -5, 0]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              style={{ transformStyle: 'preserve-3d' }}
              className="glass dark:glass-dark rounded-2xl p-8 max-w-4xl mx-auto backdrop-blur-xl"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 opacity-30"
                >
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-white rounded-full blur-xl" />
                </motion.div>
                <Sparkles className="w-24 h-24 text-white animate-pulse relative z-10" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Powerful Features
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'AI Tutor', desc: 'Get instant help from our intelligent AI assistant', color: 'blue' },
              { icon: TrendingUp, title: 'Progress Tracking', desc: 'Monitor your learning journey with detailed analytics', color: 'purple' },
              { icon: Users, title: 'Personalized Path', desc: 'Custom study plans tailored to your needs', color: 'pink' },
              { icon: Zap, title: 'Interactive Quizzes', desc: 'Test your knowledge with engaging quizzes', color: 'yellow' },
              { icon: Target, title: 'Daily Goals', desc: 'Set and achieve your learning targets', color: 'green' },
              { icon: Award, title: 'Achievements', desc: 'Earn badges and climb the leaderboard', color: 'red' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.05
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="glass dark:glass-dark rounded-xl p-6 hover:shadow-2xl transition-all cursor-pointer group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 flex items-center justify-center mb-4 group-hover:shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 relative overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-6"
          >
            Ready to Transform Your Learning?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8"
          >
            Join thousands of students already learning smarter with AI
          </motion.p>
          <Link to="/register">
            <motion.button
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.9 }}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold"
            >
              Get Started Now
            </motion.button>
          </Link>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 LearnAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
