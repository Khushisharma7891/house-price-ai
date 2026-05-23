import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '', email: '', password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/signup',
        formData
      )
      if (response.data.success) {
        navigate('/login')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-amber-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="relative w-full max-w-md animate-fadeIn">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
                  fill="white"/>
              </svg>
            </div>
            <span className="font-black text-slate-900 text-xl">
              HousePrice<span className="text-amber-500">AI</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mb-2"
            style={{ letterSpacing: '-0.02em' }}>
            Create your account
          </h1>
          <p className="text-slate-500">
            Save and track your house price predictions
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="input-field"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full btn-amber py-3.5 rounded-xl text-sm disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create Free Account'}
            </button>

            <p className="text-xs text-slate-400 text-center">
              By creating an account you agree to our terms of service.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="text-slate-300 text-xs">or</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-slate-500 text-sm">
            Already have an account?{' '}
            <Link to="/login"
              className="text-amber-600 font-semibold hover:text-amber-700 transition">
              Sign in
            </Link>
          </p>

        </div>

        {/* Back link */}
        <p className="text-center mt-6">
          <Link to="/"
            className="text-slate-400 text-sm hover:text-slate-600 transition flex items-center justify-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to Home
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Signup