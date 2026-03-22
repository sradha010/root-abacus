import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard, BookOpen, GraduationCap, MessageSquare,
  Star, Briefcase, Phone, Settings, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react'

const navItems = [
  { path: '/',                 label: 'Dashboard',        icon: LayoutDashboard },
  { path: '/courses',          label: 'Courses',          icon: BookOpen        },
  { path: '/teacher-training', label: 'Teacher Training', icon: GraduationCap   },
  { path: '/testimonials',     label: 'Testimonials',     icon: MessageSquare   },
  { path: '/reviews',          label: 'Reviews',          icon: Star            },
  { path: '/jobs',             label: 'Jobs',             icon: Briefcase       },
  { path: '/contact',          label: 'Contact',          icon: Phone           },
  { path: '/settings',         label: 'Settings',         icon: Settings        },
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
      {/* ── Sidebar ── */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white transition-all duration-300 flex flex-col flex-shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          {sidebarOpen && (
            <span className="font-bold text-sm" style={{ color: '#E87722' }}>
              Roots Admin
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white p-1 rounded transition"
          >
            {sidebarOpen
              ? <ChevronLeft size={18} />
              : <ChevronRight size={18} />
            }
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 space-y-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors rounded-none
                  ${isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                style={isActive ? { backgroundColor: '#E87722' } : {}}
              >
                <item.icon size={18} strokeWidth={1.5} className="flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Info + Logout */}
        <div className="border-t border-gray-700 p-4">
          {sidebarOpen ? (
            <>
              <p className="text-xs font-medium text-gray-300 truncate">{admin?.name}</p>
              <p className="text-xs text-gray-500 truncate mt-0.5">{admin?.email}</p>
              <button
                onClick={handleLogout}
                className="mt-3 w-full flex items-center justify-center gap-2 text-xs bg-red-600 hover:bg-red-700 text-white py-1.5 px-2 rounded transition"
              >
                <LogOut size={13} />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center text-gray-400 hover:text-red-400 transition"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="text-lg font-semibold text-gray-800">Roots Abacus — Admin Panel</h1>
          <span className="text-sm text-gray-500">Welcome, {admin?.name}</span>
        </header>
        <div className="p-6 flex-1">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout