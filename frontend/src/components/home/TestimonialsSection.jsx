import { useEffect, useState } from 'react'
import API from '../../services/api'

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/testimonials')
      .then(({ data }) => {
        const result = Array.isArray(data) ? data : data?.data ?? []
        setTestimonials(result)
      })
      .catch((err) => {
        console.error('Testimonials fetch failed:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  const parents = testimonials.filter(t => t.role === 'Parent' || t.role === 'parent')
  const trainers = testimonials.filter(t => t.role !== 'Parent' && t.role !== 'parent')

  const TestimonialCard = ({ item }) => (
    <div className="min-w-[300px] max-w-[300px] bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex-shrink-0">
      <p className="text-gray-600 italic mb-4 text-sm">"{item.content}"</p>
      <h4 className="font-semibold text-gray-800 text-sm">— {item.name}, {item.role}</h4>
    </div>
  )

  if (loading) return null
  if (testimonials.length === 0) return null

  return (
    <section className="bg-gray-100 py-12 px-6">
      <style>{`
        .orange-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .orange-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .orange-scroll::-webkit-scrollbar-thumb {
          background: #E87722;
          border-radius: 10px;
        }
        .orange-scroll::-webkit-scrollbar-thumb:hover {
          background: #cf6510;
        }
      `}</style>

      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Testimonials</h2>

      {parents.length > 0 && (
        <div className="max-w-7xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">What Parents Say</h3>
          <div className="orange-scroll flex space-x-6 overflow-x-auto pb-4">
            {parents.map((t) => <TestimonialCard key={t._id} item={t} />)}
          </div>
        </div>
      )}

      {trainers.length > 0 && (
        <div className="max-w-7xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">What Trainers Say</h3>
          <div className="orange-scroll flex space-x-6 overflow-x-auto pb-4">
            {trainers.map((t) => <TestimonialCard key={t._id} item={t} />)}
          </div>
        </div>
      )}
    </section>
  )
}

export default TestimonialsSection