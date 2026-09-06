import Navbar from '../components/Navbar.jsx'

const weeklyBreakdown = [
  { week: 'This week', sales: 9240, orders: 22, topCrop: 'Groundnut' },
  { week: 'Last week', sales: 8250, orders: 19, topCrop: 'Groundnut' },
  { week: '2 weeks ago', sales: 7100, orders: 16, topCrop: 'Finger millet' },
  { week: '3 weeks ago', sales: 6480, orders: 15, topCrop: 'Groundnut' },
]

export default function SalesReport() {
  return (
    <>
      <Navbar />
      <div className="wrap">
        <h1 className="pin-title">Sales report</h1>

        <div className="panel">
          <div className="panel-head"><h3>Weekly breakdown</h3></div>
          {weeklyBreakdown.map((w) => (
            <div className="listing-row" key={w.week}>
              <div className="info">
                <h4>{w.week}</h4>
                <div className="meta">{w.orders} orders · best seller: {w.topCrop}</div>
              </div>
              <div style={{ fontFamily: "'Kalam',cursive", fontSize: 18 }}>₹{w.sales.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-head"><h3>What this tells you</h3></div>
          <p className="advisory">
            Sales have grown for 4 weeks straight — mostly driven by groundnut. Finger millet stock has
            run low twice this month; consider listing a larger quantity next harvest to avoid missing orders.
          </p>
        </div>
      </div>
    </>
  )
}
