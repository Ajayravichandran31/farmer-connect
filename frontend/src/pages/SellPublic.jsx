import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

export default function SellPublic() {
  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="note" style={{ transform: 'rotate(-1deg)' }}>
            <h1>Pin your harvest. Set your own price.</h1>
            <p className="lede">
              No commission, no middleman. Sign up free, list what you've grown, and see
              today's mandi rate sit right next to your price — set fairly, on your terms.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="btn-mint">Join as a farmer</Link>
            </div>
          </div>

          <div className="listing-stack">
            <Stat label="Verified farmers on the board" value="214" />
            <Stat label="Moved direct-to-farmer this month" value="₹6.1L" />
            <Stat label="Average delivery time" value="3.2 hrs" />
          </div>
        </div>
      </section>

      <section className="wrap">
        <h2 className="pin-title">Why farmers join the board</h2>
        <div className="board" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <InfoCard title="No listing fee" text="Your first three months on the board are free — no commission, no hidden charges." />
          <InfoCard title="See the mandi rate" text="We show today's government market price next to your listing, so pricing fairly is simple." />
          <InfoCard title="A real dashboard" text="Track sales, get low-stock alerts, and see a weather advisory for your registered plot." />
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

function Stat({ label, value }) {
  return (
    <div className="listing">
      <div><h4>{label}</h4></div>
      <div className="price">{value}</div>
    </div>
  )
}

function InfoCard({ title, text }) {
  return (
    <div className="panel" style={{ marginBottom: 0 }}>
      <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: '#4A4436', lineHeight: 1.6 }}>{text}</p>
    </div>
  )
}
