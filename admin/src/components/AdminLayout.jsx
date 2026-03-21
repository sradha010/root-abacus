import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { path: '/',                  label: 'Dashboard',         icon: '📊' },
  { path: '/courses',           label: 'Courses',           icon: '📚' },
  { path: '/teacher-training',  label: 'Teacher Training',  icon: '🎓' },
  { path: '/testimonials',      label: 'Testimonials',      icon: '💬' },
  { path: '/reviews',           label: 'Reviews',           icon: '⭐' },
  { path: '/jobs',              label: 'Jobs',              icon: '💼' },
  { path: '/contact',           label: 'Contact',           icon: '📞' },
  { path: '/settings',          label: 'Settings',          icon: '⚙️'  },
]

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { admin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {sidebarOpen && (
            <span className="text-orange-400 font-bold text-sm">Roots Admin</span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white p-1">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-gray-700
                ${location.pathname === item.path ? 'bg-orange-600 text-white' : 'text-gray-300'}`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-700">
            <p className="text-xs text-gray-400">{admin?.name}</p>
            <p className="text-xs text-gray-500">{admin?.email}</p>
            <button
              onClick={handleLogout}
              className="mt-2 w-full text-xs bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Topbar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Roots Abacus — Admin Panel</h1>
          <span className="text-sm text-gray-500">Welcome, {admin?.name}</span>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout