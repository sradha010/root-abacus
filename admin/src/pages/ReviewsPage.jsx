import { useEffect, useRef, useState } from 'react'
import { FolderOpen, Link2, Video, Image, Upload } from 'lucide-react'
import API from '../api/axios'

// ── Media Tab ────────────────────────────────────────────────────
const MediaTab = ({ type }) => {
  const [items, setItems]           = useState([])
  const [uploadType, setUploadType] = useState('file') // 'file' | 'url'
  const [file, setFile]             = useState(null)
  const [preview, setPreview]       = useState(null)
  const [url, setUrl]               = useState('')
  const [alt, setAlt]               = useState('')
  const [order, setOrder]           = useState(0)
  const [isActive, setIsActive]     = useState(true)
  const [editId, setEditId]         = useState(null)
  const [showForm, setShowForm]     = useState(false)
  const [loading, setLoading]       = useState(false)
  const [msg, setMsg]               = useState('')
  const fileRef                     = useRef()

  const label    = type === 'video' ? 'Video' : 'Image'
  const accept   = type === 'video' ? 'video/mp4,video/quicktime' : 'image/jpeg,image/png,image/webp,image/svg+xml'
  const endpoint = type === 'video' ? '/reviews/media/video' : '/reviews/media/image'
  const maxSize  = type === 'video' ? 100 * 1024 * 1024 : 5 * 1024 * 1024
  const maxLabel = type === 'video' ? '100MB' : '5MB'

  const fetchAll = async () => {
    try {
      const { data } = await API.get(`/reviews/media/all?type=${type}`)
      setItems(data.data)
    } catch { }
  }

  useEffect(() => { fetchAll() }, [type])

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return

    // ── Size validation ──
    if (f.size > maxSize) {
      setMsg(`❌ File too large! Maximum allowed size is ${maxLabel}. Your file is ${(f.size / (1024 * 1024)).toFixed(1)}MB.`)
      if (fileRef.current) fileRef.current.value = ''
      return
    }

    setMsg('')
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setUrl('')
  }

  const resetForm = () => {
    setFile(null); setPreview(null); setUrl(''); setAlt('')
    setOrder(0); setIsActive(true); setEditId(null)
    setShowForm(false); setUploadType('file'); setMsg('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (uploadType === 'file' && !editId && !file)
      return setMsg('❌ Please select a file to upload')
    if (uploadType === 'url' && !url.trim())
      return setMsg('❌ Please enter a valid URL')

    setLoading(true); setMsg('')

    try {
      if (uploadType === 'file' && file) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('alt', alt)
        formData.append('order', order)
        formData.append('isActive', isActive)

        if (editId) {
          await API.put(`${endpoint}/${editId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        } else {
          await API.post(endpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        }
      } else {
        const payload = { type, url: url.trim(), alt, order, isActive }
        if (editId) {
          await API.put(`/reviews/media/${editId}`, payload)
        } else {
          await API.post('/reviews/media', payload)
        }
      }

      setMsg(editId ? '✅ Updated successfully!' : '✅ Saved successfully!')
      resetForm(); fetchAll()
    } catch (err) {
      setMsg(`❌ ${err.response?.data?.message || 'Something went wrong. Please try again.'}`)
    } finally { setLoading(false) }
  }

  const handleEdit = (item) => {
    setAlt(item.alt); setOrder(item.order)
    setIsActive(item.isActive); setUrl(item.url)
    setPreview(item.url); setUploadType('url')
    setEditId(item._id); setShowForm(true)
    window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${label}?`)) return
    await API.delete(`/reviews/media/${id}`); fetchAll()
  }

  const toggleActive = async (item) => {
    await API.put(`/reviews/media/${item._id}`, { isActive: !item.isActive })
    fetchAll()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{label}s</h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
            style={{ backgroundColor: '#E87722' }}
          >
            + Add {label}
          </button>
        )}
      </div>

      {/* Message */}
      {msg && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
          msg.startsWith('❌')
            ? 'bg-red-50 text-red-600 border border-red-200'
            : 'bg-green-50 text-green-600 border border-green-200'
        }`}>
          {msg}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <h4 className="font-semibold text-gray-800 mb-5">
            {editId ? `Edit ${label}` : `Add New ${label}`}
          </h4>

          {/* Upload Type Toggle */}
          <div className="flex gap-2 mb-5">
            <button
              type="button"
              onClick={() => { setUploadType('file'); setUrl(''); setMsg('') }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
              style={uploadType === 'file'
                ? { backgroundColor: '#E87722', borderColor: '#E87722', color: 'white' }
                : { backgroundColor: 'white', borderColor: '#d1d5db', color: '#4b5563' }
              }
              onMouseEnter={e => { if (uploadType !== 'file') { e.currentTarget.style.borderColor = '#E87722'; e.currentTarget.style.color = '#E87722' } }}
              onMouseLeave={e => { if (uploadType !== 'file') { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#4b5563' } }}
            >
              <FolderOpen size={16} strokeWidth={1.5} />
              Browse from Device
            </button>
            <button
              type="button"
              onClick={() => { setUploadType('url'); setFile(null); setPreview(null); setMsg(''); if (fileRef.current) fileRef.current.value = '' }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
              style={uploadType === 'url'
                ? { backgroundColor: '#E87722', borderColor: '#E87722', color: 'white' }
                : { backgroundColor: 'white', borderColor: '#d1d5db', color: '#4b5563' }
              }
              onMouseEnter={e => { if (uploadType !== 'url') { e.currentTarget.style.borderColor = '#E87722'; e.currentTarget.style.color = '#E87722' } }}
              onMouseLeave={e => { if (uploadType !== 'url') { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#4b5563' } }}
            >
              <Link2 size={16} strokeWidth={1.5} />
              Paste URL
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* ── FILE UPLOAD ── */}
            {uploadType === 'file' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {label} File {!editId && <span className="text-red-500">*</span>}
                </label>

                {/* Size warning alert */}
                <div className="mb-3 flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                  <span className="text-orange-500 mt-0.5">⚠️</span>
                  <div className="text-xs text-orange-700">
                    <strong>File size limit: {maxLabel}</strong>
                    {type === 'video'
                      ? ' — Supported formats: MP4, MOV. For videos larger than 100MB, use the "Paste URL" option with a YouTube or Google Drive link.'
                      : ' — Supported formats: PNG, JPG, WebP, SVG.'
                    }
                  </div>
                </div>

                {/* Drop zone */}
                <div
                  className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition"
                  onClick={() => fileRef.current?.click()}
                >
                  {preview && file ? (
                    <div>
                      {type === 'video' ? (
                        <video src={preview} className="max-h-48 mx-auto rounded-lg" controls />
                      ) : (
                        <img src={preview} alt="preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                      )}
                      <p className="text-xs text-green-600 mt-2 font-medium">✅ {file.name} ({(file.size / (1024 * 1024)).toFixed(1)}MB)</p>
                      <p className="text-xs text-gray-400 mt-1">Click to change file</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-center mb-3">
                        {type === 'video'
                          ? <Video size={48} strokeWidth={1} style={{ color: '#E87722' }} />
                          : <Image size={48} strokeWidth={1} style={{ color: '#E87722' }} />
                        }
                      </div>
                      <p className="text-sm font-medium text-gray-700">Click to browse {label.toLowerCase()} from your device</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {type === 'video' ? 'MP4, MOV — max 100MB' : 'PNG, JPG, WebP — max 5MB'}
                      </p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileRef} type="file" accept={accept}
                  onChange={handleFile} className="hidden"
                />
              </div>
            )}

            {/* ── URL INPUT ── */}
            {uploadType === 'url' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {label} URL <span className="text-red-500">*</span>
                  <span className="text-gray-400 font-normal ml-1 text-xs">
                    {type === 'video'
                      ? '(YouTube embed link, Google Drive, or direct .mp4 URL)'
                      : '(Direct image URL — PNG, JPG, WebP)'}
                  </span>
                </label>

                {/* URL tip */}
                {type === 'video' && (
                  <div className="mb-2 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                    <Link2 size={14} strokeWidth={1.5} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-700">
                      For YouTube: go to the video → Share → Embed → copy the URL from src="..." and paste it here.
                    </p>
                  </div>
                )}

                <input
                  value={url}
                  onChange={e => { setUrl(e.target.value); setMsg('') }}
                  placeholder={
                    type === 'video'
                      ? 'https://www.youtube.com/embed/VIDEO_ID or https://example.com/video.mp4'
                      : 'https://example.com/image.png'
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />

                {/* Live preview */}
                {url.trim() && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                    {type === 'video' ? (
                      url.includes('youtube.com/embed') || url.includes('youtu.be') ? (
                        <iframe
                          src={url}
                          className="w-full h-48"
                          allowFullScreen
                          title="Video preview"
                        />
                      ) : (
                        <video src={url} className="w-full max-h-48" controls />
                      )
                    ) : (
                      <img src={url} alt="preview" className="w-full max-h-48 object-contain bg-gray-50" />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Alt / Label */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label / Alt Text</label>
              <input
                value={alt} onChange={e => setAlt(e.target.value)}
                placeholder={type === 'video' ? 'e.g. Parent review video' : 'e.g. Google review screenshot'}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input
                type="number" value={order}
                onChange={e => setOrder(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Active toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox" id={`active-${type}`}
                checked={isActive} onChange={e => setIsActive(e.target.checked)}
              />
              <label htmlFor={`active-${type}`} className="text-sm text-gray-700">
                Active (visible on site)
              </label>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button
                type="submit" disabled={loading}
                className="text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-50 flex items-center gap-2 hover:opacity-90 transition"
                style={{ backgroundColor: '#E87722' }}
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? 'Saving...' : editId ? 'Update' : 'Save'}
              </button>
              <button
                type="button" onClick={resetForm}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Preview</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">URL</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Alt</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Order</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No {label.toLowerCase()}s yet. Add one above.
                </td>
              </tr>
            ) : items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {type === 'video' ? (
                    item.url.includes('youtube.com') || item.url.includes('youtu.be') ? (
                      <iframe src={item.url} className="w-20 h-14 rounded" title="video" />
                    ) : (
                      <video src={item.url} className="w-20 h-14 object-cover rounded" muted />
                    )
                  ) : (
                    <img src={item.url} alt={item.alt} className="w-20 h-14 object-cover rounded" />
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate text-xs">{item.url}</td>
                <td className="px-4 py-3 text-gray-600">{item.alt || '—'}</td>
                <td className="px-4 py-3 text-gray-600">{item.order}</td>
                <td className="px-4 py-3">
                  <span
                    onClick={() => toggleActive(item)}
                    className={`px-2 py-1 rounded text-xs cursor-pointer transition ${
                      item.isActive
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                    title="Click to toggle"
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 py-1 rounded text-xs font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Text Reviews Tab ──────────────────────────────────────────
const TextReviewsTab = () => {
  const [reviews, setReviews] = useState([])
  const [msg, setMsg]         = useState('')

  const fetchAll = async () => {
    try { const { data } = await API.get('/reviews/all'); setReviews(data.data) } catch { }
  }

  useEffect(() => { fetchAll() }, [])

  const handleApprove = async (id) => {
    try { await API.put(`/reviews/${id}/approve`); setMsg('✅ Approved!'); fetchAll() } catch { }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return
    try { await API.delete(`/reviews/${id}`); fetchAll() } catch { }
  }

  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Text Reviews</h3>
        <span className="text-sm text-gray-500">Submitted by users — approve before publishing</span>
      </div>
      {msg && (
        <div className="mb-4 px-4 py-3 rounded-lg text-sm bg-green-50 text-green-600 border border-green-200">
          {msg}
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Stars</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Review</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reviews.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">No reviews yet.</td></tr>
            ) : reviews.map((r) => (
              <tr key={r._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                <td className="px-4 py-3 text-gray-600">{r.email}</td>
                <td className="px-4 py-3 text-yellow-500">{stars(r.stars)}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{r.content}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    r.approved ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {r.approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {!r.approved && (
                      <button
                        onClick={() => handleApprove(r._id)}
                        className="bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 py-1 rounded text-xs font-medium transition"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Main ReviewsPage ─────────────────────────────────────────
const TABS = ['Videos', 'Images', 'Text Reviews']

const ReviewsPage = () => {
  const [activeTab, setActiveTab] = useState('Videos')

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Reviews Manager</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage videos, images and text reviews shown on the public page
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition -mb-px ${
              activeTab === tab
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Videos'       && <MediaTab type="video" />}
      {activeTab === 'Images'       && <MediaTab type="image" />}
      {activeTab === 'Text Reviews' && <TextReviewsTab />}
    </div>
  )
}

export default ReviewsPage