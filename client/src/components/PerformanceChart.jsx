import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const PerformanceChart = ({ data }) => {
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    score: item.score,
    topic: item.topic
  }))

  return (
    <div className="glass dark:glass-dark rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Performance Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ fill: '#3B82F6', r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PerformanceChart
