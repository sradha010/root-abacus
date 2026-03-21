import { Link } from 'react-router-dom'
import { BookOpen, Lightbulb, GraduationCap } from 'lucide-react'

const courses = [
  {
    icon: BookOpen,
    title: 'Abacus for Kids (Ages 5–12)',
    desc: 'Fun and interactive abacus training that improves concentration, memory, and mental calculation skills.',
    link: '/courses/abacus-kids',
  },
  {
    icon: Lightbulb,
    title: 'Vedic Maths for Students (Ages 12+)',
    desc: 'Improve calculation speed and reduce exam stress with our Vedic Maths training techniques.',
    link: '/courses/vedic-maths',
  },
  {
    icon: GraduationCap,
    title: 'Teacher Training Program for Adults',
    desc: 'Get certified and start your own rewarding career as an Abacus or Vedic Maths trainer from home.',
    link: '/teacher-training/abacus',
  },
]

const CoursesSection = () => {
  return (
    <section id="courses" className="px-6 md:px-10 py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Courses We Offer</h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {courses.map((course, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="mb-4">
              <course.icon size={40} strokeWidth={1.5} color="#E87722" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{course.desc}</p>
            <Link to={course.link} className="text-[#E87722] text-sm font-semibold hover:underline">
              Explore More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CoursesSection