import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const categories = ['Vegetables', 'Fruit', 'Grains & millet', 'Dairy']

export default function PostHarvest() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', category: 'Vegetables', quantity: '', unit: 'kg', price: '', harvestDate: '', notes: '',
  })

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // In the real app: POST /api/listings with { ...form, farmerId }
    // then navigate to the new listing or back to "Manage listings".
    console.log('New listing submitted:', form)
    navigate('/dashboard/listings')
  }

  return (
    <>
      <Navbar />
      <div className="wrap">
        <h1 className="pin-title">Pin new harvest</h1>

        <form onSubmit={handleSubmit} className="panel" style={{ maxWidth: 560 }}>
          <div className="field">
            <label>Crop name</label>
            <input
              type="text" placeholder="e.g. Vine tomatoes" required
              value={form.name} onChange={(e) => update('name', e.target.value)}
            />
          </div>

          <div className="field">
            <label>Category</label>
            <select
              value={form.category} onChange={(e) => update('category', e.target.value)}
              style={{ width: '100%', padding: '11px 14px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.15)', fontSize: 14, fontFamily: "'Inter',sans-serif" }}
            >
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            <div className="field" style={{ flex: 1 }}>
              <label>Quantity available</label>
              <input
                type="number" min="0" placeholder="e.g. 25" required
                value={form.quantity} onChange={(e) => update('quantity', e.target.value)}
              />
            </div>
            <div className="field" style={{ width: 110 }}>
              <label>Unit</label>
              <select
                value={form.unit} onChange={(e) => update('unit', e.target.value)}
                style={{ width: '100%', padding: '11px 14px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.15)', fontSize: 14, fontFamily: "'Inter',sans-serif" }}
              >
                <option value="kg">kg</option>
                <option value="dozen">dozen</option>
                <option value="bunch">bunch</option>
                <option value="litre">litre</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Your price (per unit)</label>
            <input
              type="number" min="0" placeholder="e.g. 28" required
              value={form.price} onChange={(e) => update('price', e.target.value)}
            />
            <p style={{ fontSize: 12.5, color: '#4A4436', marginTop: 6 }}>
              Today's mandi rate for this crop will be shown next to your price automatically.
            </p>
          </div>

          <div className="field">
            <label>Harvest date</label>
            <input
              type="date" required
              value={form.harvestDate} onChange={(e) => update('harvestDate', e.target.value)}
            />
          </div>

          <div className="field">
            <label>Notes (optional)</label>
            <input
              type="text" placeholder="e.g. Organic, no pesticide used"
              value={form.notes} onChange={(e) => update('notes', e.target.value)}
            />
          </div>

          <button type="submit" className="btn-pin-lg">Pin this listing</button>
        </form>
      </div>
    </>
  )
}
