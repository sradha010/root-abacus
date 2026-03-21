import { Link } from 'react-router-dom'

const OurStory = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-center">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Story</h2>
      <p className="text-gray-600 mb-6 leading-relaxed max-w-3xl mx-auto">
        What began with simple worksheets at home—sparked by the power of Abacus and Vedic Maths—grew into something much bigger.
        One center became many, and today, we proudly empower over 10,000 learners and trainers across the globe.
      </p>
      <Link to="/about" className="text-[#E87722] font-semibold hover:underline">
        Read Our Full Story →
      </Link>
    </section>
  )
}

export default OurStory