import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CallbackModal from '../../components/forms/CallbackModal'
import MessageButton from '../../components/ui/MessageButton'
import {
  Zap, Eye, Brain, Smile, Heart,
  Monitor, Users, MapPin, CheckCircle,
  GraduationCap, BarChart2, IndianRupee,
  UserCheck, BarChart, Trophy, Quote
} from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ── data ─────────────────────────────────────────────────────────────────────
const highlights = [
  { feature: 'Duration',     detail: '1 Year (Only 15 minutes daily practice required)' },
  { feature: 'Eligibility',  detail: 'Age 12+ or students preparing for competitive exams' },
  { feature: 'Levels',       detail: '4 Structured Levels' },
  { feature: 'Syllabus',     detail: 'Addition, Subtraction, Multiplication, Division, Square Roots, Cube Roots & More' },
  { feature: 'Classes',      detail: '1 Live Session per Week' },
  { feature: 'Practice',     detail: 'Software-based online practice' },
  { feature: 'Monitoring',   detail: 'Speed & Accuracy tracked through online panel' },
  { feature: 'Exams',        detail: 'Online tests after every level' },
  { feature: 'Certificates', detail: 'Awarded after each level completion' },
]

const whyKidsLove = [
  { icon: Zap,   title: 'Lightning Fast Calculations',      desc: 'Save time in exams with smart mental maths' },
  { icon: Eye,   title: 'Improved Concentration & Focus',   desc: 'Exercises sharpen brain function' },
  { icon: Brain, title: 'Better Memory & Observation',      desc: 'Mental maths builds active recall' },
  { icon: Smile, title: 'Increased Confidence',             desc: 'Kids feel proud when they calculate faster than calculators' },
  { icon: Heart, title: 'Love for Maths',                   desc: 'No more maths fear – only maths fun!' },
]

const methods = [
  {
    icon: Monitor,
    title: 'Online Vedic Maths Classes (Recommended)',
    points: [
      'Learn from certified trainers in live 1-on-1 or group sessions',
      'Save time, travel, and cost',
      'Interactive & play-based teaching method',
      'Affordable monthly fee',
    ],
  },
  {
    icon: Users,
    title: 'Teach Your Own Child (Parent Trainer Program)',
    points: [
      'No maths background needed',
      'Learn at home',
      "Be your child's biggest support",
    ],
    desc: 'Want to teach your child yourself? Enroll in our Online Vedic Maths Teacher Training Course and become your child\'s personal maths coach.',
  },
  {
    icon: MapPin,
    title: 'Offline Center Near You',
    desc: "Prefer in-person learning? Submit your location and we'll connect you with a nearby trainer (if available).",
  },
]

const whyChoose = [
  { icon: CheckCircle,  label: 'ISO 9001:2015 Certified Institute' },
  { icon: BarChart,     label: '10+ Years of Training Experience' },
  { icon: IndianRupee,  label: 'Affordable Fee Plans' },
  { icon: GraduationCap, label: 'Certified Trainers Only' },
  { icon: Monitor,      label: 'Software-Based Practice & Monitoring' },
  { icon: BarChart2,    label: 'Weekly Progress Reports by Email' },
  { icon: UserCheck,    label: 'Personal Attention to Every Child' },
  { icon: Trophy,       label: 'Regular Online Competitions' },
  { icon: Users,        label: 'Trusted by 10,000+ Parents Worldwide' },
]

const testimonials = [
  {
    quote: 'First of all, I express my gratitude towards the teacher. The classes are organised very nicely and the teaching skills are also amazing. My child, Harshit, understands everything taught.',
    name: 'Sujeet Kumar Singh',
  },
  {
    quote: "My daughter have improved the learning concepts of vedic maths as they play. It's great mental exercise and sharpens the memory. I was personally satisfied with Roots Abacus learning school",
    name: 'Ankur Garg',
  },
]

const faqs = [
  { q: 'What age is suitable for Vedic Maths?',       a: 'Vedic Maths is ideal for students aged 12 and above, especially those preparing for competitive exams like JEE, NEET, or board exams.' },
  { q: 'Do I need any prior maths knowledge?',         a: 'Basic arithmetic knowledge is sufficient. Our trainers start from the fundamentals and gradually progress to advanced techniques.' },
  { q: 'How long does it take to see results?',        a: 'Most students show noticeable improvement in calculation speed within 2–3 months of regular practice.' },
  { q: 'Are classes recorded?',                        a: 'Yes, recorded sessions are available for revision so students never miss out on any concept.' },
]

// ── FAQ accordion ─────────────────────────────────────────────────────────────
const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left text-gray-800 font-medium hover:text-[#E87722] transition">
        <span>{q}</span>
        <span className="text-[#E87722] text-xl font-bold">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="pb-4 text-gray-600 text-sm leading-relaxed">{a}</p>}
    </div>
  )
}

