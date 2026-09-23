import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

function getUserFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))

    return {
      email: payload.sub,
      role: payload.role?.toLowerCase(),
    }
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem('token')
  )

  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem('token')
    return savedToken ? getUserFromToken(savedToken) : null
  })

  const login = async (newToken) => {
  localStorage.setItem('token', newToken)
  setToken(newToken)

  const tokenUser = getUserFromToken(newToken)

  try {
    const response = await fetch('http://localhost:8080/api/farmer/profile', {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    })

    if (response.ok) {
      const profile = await response.json()

      setUser({
        ...tokenUser,
        name: profile.farmerName,
      })

      return
    }
  } catch {
    // Keep token-based user information if profile loading fails
  }

  setUser(tokenUser)
}

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}