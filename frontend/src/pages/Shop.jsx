import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import PinCard from '../components/PinCard.jsx'
import { listings } from '../data/listings.js'

const categories = ['All pins', 'Vegetables', 'Fruit', 'Grains & millet', 'Dairy']

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All pins')
  const [belowMandiOnly, setBelowMandiOnly] = useState(false)

  const filtered = listings.filter((item) => {
    const matchesCategory = activeCategory === 'All pins' || item.category === activeCategory
    const matchesMandi = !belowMandiOnly || (item.mandi && item.price < item.mandi)
    return matchesCategory && matchesMandi
  })

  return (
    <>
      <Navbar />
      <div className="wrap">
        <div className="pin-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pin-filter ${activeCategory === cat ? 'on' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
          <button
            className={`pin-filter ${belowMandiOnly ? 'on' : ''}`}
            onClick={() => setBelowMandiOnly(!belowMandiOnly)}
          >
            Priced below mandi
          </button>
        </div>

        <div className="board">
          {filtered.map((item, i) => (
            <PinCard item={item} index={i} key={item.id} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p style={{ padding: '40px 0', color: '#4A4436' }}>Nothing pinned matches that filter yet.</p>
        )}
      </div>

      <footer style={{ marginTop: 40 }}>
        <div className="wrap header-row">
          <span>The Local Board — a community farm marketplace</span>
          <span>Final-year project · Java · Spring Boot · MySQL</span>
        </div>
      </footer>
    </>
  )
}
