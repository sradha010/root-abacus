import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard, BookOpen, GraduationCap, MessageSquare,
  Star, Briefcase, Phone, Settings, ChevronLeft, ChevronRight,
  LogOut, ClipboardList, ChevronDown, ChevronUp
} from 'lucide-react'

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { admin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const isTrainingActive = location.pathname.startsWith('/teacher-training')
  const [trainingOpen, setTrainingOpen] = useState(isTrainingActive)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/',             label: 'Dashboard',    icon: LayoutDashboard },
    { path: '/courses',      label: 'Courses',      icon: BookOpen        },
    { path: '/testimonials', label: 'Testimonials', icon: MessageSquare   },
    { path: '/reviews',      label: 'Reviews',      icon: Star            },
    { path: '/jobs',         label: 'Jobs',         icon: Briefcase       },
    { path: '/enquiries',    label: 'Enquiries',    icon: ClipboardList   },
    { path: '/contact',      label: 'Contact',      icon: Phone           },
    { path: '/settings',     label: 'Settings',     icon: Settings        },
  ]

  const trainingItems = [
    { path: '/teacher-training/abacus', label: 'Abacus Training' },
    { path: '/teacher-training/vedic',  label: 'Vedic Training'  },
  ]

  const NavLink = ({ path, label, icon: Icon }) => {
    const isActive = location.pathname === path
    return (
      <Link
        to={path}
        className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors
          ${isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
        style={isActive ? { backgroundColor: '#E87722' } : {}}
      >
        <Icon size={18} strokeWidth={1.5} className="flex-shrink-0" />
        {sidebarOpen && <span>{label}</span>}
      </Link>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white transition-all duration-300 flex flex-col flex-shrink-0`}>

        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          {sidebarOpen && (
            <span className="font-bold text-sm" style={{ color: '#E87722' }}>Roots Admin</span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white p-1 rounded transition">
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">

          {/* Dashboard & Courses */}
          <NavLink path="/"        label="Dashboard" icon={LayoutDashboard} />
          <NavLink path="/courses" label="Courses"   icon={BookOpen}        />

          {/* ── Teacher Training Dropdown ── */}
          <div>
            <button
              onClick={() => sidebarOpen && setTrainingOpen(o => !o)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors
                ${isTrainingActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
              style={isTrainingActive && !trainingOpen ? { backgroundColor: '#E87722' } : {}}
            >
              <GraduationCap size={18} strokeWidth={1.5} className="flex-shrink-0" />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left">Teacher Training</span>
                  {trainingOpen
                    ? <ChevronUp size={14} className="flex-shrink-0" />
                    : <ChevronDown size={14} className="flex-shrink-0" />
                  }
                </>
              )}
            </button>

            {/* Expanded dropdown */}
            {sidebarOpen && trainingOpen && (
              <div className="bg-gray-800">
                {trainingItems.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 pl-10 pr-4 py-2.5 text-sm transition-colors
                        ${isActive ? 'text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                      style={isActive ? { backgroundColor: '#c4621a' } : {}}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Collapsed — show dot indicators with tooltips */}
            {!sidebarOpen && trainingItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={item.label}
                  className={`flex items-center justify-center px-4 py-2 transition-colors
                    ${isActive ? 'text-white' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                </Link>
              )
            })}
          </div>

          {/* Rest of nav */}
          <NavLink path="/testimonials" label="Testimonials" icon={MessageSquare} />
          <NavLink path="/reviews"      label="Reviews"      icon={Star}          />
          <NavLink path="/jobs"         label="Jobs"         icon={Briefcase}     />
          <NavLink path="/enquiries"    label="Enquiries"    icon={ClipboardList} />
          <NavLink path="/contact"      label="Contact"      icon={Phone}         />
          <NavLink path="/settings"     label="Settings"     icon={Settings}      />

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
            <button onClick={handleLogout} className="w-full flex items-center justify-center text-gray-400 hover:text-red-400 transition" title="Logout">
              <LogOut size={18} />
            </button>
          )}
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto flex flex-col">
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