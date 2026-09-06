const salesByDay = [
  { day: 'Mon', height: 60 }, { day: 'Tue', height: 90 }, { day: 'Wed', height: 75 },
  { day: 'Thu', height: 110 }, { day: 'Fri', height: 95 }, { day: 'Sat', height: 130 }, { day: 'Sun', height: 70 },
]

const myListings = [
  { name: 'Groundnut', price: '₹96/kg', age: 'pinned 2 days ago', stock: '18 kg left', low: false },
  { name: 'Finger millet', price: '₹42/kg', age: 'pinned today', stock: '3 kg left', low: true },
  { name: 'Sorghum', price: '₹38/kg', age: 'pinned 4 days ago', stock: '30 kg left', low: false },
]

export default function Dashboard() {
  return (
    <>
      <header>
        <div className="wrap header-row">
          <span className="brand">The Local Board</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 14 }}>K. Selvam</span>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--sky)', boxShadow: '1px 2px 0 rgba(0,0,0,0.15)' }}></div>
          </div>
        </div>
      </header>

      <div className="wrap">
        <h1 className="pin-title" style={{ fontSize: 26 }}>Good evening, Selvam 👋</h1>

        <div className="stat-row">
          <Stat label="This week's sales" value="₹9,240" sub="↑ 12% vs last week" />
          <Stat label="Pending orders" value="6" sub="2 need confirming today" />
          <Stat label="Active pins" value="11" sub="2 running low on stock" />
          <Stat label="Rating" value="4.9★" sub="from 86 orders" />
        </div>

        <div className="layout-2col">
          <div>
            <div className="panel">
              <div className="panel-head"><h3>Sales this week</h3><a href="#">View report →</a></div>
              <div className="chart">
                {salesByDay.map((d) => (
                  <div className="bar-col" key={d.day}>
                    <div className="bar" style={{ height: d.height }}></div>
                    <div className="day">{d.day}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head"><h3>My pinned listings</h3><a href="#">Manage all →</a></div>
              {myListings.map((l) => (
                <div className="listing-row" key={l.name}>
                  <div className="photo"></div>
                  <div className="info">
                    <h4>{l.name}</h4>
                    <div className="meta">{l.price} · {l.age}</div>
                  </div>
                  <span className={`stock ${l.low ? 'low' : 'ok'}`}>{l.stock}</span>
                  <a href="#" style={{ fontSize: 12.5, color: 'var(--twine)', fontWeight: 600 }}>Edit</a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="panel">
              <div className="panel-head"><h3>Pin new harvest</h3></div>
              <p className="advisory">Add today's crop, quantity, and price — it'll show alongside the current mandi rate automatically.</p>
              <a href="#" className="pin-new" style={{ marginTop: 16 }}>+ Pin new harvest</a>
            </div>

            <div className="panel">
              <div className="panel-head"><h3>Weather advisory</h3></div>
              <p className="advisory"><b>Light rain expected Thursday.</b> Consider harvesting groundnut before Wednesday evening to avoid moisture damage.</p>
            </div>

            <div className="panel">
              <div className="panel-head"><h3>Today's mandi rates</h3></div>
              <p className="advisory">Groundnut <b>₹91/kg</b> · Millet <b>₹47/kg</b> · Sorghum <b>₹40/kg</b><br/>Updated 4:00 PM, Salem market.</p>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="wrap header-row">
          <span>The Local Board — farmer console</span>
          <span>Final-year project · Java · Spring Boot · MySQL</span>
        </div>
      </footer>
    </>
  )
}

function Stat({ label, value, sub }) {
  return (
    <div className="stat-note">
      <div className="lbl">{label}</div>
      <div className="num">{value}</div>
      <div className="sub">{sub}</div>
    </div>
  )
}
