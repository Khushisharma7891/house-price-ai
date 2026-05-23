import { useState, useEffect } from 'react'
import axios from 'axios'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from 'react-router-dom'

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/history/${user.user_id}`
      )
      if (response.data.success) {
        setPredictions(response.data.predictions)
      }
    } catch (err) {
      console.error('Error fetching history:', err)
    } finally {
      setLoading(false)
    }
  }

  const chartData = predictions.slice(0, 8).reverse().map((p, i) => ({
    name: `#${i + 1}`,
    price: Math.round(p.predicted_price)
  }))

  const avgPrice = predictions.length > 0
    ? Math.round(predictions.reduce((a, b) => a + b.predicted_price, 0) / predictions.length)
    : 0

  const highestPrice = predictions.length > 0
    ? Math.round(Math.max(...predictions.map(p => p.predicted_price)))
    : 0

  const lowestPrice = predictions.length > 0
    ? Math.round(Math.min(...predictions.map(p => p.predicted_price)))
    : 0

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 animate-fadeIn">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">
              Welcome back
            </p>
            <h1 className="text-4xl font-black text-slate-900"
              style={{ letterSpacing: '-0.02em' }}>
              {user?.name}
            </h1>
            <p className="text-slate-500 mt-1">
              Your house price prediction history
            </p>
          </div>
          <Link to="/predict"
            className="btn-amber px-5 py-2.5 rounded-xl text-sm">
            New Prediction
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: 'Total Predictions',
              value: predictions.length,
              desc: 'All time',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              )
            },
            {
              label: 'Average Price',
              value: avgPrice > 0 ? `$${avgPrice.toLocaleString()}` : '—',
              desc: 'Across all predictions',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
              )
            },
            {
              label: 'Highest Prediction',
              value: highestPrice > 0 ? `$${highestPrice.toLocaleString()}` : '—',
              desc: 'Maximum value',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              )
            },
            {
              label: 'Lowest Prediction',
              value: lowestPrice > 0 ? `$${lowestPrice.toLocaleString()}` : '—',
              desc: 'Minimum value',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              )
            }
          ].map((stat, i) => (
            <div key={i}
              className={`stat-card card-hover animate-fadeIn delay-${(i+1)*100}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
                  {stat.label}
                </p>
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900"
                style={{ letterSpacing: '-0.02em' }}>
                {stat.value}
              </p>
              <p className="text-slate-400 text-xs mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        {predictions.length > 1 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bold text-slate-900">
                  Prediction Trend
                </h2>
                <p className="text-slate-400 text-sm">
                  Your recent price predictions
                </p>
              </div>
              <div className="section-label">
                Last {Math.min(predictions.length, 8)} predictions
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  stroke="#cbd5e1"
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                />
                <YAxis
                  stroke="#cbd5e1"
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                  formatter={(v) => [`$${v.toLocaleString()}`, 'Predicted Price']}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fill="url(#priceGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 animate-fadeIn delay-200">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-slate-900">
                Prediction History
              </h2>
              <p className="text-slate-400 text-sm mt-0.5">
                All your saved predictions
              </p>
            </div>
            <span className="text-slate-400 text-sm">
              {predictions.length} total
            </span>
          </div>

          {loading ? (
            <div className="text-center py-16 text-slate-400">
              <svg className="animate-spin mx-auto mb-3 text-amber-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              Loading predictions...
            </div>
          ) : predictions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <p className="text-slate-900 font-semibold mb-1">
                No predictions yet
              </p>
              <p className="text-slate-400 text-sm mb-4">
                Run your first prediction to see results here
              </p>
              <Link to="/predict"
                className="btn-amber px-5 py-2.5 rounded-xl text-sm inline-block">
                Make a Prediction
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">#</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Date</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Location</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Income</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Rooms</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Predicted Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {predictions.map((p, i) => (
                    <tr key={p._id}
                      className="hover:bg-slate-50 transition-all duration-150">
                      <td className="px-6 py-4 text-slate-400 text-sm font-medium">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        {p.created_at}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-semibold border border-amber-100">
                          {p.input_data.ocean_proximity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        ${p.input_data.median_income}k
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        {p.input_data.total_rooms}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-black text-slate-900 text-base"
                          style={{ letterSpacing: '-0.01em' }}>
                          ${p.predicted_price.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard