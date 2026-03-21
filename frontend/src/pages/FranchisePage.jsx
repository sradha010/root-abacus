import { useState } from 'react'
import CallbackModal from '../components/forms/CallbackModal'
import MessageButton from '../components/ui/MessageButton'
import {
  Briefcase, Headphones, Users, Megaphone, Code,
  GraduationCap, Monitor, BarChart2, MessageCircle,
  Trophy, ShieldCheck, Percent, Mail, CheckCircle
} from 'lucide-react'

const trainingAreas = [
  { n: 1, icon: Briefcase, title: 'Administration', desc: 'Manage center operations smoothly and efficiently.' },
  { n: 2, icon: Headphones, title: 'Customer Service', desc: 'Build strong trust and communication with parents.' },
  { n: 3, icon: Users, title: 'Personnel Management', desc: 'Lead and coordinate staff for smooth center performance.' },
  { n: 4, icon: Megaphone, title: 'Advertising Planning', desc: 'Create and execute effective local promotional strategies.' },
  { n: 5, icon: Code, title: 'Technical Proficiency', desc: 'Use tools and software confidently to monitor performance.' },
]

const included = [
  {
    icon: GraduationCap,
    title: 'License',
    items: [
      'License to run your own abacus training franchise under our trusted brand',
      'Exclusive Territorial Rights',
      'Eligibility to use Roots trademark on your signboards, pamphlets, and other publicity material',
    ]
  },
  {
    icon: Users,
    title: 'Training & Mentorship',
    items: [
      'Regular mentorship and training updates',
      "Training on Handling Parents' Queries",
      'Training on Handling Enquiries',
      'Training to Teaching Effectively',
      'Getting the best student performance',
    ]
  },
  {
    icon: Monitor,
    title: 'Teaching Tools & Material',
    items: [
      'Professional Teaching Materials',
      'Timely Delivery of Related Study Material like Workbooks and Abacus Tool',
      'Practice Portal & Online Tools',
      'Online Tools to Teach Students',
      "Software to Manage Students' Performance",
      'Regular Competitions',
    ]
  },
  {
    icon: BarChart2,
    title: 'Student Insights & Results',
    items: [
      'Automatic Checking of Homework',
      'Reports to Trainer',
      'Feedback to Parents',
      'Regular Activity Reports',
      'Fast Results',
    ]
  },
  {
    icon: MessageCircle,
    title: 'Communication Support',
    items: [
      'Customer Support via Phone, WhatsApp, Email, Support Ticketing System',
    ]
  },
  {
    icon: Trophy,
    title: 'Marketing & Branding',
    items: [
      "Local Students' Enquiries",
      'Marketing Support & Strategies',
      'Online Publicity',
      'Advertising Expense Reimbursement',
    ]
  },
]

const expectations = [
  {
    icon: GraduationCap,
    title: 'Best Training to Students',
    desc: "We'll guide you regularly on the best training methods and how to apply them effectively with your students.",
  },
  {
    icon: Users,
    title: "Proper growth of students' base",
    desc: "In the beginning, publicity is essential. We expect you to do local promotions. We'll support with online marketing and reimburse 20% of approved expenses.",
  },
  {
    icon: Mail,
    title: 'Timely response to our emails',
    desc: 'You are expected to respond to our emails and communication in a timely manner for smooth coordination.',
  },
]

const terms = [
  {
    icon: ShieldCheck,
    title: 'Certification',
    desc: 'After successfully completing the course, you will be awarded the title of Certified Abacus Trainer of Roots Abacus Learning School, an ISO 9001:2015 Certified Company.',
  },
  {
    icon: Percent,
    title: 'Royalty',
    desc: '20% of the monthly fees charged by you from the students (to be paid every month) for getting all of the above-mentioned support and services.',
  },
]

const hexItems = [
  { label: 'Recession resistant Business',            bg: '#E87722' },
  { label: '100% Franchisee owned model',             bg: '#5cb85c' },
  { label: 'Low Investment',                          bg: '#5bc0de' },
  { label: 'Scalable & controlled revenues and expenses', bg: '#5bc0de' },
  { label: 'Proven business model',                   bg: '#9b59b6' },
]

// SVG hexagon clip-path
const HexShape = ({ bg, label }) => (
  <div className="flex flex-col items-center justify-center" style={{ width: 130, height: 150 }}>
    <svg viewBox="0 0 130 150" width="130" height="150" style={{ position: 'absolute' }}>
      <polygon
        points="65,5 125,37.5 125,112.5 65,145 5,112.5 5,37.5"
        fill={bg}
      />
    </svg>
    <div style={{
      position: 'relative',
      zIndex: 1,
      width: 120,
      textAlign: 'center',
      color: 'white',
      fontWeight: 600,
      fontSize: 11,
      lineHeight: 1.3,
      padding: '0 10px',
    }}>
      {label}
    </div>
  </div>
)

const FranchisePage = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-auto md:h-[400px] py-6 md:py-0">
          {/* Text */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left px-4 z-10">
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              Start Your Own Abacus or Vedic Maths Classes
            </h1>
            <p className="mt-2 text-lg sm:text-xl text-[#E87722] font-medium">
              "Join our training & get your own Abacus franchise or Vedic Maths franchise absolutely free"
            </p>
          </div>
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center lg:justify-center md:justify-end mt-8 md:mt-0">
            <img
              src="https://abacusclassesonline.com/images2/roots-franchise.webp"
              alt="Franchise opportunity"
              className="px-2 w-full max-w-md h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* ── BECOME A PARTNER ── */}
      <section className="bg-orange-50 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Become a Franchise Partner At No Extra Cost!
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Are you passionate about teaching Abacus or Vedic Maths? Do you dream of running your own classes and building a respected education brand?
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Roots16 franchisees do not need any prior technical experience to effectively operate a franchise. Our comprehensive initial training program includes engaging, in-depth, informative classes on all technical matters, marketing, operations and technology.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            You will complete training with the confidence and knowledge necessary to succeed. Our team will work with you side-by-side, initiating marketing activities and ensuring all of your processes are functioning properly before your first student. It's perfect if you're looking to build a flexible online teaching franchise.
          </p>
          <p className="text-gray-600 mb-8">
            <span className="text-[#E87722] font-semibold">This is a limited time offer</span>. During your training program, you would refine your working knowledge in:
          </p>

          {/* Training areas */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {trainingAreas.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm flex gap-3 items-start">
                <item.icon size={22} strokeWidth={1.5} color="#E87722" className="flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.n}. {item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
            What's Included with the Free Franchise?
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Here's everything you receive when you become a franchise partner with Roots16 — at no extra cost.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <card.icon size={24} strokeWidth={1.5} color="#E87722" />
                </div>
                <h3 className="font-bold text-gray-800 mb-3">{card.title}</h3>
                <ul className="space-y-2">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} strokeWidth={1.5} color="#E87722" className="mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPECTATIONS ── */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
            Expectations From Your Side
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            You might be wondering what your responsibilities are as a franchisee. This program is made especially for women with minimal expectations — but as our representative, we hope you can ensure the following:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {expectations.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border-l-4 border-[#E87722]"
                style={{ backgroundColor: '#fef9f4' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <item.icon size={22} strokeWidth={1.5} color="#E87722" />
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMS & CONDITIONS ── */}
      <section className="bg-white py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Important Terms & Conditions
          </h2>
          <div className="space-y-4">
            {terms.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#fef9f4' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <item.icon size={22} strokeWidth={1.5} color="#E87722" />
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NOW CTA ── */}
      <section className="bg-orange-50 py-12 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#E87722] mb-4">Why Now?</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            This is a <span className="text-[#E87722] font-semibold">limited time offer</span>. Normally, our franchise program has a fee — but it's currently free for our trainees. You can start abacus classes or start Vedic Maths classes from home and grow at your pace, and we'll support you all the way.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#E87722] hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition shadow-lg"
          >
            Book a Call to Claim Free Franchise
          </button>
        </div>
      </section>

      <MessageButton />
      {showModal && <CallbackModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default FranchisePage