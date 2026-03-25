import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Catch 401s globally so you know when auth fails
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized — token may be expired')
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)

export default API