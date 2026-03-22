import { useEffect, useState } from 'react'
import CallbackModal from '../../components/forms/CallbackModal'
import MessageButton from '../../components/ui/MessageButton'
import {
  Target, Brain, Calculator, Smile, TrendingUp, Heart,
  CheckCircle, Users, DollarSign, FileText, Monitor, Trophy,
  Zap, Eye, Star,
} from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ── data ─────────────────────────────────────────────────────────────────────
const whyImportant = [
  { icon: Target,      title: 'Enhanced Concentration and Focus',       desc: "Manipulating the abacus requires attention to detail, which helps improve a child's ability to concentrate." },
  { icon: Brain,       title: 'Improved Memory and Visualization Skills', desc: 'Regular practice strengthens memory retention and sharpens problem-solving abilities.' },
  { icon: Calculator,  title: 'Faster Mental Arithmetic',               desc: 'With consistent use, abacus learners can perform calculations mentally, improving speed and accuracy.' },
  { icon: Smile,       title: 'Boosted Confidence in Mathematics',      desc: 'Children who struggle with numbers often find renewed confidence and mental calculation skills through abacus training.' },
  { icon: TrendingUp,  title: 'Development of Logical Thinking',        desc: 'The process of calculating with an abacus improves logical reasoning and analytical skills.' },
  { icon: Heart,       title: 'Love for Math',                          desc: 'Abacus education makes math fun and playful, helping children enjoy numbers instead of fearing them.' },
]

const overview = [
  { feature: 'Course Duration',   detail: '2 Years of abacus training (with just 15 mins daily practice)' },
  { feature: 'Age Group',         detail: '5 to 12 years' },
  { feature: 'Subjects Covered',  detail: 'Addition, Subtraction, Multiplication, Division, using Abacus and Mental Math' },
  { feature: 'Support Channels',  detail: 'WhatsApp, Phone, Email' },
  { feature: 'Practice Mode',     detail: 'Online Learning Software Access' },
  { feature: 'Monitoring',        detail: 'Parent login for real-time performance tracking' },
  { feature: 'Certification',     detail: 'After each level (8 levels total)' },
  { feature: 'Exams',             detail: 'Fully Online' },
]

const whyRoots = [
  { icon: CheckCircle, title: 'ISO 9001:2015 Certified',      desc: 'A mark of quality and excellence - Trusted Since 2015 for online abacus education.' },
  { icon: Users,       title: 'Certified Trainers',           desc: 'Live One-on-One Classes with Experienced educators. 10,000+ Active Students trained successfully.' },
  { icon: DollarSign,  title: 'Affordable Fees',              desc: "Quality education that doesn't break the bank." },
  { icon: FileText,    title: 'Regular Progress Reports',     desc: "Stay informed about your child's development." },
  { icon: Monitor,     title: 'Interactive Learning',         desc: 'Engaging Software-Based methods that make math fun.' },
  { icon: Trophy,      title: 'Online Competitions',          desc: 'Encourage healthy competition and skill enhancement.' },
]

const benefits = [
  { icon: Zap,    title: 'Super-fast Mental Calculation', desc: 'Enhance speed and accuracy with advanced mental math skills.' },
  { icon: Target, title: 'Stronger Focus & Concentration', desc: 'Sharpen focus and concentration essential for all subjects.' },
  { icon: Eye,    title: 'Better Memory & Observation',    desc: 'Boost observation power and academic performance naturally.' },
  { icon: Smile,  title: 'Boost in Confidence',           desc: 'Empower kids to feel proud and excel in academics and beyond.' },
  { icon: Heart,  title: 'Love for Math',                  desc: 'Transform fear into love and excitement for mathematics.' },
]

const steps = [
  { n: 1, title: 'Book a Free Counselling Call',         desc: 'Schedule a free counseling call with our academic advisor.' },
  { n: 2, title: 'Get Assigned a Personal Trainer',      desc: 'We assign a certified trainer for personalized 1-on-1 coaching.' },
  { n: 3, title: 'Attend Weekly Online Classes',         desc: 'Attend structured weekly classes through our learning portal.' },
  { n: 4, title: 'Daily Practice on Software (15 min)', desc: 'Practice easily at home using our interactive online tools.' },
  { n: 5, title: 'Receive Monthly Progress Reports',    desc: "Receive monthly detailed reports to track your child's growth." },
  { n: 6, title: 'Appear for Online Tests & Level Up!', desc: 'Clear online level tests and earn official certifications!' },
]

