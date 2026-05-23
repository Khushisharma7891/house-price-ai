import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Predict() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    longitude: '',
    latitude: '',
    housing_median_age: '',
    total_rooms: '',
    total_bedrooms: '',
    population: '',
    households: '',
    median_income: '',
    ocean_proximity: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const payload = {
        ...formData,
        user_id: user ? user.user_id : 'guest'
      }
      const response = await axios.post(
        'http://127.0.0.1:5000/api/predict',
        payload
      )
      if (response.data.success) {
        setResult(response.data)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Prediction failed. Please check your inputs.')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    {
      name: 'longitude',
      label: 'Longitude',
      hint: 'East-west coordinate of the block. California ranges from -124.4 to -114.1',
      placeholder: 'e.g. -122.23',
      step: '0.01'
    },
    {
      name: 'latitude',
      label: 'Latitude',
      hint: 'North-south coordinate of the block. California ranges from 32.5 to 42.0',
      placeholder: 'e.g. 37.88',
      step: '0.01'
    },
    {
      name: 'housing_median_age',
      label: 'Housing Median Age',
      hint: 'Median age of houses in the block group. Capped at 52 years in this dataset.',
      placeholder: 'e.g. 41'
    },
    {
      name: 'total_rooms',
      label: 'Total Rooms',
      hint: 'Total number of rooms across all households in the block group.',
      placeholder: 'e.g. 880'
    },
    {
      name: 'total_bedrooms',
      label: 'Total Bedrooms',
      hint: 'Total number of bedrooms across all households in the block group.',
      placeholder: 'e.g. 129'
    },
    {
      name: 'population',
      label: 'Population',
      hint: 'Total number of people residing in the block group.',
      placeholder: 'e.g. 322'
    },
    {
      name: 'households',
      label: 'Households',
      hint: 'Total number of households — a group of people residing in a home unit.',
      placeholder: 'e.g. 126'
    },
    {
      name: 'median_income',
      label: 'Median Income',
      hint: 'Median income of households in the block group — measured in tens of thousands of USD.',
      placeholder: 'e.g. 8.33',
      step: '0.01'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10 animate-fadeIn">
          <Link to="/"
            className="inline-flex items-center gap-1 text-slate-400 text-sm hover:text-slate-600 transition mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to Home
          </Link>
          <div className="section-label mb-3">California Housing Dataset</div>
          <h1 className="text-4xl font-black text-slate-900 mb-3"
            style={{ letterSpacing: '-0.02em' }}>
            House Price Prediction
          </h1>
          <p className="text-slate-500">
            Enter block group details from the California housing market.
            Values should match the scale of the 1990 US Census dataset.
          </p>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-slate-900 rounded-2xl p-8 mb-8 animate-scaleIn">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">
                  Predicted Median House Value
                </p>
                <div className="text-5xl font-black text-white"
                  style={{ letterSpacing: '-0.02em' }}>
                  {result.formatted_price}
                </div>
              </div>
              <div className="bg-amber-500 bg-opacity-20 rounded-xl px-4 py-2 text-right">
                <p className="text-amber-400 text-2xl font-black">
                  {result.confidence}%
                </p>
                <p className="text-amber-500 text-xs font-medium">
                  Confidence
                </p>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-5">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">
                Model Explanation
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                {result.explanation}
              </p>
            </div>

            {user ? (
              <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Prediction saved to your dashboard
              </div>
            ) : (
              <div className="mt-4 border-t border-slate-700 pt-4">
                <p className="text-slate-400 text-sm">
                  <Link to="/signup" className="text-amber-400 font-semibold hover:text-amber-300">
                    Create a free account
                  </Link>
                  {' '}to save this prediction and track your history.
                </p>
              </div>
            )}
          </div>
        )}

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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-fadeIn delay-100">
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Block Group Details
              </h2>
              <p className="text-slate-400 text-sm mt-0.5">
                All values based on 1990 California Census scale
              </p>
            </div>
            <div className="section-label">
              Required
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  {field.label}
                </label>
                <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                  {field.hint}
                </p>
                <input
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  step={field.step || '1'}
                  className="input-field"
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Ocean Proximity
              </label>
              <p className="text-xs text-slate-400 mb-2">
                Proximity of the block group to the ocean or bay
              </p>
              <select
                name="ocean_proximity"
                value={formData.ocean_proximity}
                onChange={handleChange}
                className="input-field">
                <option value="">Select ocean proximity</option>
                <option value="<1H OCEAN">Less than 1 hour from ocean</option>
                <option value="INLAND">Inland — far from coast</option>
                <option value="NEAR BAY">Near Bay Area</option>
                <option value="NEAR OCEAN">Near Ocean</option>
                <option value="ISLAND">Island</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-8 btn-amber py-4 rounded-xl font-semibold text-base disabled:opacity-50">
            {loading ? 'Running prediction...' : 'Predict House Price'}
          </button>

        </div>

        {/* Sample Values */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mt-4 animate-fadeIn delay-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm">
              Sample Values
            </h3>
            <span className="text-slate-400 text-xs">
              From California Housing Dataset
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Longitude', value: '-122.23' },
              { label: 'Latitude', value: '37.88' },
              { label: 'House Age', value: '41' },
              { label: 'Total Rooms', value: '880' },
              { label: 'Bedrooms', value: '129' },
              { label: 'Population', value: '322' },
              { label: 'Households', value: '126' },
              { label: 'Med. Income', value: '8.33' }
            ].map((item, i) => (
              <div key={i}
                className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <p className="text-slate-400 text-xs mb-1">{item.label}</p>
                <p className="text-slate-900 font-bold text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-xs mt-3">
            Ocean Proximity for sample values: Near Bay Area
          </p>
        </div>

      </div>
    </div>
  )
}

export default Predict