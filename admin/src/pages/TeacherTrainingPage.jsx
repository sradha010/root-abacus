import { useEffect, useState } from 'react'
import API from '../api/axios'

const EMPTY = {
  title: '', slug: '', type: 'abacus', description: '',
  highlights: '', duration: '', fee: '',
  videoType: 'none', videoUrl: '', isActive: true, order: 0
}

const TeacherTrainingPage = () => {
  const [programs, setPrograms] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const fetchPrograms = async () => {
    try {
      const { data } = await API.get('/teacher-training')
      setPrograms(data.data)
    } catch { }
  }

  useEffect(() => { fetchPrograms() }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form, highlights: form.highlights.split('\n').filter(Boolean) }
      if (editId) {
        await API.put(`/teacher-training/${editId}`, payload)
        setMsg('Updated!')
      } else {
        await API.post('/teacher-training', payload)
        setMsg('Created!')
      }
      setForm(EMPTY); setEditId(null); setShowForm(false)
      fetchPrograms()
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error')
    } finally { setLoading(false) }
  }

  const handleEdit = (p) => {
    setForm({ ...p, highlights: Array.isArray(p.highlights) ? p.highlights.join('\n') : '' })
    setEditId(p._id); setShowForm(true); window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this program?')) return
    await API.delete(`/teacher-training/${id}`)
    fetchPrograms()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Teacher Training Manager</h2>
        {!showForm && (
          <button onClick={() => setShowForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            + Add Program
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
          <h3 className="font-semibold text-gray-800 mb-4">{editId ? 'Edit Program' : 'Add Program'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <input name="slug" value={form.slug} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select name="type" value={form.type} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="abacus">Abacus</option>
                <option value="vedic">Vedic Maths</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input name="duration" value={form.duration} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fee</label>
              <input name="fee" value={form.fee} onChange={handleChange}
                placeholder="₹5000"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video Type</label>
              <select name="videoType" value={form.videoType} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="none">None</option>
                <option value="youtube">YouTube URL</option>
              </select>
            </div>
            {form.videoType === 'youtube' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                <input name="videoUrl" value={form.videoUrl} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
            )}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (one per line)</label>
              <textarea name="highlights" value={form.highlights} onChange={handleChange} rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} id="isActive" />
              <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
            </div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
                {loading ? 'Saving...' : editId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setForm(EMPTY); setEditId(null) }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Duration</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Fee</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {programs.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">No programs yet.</td></tr>
            ) : programs.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{p.title}</td>
                <td className="px-4 py-3"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs capitalize">{p.type}</span></td>
                <td className="px-4 py-3 text-gray-600">{p.duration || '—'}</td>
                <td className="px-4 py-3 text-gray-600">{p.fee || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(p)} className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs font-medium">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeacherTrainingPage