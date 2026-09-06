import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'

const initialItems = [
  { id: 1, name: 'Vine tomatoes', farmer: 'R. Meenakshi', location: 'Erode', price: 28, unit: 'kg', qty: 2 },
  { id: 2, name: 'Fresh groundnut', farmer: 'K. Selvam', location: 'Salem', price: 96, unit: 'kg', qty: 1 },
  { id: 3, name: 'Mixed greens', farmer: 'R. Meenakshi', location: 'Erode', price: 18, unit: 'bunch', qty: 1 },
]

const rotations = ['-0.7deg', '0.6deg', '-0.4deg']
const colors = ['var(--mint)', 'var(--lemon)', 'var(--salmon)']
const slots = ['4–6 PM', '6–8 PM', 'Tomorrow AM']

export default function Cart() {
  const [items, setItems] = useState(initialItems)
  const [groupOrder, setGroupOrder] = useState(true)
  const [slot, setSlot] = useState('6–8 PM')

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
    )
  }
  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id))

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0)
  const delivery = groupOrder ? 12 : 30
  const total = subtotal + delivery

  return (
    <>
      <Navbar />
      <div className="wrap">
        <h1 className="pin-title">Your basket</h1>

        <div className="layout-2col">
          <div>
            {items.map((item, i) => (
              <div
                className="basket-item"
                key={item.id}
                style={{ transform: `rotate(${rotations[i % 3]})`, background: colors[i % 3] }}
              >
                <div className="photo"></div>
                <div className="info">
                  <h4>{item.name}</h4>
                  <div className="meta">{item.farmer} · {item.location}</div>
                </div>
                <div className="stepper">
                  <button onClick={() => updateQty(item.id, -1)}>–</button>
                  <span>{item.qty} {item.unit}</span>
                  <button onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
                <div className="price">₹{item.price * item.qty}</div>
                <button className="remove" onClick={() => removeItem(item.id)}>Unpin</button>
              </div>
            ))}
            {items.length === 0 && <p style={{ color: '#4A4436' }}>Your basket is empty.</p>}

            <div className="group-note">
              <p><b>Split the delivery.</b> Invite two neighbours to pin their own basket to this same delivery run and split the fee three ways.</p>
              <button className={`toggle ${groupOrder ? 'on' : ''}`} onClick={() => setGroupOrder(!groupOrder)}></button>
            </div>
          </div>

          <div className="receipt">
            <h3>Order summary</h3>
            <div className="receipt-row"><span>Subtotal ({items.length} items)</span><span>₹{subtotal}</span></div>
            <div className="receipt-row"><span>Delivery {groupOrder ? '(shared)' : ''}</span><span>₹{delivery}</span></div>
            <div className="receipt-row total"><span>Total</span><span>₹{total}</span></div>

            <div style={{ marginTop: 20, fontSize: 13, color: '#4A4436' }}>Delivery slot — today</div>
            <div className="slots">
              {slots.map((s) => (
                <button key={s} className={`slot ${slot === s ? 'on' : ''}`} onClick={() => setSlot(s)}>{s}</button>
              ))}
            </div>

            <button className="btn-pin-lg">Confirm order</button>
          </div>
        </div>
      </div>

      <footer>
        <div className="wrap header-row">
          <span>The Local Board — a community farm marketplace</span>
          <span>Final-year project · Java · Spring Boot · MySQL</span>
        </div>
      </footer>
    </>
  )
}
