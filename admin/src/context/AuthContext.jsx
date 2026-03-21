import { createContext, useContext, useState, useEffect } from 'react'
import API from '../api/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const savedAdmin = localStorage.getItem('adminData')
    if (token && savedAdmin) {
      setAdmin(JSON.parse(savedAdmin))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password })
    localStorage.setItem('adminToken', data.token)
    localStorage.setItem('adminData', JSON.stringify(data.admin))
    setAdmin(data.admin)
    return data
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)