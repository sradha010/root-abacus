import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section
      className="bg-cover bg-center py-24 text-center"
      style={{ backgroundImage: "url('https://abacusclassesonline.com/images2/hp.webp')" }}
    >
      <div className="bg-white/75 max-w-3xl mx-auto px-6 py-12 rounded">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          Unleash Brain Power with Abacus & Vedic Maths
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Join over 10,000+ students and trainers who are learning and teaching smarter — anytime, anywhere.
        </p>

        <Link
          to="/courses"
          className="inline-block bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded text-lg font-semibold transition"
        >
          Explore Now
        </Link>

      </div>
    </section>
  )
}

export default HeroSection