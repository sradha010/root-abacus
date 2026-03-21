import { useEffect, useState } from 'react'
import API from '../api/axios'

const EMPTY = {
  title: '', description: '', location: 'Remote',
  type: 'part-time', applyLink: '', isActive: true,
  requirements: [], responsibilities: [], qualifications: [],
  otherRequirements: [], language: '', timeType: '',
  compensation: '', schedule: '',
}

// ── Reusable component to manage a list of bullet points ──
const ArrayField = ({ label, value = [], onChange }) => {
  const [input, setInput] = useState('')

  const add = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    onChange([...value, trimmed])
    setInput('')
  }

  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))

  const handleKey = (e) => { if (e.key === 'Enter') { e.preventDefault(); add() } }

  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {/* Existing items */}
      {value.length > 0 && (
        <ul className="mb-2 space-y-1">
          {value.map((item, i) => (
            <li key={i} className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-lg px-3 py-1.5 text-sm text-gray-700">
              <span className="flex-1">{item}</span>
              <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 font-bold text-base leading-none">×</button>
            </li>
          ))}
        </ul>
      )}
      {/* Add new item */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type and press Enter or click Add"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="button"
          onClick={add}
          className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Add
        </button>
      </div>
    </div>
  )
}

const JobsPage = () => {
  const [jobs, setJobs]         = useState([])
  const [form, setForm]         = useState(EMPTY)
  const [editId, setEditId]     = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [msg, setMsg]           = useState('')

  const fetchAll = async () => {
    try { const { data } = await API.get('/jobs/all'); setJobs(data.data) } catch { }
  }

  useEffect(() => { fetchAll() }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleArrayChange = (name, value) => {
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setMsg('')
    try {
      if (editId) { await API.put(`/jobs/${editId}`, form); setMsg('Updated!') }
      else { await API.post('/jobs', form); setMsg('Created!') }
      setForm(EMPTY); setEditId(null); setShowForm(false); fetchAll()
    } catch (err) { setMsg(err.response?.data?.message || 'Error') }
    finally { setLoading(false) }
  }

  const handleEdit = (job) => {
    setForm({
      ...EMPTY,
      ...job,
      requirements:      job.requirements      || [],
      responsibilities:  job.responsibilities   || [],
      qualifications:    job.qualifications     || [],
      otherRequirements: job.otherRequirements  || [],
    })
    setEditId(job._id)
    setShowForm(true)
    window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job?')) return
    await API.delete(`/jobs/${id}`)
    fetchAll()
  }

  const handleCancel = () => { setShowForm(false); setForm(EMPTY); setEditId(null) }

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Jobs Manager</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            + Add Job
          </button>
        )}
      </div>

      {/* ── Message ── */}
      {msg && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {msg}
        </div>
      )}

      {/* ── Form ── */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">{editId ? 'Edit Job' : 'Add New Job'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* ── Basic Fields ── */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input name="location" value={form.location} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select name="type" value={form.type} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="freelance">Freelance</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apply Link</label>
              <input name="applyLink" value={form.applyLink} onChange={handleChange} placeholder="https://..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            {/* ── Divider ── */}
            <div className="md:col-span-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-t border-gray-100 pt-4 mb-2">
                Detailed Sections
              </p>
            </div>

            {/* ── Array Fields ── */}
            <ArrayField
              label="Requirements"
              value={form.requirements}
              onChange={(val) => handleArrayChange('requirements', val)}
            />
            <ArrayField
              label="Responsibilities"
              value={form.responsibilities}
              onChange={(val) => handleArrayChange('responsibilities', val)}
            />
            <ArrayField
              label="Qualifications & Experience"
              value={form.qualifications}
              onChange={(val) => handleArrayChange('qualifications', val)}
            />
            <ArrayField
              label="Other Requirements"
              value={form.otherRequirements}
              onChange={(val) => handleArrayChange('otherRequirements', val)}
            />

            {/* ── Divider ── */}
            <div className="md:col-span-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-t border-gray-100 pt-4 mb-2">
                Additional Info
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <input name="language" value={form.language} onChange={handleChange} placeholder="e.g. Fluent English and Hindi"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Type</label>
              <input name="timeType" value={form.timeType} onChange={handleChange} placeholder="e.g. Full time"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Compensation</label>
              <input name="compensation" value={form.compensation} onChange={handleChange} placeholder="e.g. 25k-35k plus incentives"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
              <input name="schedule" value={form.schedule} onChange={handleChange} placeholder="e.g. 10:00 am to 6:30 pm, Mon–Sat"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            {/* ── Active toggle ── */}
            <div className="flex items-center gap-2 md:col-span-2">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} id="isActive" />
              <label htmlFor="isActive" className="text-sm text-gray-700">Active (visible on site)</label>
            </div>

            {/* ── Buttons ── */}
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
                {loading ? 'Saving...' : editId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={handleCancel}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Jobs Table ── */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Location</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">No jobs yet.</td></tr>
            ) : jobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{job.title}</td>
                <td className="px-4 py-3 text-gray-600">{job.location}</td>
                <td className="px-4 py-3">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs capitalize">{job.type}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${job.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {job.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(job)} className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs font-medium">Edit</button>
                  <button onClick={() => handleDelete(job._id)} className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default JobsPage