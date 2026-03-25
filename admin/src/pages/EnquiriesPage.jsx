import { useEffect, useState } from 'react'
import API from '../api/axios'

const TYPE_LABELS = {
  callback: { label: 'Callback', color: 'bg-blue-100 text-blue-700' },
  contact:  { label: 'Contact',  color: 'bg-gray-100 text-gray-700' },
  franchise:{ label: 'Franchise',color: 'bg-purple-100 text-purple-700' },
}

const EnquiriesPage = () => {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
    setLoading(true)
    try {
      const { data } = await API.get('/enquiry')
      setItems(data.data)
    } catch {}
    finally { setLoading(false) }
  }

  useEffect(() => { fetchAll() }, [])

  const handleMarkRead = async (id) => {
    await API.put(`/enquiry/${id}/read`)
    setItems(prev => prev.map(i => i._id === id ? { ...i, isRead: true } : i))
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return
    await API.delete(`/enquiry/${id}`)
    setItems(prev => prev.filter(i => i._id !== id))
  }

  const filtered = filter === 'all' ? items : items.filter(i => i.type === filter)
  const unreadCount = items.filter(i => !i.isRead).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Enquiries & Franchise Queries</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-orange-600 mt-0.5">{unreadCount} unread enquir{unreadCount === 1 ? 'y' : 'ies'}</p>
          )}
        </div>
        <button onClick={fetchAll} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
          ↻ Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'callback', 'contact', 'franchise'].map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
              filter === t
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {t === 'all' ? `All (${items.length})` : `${t.charAt(0).toUpperCase() + t.slice(1)} (${items.filter(i => i.type === t).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Message</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-8 text-gray-400">No enquiries found.</td></tr>
              ) : filtered.map((item) => (
                <tr key={item._id} className={`hover:bg-gray-50 ${!item.isRead ? 'bg-orange-50/40' : ''}`}>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {!item.isRead && <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2 mb-0.5" />}
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.email}</td>
                  <td className="px-4 py-3 text-gray-600">{item.phone || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${TYPE_LABELS[item.type]?.color || 'bg-gray-100 text-gray-600'}`}>
                      {TYPE_LABELS[item.type]?.label || item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{item.message || '—'}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${item.isRead ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.isRead ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    {!item.isRead && (
                      <button onClick={() => handleMarkRead(item._id)}
                        className="bg-green-50 hover:bg-green-100 text-green-600 px-3 py-1 rounded text-xs font-medium whitespace-nowrap">
                        Mark Read
                      </button>
                    )}
                    <button onClick={() => handleDelete(item._id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default EnquiriesPage