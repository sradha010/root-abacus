import { useEffect, useState } from 'react'
import API from '../api/axios'

// ── Reusable Media Form ──────────────────────────────────────────
const EMPTY_MEDIA = { url: '', alt: '', order: 0, isActive: true }

const MediaTab = ({ type }) => {
  const [items, setItems]       = useState([])
  const [form, setForm]         = useState(EMPTY_MEDIA)
  const [editId, setEditId]     = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [msg, setMsg]           = useState('')

  const label = type === 'video' ? 'Video' : 'Image'

  const fetchAll = async () => {
    try {
      const { data } = await API.get(`/reviews/media/all?type=${type}`)
      setItems(data.data)
    } catch { }
  }

  useEffect(() => { fetchAll() }, [type])

  const handleChange = (e) => {
    const { name, value, type: t, checked } = e.target
    setForm(f => ({ ...f, [name]: t === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setMsg('')
    try {
      const payload = { ...form, type }
      if (editId) { await API.put(`/reviews/media/${editId}`, payload); setMsg('Updated!') }
      else { await API.post('/reviews/media', payload); setMsg('Created!') }
      setForm(EMPTY_MEDIA); setEditId(null); setShowForm(false); fetchAll()
    } catch (err) { setMsg(err.response?.data?.message || 'Error') }
    finally { setLoading(false) }
  }

  const handleEdit = (item) => {
    setForm({ url: item.url, alt: item.alt, order: item.order, isActive: item.isActive })
    setEditId(item._id); setShowForm(true); window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${label}?`)) return
    await API.delete(`/reviews/media/${id}`); fetchAll()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{label}s</h3>
        {!showForm && (
          <button onClick={() => setShowForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            + Add {label}
          </button>
        )}
      </div>

      {msg && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {msg}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h4 className="font-semibold text-gray-800 mb-4">{editId ? `Edit ${label}` : `Add ${label}`}</h4>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} URL * {type === 'video' ? '(mp4 link)' : '(image link)'}
              </label>
              <input name="url" value={form.url} onChange={handleChange} required
                placeholder={type === 'video' ? 'https://example.com/video.mp4' : 'https://example.com/image.png'}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text / Label</label>
              <input name="alt" value={form.alt} onChange={handleChange}
                placeholder="e.g. google-review-1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input name="order" type="number" value={form.order} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} id={`isActive-${type}`} />
              <label htmlFor={`isActive-${type}`} className="text-sm text-gray-700">Active (visible on site)</label>
            </div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
                {loading ? 'Saving...' : editId ? 'Update' : 'Add'}
              </button>
              <button type="button"
                onClick={() => { setShowForm(false); setForm(EMPTY_MEDIA); setEditId(null) }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
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
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">No {label.toLowerCase()}s yet.</td></tr>
            ) : items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {type === 'video' ? (
                    <video src={item.url} className="w-20 h-14 object-cover rounded" muted />
                  ) : (
                    <img src={item.url} alt={item.alt} className="w-20 h-14 object-cover rounded" />
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate text-xs">{item.url}</td>
                <td className="px-4 py-3 text-gray-600">{item.alt}</td>
                <td className="px-4 py-3 text-gray-600">{item.order}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(item)}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs font-medium">Edit</button>
                  <button onClick={() => handleDelete(item._id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium">Delete</button>
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
    try { await API.put(`/reviews/${id}/approve`); setMsg('Approved!'); fetchAll() } catch { }
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
      {msg && <div className="mb-4 px-4 py-3 rounded-lg text-sm bg-green-50 text-green-600">{msg}</div>}
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
                  <span className={`px-2 py-1 rounded text-xs ${r.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {r.approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  {!r.approved && (
                    <button onClick={() => handleApprove(r._id)}
                      className="bg-green-50 hover:bg-green-100 text-green-600 px-3 py-1 rounded text-xs font-medium">Approve</button>
                  )}
                  <button onClick={() => handleDelete(r._id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium">Delete</button>
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Reviews Manager</h2>
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

      {/* Tab Content */}
      {activeTab === 'Videos'       && <MediaTab type="video" />}
      {activeTab === 'Images'       && <MediaTab type="image" />}
      {activeTab === 'Text Reviews' && <TextReviewsTab />}
    </div>
  )
}

export default ReviewsPage