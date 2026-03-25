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
  const [error, setError] = useState(null)

  const fetchSettings = () => {
    setLoading(true)
    setError(null)
    getSettings()
      .then(({ data }) => setSettings(data.data))
      .catch((err) => {
        console.error('Failed to load site settings:', err.message)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, error, refetch: fetchSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export const useSiteSettings = () => useContext(SiteSettingsContext)