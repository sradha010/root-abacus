import { useEffect, useState } from 'react'
import API from '../api/axios'

const ContactPage = () => {
  const [form, setForm] = useState({
    phones: '', emails: '', address: '', mapsEmbed: '', workingHours: 'Mon-Sat, 9am-6pm',
    socialLinks: { facebook: '', instagram: '', youtube: '', linkedin: '', whatsapp: '' }
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get('/contact')
        const d = data.data
        setForm({
          phones: d.phones?.join('\n') || '',
          emails: d.emails?.join('\n') || '',
          address: d.address || '',
          mapsEmbed: d.mapsEmbed || '',
          workingHours: d.workingHours || 'Mon-Sat, 9am-6pm',
          socialLinks: {
            facebook:  d.socialLinks?.facebook  || '',
            instagram: d.socialLinks?.instagram || '',
            youtube:   d.socialLinks?.youtube   || '',
            linkedin:  d.socialLinks?.linkedin  || '',
            whatsapp:  d.socialLinks?.whatsapp  || '',
          }
        })
      } catch { }
    }
    fetch()
  }, [])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSocialChange = (e) => setForm(f => ({
    ...f,
    socialLinks: { ...f.socialLinks, [e.target.name]: e.target.value }
  }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setMsg('')
    try {
      await API.put('/contact', {
        phones: form.phones.split('\n').filter(Boolean),
        emails: form.emails.split('\n').filter(Boolean),
        address: form.address,
        mapsEmbed: form.mapsEmbed,
        workingHours: form.workingHours,
        socialLinks: form.socialLinks
      })
      setMsg('Contact info updated!')
    } catch { setMsg('Error saving') }
    finally { setLoading(false) }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Page Manager</h2>
      {msg && <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{msg}</div>}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Existing fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Numbers <span className="text-gray-400 font-normal">(one per line)</span></label>
              <textarea name="phones" value={form.phones} onChange={handleChange} rows={3} placeholder="+91 9876543210&#10;+91 9123456789" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Addresses <span className="text-gray-400 font-normal">(one per line)</span></label>
              <textarea name="emails" value={form.emails} onChange={handleChange} rows={3} placeholder="support@rootsabacus.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
              <input name="workingHours" value={form.workingHours} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed URL</label>
              <input name="mapsEmbed" value={form.mapsEmbed} onChange={handleChange} placeholder="https://www.google.com/maps/embed?..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
          </div>

          {/* Social Links — new section */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3 border-t pt-4">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'facebook',  label: 'Facebook URL',  placeholder: 'https://facebook.com/yourpage' },
                { name: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/yourhandle' },
                { name: 'youtube',   label: 'YouTube URL',   placeholder: 'https://youtube.com/@yourchannel' },
                { name: 'linkedin',  label: 'LinkedIn URL',  placeholder: 'https://linkedin.com/company/yourcompany' },
                { name: 'whatsapp',  label: 'WhatsApp Link', placeholder: 'https://wa.me/919876543210' },
              ].map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    name={name}
                    value={form.socialLinks[name]}
                    onChange={handleSocialChange}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Contact Info'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default ContactPage