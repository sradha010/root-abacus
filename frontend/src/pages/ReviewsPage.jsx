import { useEffect, useState } from 'react'
import CallbackModal from '../components/forms/CallbackModal'
import MessageButton from '../components/ui/MessageButton'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const StarDisplay = ({ stars }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`text-lg ${s <= stars ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
    ))}
  </div>
)

const ReviewsPage = () => {
  const [videos, setVideos]           = useState([])
  const [images, setImages]           = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [reviews, setReviews]         = useState([])
  const [showModal, setShowModal]     = useState(false)

  useEffect(() => {
    // Videos
    fetch(`${API_BASE}/reviews/media?type=video`)
      .then(r => r.json()).then(d => { if (d.success) setVideos(d.data) }).catch(() => {})

    // Images
    fetch(`${API_BASE}/reviews/media?type=image`)
      .then(r => r.json()).then(d => { if (d.success) setImages(d.data) }).catch(() => {})

    // Testimonials
    fetch(`${API_BASE}/testimonials`)
      .then(r => r.json()).then(d => { if (d.success) setTestimonials(d.data) }).catch(() => {})

    // Approved text reviews
    fetch(`${API_BASE}/reviews`)
      .then(r => r.json()).then(d => { if (d.success) setReviews(d.data) }).catch(() => {})
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="py-10 px-6 md:px-16 lg:px-24 text-center bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            What Our Trainers, Students &amp; Parents Say
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Real feedback, real impact — hear it from those who've experienced it firsthand, across countries and cultures.
          </p>
        </div>
      </section>

      {/* ── VIDEO TESTIMONIALS ── */}
      {videos.length > 0 && (
        <section className="bg-orange-50 py-4 px-6">
          <div className="max-w-7xl mx-auto mb-8">
            <div
              className="flex space-x-5 overflow-x-auto pb-4"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#E87722 #f3f4f6' }}
            >
              {videos.map((v) => (
                <div key={v._id} className="min-w-[300px] bg-white p-3 rounded-2xl shadow-md hover:shadow-lg transition">
                  <video controls loading="lazy" className="rounded-lg shadow-md w-full h-72 object-cover">
                    <source src={v.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── IMAGE SCREENSHOTS ── */}
      {images.length > 0 && (
        <section className="bg-orange-50 py-0 pb-8 px-3 md:px-16 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white shadow-xl rounded-2xl p-3">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {images.map((img) => (
                  <img
                    key={img._id}
                    src={img.url}
                    alt={img.alt}
                    loading="lazy"
                    className="rounded-lg shadow-md w-full object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ── TEXT REVIEWS ── */}
      {reviews.length > 0 && (
        <section className="bg-orange-50 py-10 px-6 md:px-16 lg:px-24 pb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Google Reviews</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div key={r._id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#E87722] font-bold text-sm">{r.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                      <StarDisplay stars={r.stars} />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-12 px-6 text-center" style={{ backgroundColor: '#fef4ea' }}>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Join Thousands of Happy Students &amp; Parents
        </h2>
        <p className="text-gray-600 mb-6">
          Start your Abacus or Vedic Maths journey today with Roots Abacus Learning School.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#E87722] hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full text-lg transition shadow-lg"
        >
          Book Free Counselling
        </button>
        <p className="text-gray-500 mt-4 text-sm">or Call/WhatsApp us at +91 9871151911</p>
      </section>

      <MessageButton />
      {showModal && <CallbackModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default ReviewsPage