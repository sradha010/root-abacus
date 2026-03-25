import { useEffect, useState } from 'react'
import API from '../../api/axios'
import {
  BookOpen, Briefcase, Star, Mail, MessageSquare, Users, Image
} from 'lucide-react'

const StatCard = ({ label, value, icon: Icon, sublabel }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 hover:shadow-md transition"
    style={{ borderColor: '#E87722' }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        {sublabel && <p className="text-xs text-gray-400 mt-1">{sublabel}</p>}
      </div>
      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: '#fff4ec' }}>
        <Icon size={24} strokeWidth={1.5} style={{ color: '#E87722' }} />
      </div>
    </div>
  </div>
)

const DashboardPage = () => {
  const [stats, setStats] = useState({
    courses: 0, jobs: 0, reviews: 0, reviewMedia: 0,
    enquiries: 0, testimonials: 0, trainers: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/dashboard/stats')
        setStats(data.data)
      } catch (err) {
        console.error('Dashboard stats failed:', err.response?.data?.message || err.message)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Total Courses',       value: stats.courses,      icon: BookOpen,      sublabel: null },
    { label: 'Active Jobs',         value: stats.jobs,         icon: Briefcase,     sublabel: null },
    { label: 'Review Media',        value: stats.reviewMedia,  icon: Image,         sublabel: 'Videos & images' },
    { label: 'Pending Reviews',     value: stats.reviews,      icon: Star,          sublabel: 'Awaiting approval' },
    
    { label: 'Testimonials',        value: stats.testimonials, icon: MessageSquare, sublabel: null },
    { label: 'Registered Trainers', value: stats.trainers,     icon: Users,         sublabel: null },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  )
}

export default DashboardPage