const parentsSay = [
  { quote: "We have been taking classes with Priya Mam, who is very friendly and nice which makes learning enjoyable for my son. Abacus has really helped him to become more focused and become familiar with Mathematics. Definitely recommend her", name: 'Jyothi K V' },
  { quote: "Thank you soo much Vidhi Ma'am for everything that you do to help my son Bhavit in enhancing his abacus skills. I salute the teacher for all her hard work, dedication and patience.", name: 'Charu Sethi' },
  { quote: "Roots abacus is very good academic platform for children to improve their mathematics, attention and concentration..my 7 year old child got good opportunity to learn abacus.", name: 'Sajitha' },
  { quote: "Tutor Raghavi is the right person for handling kids at all ages. She mentors them from their understanding level and gradually brings the child to the expected speed.", name: 'Nithya Lakshmi' },
]

const faqs = [
  { q: 'What is the best age to start Abacus?',    a: "The ideal age to start abacus is between 5 to 12 years. At this age, children's brains are highly receptive, and the training helps build strong neural pathways for math." },
  { q: 'Do parents need to sit in the class?',     a: "No, parents don't need to sit in the class. However, for younger kids (5-6 years), a parent nearby can be helpful initially." },
  { q: 'Is it hard for kids to learn online?',     a: "Not at all! Our platform is designed to be fun and interactive. Kids love the software-based learning approach." },
  { q: 'What if we miss a class?',                 a: 'Missed classes can be rescheduled easily. We offer flexible timing and our support team is always available.' },
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
const AbacusKidsPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [videos, setVideos]       = useState([])

  useEffect(() => {
    // Fetch only abacus course videos
    fetch(`${API_BASE}/reviews/media?type=video&courseType=abacus`)
      .then(r => r.json())
      .then(d => { if (d.success) setVideos(d.data) })
      .catch(() => {})
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="w-full py-12 px-4" style={{ backgroundColor: '#fef4ea' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Unlock Your Child's Potential with<br />Roots Abacus Learning School
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Empower your child with exceptional math skills and cognitive abilities through our expert-led fun, online abacus classes.
          </p>
          <div className="relative w-full pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-xl">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/wf9RmVPM0d8?rel=0"
              title="Abacus Learning for Kids"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
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

      {/* ── WHAT IS ABACUS ── */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-5">What is an Abacus?</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              An <strong>abacus</strong> is an ancient calculating tool that dates back over 2,000 years. It consists of a frame with rods, each containing beads that can be moved to perform basic arithmetic operations such as addition, subtraction, multiplication, and division.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Despite the advent of modern calculators, the abacus is gaining global recognition as one of the best ways to build strong math skills, focus, and brain development in young learners.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Roots Abacus Learning School (ISO 9001:2015 certified)</strong> brings this powerful method to your home through <strong>affordable online training</strong> by certified and friendly trainers.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src="https://abacusclassesonline.com/images2/abacus_img.webp" alt="Abacus tool" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* ── WHY ABACUS IS IMPORTANT ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Is Learning Abacus Important for Kids?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyImportant.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition">
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

      {/* ── COURSE OVERVIEW ── */}
      <section className="py-14 px-6 bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">Course Overview</h2>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="grid grid-cols-2 bg-orange-100 px-6 py-3">
              <span className="font-semibold text-gray-700 uppercase text-sm tracking-wide">Feature</span>
              <span className="font-semibold text-gray-700 uppercase text-sm tracking-wide">Details</span>
            </div>
            {overview.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 px-6 py-4 border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <span className="font-medium text-gray-800">{row.feature}</span>
                <span className="text-gray-600">{row.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ROOTS ── */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">Why Choose Roots Abacus?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {whyRoots.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <item.icon size={28} strokeWidth={1.5} color="#E87722" className="mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">Benefits of Abacus Learning</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition">
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

      {/* ── HOW IT WORKS ── */}
      <section className="py-14 px-6" style={{ backgroundColor: '#fef4ea' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">How It Works</h2>
          <p className="text-center text-gray-500 mb-10">Step-by-step process to enroll and succeed with Roots16</p>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[#E87722] opacity-30"></div>
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.n} className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#E87722] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 z-10">
                    {step.n}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT PARENTS SAY ── */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">What Parents Say</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {parentsSay.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                <p className="text-gray-600 italic text-sm mb-4">"{item.quote}"</p>
                <h4 className="font-semibold text-gray-800 text-sm">— {item.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, i) => <FAQItem key={i} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-14 px-6 text-center" style={{ backgroundColor: '#fef4ea' }}>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Limited Seats Available!</h2>
        <p className="text-gray-600 mb-8">Click below to book a Free Counselling Session and see how your child can benefit.</p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#E87722] hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full text-lg transition shadow-lg"
        >
          BOOK FREE COUNSELLING NOW
        </button>
        <p className="text-gray-500 mt-4 text-sm">or Call/WhatsApp us at +91 9871151911</p>
      </section>

      <MessageButton />
      {showModal && <CallbackModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default AbacusKidsPage