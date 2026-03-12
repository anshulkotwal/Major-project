import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Users, BookOpen, TrendingUp, Upload } from 'lucide-react'

const TeacherDashboard = () => {
  const [students] = useState([
    { id: 1, name: 'John Doe', avgScore: 85, progress: 75 },
    { id: 2, name: 'Jane Smith', avgScore: 92, progress: 88 },
    { id: 3, name: 'Bob Johnson', avgScore: 78, progress: 65 }
  ])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass dark:glass-dark rounded-xl p-6">
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-gray-600 dark:text-gray-400 text-sm">Total Students</h3>
            <p className="text-3xl font-bold">{students.length}</p>
          </div>
          <div className="glass dark:glass-dark rounded-xl p-6">
            <BookOpen className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-gray-600 dark:text-gray-400 text-sm">Active Courses</h3>
            <p className="text-3xl font-bold">5</p>
          </div>
          <div className="glass dark:glass-dark rounded-xl p-6">
            <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-gray-600 dark:text-gray-400 text-sm">Avg Performance</h3>
            <p className="text-3xl font-bold">85%</p>
          </div>
        </div>

        <div className="glass dark:glass-dark rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Student Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3">Student</th>
                  <th className="text-left py-3">Avg Score</th>
                  <th className="text-left py-3">Progress</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3">{student.name}</td>
                    <td className="py-3">{student.avgScore}%</td>
                    <td className="py-3">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default TeacherDashboard
