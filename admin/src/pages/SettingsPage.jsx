import { useEffect, useState, useRef } from 'react'
import API from '../api/axios'

const SettingsPage = () => {
  const [form, setForm] = useState({
    footerText: '',
    phone: '',
    email: '',
    socialLinks: { facebook: '', instagram: '', youtube: '', whatsapp: '' },
    footerLinks: []
  })
  const [logoPreview, setLogoPreview] = useState(null)
  const [logoFile, setLogoFile] = useState(null)
  const [currentLogo, setCurrentLogo] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef()

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get('/settings')
        const d = data.data
        setCurrentLogo(d.logoUrl || '')
        setForm({
          footerText: d.footerText || '',
          phone: d.phone || '',
          email: d.email || '',
          socialLinks: {
            facebook: d.socialLinks?.facebook || '',
            instagram: d.socialLinks?.instagram || '',
            youtube: d.socialLinks?.youtube || '',
            whatsapp: d.socialLinks?.whatsapp || ''
          },
          footerLinks: d.footerLinks || []
        })
      } catch { }
    }
    fetch()
  }, [])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSocialChange = (e) => setForm(f => ({ ...f, socialLinks: { ...f.socialLinks, [e.target.name]: e.target.value } }))

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  // Footer links
  const addFooterLink = () => setForm(f => ({ ...f, footerLinks: [...f.footerLinks, { label: '', url: '' }] }))
  const updateFooterLink = (i, field, value) => {
    const updated = [...form.footerLinks]
    updated[i][field] = value
    setForm(f => ({ ...f, footerLinks: updated }))
  }
  const removeFooterLink = (i) => {
    setForm(f => ({ ...f, footerLinks: f.footerLinks.filter((_, idx) => idx !== i) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      if (logoFile) {
        // Upload logo as multipart
        const formData = new FormData()
        formData.append('logo', logoFile)
        formData.append('footerText', form.footerText)
        formData.append('phone', form.phone)
        formData.append('email', form.email)
        formData.append('socialLinks', JSON.stringify(form.socialLinks))
        formData.append('footerLinks', JSON.stringify(form.footerLinks))
        await API.put('/settings', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await API.put('/settings', form)
      }
      setMsg('Settings saved successfully!')
      setLogoFile(null)
    } catch {
      setMsg('Error saving settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Site Settings</h2>
      {msg && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {msg}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Logo Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-700 mb-4 pb-2 border-b">Website Logo</h3>
          <div className="flex items-center gap-6">
            <div className="w-32 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
              {logoPreview || currentLogo ? (
                <img src={logoPreview || currentLogo} alt="Logo" className="max-w-full max-h-full object-contain p-1" />
              ) : (
                <span className="text-gray-400 text-xs text-center">No logo uploaded</span>
              )}
            </div>
            <div>
              <input type="file" ref={fileRef} onChange={handleLogoChange} accept="image/*" className="hidden" />
              <button type="button" onClick={() => fileRef.current.click()}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Upload New Logo
              </button>
              <p className="text-xs text-gray-400 mt-2">PNG, JPG, SVG or WebP. Max 5MB.</p>
              <p className="text-xs text-gray-400">Logo will update across all pages instantly.</p>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-700 mb-4 pb-2 border-b">General</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input name="email" value={form.email} onChange={handleChange}
                placeholder="support@rootsabacus.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
              <input name="footerText" value={form.footerText} onChange={handleChange}
                placeholder="© 2026 Roots Abacus Learning School. All rights reserved."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b">
            <h3 className="font-semibold text-gray-700">Footer Links</h3>
            <button type="button" onClick={addFooterLink}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-medium">
              + Add Link
            </button>
          </div>
          {form.footerLinks.length === 0 ? (
            <p className="text-sm text-gray-400">No footer links added yet.</p>
          ) : (
            <div className="space-y-3">
              {form.footerLinks.map((link, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input value={link.label} onChange={(e) => updateFooterLink(i, 'label', e.target.value)}
                    placeholder="Label (e.g. About Us)"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  <input value={link.url} onChange={(e) => updateFooterLink(i, 'url', e.target.value)}
                    placeholder="URL (e.g. /about)"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  <button type="button" onClick={() => removeFooterLink(i)}
                    className="text-red-500 hover:text-red-700 text-lg font-bold px-2">×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-700 mb-4 pb-2 border-b">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['facebook', 'instagram', 'youtube', 'whatsapp'].map((s) => (
              <div key={s}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{s}</label>
                <input name={s} value={form.socialLinks[s]} onChange={handleSocialChange}
                  placeholder={`https://${s}.com/...`}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
          {loading ? 'Saving...' : 'Save All Settings'}
        </button>
      </form>
    </div>
  )
}

export default SettingsPage