import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NotificationBell from './NotificationBell'
import './NavBar.css'

export default function NavBar() {
  const { user, role, logout, loading } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  function toggleMenu() {
    setMenuOpen((prev) => !prev)
  }

  // Simple logout handler - AuthContext handles everything
  function handleLogout() {
    console.log('Logout clicked') // Debug log
    logout() // AuthContext will handle redirect
  }

  function handleLogoutClick() {
    handleLogout()
    setMenuOpen(false)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  console.log('NavBar render:', { user: user?.name, role, loading })

  const linkCloseProps = { onClick: closeMenu }

  if (loading) {
    return (
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" {...linkCloseProps}>Flexify</Link>
          <nav className="navbar-nav">
            <div>Loading...</div>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo" {...linkCloseProps}>Flexify</Link>
        </div>

        <button
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar-nav ${menuOpen ? 'active' : ''}`}>
          {!role ? (
            <>
              <div className="nav-dropdown">
                <span className="nav-link dropdown-toggle">
                  🔍 Find Services ▼
                </span>
                <div className="dropdown-menu">
                  <Link to="/services" className="dropdown-item" {...linkCloseProps}>Browse All Services</Link>
                  <Link to="/services/driver" className="dropdown-item" {...linkCloseProps}>Drivers</Link>
                  <Link to="/services/cook" className="dropdown-item" {...linkCloseProps}>Cooks</Link>
                  <Link to="/services/plumber" className="dropdown-item" {...linkCloseProps}>Plumbers</Link>
                  <Link to="/services/electrician" className="dropdown-item" {...linkCloseProps}>Electricians</Link>
                  <Link to="/services/cleaner" className="dropdown-item" {...linkCloseProps}>Cleaners</Link>
                </div>
              </div>
              
              <div className="nav-dropdown dropdown-client">
                <span className="nav-link dropdown-toggle">User ▼</span>
                <div className="dropdown-menu">
                  <Link to="/register/user" className="dropdown-item" {...linkCloseProps}>New Customer<span> Sign Up</span></Link>
                  <Link to="/login/user" className="dropdown-item" {...linkCloseProps}>Account Exists<span> Log In</span></Link>
                </div>
              </div>
              <div className="nav-dropdown dropdown-client">
                <span className="nav-link dropdown-toggle">Provider ▼</span>
                <div className="dropdown-menu">
                  <Link to="/register/provider" className="dropdown-item" {...linkCloseProps}>New Customer<span> Sign Up</span></Link>
                  <Link to="/login/provider" className="dropdown-item" {...linkCloseProps}>Account Exists<span> Log In</span></Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {role === 'user' && (
                <>
                  <div className="nav-dropdown">
                    <span className="nav-link dropdown-toggle">🔍 Find Services ▼</span>
                    <div className="dropdown-menu">
                      <Link to="/services" className="dropdown-item" {...linkCloseProps}>Browse All Services</Link>
                      <Link to="/services/driver" className="dropdown-item" {...linkCloseProps}>Drivers</Link>
                      <Link to="/services/cook" className="dropdown-item" {...linkCloseProps}>Cooks</Link>
                      <Link to="/services/plumber" className="dropdown-item" {...linkCloseProps}>Plumbers</Link>
                      <Link to="/services/electrician" className="dropdown-item" {...linkCloseProps}>Electricians</Link>
                      <Link to="/services/cleaner" className="dropdown-item" {...linkCloseProps}>Cleaners</Link>
                    </div>
                  </div>
                  
                  <Link to="/bookings" className="nav-link" {...linkCloseProps}>📋 My Bookings</Link>
                  <Link to="/support" className="nav-link" {...linkCloseProps}>❓ Support</Link>

                  <div className="nav-dropdown">
                    <span className="nav-link dropdown-toggle">{user?.name || 'User'} ▼</span>
                    <div className="dropdown-menu">
                      <Link to="/dashboard/user" className="dropdown-item" {...linkCloseProps}>Dashboard</Link>
                      <Link to="/profile" className="dropdown-item" {...linkCloseProps}>Profile</Link>
                      <button onClick={handleLogoutClick} className="dropdown-item">Logout</button>
                    </div>
                  </div>
                </>
              )}
              
              {role === 'provider' && (
                <>
                  <Link to="/provider/bookings" className="nav-link" {...linkCloseProps}>📋 Bookings</Link>
                  
                  <Link to="/provider/earnings" className="nav-link" {...linkCloseProps}>
                    💰 Earnings
                  </Link>

                  <Link to="/support" className="nav-link" {...linkCloseProps}>❓ Support</Link>



                  <div className="nav-dropdown">
                    <span className="nav-link dropdown-toggle">{user?.name || 'Provider'} ▼</span>
                    <div className="dropdown-menu">
                      <Link to="/dashboard/provider" className="dropdown-item" {...linkCloseProps}>Dashboard</Link>
                      <Link to="/profile" className="dropdown-item" {...linkCloseProps}>Profile</Link>
                      <button onClick={handleLogoutClick} className="dropdown-item">Logout</button>
                    </div>
                  </div>
                </>
              )}
              
              {role === 'admin' && (
                <>
                  <Link to="/dashboard/admin" className="nav-link" {...linkCloseProps}>⚙️ Admin Panel</Link>
                  <Link to="/users" className="nav-link" {...linkCloseProps}>👥 Users</Link>
                  <Link to="/providers" className="nav-link" {...linkCloseProps}>🏢 Providers</Link>
                  <div className="nav-dropdown">
                    <span className="nav-link dropdown-toggle">{user?.name || 'Admin'} ▼</span>
                    <div className="dropdown-menu">
                      <Link to="/analytics" className="dropdown-item" {...linkCloseProps}>Analytics</Link>
                      <button onClick={handleLogoutClick} className="dropdown-item">Logout</button>
                    </div>
                  </div>
                </>
              )}

              <NotificationBell />
            </>
          )}
        </nav>
      </div>
    </header>
  )
}