import { useState } from 'react'
import {
  IdentificationBadge, Article, Flag,
  Brain, Lightbulb, Globe, TrendUp,
} from '@phosphor-icons/react'
import CallbackModal from '../components/forms/CallbackModal'
import MessageButton from '../components/ui/MessageButton'

const sections = [
  {
    icon: Brain,
    title: 'Why Abacus & Vedic Maths',
    content: [
      `We chose Abacus and Vedic Maths because they don't just teach maths — they sharpen the mind. Through our online abacus training and online Vedic maths training, children who practice the techniques consistently show massive improvements in academic performance, confidence, and focus — all while having fun.`,
    ],
  },
  {
    icon: Lightbulb,
    title: 'Innovative Learning Model',
    content: [
      `We developed our online software system in 2015, making us one of the first pioneers in digital Abacus and Vedic Maths education. This early move into technology gave us a huge edge.`,
      `When the world went into lockdown during the COVID pandemic, most institutes struggled — but our students and trainers continued learning without any interruption. Since we were already online, we simply continued what we had been doing for years.`,
      `Our digital abacus learning system blends worksheets with software-based learning to make the experience smoother, smarter, and more effective for both students and trainers. Our online learning system works on any device and allows students to learn anytime, from anywhere.`,
    ],
  },
  {
    icon: Globe,
    title: 'Global Reach & Impact',
    content: [
      `From local homes to international classrooms, we're proud to serve learners worldwide. Our certified trainers, many of whom earn ₹1 lakh+ per month, are changing lives — one student at a time. We also offer franchise opportunities to help individuals build successful careers in education.`,
    ],
  },
  {
    icon: TrendUp,
    title: 'Quality & Growth',
    content: [
      `We continuously invest time and resources to improve our teaching methods, student experience, and trainer support system. Our commitment to quality education ensures every learner gets the best tools to succeed — whether they're 5 or 55.`,
    ],
  },
]

// Icon + Title always in one row, content below
const SectionCard = ({ icon: Icon, title, children, bordered = false }) => (
  <div
    className="bg-white rounded-2xl shadow-md py-6 px-6"
    style={bordered ? { borderLeft: '4px solid #E87722' } : {}}
  >
    {/* Icon + Title — always row */}
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shadow">
        <Icon size={26} weight="regular" color="#E87722" />
      </div>
      <h2 className="text-xl md:text-2xl font-extrabold text-gray-800">{title}</h2>
    </div>
    {/* Content */}
    {children}
  </div>
)

const AboutPage = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative w-full py-14 px-6 overflow-hidden" style={{ backgroundColor: '#E87722' }}>
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-auto opacity-20"
            viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="white" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,144C840,128,960,128,1080,149.3C1200,171,1320,213,1380,234.7L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"/>
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">
            About Roots16 Edutech Pvt. Ltd.
          </h1>
          <p className="mt-4 text-base md:text-xl text-white/90">
            Empowering children and adults worldwide with Abacus and Vedic Maths excellence.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-8 px-4 sm:px-8 md:px-16 bg-gradient-to-br from-white via-orange-50 to-white">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Who We Are */}
          <SectionCard icon={IdentificationBadge} title="Who We Are">
            <blockquote className="border-l-4 pl-4 italic text-gray-600 text-base leading-relaxed" style={{ borderColor: '#E87722' }}>
              Roots16 Edutech Pvt. Ltd. (Roots Abacus Learning School) is an{' '}
              <a href="#" className="underline font-medium" style={{ color: '#E87722' }}>ISO-certified</a>{' '}
              educational company focused on empowering children and adults through the time-tested techniques
              of Abacus and Vedic Maths, offering abacus training and vedic maths training to learners worldwide.
              With over 10,000+ students and trainers globally, we're on a mission to make brain development
              simple, effective, and accessible.
            </blockquote>
          </SectionCard>

          {/* Our Story */}
          <SectionCard icon={Article} title="Our Story">
            <div className="space-y-3">
              {[
                `Inspired by the incredible results we saw through Abacus and Vedic Maths, we began our journey with simple worksheets at home. The impact was so remarkable that it led us to open one learning center, then many — and today, we are proud to be teaching students, training educators, and equipping individuals to become certified trainers around the world.`,
                `We chose Abacus and Vedic Maths because they unlock a child's natural potential — sharpening focus, memory, and mental calculation in an enjoyable way.`,
                `Our founder's vision was clear: create a scalable, technology-powered education model that helps every child succeed.`,
              ].map((text, i) => (
                <blockquote key={i} className="border-l-4 pl-4 italic text-gray-600 text-base leading-relaxed" style={{ borderColor: '#E87722' }}>
                  {text}
                </blockquote>
              ))}
            </div>
          </SectionCard>

          {/* Our Mission */}
          <SectionCard icon={Flag} title="Our Mission">
            <p className="text-sm text-gray-500 -mt-2 mb-3">To build a parallel learning system that:</p>
            <div className="space-y-3">
              {[
                'Completes basic education quickly and naturally.',
                'Enables children to discover and focus on their passions early in life by mastering basics quickly and confidently.',
                'Creates income and growth opportunities for individuals through teaching.',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-3xl font-serif leading-none flex-shrink-0" style={{ color: '#E87722' }}>"</span>
                  <p className="text-gray-700 text-base leading-relaxed font-medium">{point}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Why Abacus, Innovative, Global, Quality */}
          {sections.map((sec, i) => (
            <SectionCard key={i} icon={sec.icon} title={sec.title} bordered>
              <div className="space-y-2">
                {sec.content.map((para, j) => (
                  <p key={j} className="text-gray-600 text-base leading-relaxed">{para}</p>
                ))}
              </div>
            </SectionCard>
          ))}

        </div>
      </section>

      <MessageButton />
      {showModal && <CallbackModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default AboutPage