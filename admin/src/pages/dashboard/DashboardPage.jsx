import { useEffect, useState } from 'react'
import API from '../../api/axios'

const StatCard = ({ label, value, icon, color }) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
)

const DashboardPage = () => {
  const [stats, setStats] = useState({
    courses: 0, jobs: 0, reviews: 0, enquiries: 0, testimonials: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [courses, jobs, reviews, enquiries, testimonials] = await Promise.all([
          API.get('/courses'),
          API.get('/jobs/all'),
          API.get('/reviews/all'),
          API.get('/enquiry'),
          API.get('/testimonials'),
        ])
        setStats({
          courses: courses.data.data.length,
          jobs: jobs.data.data.length,
          reviews: reviews.data.data.length,
          enquiries: enquiries.data.data.length,
          testimonials: testimonials.data.data.length,
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchStats()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Total Courses"  value={stats.courses}      icon="📚" color="border-orange-500" />
        <StatCard label="Active Jobs"    value={stats.jobs}         icon="💼" color="border-blue-500"   />
        <StatCard label="Reviews"        value={stats.reviews}      icon="⭐" color="border-yellow-500" />
        <StatCard label="Enquiries"      value={stats.enquiries}    icon="📩" color="border-green-500"  />
        <StatCard label="Testimonials"   value={stats.testimonials} icon="💬" color="border-purple-500" />
      </div>
    </div>
  )
}

export default DashboardPage