import { useState } from 'react'
import CallbackModal from '../../components/forms/CallbackModal'
import MessageButton from '../../components/ui/MessageButton'

const roots = [
  {
    label: 'Square Roots: 1 to 50',
    img: 'https://abacusclassesonline.com/images2/square_roots.webp',
    download: 'https://abacusclassesonline.com/images2/square_roots.webp',
    filename: 'square-roots-1-to-50.webp',
    alt: 'Square Roots 1 to 50',
  },
  {
    label: 'Cube Roots: 1 to 50',
    img: 'https://abacusclassesonline.com/images2/cube_roots.webp',
    download: 'https://abacusclassesonline.com/images2/cube_roots.webp',
    filename: 'cube-roots-1-to-50.webp',
    alt: 'Cube Roots 1 to 50',
  },
]

const SquareRootPage = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gradient-to-r from-orange-50 via-white to-gray-100 py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Understanding Square Roots &amp; Cube Roots
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Quick lookup table of square roots and cube roots from 1 to 50.
          </p>
          <p className="text-sm text-gray-500 italic">
            Free Resource | Roots Abacus Learning School
          </p>
        </div>
      </section>

      {/* ── TABLES ── */}
      <section className="max-w-5xl mx-auto py-10 px-6 space-y-12">
        {roots.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-200"
          >
            {/* Header */}
            <div className="flex items-center gap-4 bg-orange-100 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.label}
              </h2>
              <a
                href={item.download}
                download={item.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E87722] hover:text-orange-800 text-sm font-medium inline-flex items-center gap-1 ml-auto"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4 h-4"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </a>
            </div>
            {/* Image */}
            <img
              src={item.img}
              alt={item.alt}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </section>

      {/* ── TIPS ── */}
      <section className="py-12 px-6 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Tips to Understand Square &amp; Cube Roots Faster
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Learn Perfect Squares First',
                desc: 'Memorize squares of 1–25 so you can instantly recognize their roots.',
              },
              {
                step: '2',
                title: 'Use Estimation',
                desc: 'Practice estimating roots by identifying which two perfect squares a number falls between.',
              },
              {
                step: '3',
                title: 'Spot Patterns',
                desc: 'Notice how cube roots grow slower than square roots as numbers increase.',
              },
              {
                step: '4',
                title: 'Write & Revise Daily',
                desc: 'Writing square and cube root tables daily strengthens memory retention.',
              },
              {
                step: '5',
                title: 'Use Abacus',
                desc: 'Combine root practice with abacus training for faster mental calculations.',
              },
              {
                step: '6',
                title: 'Quiz Yourself',
                desc: 'Test yourself randomly with flashcards to build instant recall speed.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-full bg-[#E87722] text-white flex items-center justify-center font-bold text-sm mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-12 px-6 text-center"
        style={{ backgroundColor: '#fef4ea' }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Want to Learn Maths the Smart Way?
        </h2>
        <p className="text-gray-600 mb-6">
          Join our Abacus and Vedic Maths classes and see your child's
          calculation speed soar!
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#E87722] hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full text-lg transition shadow-lg"
        >
          Book Free Counselling
        </button>
        <p className="text-gray-500 mt-4 text-sm">
          or Call/WhatsApp us at +91 9871151911
        </p>
      </section>

      <MessageButton />
      {showModal && <CallbackModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default SquareRootPage