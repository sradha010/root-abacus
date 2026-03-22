import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MessageButton from '../components/ui/MessageButton'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const identities = [
  { value: 'Abacus_Trainer',      label: 'Abacus Trainer'      },
  { value: 'Vedic_Maths_Trainer', label: 'Vedic Math Trainer'  },
  { value: 'Abacus_Student',      label: 'Abacus Student'      },
  { value: 'Abacus_Parents',      label: 'Abacus Parents'      },
  { value: 'Vedic_Maths_Student', label: 'Vedic Math Student'  },
]

// Only trainers can login currently (others coming soon)
const trainerRoles = ['Abacus_Trainer', 'Vedic_Maths_Trainer']

const LoginPage = () => {
  const navigate = useNavigate()

  const [step, setStep]       = useState(1)
  const [identity, setIdentity] = useState('')
  const [form, setForm]       = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleIdentitySubmit = (e) => {
    e.preventDefault()
    if (!identity) return setError('Please select your identity')
    setError('')
    setStep(2)
  }

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

  const selectedLabel = identities.find(i => i.value === identity)?.label || ''
  const isTrainer     = trainerRoles.includes(identity)

  return (
    <>
      <div className="bg-gray-50 flex items-start justify-center pt-10 pb-10 px-4 sm:px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border-t-4 p-8"
          style={{ borderColor: '#E87722' }}>

          {/* ── STEP 1 — Select Identity ── */}
          {step === 1 && (
            <>
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold" style={{ color: '#E87722' }}>Login</h1>
                <p className="text-sm text-gray-500 mt-1">Choose your role to proceed</p>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleIdentitySubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Identity
                  </label>
                  <select
                    value={identity}
                    onChange={e => { setIdentity(e.target.value); setError('') }}
                    required
                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none py-2.5 px-3 text-gray-800 text-sm"
                  >
                    <option value="" disabled>Select Identity</option>
                    {identities.map(i => (
                      <option key={i.value} value={i.value}>{i.label}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full text-white font-semibold py-3 rounded-lg shadow transition"
                  style={{ backgroundColor: '#E87722' }}
                >
                  Continue
                </button>

                <p className="text-center text-sm text-gray-500">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-medium hover:underline" style={{ color: '#E87722' }}>
                    Register here
                  </Link>
                </p>
              </form>
            </>
          )}

          {/* ── STEP 2 — Login Form ── */}
          {step === 2 && (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold" style={{ color: '#E87722' }}>
                  {selectedLabel} Login
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Welcome back! Enter your credentials
                </p>
              </div>

              {/* Coming soon for non-trainer roles */}
              {!isTrainer ? (
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">🚧</div>
                  <h3 className="font-semibold text-gray-700 mb-2">Coming Soon</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Login for <strong>{selectedLabel}</strong> is currently under development.
                    Please check back soon!
                  </p>
                  <button
                    onClick={() => { setStep(1); setError('') }}
                    className="text-sm font-medium hover:underline"
                    style={{ color: '#E87722' }}
                  >
                    ← Choose a different role
                  </button>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-4 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        name="email" type="email" value={form.email}
                        onChange={handleChange} required placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        name="password" type="password" value={form.password}
                        onChange={handleChange} required placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => { setStep(1); setError(''); setForm({ email: '', password: '' }) }}
                        className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition text-sm"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit" disabled={loading}
                        className="w-2/3 text-white font-semibold py-3 rounded-lg shadow transition disabled:opacity-50 flex items-center justify-center gap-2"
                        style={{ backgroundColor: '#E87722' }}
                      >
                        {loading && (
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        )}
                        {loading ? 'Logging in...' : 'Login'}
                      </button>
                    </div>

                    <p className="text-center text-sm text-gray-500">
                      Don't have an account?{' '}
                      <Link to="/signup" className="font-medium hover:underline" style={{ color: '#E87722' }}>
                        Register here
                      </Link>
                    </p>
                  </form>
                </>
              )}
            </>
          )}

        </div>
      </div>
      <MessageButton />
    </>
  )
}

export default LoginPage