import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { listings } from '../data/listings.js'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const item = listings.find((l) => l.id === Number(id)) || listings[0]
  const [qty, setQty] = useState(1)

  const handleAddToBasket = () => {
    // In the real app: POST /api/cart, then navigate to /cart either way.
    navigate(user ? '/cart' : '/login')
  }

  const total = item.price * qty
  const savingsPct = item.mandi ? Math.round(((item.mandi - item.price) / item.mandi) * 100) : null

  return (
    <>
      <Navbar />
      <div className="wrap">
        <div className="pin-title" style={{ transform: 'rotate(-1deg)' }}>📍 you tapped this pin</div>

        <div className="detail-card">
          <div className="detail-photo"></div>
          <div className="detail-info">
            <h2>{item.name}</h2>
            <div className="farmer-line">
              Pinned by {item.farmer}, {item.location} · picked {item.picked} · {item.rating}★ from {item.reviews} orders
            </div>

            <div className="price-tags">
              <div className="price-tag listed">Pinned price<b>₹{item.price}/{item.unit}</b></div>
              {item.mandi && (
                <div className="price-tag mandi">Today's mandi<b>₹{item.mandi}/{item.unit}</b></div>
              )}
            </div>

            <div className="twine-line"></div>

            <div className="qty-row">
              <div className="stepper">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>–</button>
                <span>{qty} {item.unit}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className="btn-pin" onClick={handleAddToBasket}>
                {user ? `Add to basket — ₹${total}` : 'Sign in to order'}
              </button>
            </div>

            {savingsPct !== null && (
              <p style={{ fontSize: 13, color: '#3E7A46', marginBottom: 16 }}>
                That's {savingsPct}% below today's mandi rate.
              </p>
            )}

            <div className="trace-note">
              <div className="qr">▦</div>
              <p>Scan the QR on your crate to confirm which plot this came from and the exact harvest time.</p>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ marginTop: 50 }}>
        <div className="wrap header-row">
          <span>The Local Board — a community farm marketplace</span>
          <span>Final-year project · Java · Spring Boot · MySQL</span>
        </div>
      </footer>
    </>
  )
}