// ── main page ─────────────────────────────────────────────────────────────────
const VedicMathsPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [videos, setVideos]       = useState([])

  useEffect(() => {
    // Fetch only vedic maths course videos
    fetch(`${API_BASE}/reviews/media?type=video&courseType=vedic`)
      .then(r => r.json())
      .then(d => { if (d.success) setVideos(d.data) })
      .catch(() => {})
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative w-full h-[560px] md:h-[450px] px-6 overflow-hidden bg-cover bg-[position:60%_bottom] md:bg-center"
        style={{ backgroundImage: "url('https://abacusclassesonline.com/images2/vedic-for-kids.png')" }}
      >
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center md:items-start text-center md:text-left px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
          <div className="text-white max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
              Roots Online Vedic Maths Training Classes for Kids
            </h1>
            <p className="mt-4 text-lg md:text-xl font-medium">
              Master Speed Maths Through Flexible Online Learning from the Comfort of your Home
            </p>
            <p className="mt-1 text-sm sm:text-base font-light italic">
              ISO 9001:2015 Certified | 10,000+ Happy Students & Parents
            </p>
          </div>
        </div>
      </section>

      {/* ── DYNAMIC VIDEOS (from admin) ── */}
      {videos.length > 0 && (
        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
              Student & Parent Reviews
            </h2>
            <div
              className="flex space-x-5 overflow-x-auto pb-4"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#E87722 #f3f4f6' }}
            >
              {videos.map((v) => (
                <div key={v._id} className="min-w-[300px] bg-gray-50 p-3 rounded-2xl shadow-md hover:shadow-lg transition flex-shrink-0">
                  {v.url.includes('youtube.com') || v.url.includes('youtu.be') ? (
                    <iframe src={v.url} className="rounded-lg w-full h-52" allowFullScreen title={v.alt} />
                  ) : (
                    <video controls className="rounded-lg w-full h-52 object-cover">
                      <source src={v.url} type="video/mp4" />
                    </video>
                  )}
                  {v.alt && <p className="text-xs text-gray-500 mt-2 text-center">{v.alt}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHAT IS VEDIC MATHS ── */}
      <section className="py-14 px-6 lg:px-40 bg-white">
        <div className="max-w-5xl mx-auto flex gap-6 items-start">
          <div className="hidden md:flex w-14 h-14 rounded-full bg-orange-100 items-center justify-center flex-shrink-0 mt-1">
            <Zap size={28} strokeWidth={1.5} color="#E87722" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What is Vedic Maths?</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Vedic Maths is an ancient system of Indian mathematics that teaches kids how to solve complex problems in seconds — using simple mental calculation techniques. It's based on 16 sutras (rules) that make maths fun, fast, and easy.
            </p>
            <p className="text-gray-600 leading-relaxed">
              At Roots Abacus Learning School, we bring this magical method to your home through live online Vedic Maths classes for kids. Vedic Maths not only enhances speed but also supports cognitive skills and brain development in students.
            </p>
          </div>
        </div>
      </section>

      {/* ── COURSE HIGHLIGHTS ── */}
      <section className="py-14 px-6 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">Course Highlights</h2>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="grid grid-cols-2 bg-orange-100 px-6 py-3">
              <span className="font-semibold text-gray-700 uppercase text-sm tracking-wide">Aspect</span>
              <span className="font-semibold text-gray-700 uppercase text-sm tracking-wide">Details</span>
            </div>
            {highlights.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 px-6 py-4 border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <span className="font-medium text-gray-800">{row.feature}</span>
                <span className="text-gray-600">{row.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY KIDS LOVE VEDIC MATHS ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            Why Kids (and Parents) Love Vedic Maths
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyKidsLove.map((item, i) => (
              <div key={i} className="bg-orange-50 rounded-2xl p-6 text-center hover:shadow-md transition">
                <div className="flex justify-center mb-4">
                  <item.icon size={40} strokeWidth={1.5} color="#E87722" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHODS TO LEARN ── */}
      <section className="py-14 px-6 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            Methods to Learn Vedic Maths:
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {methods.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <item.icon size={24} strokeWidth={1.5} color="#E87722" />
                </div>
                <h3 className="font-bold text-[#E87722] mb-3">{item.title}</h3>
                {item.desc && <p className="text-sm text-gray-600 mb-3">{item.desc}</p>}
                {item.points && (
                  <ul className="space-y-2">
                    {item.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle size={16} strokeWidth={1.5} color="#E87722" className="mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ROOTS ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            Why Choose Roots Abacus Learning School?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChoose.map((item, i) => (
              <div key={i} className="flex items-center gap-3 border border-gray-100 rounded-xl px-5 py-4 hover:shadow-sm transition">
                <item.icon size={22} strokeWidth={1.5} color="#E87722" className="flex-shrink-0" />
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-14 px-6 bg-orange-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            Hear from Real Parents
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {testimonials.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <Quote size={24} color="#E87722" className="opacity-40 mb-3" />
                <p className="text-gray-600 italic text-sm mb-4">"{item.quote}"</p>
                <h4 className="font-semibold text-gray-800 text-sm">– {item.name}</h4>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/reviews"
              className="inline-block border-2 border-[#E87722] text-[#E87722] font-semibold px-8 py-3 rounded-full hover:bg-[#E87722] hover:text-white transition">
              Read More Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, i) => <FAQItem key={i} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-14 px-6 text-center bg-[#E87722]">
        <h2 className="text-3xl font-bold text-white mb-3">Free Counselling Session – Book Now!</h2>
        <p className="text-white opacity-90 mb-8">Have questions? Get a personal consultation from our experts.</p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-[#E87722] font-bold px-10 py-4 rounded-full text-lg hover:bg-orange-50 transition shadow-lg border-2 border-white"
        >
          BOOK FREE COUNSELLING NOW
        </button>
        <p className="text-white opacity-80 mt-4 text-sm">or Call/WhatsApp us at +91 9871151911</p>
      </section>

      <MessageButton />
      {showModal && <CallbackModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default VedicMathsPage