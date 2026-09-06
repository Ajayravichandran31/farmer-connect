import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header>
      <div className="wrap header-row">
        <Link to="/" className="brand">The Local Board</Link>
        <nav>
          <Link to="/shop">Pinned today</Link>
          <Link to="/shop">Weekly box</Link>
          <Link to="/dashboard">Farmers</Link>
        </nav>
        <Link to="/login" className="pin-btn">Sign in</Link>
      </div>
    </header>
  )
}
