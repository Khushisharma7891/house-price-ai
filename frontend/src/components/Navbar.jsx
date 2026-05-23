import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50"
      style={{ boxShadow: '0 1px 20px rgba(15,23,42,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
                fill="white" />
            </svg>
          </div>
          <div>
            <div className="font-black text-slate-900 text-lg leading-none tracking-tight">
              HousePrice<span className="text-amber-500">AI</span>
            </div>
            <div className="text-slate-400 text-xs font-medium tracking-widest">
              CALIFORNIA
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/"
            className={`text-sm font-semibold transition-all duration-200 ${isActive('/') ? 'text-amber-500' : 'text-slate-500 hover:text-slate-900'}`}>
            Home
          </Link>
          <Link to="/predict"
            className={`text-sm font-semibold transition-all duration-200 ${isActive('/predict') ? 'text-amber-500' : 'text-slate-500 hover:text-slate-900'}`}>
            Predict Price
          </Link>

          {user ? (
            <>
              <Link to="/dashboard"
                className={`text-sm font-semibold transition-all duration-200 ${isActive('/dashboard') ? 'text-amber-500' : 'text-slate-500 hover:text-slate-900'}`}>
                Dashboard
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-700 font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-slate-700 font-semibold text-sm">
                  {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-slate-400 hover:text-red-500 transition-all duration-200">
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login"
                className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-all duration-200">
                Sign in
              </Link>
              <Link to="/signup"
                className="btn-amber px-5 py-2.5 rounded-xl text-sm">
                Get Started
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar