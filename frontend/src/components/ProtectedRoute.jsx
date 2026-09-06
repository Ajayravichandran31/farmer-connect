import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Usage: <ProtectedRoute role="farmer"><Dashboard /></ProtectedRoute>
// If role is omitted, any logged-in user (buyer or farmer) is allowed through.
export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to="/" replace />

  return children
}
