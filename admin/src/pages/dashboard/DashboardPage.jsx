import { useEffect, useState } from 'react'
import API from '../../api/axios'
import {
  BookOpen, Briefcase, Star, Mail, MessageSquare, Users
} from 'lucide-react'

const StatCard = ({ label, value, icon: Icon }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 hover:shadow-md transition"
    style={{ borderColor: '#E87722' }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
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
    courses: 0, jobs: 0, reviews: 0, enquiries: 0, testimonials: 0, trainers: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [courses, jobs, reviews, enquiries, testimonials, trainers] = await Promise.all([
          API.get('/courses'),
          API.get('/jobs/all'),
          API.get('/reviews/all'),
          API.get('/enquiry'),
          API.get('/testimonials'),
          API.get('/trainers/all'),
        ])
        setStats({
          courses:      courses.data.data.length,
          jobs:         jobs.data.data.length,
          reviews:      reviews.data.data.length,
          enquiries:    enquiries.data.data.length,
          testimonials: testimonials.data.data.length,
          trainers:     trainers.data.data.length,
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Total Courses',   value: stats.courses,      icon: BookOpen      },
    { label: 'Active Jobs',     value: stats.jobs,         icon: Briefcase     },
    { label: 'Reviews',         value: stats.reviews,      icon: Star          },
    { label: 'Enquiries',       value: stats.enquiries,    icon: Mail          },
    { label: 'Testimonials',    value: stats.testimonials, icon: MessageSquare },
    { label: 'Registered Trainers', value: stats.trainers, icon: Users         },
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