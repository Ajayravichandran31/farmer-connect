import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header>
      <div className="wrap header-row">
        <Link to="/" className="brand">The Local Board</Link>
        <nav>
          <Link to="/shop">Pinned today</Link>
          <Link to="/shop">Weekly box</Link>
          {user?.role === 'farmer' ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <Link to="/sell">Farmers</Link>
          )}
          {user?.role === 'buyer' && <Link to="/cart">Basket</Link>}
        </nav>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 14 }}>{user.name}</span>
            <button onClick={handleLogout} className="pin-btn">Log out</button>
          </div>
        ) : (
          <Link to="/login" className="pin-btn">Sign in</Link>
        )}
      </div>
    </header>
  )
}
