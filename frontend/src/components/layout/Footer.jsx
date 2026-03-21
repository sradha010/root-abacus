import { Link } from 'react-router-dom'
import { useSiteSettings } from '../../context/SiteSettingsContext'

const Footer = () => {
  const { settings } = useSiteSettings()

  return (
    <footer className="relative bg-white text-gray-800 overflow-hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      {/* Decorative blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-96 h-96 bg-orange-100 rounded-full absolute -top-20 -left-20 opacity-30 blur-2xl"></div>
        <div className="w-80 h-80 bg-orange-100 rounded-full absolute bottom-0 right-0 opacity-20 blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo + Contact */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            {settings.logoUrl && (
              <img src={settings.logoUrl} alt="Roots16" className="h-10 w-auto" />
            )}
            <span className="text-lg font-bold text-[#E87722]">Roots16 Edutech Pvt. Ltd.</span>
          </div>
          {settings.phone && (
            <p className="text-sm text-gray-600 mt-2">📞 {settings.phone}</p>
          )}
          {settings.email && (
            <p className="text-sm text-gray-600 mt-1">✉️ {settings.email}</p>
          )}
        </div>

        {/* Quick Links — dynamic if available, fallback to hardcoded */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-gray-900">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {settings.footerLinks && settings.footerLinks.length > 0 ? (
              settings.footerLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="hover:text-orange-600 transition">
                    {link.label}
                  </a>
                </li>
              ))
            ) : (
              <>
                <li><Link to="/franchise" className="hover:text-orange-600 transition">Franchise</Link></li>
                <li><Link to="/jobs" className="hover:text-orange-600 transition">Jobs</Link></li>
                <li><Link to="/reviews" className="hover:text-orange-600 transition">Reviews</Link></li>
                <li><Link to="/about" className="hover:text-orange-600 transition">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-orange-600 transition">Contact</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Courses — hardcoded (these don't change) */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-gray-900">Courses</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses/abacus-kids" className="hover:text-orange-600 transition">Abacus (Age 5-12)</Link></li>
            <li><Link to="/courses/vedic-maths" className="hover:text-orange-600 transition">Vedic Math (Age 12+)</Link></li>
            <li><Link to="/teacher-training/abacus" className="hover:text-orange-600 transition">Abacus Teacher Training</Link></li>
            <li><Link to="/teacher-training/vedic-maths" className="hover:text-orange-600 transition">Vedic Math Teacher Training</Link></li>
          </ul>
        </div>

        {/* Resources — hardcoded */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-gray-900">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/resources/virtual-abacus" className="hover:text-orange-600 transition">Virtual Abacus</Link></li>
            <li><Link to="/resources/times-tables" className="hover:text-orange-600 transition">Times Tables</Link></li>
            <li><Link to="/resources/squares-cubes" className="hover:text-orange-600 transition">Squares & Cubes</Link></li>
            <li><Link to="/resources/square-roots" className="hover:text-orange-600 transition">Square Roots & Cube Roots</Link></li>
          </ul>
        </div>

        {/* Legal & Policies */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-gray-900">Legal & Policies</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-orange-600 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-orange-600 transition">Terms & Conditions</Link></li>
            <li><Link to="/refund-policy" className="hover:text-orange-600 transition">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-gray-900">Connect</h3>
          <div className="flex gap-4 mb-4">
            {settings.socialLinks?.facebook && (
              <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-[#E87722] hover:bg-orange-200 transition font-bold text-sm">
                f
              </a>
            )}
            {settings.socialLinks?.instagram && (
              <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-[#E87722] hover:bg-orange-200 transition font-bold text-sm">
                in
              </a>
            )}
            {settings.socialLinks?.youtube && (
              <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-[#E87722] hover:bg-orange-200 transition font-bold text-sm">
                yt
              </a>
            )}
            {settings.socialLinks?.whatsapp && (
              <a href={settings.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-[#E87722] hover:bg-orange-200 transition font-bold text-sm">
                wa
              </a>
            )}
          </div>
          {settings.email && (
            <p className="text-sm text-gray-600">
              Email:{' '}
              <a href={`mailto:${settings.email}`} className="text-orange-600 hover:underline">
                {settings.email}
              </a>
            </p>
          )}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="bg-gray-100 text-sm text-center text-gray-500 py-4 px-4">
        {settings.footerText || '© 2026 Roots16 Edutech Pvt. Ltd. All rights reserved.'}
      </div>
    </footer>
  )
}

export default Footer