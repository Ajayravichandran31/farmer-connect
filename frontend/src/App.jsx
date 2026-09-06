import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Auth from './pages/Auth.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Auth />} />
    </Routes>
  )
}
