import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const initialListings = [
  { id: 1, name: 'Groundnut', price: 96, unit: 'kg', stock: 18, low: false, pinned: '2 days ago' },
  { id: 2, name: 'Finger millet', price: 42, unit: 'kg', stock: 3, low: true, pinned: 'today' },
  { id: 3, name: 'Sorghum', price: 38, unit: 'kg', stock: 30, low: false, pinned: '4 days ago' },
]

export default function ManageListings() {
  const [listings, setListings] = useState(initialListings)

  const removeListing = (id) => setListings((prev) => prev.filter((l) => l.id !== id))

  return (
    <>
      <Navbar />
      <div className="wrap">
        <div className="header-row" style={{ marginBottom: 10 }}>
          <h1 className="pin-title" style={{ margin: 0 }}>Manage your listings</h1>
          <Link to="/dashboard/new" className="pin-btn">+ Pin new harvest</Link>
        </div>

        <div className="panel">
          {listings.map((l) => (
            <div className="listing-row" key={l.id}>
              <div className="photo"></div>
              <div className="info">
                <h4>{l.name}</h4>
                <div className="meta">₹{l.price}/{l.unit} · pinned {l.pinned}</div>
              </div>
              <span className={`stock ${l.low ? 'low' : 'ok'}`}>{l.stock} {l.unit} left</span>
              <a href="#" style={{ fontSize: 12.5, color: 'var(--twine)', fontWeight: 600 }}>Edit</a>
              <button
                onClick={() => removeListing(l.id)}
                style={{ background: 'none', border: 'none', fontSize: 12.5, color: '#9a3a2a', cursor: 'pointer' }}
              >
                Unpin
              </button>
            </div>
          ))}
          {listings.length === 0 && (
            <p style={{ color: '#4A4436', padding: '20px 0' }}>
              You don't have any pinned listings yet. <Link to="/dashboard/new" style={{ color: 'var(--twine)', fontWeight: 600 }}>Pin your first harvest →</Link>
            </p>
          )}
        </div>
      </div>
    </>
  )
}
