import { useNavigate } from 'react-router-dom'

const rotations = ['-1.2deg', '0.8deg', '-0.5deg']
const colors = ['var(--mint)', 'var(--lemon)', 'var(--salmon)']

export default function PinCard({ item, index }) {
  const navigate = useNavigate()
  const rot = rotations[index % rotations.length]
  const bg = colors[index % colors.length]

  return (
    <button
      className="card"
      style={{ transform: `rotate(${rot})`, background: bg }}
      onClick={() => navigate(`/product/${item.id}`)}
    >
      <div className="photo"></div>
      <h4>{item.name}</h4>
      <div className="meta">{item.farmer} · {item.location} · picked {item.picked}</div>
      <div className="price-row">
        <span className="price">₹{item.price}/{item.unit}</span>
        <span className="mandi-note">{item.mandi ? `mandi ₹${item.mandi}` : 'no mandi rate'}</span>
      </div>
    </button>
  )
}
