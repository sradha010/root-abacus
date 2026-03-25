import { useEffect, useState } from 'react'
import API from '../services/api'
import CallbackModal from '../components/forms/CallbackModal'
import MessageButton from '../components/ui/MessageButton'

const ContactPage = () => {
  const [contact, setContact] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', type: 'contact' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    API.get('/contact')
      .then(({ data }) => setContact(data.data))
      .catch(() => {})
  }, [])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/enquiry', form)
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', message: '', type: 'contact' })
    } catch { }
    finally { setLoading(false) }
  }

  const getHandle = (url) => {
    try {
      const parsed = new URL(url)
      return parsed.pathname.replace(/\/$/, '') || parsed.hostname
    } catch {
      return url
    }
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-white">
        <div className="absolute inset-0">
          <img
            src="https://abacusclassesonline.com/images2/contact.webp"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            We're Here to Help
          </h1>
          <p className="text-lg text-gray-600">
            Need help or have questions? Our team is here to assist you!
          </p>
        </div>
      </section>

      {/* ── LET'S CONNECT CTA ── */}
      <section className="py-6 px-5 lg:px-80">
        <div className="bg-orange-600 text-white p-8 rounded-3xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-400 bg-opacity-40 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-8 h-8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Let's Connect!</h3>
              <p className="text-sm mt-1 text-orange-100">Not sure if this is for you? Let's talk. No pressure, just answers.</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-[#E87722] font-semibold px-6 py-3 rounded-xl text-sm hover:bg-orange-50 transition flex items-center gap-2 flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Contact Us Now
          </button>
        </div>
      </section>

      {/* ── 3 CONTACT BLOCKS ── */}
      <section className="relative bg-white py-12 px-4 sm:px-8 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-100 rounded-full opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-200 rounded-full opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-orange-100 rounded-full opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-orange-100 rounded-full opacity-25 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Contact Us */}
            <div className="relative group bg-white shadow-xl rounded-3xl p-8 text-center overflow-hidden">
              <div className="absolute -top-10 -left-10 w-28 h-28 bg-orange-100 rounded-full group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="1.5" className="w-7 h-7">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#E87722]">Contact Us</h4>
                <ul className="text-left text-sm text-gray-700 space-y-3 w-full">
                  {contact?.phones?.map((p, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.37 18 19.5 19.5 0 0 1 3 9.13 2 2 0 0 1 5.11 7h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.91 14.09a16 16 0 0 0 6 6"/>
                      </svg>
                      <a href={`tel:${p}`} className="hover:text-[#E87722] underline">{p}</a>
                    </li>
                  ))}
                  {contact?.emails?.map((e, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      <a href={`mailto:${e}`} className="hover:text-[#E87722] underline text-xs break-all">{e}</a>
                    </li>
                  ))}
                  {contact?.socialLinks?.whatsapp && (
                    <li className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                      <a href={contact.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#E87722] underline">
                        WhatsApp: {getHandle(contact.socialLinks.whatsapp)}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Follow Us */}
            <div className="relative group bg-white shadow-xl rounded-3xl p-8 text-center overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-orange-100 rounded-full group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="1.5" className="w-7 h-7">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#E87722]">Follow Us</h4>
                <ul className="text-left text-sm text-gray-700 space-y-3 w-full">
                  {[
                    { name: 'facebook',  icon: 'f'  },
                    { name: 'instagram', icon: 'in' },
                    { name: 'youtube',   icon: 'yt' },
                    { name: 'linkedin',  icon: 'li' },
                  ]
                    .filter(item => contact?.socialLinks?.[item.name])
                    .map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-[#E87722] text-xs font-bold flex-shrink-0">
                          {item.icon}
                        </div>
                        <a
                          href={contact.socialLinks[item.name]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#E87722] underline text-sm"
                        >
                          {getHandle(contact.socialLinks[item.name])}
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>

            {/* Visit Us */}
            <div className="relative group bg-white shadow-xl rounded-3xl p-8 text-center overflow-hidden">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-orange-100 rounded-full group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="1.5" className="w-7 h-7">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#E87722]">Visit Us</h4>
                <ul className="text-left text-sm text-gray-700 space-y-3 w-full">
                  {contact?.address && (
                    <li className="flex items-start gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 mt-0.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{contact.address}</span>
                    </li>
                  )}
                  {contact?.workingHours && (
                    <li className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span>{contact.workingHours}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">Send Us a Message</h2>
          <p className="text-center text-gray-500 mb-8">Fill in the form below and we'll get back to you within 24 hours.</p>

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="text-xl font-bold text-green-700 mb-2">Message Sent!</h3>
              <p className="text-green-600">Thank you! We'll get back to you shortly.</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 bg-[#E87722] text-white px-6 py-2 rounded-full text-sm hover:bg-orange-600 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    name="name" value={form.name} onChange={handleChange} required
                    placeholder="Your name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    name="phone" value={form.phone} onChange={handleChange} required
                    placeholder="+91 98765 43210"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Type</label>
                <select
                  name="type" value={form.type} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="contact">General Enquiry</option>
                  <option value="callback">Request Callback</option>
                  <option value="franchise">Franchise Enquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={4}
                  placeholder="How can we help you?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full bg-[#E87722] hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── MAP ── */}
      {contact?.mapsEmbed && (
        <section className="h-80 w-full">
          <iframe
            src={contact.mapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Office Location"
          />
        </section>
      )}

      <MessageButton />
      {showModal && <CallbackModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default ContactPage