import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { listings } from '../data/listings.js'

export default function Landing() {
  const featured = listings.slice(0, 3)

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="wrap hero-grid">
          <div className="note" style={{ transform: 'rotate(-1deg)' }}>
            <h1>Pinned this morning: fresh off the farm.</h1>
            <p className="lede">
              A community board where farmers post today's harvest directly, and you order
              at the price they wrote on the card — no middleman crossing it out.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn-mint">See what's pinned</Link>
              <Link to="/dashboard" className="btn-outline">Post your harvest →</Link>
            </div>
          </div>

          <div className="listing-stack">
            {featured.map((item) => (
              <div className="listing" key={item.id}>
                <div>
                  <h4>{item.name}</h4>
                  <div className="meta">{item.farmer} · {item.location}</div>
                </div>
                <div className="price">₹{item.price}/{item.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap">
        <h2 className="pin-title">How the board works</h2>
        <div className="board" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <StepCard step="step one" title="Farmer pins a listing" text="Crop, price, and the day it was picked — checked against their registered plot." />
          <StepCard step="step two" title="You check the going rate" text="Today's mandi price sits right next to the pinned card, so you know it's fair." />
          <StepCard step="step three" title="Order, or pool with neighbours" text="Split a delivery run with people on your street to save on the fee." />
          <StepCard step="step four" title="Scan on arrival" text="The QR on your crate points straight back to the pinned listing and farm." />
        </div>
      </section>

      <footer>
        <div className="wrap header-row">
          <span>The Local Board — a community farm marketplace</span>
          <span>Final-year project · Java · Spring Boot · MySQL</span>
        </div>
      </footer>
    </>
  )
}

function StepCard({ step, title, text }) {
  return (
    <div className="panel" style={{ marginBottom: 0 }}>
      <div style={{ color: 'var(--twine)', fontFamily: "'Kalam',cursive", fontSize: 15, marginBottom: 10 }}>{step}</div>
      <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: '#4A4436', lineHeight: 1.55 }}>{text}</p>
    </div>
  )
}
