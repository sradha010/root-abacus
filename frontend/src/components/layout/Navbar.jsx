import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSiteSettings } from '../../context/SiteSettingsContext'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState(null)
  const { settings } = useSiteSettings()

  const toggleSubmenu = (name) =>
    setOpenSubmenu(openSubmenu === name ? null : name)

  // Active style helper for desktop nav links
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-[#E87722] font-semibold'
      : 'text-gray-800 hover:text-[#E87722]'

  // Active style helper for mobile nav links
  const mobileNavLinkClass = ({ isActive }) =>
    isActive
      ? 'block py-2 text-[#E87722] font-semibold'
      : 'block py-2 text-gray-800'

  // Active style for dropdown items
  const dropdownLinkClass = ({ isActive }) =>
    isActive
      ? 'block px-4 py-2 text-[#E87722] bg-orange-50 font-semibold'
      : 'block px-4 py-2 text-gray-800 hover:text-[#E87722] hover:bg-orange-50'

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="Roots Abacus" className="h-11 w-auto mr-2" />
            ) : (
              <span className="text-xl font-bold text-[#E87722]">Roots Abacus</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <li>
              <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            </li>

            {/* Courses dropdown */}
            <li className="relative group">
              <div className="flex items-center gap-1 text-gray-800 hover:text-[#E87722] cursor-pointer">
                <span>Courses</span>
                <svg className="w-4 h-4 transition group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <ul className="absolute left-0 top-full w-56 bg-white shadow-lg rounded py-2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <li><NavLink to="/courses/abacus-kids" className={dropdownLinkClass}>Abacus (Age 5-12)</NavLink></li>
                <li><NavLink to="/courses/vedic-maths" className={dropdownLinkClass}>Vedic Maths (Age 12+)</NavLink></li>
              </ul>
            </li>

            {/* Teacher Training dropdown */}
            <li className="relative group">
              <div className="flex items-center gap-1 text-gray-800 hover:text-[#E87722] cursor-pointer">
                <span>Teacher Training</span>
                <svg className="w-4 h-4 transition group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <ul className="absolute left-0 top-full w-56 bg-white shadow-lg rounded py-2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <li><NavLink to="/teacher-training/abacus" className={dropdownLinkClass}>Abacus Training</NavLink></li>
                <li><NavLink to="/teacher-training/vedic-maths" className={dropdownLinkClass}>Vedic Training</NavLink></li>
              </ul>
            </li>

            <li>
              <NavLink to="/franchise" className={navLinkClass}>Franchise</NavLink>
            </li>

            {/* Resources dropdown */}
            <li className="relative group">
              <div className="flex items-center gap-1 text-gray-800 hover:text-[#E87722] cursor-pointer">
                <span>Resources</span>
                <svg className="w-4 h-4 transition group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <ul className="absolute left-0 top-full w-56 bg-white shadow-lg rounded py-2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <li><NavLink to="/resources/virtual-abacus" className={dropdownLinkClass}>Virtual Abacus</NavLink></li>
                <li><NavLink to="/resources/times-tables" className={dropdownLinkClass}>Times Tables</NavLink></li>
                <li><NavLink to="/resources/squares-cubes" className={dropdownLinkClass}>Squares & Cubes</NavLink></li>
                <li><NavLink to="/resources/square-roots" className={dropdownLinkClass}>Square Roots & Cube Roots</NavLink></li>
              </ul>
            </li>

            <li><NavLink to="/reviews" className={navLinkClass}>Reviews</NavLink></li>
            <li><NavLink to="/jobs" className={navLinkClass}>Jobs</NavLink></li>
            <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
            <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>

            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'border border-[#E87722] rounded px-3 py-1 text-[#E87722] font-semibold'
                    : 'border border-gray-400 rounded px-3 py-1 text-gray-800 hover:text-[#E87722] hover:border-[#E87722]'
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-orange-600 text-white px-3 py-1 rounded font-semibold'
                    : 'bg-[#E87722] text-white px-3 py-1 rounded hover:bg-orange-600'
                }
              >
                Sign Up
              </NavLink>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button className="lg:hidden text-gray-800" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4">
            <ul className="space-y-3 text-sm font-medium pt-3">
              <li>
                <NavLink to="/" end className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
                  Home
                </NavLink>
              </li>

              <li>
                <button onClick={() => toggleSubmenu('courses')} className="flex justify-between w-full py-2 text-gray-800">
                  Courses
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                {openSubmenu === 'courses' && (
                  <ul className="bg-orange-50 p-2 space-y-2 rounded">
                    <li><NavLink to="/courses/abacus-kids" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>Abacus (Age 5-12)</NavLink></li>
                    <li><NavLink to="/courses/vedic-maths" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>Vedic Maths (Age 12+)</NavLink></li>
                  </ul>
                )}
              </li>

              <li>
                <button onClick={() => toggleSubmenu('training')} className="flex justify-between w-full py-2 text-gray-800">
                  Teacher Training
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                {openSubmenu === 'training' && (
                  <ul className="bg-orange-50 p-2 space-y-2 rounded">
                    <li><NavLink to="/teacher-training/abacus" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>Abacus Training</NavLink></li>
                    <li><NavLink to="/teacher-training/vedic-maths" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>Vedic Training</NavLink></li>
                  </ul>
                )}
              </li>

              <li>
                <NavLink to="/franchise" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
                  Franchise
                </NavLink>
              </li>

              <li>
                <button onClick={() => toggleSubmenu('resources')} className="flex justify-between w-full py-2 text-gray-800">
                  Resources
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                {openSubmenu === 'resources' && (
                  <ul className="bg-orange-50 p-2 space-y-2 rounded">
                    <li><NavLink to="/resources/virtual-abacus" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>Virtual Abacus</NavLink></li>
                    <li><NavLink to="/resources/times-tables" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>Times Tables</NavLink></li>
                    <li><NavLink to="/resources/squares-cubes" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>Squares & Cubes</NavLink></li>
                    <li><NavLink to="/resources/square-roots" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>Square Roots & Cube Roots</NavLink></li>
                  </ul>
                )}
              </li>

              <li><NavLink to="/reviews" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>Reviews</NavLink></li>
              <li><NavLink to="/jobs" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>Jobs</NavLink></li>
              <li><NavLink to="/about" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>About</NavLink></li>
              <li><NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>Contact</NavLink></li>
              <li>
                <NavLink to="/login" onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? 'block text-center border border-[#E87722] rounded py-2 text-[#E87722] font-semibold'
                      : 'block text-center border rounded py-2 text-gray-800'
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? 'block text-center bg-orange-600 text-white py-2 rounded font-semibold'
                      : 'block text-center bg-[#E87722] text-white py-2 rounded'
                  }
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar