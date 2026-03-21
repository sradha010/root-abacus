import { useState } from 'react'
import API from '../../services/api'

const CallbackModal = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', type: 'callback' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/enquiry', form)
      setSuccess(true)
    } catch { }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold">×</button>
        <h2 className="text-2xl font-bold mb-4 text-center text-[#E87722]">Contact Us</h2>

        {success ? (
          <div className="text-center py-8">
            <p className="text-green-600 font-semibold text-lg">Thank you! We'll contact you shortly.</p>
            <button onClick={onClose} className="mt-4 bg-[#E87722] text-white px-6 py-2 rounded">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="callback">Request Callback</option>
              <option value="contact">General Enquiry</option>
              <option value="franchise">Franchise Enquiry</option>
            </select>
            <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Your message..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <button type="submit" disabled={loading}
              className="w-full bg-[#E87722] text-white font-semibold py-2 rounded hover:bg-orange-600 disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default CallbackModal