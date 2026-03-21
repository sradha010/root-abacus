import { useEffect, useState } from 'react'
import API from '../api/axios'

const EMPTY = { name: '', role: 'Parent', content: '', isActive: true, order: 0 }

const TestimonialsPage = () => {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const fetchAll = async () => {
    try { const { data } = await API.get('/testimonials'); setItems(data.data) } catch { }
  }

  useEffect(() => { fetchAll() }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setMsg('')
    try {
      if (editId) { await API.put(`/testimonials/${editId}`, form); setMsg('Updated!') }
      else { await API.post('/testimonials', form); setMsg('Created!') }
      setForm(EMPTY); setEditId(null); setShowForm(false); fetchAll()
    } catch (err) { setMsg(err.response?.data?.message || 'Error') }
    finally { setLoading(false) }
  }

  const handleEdit = (item) => { setForm(item); setEditId(item._id); setShowForm(true); window.scrollTo(0,0) }
  const handleDelete = async (id) => { if (!window.confirm('Delete?')) return; await API.delete(`/testimonials/${id}`); fetchAll() }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Testimonials Manager</h2>
        {!showForm && <button onClick={() => setShowForm(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Add Testimonial</button>}
      </div>
      {msg && <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{msg}</div>}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">{editId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input name="role" value={form.role} onChange={handleChange} placeholder="Parent / Trainer" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
              <textarea name="content" value={form.content} onChange={handleChange} required rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} id="isActive" />
              <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
            </div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-50">{loading ? 'Saving...' : editId ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => { setShowForm(false); setForm(EMPTY); setEditId(null) }} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium">Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Role</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Content</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">No testimonials yet.</td></tr>
            ) : items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                <td className="px-4 py-3 text-gray-600">{item.role}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{item.content}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.isActive ? 'Active' : 'Inactive'}</span></td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs font-medium">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TestimonialsPage