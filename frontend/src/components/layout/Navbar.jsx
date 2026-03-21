import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSiteSettings } from '../../context/SiteSettingsContext'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState(null)
  const { settings } = useSiteSettings()

  const toggleSubmenu = (name) =>
    setOpenSubmenu(openSubmenu === name ? null : name)

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
          <ul className="hidden lg:flex items-center space-x-6 text-gray-800 text-sm font-medium">
            <li><Link to="/" className="hover:text-orange-500">Home</Link></li>

            {/* Courses dropdown */}
            <li className="relative group">
              <div className="flex items-center gap-1 hover:text-orange-500 cursor-pointer">
                <span>Courses</span>
                <svg className="w-4 h-4 transition group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <ul className="absolute left-0 top-full w-56 bg-white shadow-lg rounded py-2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <li><Link to="/courses/abacus-kids" className="block px-4 py-2 hover:text-orange-500 hover:bg-orange-50">Abacus (Age 5-12)</Link></li>
                <li><Link to="/courses/vedic-maths" className="block px-4 py-2 hover:text-orange-500 hover:bg-orange-50">Vedic Maths (Age 12+)</Link></li>
              </ul>
            </li>

            {/* Teacher Training dropdown */}
            <li className="relative group">
              <div className="flex items-center gap-1 hover:text-orange-500 cursor-pointer">
                <span>Teacher Training</span>
                <svg className="w-4 h-4 transition group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <ul className="absolute left-0 top-full w-56 bg-white shadow-lg rounded py-2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <li><Link to="/teacher-training/abacus" className="block px-4 py-2 hover:text-orange-500 hover:bg-orange-50">Abacus Training</Link></li>
                <li><Link to="/teacher-training/vedic-maths" className="block px-4 py-2 hover:text-orange-500 hover:bg-orange-50">Vedic Training</Link></li>
              </ul>
            </li>

            <li><Link to="/franchise" className="hover:text-orange-500">Franchise</Link></li>

            {/* Resources dropdown */}
            <li className="relative group">
              <div className="flex items-center gap-1 hover:text-orange-500 cursor-pointer">
                <span>Resources</span>
                <svg className="w-4 h-4 transition group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <ul className="absolute left-0 top-full w-56 bg-white shadow-lg rounded py-2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <li><Link to="/resources/virtual-abacus" className="block px-4 py-2 hover:text-orange-500 hover:bg-orange-50">Virtual Abacus</Link></li>
                <li><Link to="/resources/times-tables" className="block px-4 py-2 hover:text-orange-500 hover:bg-orange-50">Times Tables</Link></li>
                <li><Link to="/resources/squares-cubes" className="block px-4 py-2 hover:text-orange-500 hover:bg-orange-50">Squares & Cubes</Link></li>
                <li><Link to="/resources/square-roots" className="block px-4 py-2 hover:text-orange-500 hover:bg-orange-50">Square Roots & Cube Roots</Link></li>
              </ul>
            </li>

            <li><Link to="/reviews" className="hover:text-orange-500">Reviews</Link></li>
            <li><Link to="/jobs" className="hover:text-orange-500">Jobs</Link></li>
            <li><Link to="/about" className="hover:text-orange-500">About</Link></li>
            <li><Link to="/contact" className="hover:text-orange-500">Contact</Link></li>
            <li><Link to="/login" className="border border-gray-400 rounded px-3 py-1 hover:text-orange-500 hover:border-orange-500">Login</Link></li>
            <li><Link to="/signup" className="bg-[#E87722] text-white px-3 py-1 rounded hover:bg-orange-600">Sign Up</Link></li>
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
            <ul className="space-y-3 text-gray-800 text-sm font-medium pt-3">
              <li><Link to="/" onClick={() => setMobileOpen(false)} className="block py-2">Home</Link></li>

              <li>
                <button onClick={() => toggleSubmenu('courses')} className="flex justify-between w-full py-2">
                  Courses
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
                {openSubmenu === 'courses' && (
                  <ul className="bg-orange-50 p-2 space-y-2 rounded">
                    <li><Link to="/courses/abacus-kids" onClick={() => setMobileOpen(false)} className="block px-2 py-1">Abacus (Age 5-12)</Link></li>
                    <li><Link to="/courses/vedic-maths" onClick={() => setMobileOpen(false)} className="block px-2 py-1">Vedic Maths (Age 12+)</Link></li>
                  </ul>
                )}
              </li>

              <li>
                <button onClick={() => toggleSubmenu('training')} className="flex justify-between w-full py-2">
                  Teacher Training
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
                {openSubmenu === 'training' && (
                  <ul className="bg-orange-50 p-2 space-y-2 rounded">
                    <li><Link to="/teacher-training/abacus" onClick={() => setMobileOpen(false)} className="block px-2 py-1">Abacus Training</Link></li>
                    <li><Link to="/teacher-training/vedic-maths" onClick={() => setMobileOpen(false)} className="block px-2 py-1">Vedic Training</Link></li>
                  </ul>
                )}
              </li>

              <li><Link to="/franchise" onClick={() => setMobileOpen(false)} className="block py-2">Franchise</Link></li>

              <li>
                <button onClick={() => toggleSubmenu('resources')} className="flex justify-between w-full py-2">
                  Resources
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
                {openSubmenu === 'resources' && (
                  <ul className="bg-orange-50 p-2 space-y-2 rounded">
                    <li><Link to="/resources/virtual-abacus" onClick={() => setMobileOpen(false)} className="block px-2 py-1">Virtual Abacus</Link></li>
                    <li><Link to="/resources/times-tables" onClick={() => setMobileOpen(false)} className="block px-2 py-1">Times Tables</Link></li>
                    <li><Link to="/resources/squares-cubes" onClick={() => setMobileOpen(false)} className="block px-2 py-1">Squares & Cubes</Link></li>
                    <li><Link to="/resources/square-roots" onClick={() => setMobileOpen(false)} className="block px-2 py-1">Square Roots & Cube Roots</Link></li>
                  </ul>
                )}
              </li>

              <li><Link to="/reviews" onClick={() => setMobileOpen(false)} className="block py-2">Reviews</Link></li>
              <li><Link to="/jobs" onClick={() => setMobileOpen(false)} className="block py-2">Jobs</Link></li>
              <li><Link to="/about" onClick={() => setMobileOpen(false)} className="block py-2">About</Link></li>
              <li><Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-2">Contact</Link></li>
              <li><Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center border rounded py-2">Login</Link></li>
              <li><Link to="/signup" onClick={() => setMobileOpen(false)} className="block text-center bg-[#E87722] text-white py-2 rounded">Sign Up</Link></li>
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar