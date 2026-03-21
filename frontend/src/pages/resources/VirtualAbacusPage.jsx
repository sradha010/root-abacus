import { useEffect, useState, useRef } from 'react'
import CallbackModal from '../../components/forms/CallbackModal'
import MessageButton from '../../components/ui/MessageButton'

const VirtualAbacusPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [rails, setRails] = useState(13)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const scriptRef = useRef(null)

  const runAbacus = (railCount) => {
    const railsInput = document.getElementById('abacus_rails')
    const span = document.getElementById('abacus_span')
    if (railsInput) railsInput.value = railCount
    if (window.initAbacus && span && railsInput) {
      // Clear previous canvas
      span.innerHTML = ''
      window.initAbacus(null, span, railsInput)
    }
  }

  useEffect(() => {
    const existing = document.getElementById('abacus-script')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.id = 'abacus-script'
    // Use the newer version of abacus script
    script.src = 'https://abacusclassesonline.com/abacus.js?v=2'
    script.type = 'text/javascript'
    script.onload = () => {
      setScriptLoaded(true)
      setTimeout(() => runAbacus(rails), 200)
    }
    script.onerror = () => {
      // fallback to original
      const fallback = document.createElement('script')
      fallback.id = 'abacus-script-fallback'
      fallback.src = 'https://abacusclassesonline.com/abacus.js'
      fallback.type = 'text/javascript'
      fallback.onload = () => {
        setScriptLoaded(true)
        setTimeout(() => runAbacus(rails), 200)
      }
      document.body.appendChild(fallback)
    }
    document.body.appendChild(script)
    scriptRef.current = script

    return () => {
      const s = document.getElementById('abacus-script')
      const s2 = document.getElementById('abacus-script-fallback')
      if (s) s.remove()
      if (s2) s2.remove()
    }
  }, [])

  const handleRailsChange = (val) => {
    const num = Math.max(1, Math.min(17, Number(val)))
    setRails(num)
    if (scriptLoaded) {
      setTimeout(() => runAbacus(num), 50)
    }
  }

  const handleClear = () => {
    if (scriptLoaded) {
      setTimeout(() => runAbacus(rails), 50)
    }
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gradient-to-r from-orange-50 via-white to-gray-100 py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Explore the Virtual Abacus
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Engage with an interactive learning tool that builds speed, accuracy, and mental agility — anytime, anywhere.
          </p>
          <p className="text-sm text-gray-500 italic">
            ISO 9001:2015 Certified | Used by 10,000+ Students Worldwide
          </p>
        </div>
      </section>

      {/* ── ABACUS TOOL ── */}
      <section className="bg-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-gray-600 font-medium mb-5">
            Click or tap a bead to move it.
          </p>

          {/* Controls */}
          <div className="text-center mb-6 flex flex-wrap justify-center items-center gap-4">
            <label className="text-gray-700 font-medium text-sm">Rods/Columns:</label>
            <input
              id="abacus_rails"
              type="number"
              min="1"
              max="17"
              value={rails}
              onChange={(e) => handleRailsChange(e.target.value)}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center text-sm focus:outline-none focus:border-[#E87722]"
            />
            <button
              onClick={handleClear}
              className="bg-[#E87722] hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full text-sm transition shadow"
            >
              Clear
            </button>
          </div>

          {/* Abacus article tag - this is what the reference site uses */}
          <div className="flex justify-center overflow-x-auto mb-4">
            <article
              id="abacus_article"
              data-format="Japanese"
              data-sound="1"
              data-rails={rails}
            />
          </div>

          {/* Abacus Canvas */}
          <div id="roots_va_abacus" className="flex justify-center overflow-x-auto">
            <span id="abacus_span" />
          </div>

          {!scriptLoaded && (
            <div className="text-center py-10 text-gray-400 text-sm animate-pulse">
              Loading Virtual Abacus...
            </div>
          )}
        </div>
      </section>

      {/* ── HOW TO USE ── */}
      <section className="py-12 px-6 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            How to Use the Virtual Abacus
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Click or Tap a Bead', desc: 'Simply click or tap any bead to move it up or down on the rod.' },
              { step: '2', title: 'Read the Value', desc: 'The abacus displays the current number based on bead positions.' },
              { step: '3', title: 'Adjust Rods', desc: 'Change the number of rods using the input above to practice larger numbers.' },
              { step: '4', title: 'Reset Anytime', desc: 'Click the Clear button to start fresh with all beads in default position.' },
              { step: '5', title: 'Practice Daily', desc: 'Use this tool daily for 15 minutes to improve mental calculation speed.' },
              { step: '6', title: 'Learn with a Trainer', desc: 'Combine virtual practice with live sessions for best results.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 hover:shadow-md transition">
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

      {/* ── BENEFITS ── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Why Practice on a Virtual Abacus?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Practice anytime, anywhere — no physical abacus needed',
              'Builds mental visualization of bead positions',
              'Ideal for students and trainers to demonstrate techniques',
              'Helps develop faster mental calculation skills',
              'Free to use — no registration required',
              'Works on all devices — mobile, tablet, and desktop',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-orange-50 rounded-xl px-5 py-4 text-left">
                <span className="text-[#E87722] font-bold text-lg mt-0.5">✓</span>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 px-6 text-center" style={{ backgroundColor: '#fef4ea' }}>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Want to Learn Abacus Properly?
        </h2>
        <p className="text-gray-600 mb-6">
          Join our live online classes with certified trainers and see real improvement in weeks.
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

export default VirtualAbacusPage