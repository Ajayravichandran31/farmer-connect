import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Auth() {
  const [tab, setTab] = useState('signin') // 'signin' | 'signup'
  const [role, setRole] = useState('buyer') // 'buyer' | 'farmer'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')

  if (tab === 'signin') {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Login failed')
      }

      const token = await response.text()

      login(token)

      const payload = JSON.parse(atob(token.split('.')[1]))
      const userRole = payload.role?.toLowerCase()

      navigate(userRole === 'farmer' ? '/dashboard' : '/shop')
    } catch (error) {
      setError(error.message)
    }

    return
  }

  // Registration will be connected next.
}

  return (
    <div className="auth-stage">
      <div className="auth-grid">
        <div className="side">
          <div className="brand" style={{ marginBottom: 22 }}>The Local Board</div>
          <h2>Pin your harvest, or find what's fresh nearby.</h2>
          <p>One account works for both sides of the board — browse as a buyer, or switch to farmer mode anytime to start pinning listings.</p>
          <div className="mini-pins">
            <div className="mini-pin">🍅 Tomato ₹28/kg</div>
            <div className="mini-pin">🥜 Groundnut ₹96/kg</div>
          </div>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="tabs">
            <button type="button" className={`tab ${tab === 'signin' ? 'on' : ''}`} onClick={() => setTab('signin')}>Sign in</button>
            <button type="button" className={`tab ${tab === 'signup' ? 'on' : ''}`} onClick={() => setTab('signup')}>Create account</button>
          </div>

          <div className="role-row">
            <button type="button" className={`role ${role === 'buyer' ? 'on' : ''}`} onClick={() => setRole('buyer')}>🛒 I'm a buyer</button>
            <button type="button" className={`role ${role === 'farmer' ? 'on' : ''}`} onClick={() => setRole('farmer')}>🌾 I'm a farmer</button>
          </div>

          {tab === 'signup' && (
            <div className="field">
              <label>Full name</label>
              <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}

          <div className="field">
            <label>Phone number or email</label>
            <input
                type="email"
                placeholder="e.g. farmer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p style={{ color: 'crimson', fontSize: 14 }}>
              {error}
              </p>
)}
          <button type="submit" className="btn-pin-lg">{tab === 'signin' ? 'Sign in' : `Create ${role} account`}</button>
          <div className="fine">
            {tab === 'signin' ? (
              <>New here? <a href="#" onClick={(e) => { e.preventDefault(); setTab('signup') }}>Create a free account</a></>
            ) : (
              <>Already on the board? <a href="#" onClick={(e) => { e.preventDefault(); setTab('signin') }}>Sign in</a></>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
