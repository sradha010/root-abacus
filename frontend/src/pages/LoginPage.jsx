import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MessageButton from '../components/ui/MessageButton'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const LoginPage = () => {
  const navigate = useNavigate()

  const [form, setForm]       = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')

    try {
      const res  = await fetch(`${API_BASE}/trainers/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (data.success) {
        localStorage.setItem('trainerToken', data.token)
        localStorage.setItem('trainer', JSON.stringify(data.trainer))
        navigate('/')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Could not connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border-t-4 border-[#E87722] p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#E87722]">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">Login to your trainer account</p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                required placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                name="password" type="password" value={form.password} onChange={handleChange}
                required placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E87722] hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#E87722] font-medium hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
      <MessageButton />
    </>
  )
}

export default LoginPage