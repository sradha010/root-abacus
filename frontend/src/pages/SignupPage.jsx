import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MessageButton from '../components/ui/MessageButton'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const countries = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'UAE', 'Saudi Arabia', 'Singapore', 'Malaysia', 'South Africa',
  'New Zealand', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka',
  'Kenya', 'Nigeria', 'Ghana', 'Philippines', 'Other'
]

const SignupPage = () => {
  const navigate = useNavigate()

  const [step, setStep]       = useState(1)
  const [course, setCourse]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    country: '', whatsapp: '', password: '', confirmPassword: '',
  })

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleCourseSelect = (e) => {
    e.preventDefault()
    if (!course) return setError('Please select a course')
    setError('')
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword)
      return setError('Passwords do not match')

    if (form.password.length < 6)
      return setError('Password must be at least 6 characters')

    setLoading(true)
    try {
      const res  = await fetch(`${API_BASE}/trainers/register`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:  form.firstName,
          lastName:   form.lastName,
          email:      form.email,
          country:    form.country,
          whatsapp:   form.whatsapp,
          courseType: course,
          password:   form.password,
        }),
      })
      const data = await res.json()

      if (data.success) {
        setSuccess('Registration successful! Redirecting to login...')
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Could not connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const courseLabel = course === 'Abacus_Trainer'
    ? 'Abacus Trainer'
    : course === 'Vedic_Maths_Trainer'
    ? 'Vedic Maths Trainer'
    : ''

  return (
    <>
      <div className="bg-gray-50 flex items-start justify-center pt-10 pb-10 px-4 sm:px-6">
        <div className="w-full max-w-md">

          {/* ── STEP 1 — Select Course ── */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-xl border-t-4 border-[#E87722] p-8">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-[#E87722]">Registration</h1>
                <p className="text-sm text-gray-500 mt-1">Choose a course to get started</p>
              </div>

              <form onSubmit={handleCourseSelect} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select the Course
                  </label>
                  <select
                    value={course}
                    onChange={e => { setCourse(e.target.value); setError('') }}
                    required
                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none py-2.5 px-3 text-gray-800"
                  >
                    <option value="" disabled>Select Course</option>
                    <option value="Abacus_Trainer">Abacus Teacher Training</option>
                    <option value="Vedic_Maths_Trainer">Vedic Maths Teacher Training</option>
                  </select>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-[#E87722] hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg shadow transition"
                >
                  Continue
                </button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#E87722] font-medium hover:underline">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          )}

          {/* ── STEP 2 — Registration Form ── */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-xl border-t-4 border-[#E87722] p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-[#E87722]">
                  {courseLabel} Registration
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Become a certified {courseLabel} — Fill in your details
                </p>
              </div>

              {success && (
                <div className="mb-4 bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm text-center">
                  {success}
                </div>
              )}

              {error && (
                <div className="mb-4 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                  <input
                    name="firstName" value={form.firstName} onChange={handleChange}
                    required maxLength={20} placeholder="Enter your first name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                  <input
                    name="lastName" value={form.lastName} onChange={handleChange}
                    required maxLength={20} placeholder="Enter your last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address{' '}
                    <small className="text-gray-500 italic font-normal">(used to login)</small>
                  </label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    required placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                  <select
                    name="country" value={form.country} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                  >
                    <option value="" disabled>Select Country</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    WhatsApp Number{' '}
                    <span className="text-red-500 text-xs font-normal">(Do not prefix '+' or '0' or country code)</span>
                  </label>
                  <input
                    name="whatsapp" type="number" value={form.whatsapp} onChange={handleChange}
                    required placeholder="9876543210"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                  <input
                    name="password" type="password" value={form.password} onChange={handleChange}
                    required minLength={6} placeholder="Min. 6 characters"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                  <input
                    name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange}
                    required placeholder="Re-enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                  />
                </div>

                {/* Terms */}
                <p className="text-sm text-gray-600">
                  By registering here, I agree to the{' '}
                  <Link to="/privacy-policy" className="text-[#E87722] hover:underline font-semibold">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link to="/terms" className="text-[#E87722] hover:underline font-semibold">
                    Terms &amp; Conditions
                  </Link>{' '}
                  of Roots Abacus Learning School.
                </p>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setStep(1); setError('') }}
                    className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition text-sm"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-2/3 bg-[#E87722] hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                    {loading ? 'Registering...' : 'Get Registered'}
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#E87722] font-medium hover:underline">Login</Link>
                </p>
              </form>
            </div>
          )}

        </div>
      </div>
      <MessageButton />
    </>
  )
}

export default SignupPage