import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { BookOpen, Video, FileText, ExternalLink, Search } from 'lucide-react'
import { motion } from 'framer-motion'

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  const resources = [
    {
      type: 'video',
      title: 'Introduction to Calculus',
      description: 'Learn the fundamentals of calculus with visual explanations',
      url: 'https://youtube.com',
      category: 'Mathematics',
      duration: '45 min'
    },
    {
      type: 'article',
      title: 'Understanding Quantum Physics',
      description: 'A beginner-friendly guide to quantum mechanics',
      url: '#',
      category: 'Physics',
      duration: '15 min read'
    },
    {
      type: 'video',
      title: 'JavaScript for Beginners',
      description: 'Complete JavaScript tutorial from scratch',
      url: 'https://youtube.com',
      category: 'Programming',
      duration: '2 hours'
    },
    {
      type: 'article',
      title: 'Organic Chemistry Basics',
      description: 'Master the fundamentals of organic chemistry',
      url: '#',
      category: 'Chemistry',
      duration: '20 min read'
    },
    {
      type: 'video',
      title: 'World History Overview',
      description: 'Major events that shaped our world',
      url: 'https://youtube.com',
      category: 'History',
      duration: '1 hour'
    },
    {
      type: 'article',
      title: 'English Grammar Guide',
      description: 'Complete guide to English grammar rules',
      url: '#',
      category: 'English',
      duration: '30 min read'
    }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || resource.type === filter
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Learning Resources</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          >
            <option value="all">All Types</option>
            <option value="video">Videos</option>
            <option value="article">Articles</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass dark:glass-dark rounded-xl p-6 hover:shadow-xl transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${resource.type === 'video' ? 'bg-red-500' : 'bg-blue-500'}`}>
                  {resource.type === 'video' ? (
                    <Video className="w-6 h-6 text-white" />
                  ) : (
                    <FileText className="w-6 h-6 text-white" />
                  )}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  {resource.category}
                </span>
              </div>

              <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {resource.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{resource.duration}</span>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-500 hover:underline"
                >
                  <span>View</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="glass dark:glass-dark rounded-xl p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Resources
