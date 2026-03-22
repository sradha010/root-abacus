import { useEffect, useState, useRef } from 'react'
import API from '../api/axios'

const EMPTY = {
  title: '', slug: '', type: 'abacus', description: '',
  ageGroup: '', duration: '', highlights: '',
  videoType: 'none', videoUrl: '', isActive: true, order: 0
}

const CoursesPage = () => {
  const [courses, setCourses]     = useState([])
  const [form, setForm]           = useState(EMPTY)
  const [editId, setEditId]       = useState(null)
  const [showForm, setShowForm]   = useState(false)
  const [loading, setLoading]     = useState(false)
  const [msg, setMsg]             = useState('')
  // file upload state
  const [videoFile, setVideoFile]         = useState(null)   // File object
  const [videoPreview, setVideoPreview]   = useState('')     // existing URL from DB (for edit)
  const fileInputRef                      = useRef(null)

  const fetchCourses = async () => {
    try {
      const { data } = await API.get('/courses')
      setCourses(data.data)
    } catch { }
  }

  useEffect(() => { fetchCourses() }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    // When videoType changes, clear stale file/url state
    if (name === 'videoType') {
      setVideoFile(null)
      setVideoPreview('')
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setVideoFile(file)
    // Show local blob preview
    setVideoPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      const highlights = form.highlights.split('\n').filter(Boolean)

      if (form.videoType === 'upload' && videoFile) {
        // ── multipart/form-data when uploading a file ──
        const fd = new FormData()
        fd.append('title',       form.title)
        fd.append('slug',        form.slug)
        fd.append('type',        form.type)
        fd.append('description', form.description)
        fd.append('ageGroup',    form.ageGroup)
        fd.append('duration',    form.duration)
        fd.append('videoType',   'upload')
        fd.append('isActive',    form.isActive)
        fd.append('order',       form.order)
        highlights.forEach(h => fd.append('highlights[]', h))
        fd.append('videoFile', videoFile)   // key must match uploadVideo.single('videoFile')

        if (editId) {
          await API.put(`/courses/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
          setMsg('Course updated!')
        } else {
          await API.post('/courses', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
          setMsg('Course created!')
        }
      } else {
        // ── plain JSON for youtube / none ──
        const payload = { ...form, highlights, videoFile: '' }
        if (editId) {
          await API.put(`/courses/${editId}`, payload)
          setMsg('Course updated!')
        } else {
          await API.post('/courses', payload)
          setMsg('Course created!')
        }
      }

      resetForm()
      fetchCourses()
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error saving course')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (course) => {
    setForm({
      ...course,
      highlights: Array.isArray(course.highlights) ? course.highlights.join('\n') : ''
    })
    setEditId(course._id)
    setVideoFile(null)
    // Show existing uploaded video URL so admin can see what's currently set
    setVideoPreview(course.videoFile || '')
    setShowForm(true)
    window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return
    await API.delete(`/courses/${id}`)
    fetchCourses()
  }

  const resetForm = () => {
    setForm(EMPTY)
    setEditId(null)
    setShowForm(false)
    setMsg('')
    setVideoFile(null)
    setVideoPreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Courses Manager</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            + Add Course
          </button>
        )}
      </div>

      {msg && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {msg}
        </div>
      )}

      {/* ── Form ── */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            {editId ? 'Edit Course' : 'Add New Course'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <input name="slug" value={form.slug} onChange={handleChange} required
                placeholder="abacus-kids"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select name="type" value={form.type} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="abacus">Abacus</option>
                <option value="vedic">Vedic Maths</option>
                <option value="teacher-training">Teacher Training</option>
              </select>
            </div>

            {/* Age Group */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Group</label>
              <input name="ageGroup" value={form.ageGroup} onChange={handleChange}
                placeholder="5-12 years"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input name="duration" value={form.duration} onChange={handleChange}
                placeholder="6 months"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input name="order" type="number" value={form.order} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            {/* Video Type selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video Type</label>
              <select name="videoType" value={form.videoType} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="none">None</option>
                <option value="youtube">YouTube URL</option>
                <option value="upload">Upload MP4 File</option>
              </select>
            </div>

            {/* YouTube URL input */}
            {form.videoType === 'youtube' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                <input name="videoUrl" value={form.videoUrl} onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
            )}

            {/* File upload input */}
            {form.videoType === 'upload' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload MP4 Video
                  <span className="text-gray-400 font-normal ml-1">(max 100 MB)</span>
                </label>

                {/* Show existing video URL when editing */}
                {!videoFile && videoPreview && (
                  <div className="mb-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                    <p className="text-gray-500 mb-1">Current video:</p>
                    <video
                      src={videoPreview}
                      controls
                      className="w-full max-h-40 rounded object-cover"
                    />
                  </div>
                )}

                {/* New file chosen – show local preview */}
                {videoFile && (
                  <div className="mb-2 p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm">
                    <p className="text-blue-600 font-medium mb-1">New file selected: {videoFile.name}</p>
                    <video
                      src={videoPreview}
                      controls
                      className="w-full max-h-40 rounded object-cover"
                    />
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/quicktime,video/x-msvideo"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
              </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            {/* Highlights */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Highlights <span className="text-gray-400 font-normal">(one per line)</span>
              </label>
              <textarea name="highlights" value={form.highlights} onChange={handleChange} rows={4}
                placeholder="Improves concentration&#10;Builds memory&#10;Fun learning"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            {/* Active toggle */}
            <div className="flex items-center gap-2">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange}
                className="rounded" id="isActive" />
              <label htmlFor="isActive" className="text-sm text-gray-700">Active (visible on site)</label>
            </div>

            {/* Actions */}
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-50 flex items-center gap-2">
                {loading && (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                )}
                {loading ? 'Saving...' : editId ? 'Update Course' : 'Create Course'}
              </button>
              <button type="button" onClick={resetForm}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Table ── */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Age Group</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Video</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No courses yet. Click "+ Add Course" to create one.
                </td>
              </tr>
            ) : courses.map((course) => (
              <tr key={course._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{course.title}</td>
                <td className="px-4 py-3">
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs capitalize">
                    {course.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{course.ageGroup || '—'}</td>
                <td className="px-4 py-3">
                  {course.videoType === 'none' ? (
                    <span className="text-gray-400 text-xs">—</span>
                  ) : course.videoType === 'youtube' ? (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">YouTube</span>
                  ) : (
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">MP4</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${course.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {course.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(course)}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs font-medium">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(course._id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CoursesPage