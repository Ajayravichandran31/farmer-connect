import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../context/AuthContext.jsx'
function getNextStatuses(status) {
  switch (status) {
    case 'PENDING':
      return ['CONFIRMED', 'CANCELLED']
    case 'CONFIRMED':
      return ['PROCESSING']
    case 'PROCESSING':
      return ['SHIPPED']
    case 'SHIPPED':
      return ['DELIVERED']
    default:
      return []
  }
}
export default function FarmerOrders() {
    const { token } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/farmer/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to load orders')
      }

      const data = await response.json()
      setOrders(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (token) {
    fetchOrders()
  }
}, [token])

const updateStatus = async (orderId, status) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/farmer/orders/${orderId}/status`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    )

    if (!response.ok) {
      const message = await response.text()
      throw new Error(message || 'Failed to update order status')
    }

    const updatedOrder = await response.json()

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    )
  } catch (error) {
    setError(error.message)
  }
}

  return (
    <>
      <Navbar />

      <div className="wrap">
        <h1 className="pin-title">Farmer Orders</h1>

        <div className="panel">
  <div className="panel-head">
    <h3>Orders</h3>
  </div>

  {loading && (
    <p className="advisory">Loading orders...</p>
  )}

  {error && (
    <p className="advisory" style={{ color: 'crimson' }}>
      {error}
    </p>
  )}

  {!loading && !error && orders.length === 0 && (
    <p className="advisory">No orders found.</p>
  )}

  {!loading && !error && orders.map((order) => (
    <div className="listing-row" key={order.id}>
      <div className="info">
        <h4>{order.productName}</h4>
        <div className="meta">
          Order #{order.id} · {order.quantity} item(s) · ₹{order.totalPrice}
        </div>
        <div className="meta">
          Buyer: {order.buyerName} · {order.buyerEmail}
        </div>
      </div>

      <div>
  <span className="stock ok">
    {order.status}
  </span>

  <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
    {getNextStatuses(order.status).map((nextStatus) => (
      <button
        key={nextStatus}
        onClick={() => updateStatus(order.id, nextStatus)}
        className="pin-btn"
        style={{ fontSize: 12 }}
      >
        {nextStatus}
      </button>
    ))}
  </div>
</div>
    </div>
  ))}
</div>
      </div>
    </>
  )
}