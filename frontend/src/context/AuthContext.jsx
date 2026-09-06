import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// In the real app, login() will call POST /api/auth/login, receive a JWT,
// store it, and decode the user's name + role from the response instead
// of accepting them as plain arguments like this mock version does.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // null | { name: string, role: 'buyer' | 'farmer' }

  const login = (name, role) => setUser({ name, role })
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
