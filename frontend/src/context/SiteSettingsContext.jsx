import { createContext, useContext, useEffect, useState } from 'react'
import { getSettings } from '../services/settingsService'

const SiteSettingsContext = createContext()

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    logoUrl: '',
    footerText: '© 2026 Roots Abacus Learning School. All rights reserved.',
    phone: '',
    email: '',
    socialLinks: {},
    footerLinks: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSettings()
      .then(({ data }) => setSettings(data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export const useSiteSettings = () => useContext(SiteSettingsContext)