import { useState } from 'react'
import CallbackModal from '../../components/forms/CallbackModal'
import MessageButton from '../../components/ui/MessageButton'

const faqs = [
  { q: 'Q: Do I need to be good at Maths?', a: 'Not at all! Our course is designed for beginners. We teach you everything from scratch using simple, easy-to-follow video lessons.' },
  { q: 'Q: Can I do this along with my job or family?', a: 'Absolutely! The course is fully self-paced with no time limit. You can learn whenever you have free time — even 30 minutes a day is enough.' },
  { q: 'Q: What support will I get?', a: 'You get full support via our ticket-based system, WhatsApp, and phone. Our team is always ready to help you at every step.' },
]

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border border-orange-100 rounded-xl mb-3 overflow-hidden"
      style={{ backgroundColor: '#fef4ea' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium hover:text-[#E87722] transition"
      >
        <span>{q}</span>
        <span className="text-[#E87722] text-xl border border-[#E87722] rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && <p className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">{a}</p>}
    </div>
  )
}

const VedicMathsTrainingPage = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative w-full h-[450px] px-6 overflow-hidden bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('https://abacusclassesonline.com/images2/vedic-teacher-training.png')" }}
      >
        <div className="ml-auto max-w-xl text-right pr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 leading-tight">
            A Career That Fits<br />Your Time
          </h1>
          <p className="text-[#E87722] font-bold text-xl mb-1">Smart Course for Smart People</p>
          <p className="text-gray-600 italic">Short Term Course with Big Benefits</p>
        </div>
      </section>

      {/* ── INTRO TITLE ── */}
      <section className="py-10 px-6 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#E87722] mb-3">
          Roots Online Vedic Maths Teacher Training Program
        </h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          Master Speed Maths and Mental Skills, and Build a Flexible Career Teaching Kids Online
        </p>
      </section>

      {/* ── WHAT IS VEDIC MATHS ── */}
      <section className="py-6 px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-orange-50 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="1.5" className="w-7 h-7 flex-shrink-0">
              <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6H8.3A7 7 0 0 1 5 9a7 7 0 0 1 7-7z"/>
            </svg>
            <h2 className="text-2xl font-bold text-gray-800">What is Vedic Maths?</h2>
          </div>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Vedic Maths is an ancient Indian method of fast and easy mental calculation. It's based on simple tricks and formulas that help students solve maths problems in seconds — with more accuracy and confidence. Children who learn Vedic Maths become sharper, faster, and much more focused, which helps them not only in school but also in competitive exams.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            At <span className="text-[#E87722] font-semibold">Roots Abacus Learning School</span>, we offer a complete, flexible, and highly rewarding online Vedic Maths teacher training program. Whether you're a tutor, homemaker, part-time job seeker, or passionate about teaching, this course is designed to help you build a respected and profitable teaching career from home or your own center.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We've trained thousands of individuals worldwide and helped them launch their own successful teaching journeys. With our simple video lessons, practice software, and ongoing support, anyone can become a certified Vedic Maths trainer—even if you were not a maths expert in school.
          </p>
        </div>
      </section>

      {/* ── WHY LEARN AS CAREER ── */}
      <section className="py-6 px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Learn Vedic Maths as a Career?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            With growing demand from parents, schools, and tutoring centers worldwide, Vedic Maths is becoming a high-demand skill. Whether you're a teacher, homemaker, or looking for part-time income, becoming a certified Vedic Maths trainer opens up a rewarding career with flexible working hours and excellent earning potential.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Countries like the USA, UK, UAE, and Australia are witnessing a rise in the popularity of Vedic Maths. This is your chance to tap into that global opportunity.
          </p>
        </div>
      </section>

      {/* ── COURSE HIGHLIGHTS ── */}
      <section className="py-10 px-6 bg-orange-50">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
          <h2 className="text-xl font-bold text-[#E87722] text-center py-5 border-b border-orange-100">
            Course Highlights
          </h2>
          {[
            { icon: '💰', label: 'Fees', value: <span><s className="text-gray-400">₹20,000</s> <span className="font-bold">₹7,900</span> <span className="text-orange-500 text-sm">(60% OFF, Limited Period Offer)</span></span> },
            { icon: '🌍', label: 'Global Price', value: <span><s className="text-gray-400">USD 275</s> <span className="font-bold">USD 120</span> (inclusive of taxes)</span> },
            { icon: '⏰', label: 'Duration', value: 'No time limit. Learn at your own pace.' },
            { icon: '📚', label: 'Mode of Training', value: 'Short and simple online Vedic Maths training modules' },
            { icon: '💻', label: 'Practice Method', value: 'Online software-based practice' },
            { icon: '🏆', label: 'Certification', value: 'Given after successful completion' },
            { icon: '📊', label: 'Levels Covered', value: '4 levels' },
            { icon: '📝', label: 'Examinations', value: 'Fully online exams' },
            { icon: '🎧', label: 'Support', value: 'Ticket-based support system' },
          ].map((row, i) => (
            <div key={i} className={`flex items-center px-6 py-4 border-b border-orange-50 ${i % 2 === 0 ? 'bg-white' : 'bg-orange-50/30'}`}>
              <div className="w-8 text-[#E87722] text-lg flex-shrink-0">{row.icon}</div>
              <div className="w-40 font-semibold text-[#E87722] text-sm">{row.label}</div>
              <div className="text-gray-700 text-sm">{row.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO CAN JOIN ── */}
      <section className="py-10 px-6 bg-orange-50">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 shadow-sm relative overflow-hidden">
          {/* decorative blobs */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full opacity-50 translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-100 rounded-full opacity-40 -translate-x-8 translate-y-8"></div>

          <h2 className="text-2xl font-bold text-[#E87722] text-center mb-8">Who Can Join?</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, title: 'Love Teaching Kids?', desc: 'If you enjoy helping children learn and grow, this is perfect for you.' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>, title: 'Have 20 Hours?', desc: "That's all you need to complete your training at your own pace." },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, title: 'Want a Work-From-Home Career?', desc: 'Flexible, rewarding, and easy to manage with family life.' },
            ].map((item, i) => (
              <div key={i} className="border border-orange-100 rounded-xl p-5 flex gap-3 items-start" style={{ backgroundColor: '#fef9f4' }}>
                <span className="text-[#E87722] mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-center font-semibold text-gray-700 mb-4">Ideal For</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {['Educated Housewives', 'Tutors', 'Teachers', 'Part-time Job Seekers'].map((item, i) => (
              <div key={i} className="border border-orange-200 rounded-full py-2 px-4 text-center text-[#E87722] text-sm font-medium" style={{ backgroundColor: '#fef9f4' }}>
                {item}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm">No prior experience in Maths needed — our simple, effective system works for everyone!</p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-10 px-6 bg-orange-50">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#E87722] text-center mb-8">How It Works</h2>
          <div className="space-y-3">
            {[
              { n: 1, title: 'Enroll Instantly', desc: 'Get immediate access to your personal trainer portal after enrollment.' },
              { n: 2, title: 'Learn through Videos', desc: 'Short, clear lessons to watch at your pace anytime, anywhere.' },
              { n: 3, title: 'Practice on Software', desc: 'Practice using our online software.' },
              { n: 4, title: 'Get Support Anytime', desc: 'Ask questions anytime via support ticket.' },
              { n: 5, title: 'Certification Awarded', desc: 'Complete your training, earn your Certification, and start teaching.' },
            ].map((step) => (
              <div key={step.n} className="flex gap-4 items-center p-4 rounded-xl border border-orange-50" style={{ backgroundColor: '#fef9f4' }}>
                <div className="w-9 h-9 rounded-full bg-[#E87722] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{step.title}</h3>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE EXAMPLE ── */}
      <section className="py-10 px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-sm border-l-4 border-[#E87722]">
          <p className="text-[#E87722] font-bold text-sm uppercase tracking-wide mb-2">Case Example</p>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Real Impact</h3>
          <p className="text-gray-600 leading-relaxed">
            Sunita, a housewife from Jaipur, joined our training in 2023. Today, she teaches 15 children from home, earning ₹25,000+ per month while managing her family life. All from a one-time investment of ₹7,900.
          </p>
        </div>
      </section>

      {/* ── OPPORTUNITIES AFTER TRAINING ── */}
      <section className="py-10 px-6" style={{ backgroundColor: '#fef4ea' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#E87722] mb-8">Your Opportunities After Training</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🏠', title: 'Teach from Home', desc: 'Start your own online coaching center.' },
              { icon: '📱', title: 'Use Any Device', desc: 'Teach via Zoom, Google Meet, or any platform.' },
              { icon: '💰', title: 'Earn ₹25,000+/month', desc: 'Build a full income stream part-time.' },
              { icon: '🌍', title: 'Global Students', desc: 'Teach students from India and abroad.' },
              { icon: '🤝', title: 'Franchise Support', desc: 'Get full support to start your own center.' },
              { icon: '📜', title: 'Certified Trainer', desc: 'Internationally recognized certification.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm text-left flex gap-3 items-start">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSE BREAKDOWN ── */}
      <section className="py-10 px-6" style={{ backgroundColor: '#fef4ea' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#E87722] text-center mb-8">Course Breakdown</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'For Trainers',
                items: ['Duration: 20 days (30 mins/day)', 'Topics: Addition, Subtraction, Multiplication, Division, Squares, Roots, Cubes, etc.']
              },
              {
                title: 'For Students',
                items: ['Term: 1 year (4 levels)', 'Classes: Weekly 1 hour, plus daily 15-minute practice', 'Eligibility: Age 12+']
              }
            ].map((card, i) => (
              <div key={i} className="border-2 border-orange-200 rounded-[2rem] p-8 text-center" style={{ backgroundColor: '#fef9f4' }}>
                <div className="w-10 h-10 rounded-full bg-[#E87722] mx-auto mb-3"></div>
                <h3 className="font-bold text-[#E87722] mb-3">{card.title}</h3>
                {card.items.map((item, j) => (
                  <p key={j} className="text-sm text-gray-700 mb-1">{item}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GET CERTIFIED ── */}
      <section className="py-10 px-6" style={{ backgroundColor: '#fef4ea' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#E87722] mb-3">Get Officially Certified</h2>
          <p className="text-gray-600 mb-6">
            You will be certified by Roots Abacus Learning School after course completion, officially qualifying you as a{' '}
            <span className="text-[#E87722] font-semibold">Vedic Maths Trainer</span>.
          </p>
          <div className="flex justify-center gap-8 mb-4">
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="1.5" className="w-5 h-5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              Official Recognition
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="1.5" className="w-5 h-5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Lifetime Validity
            </div>
          </div>
          <p className="text-gray-500 italic text-sm">"An achievement that opens doors to endless possibilities."</p>
        </div>
      </section>

      {/* ── STILL THINKING CTA ── */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto bg-[#E87722] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-8 h-8 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <div>
              <h3 className="text-white font-bold text-lg">Still Thinking?</h3>
              <p className="text-orange-100 text-sm">Not sure if this is for you? Let's talk. No pressure, just answers.</p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button onClick={() => setShowModal(true)} className="bg-white text-[#E87722] font-semibold px-5 py-2 rounded-full text-sm hover:bg-orange-50 transition flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Book a Free 10-min Counselling Call
            </button>
            <a href="https://wa.me/919871151911" target="_blank" rel="noopener noreferrer" className="bg-white text-[#E87722] font-semibold px-5 py-2 rounded-full text-sm hover:bg-orange-50 transition flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-10 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#E87722] text-center mb-8">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => <FAQItem key={i} {...faq} />)}
        </div>
      </section>

      {/* ── FINAL THOUGHT ── */}
      <section className="py-14 px-6 text-center bg-gradient-to-br from-orange-50 to-white">
        <h2 className="text-3xl font-bold text-[#E87722] mb-4">Final Thought</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          You're not just paying for a course. You're investing in a future where you're independent, respected, and earning—all while changing young lives through the magic of Vedic Maths.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#E87722] hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full text-lg transition shadow-lg"
        >
          Enroll for a Free Demo Now!
        </button>
      </section>

      <MessageButton />
      {showModal && <CallbackModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default VedicMathsTrainingPage