import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Landing from './pages/Landing.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PostHarvest from './pages/PostHarvest.jsx'
import ManageListings from './pages/ManageListings.jsx'
import SalesReport from './pages/SalesReport.jsx'
import SellPublic from './pages/SellPublic.jsx'
import Auth from './pages/Auth.jsx'

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/sell" element={<SellPublic />} />
      <Route path="/login" element={<Auth />} />

      {/* Buyer only */}
      <Route path="/cart" element={
        <ProtectedRoute role="buyer"><Cart /></ProtectedRoute>
      } />

      {/* Farmer only */}
      <Route path="/dashboard" element={
        <ProtectedRoute role="farmer"><Dashboard /></ProtectedRoute>
      } />
      <Route path="/dashboard/new" element={
        <ProtectedRoute role="farmer"><PostHarvest /></ProtectedRoute>
      } />
      <Route path="/dashboard/listings" element={
        <ProtectedRoute role="farmer"><ManageListings /></ProtectedRoute>
      } />
      <Route path="/dashboard/reports" element={
        <ProtectedRoute role="farmer"><SalesReport /></ProtectedRoute>
      } />
    </Routes>
  )
}
