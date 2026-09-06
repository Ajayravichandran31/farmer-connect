import { useState } from 'react'

export default function Auth() {
  const [tab, setTab] = useState('signin') // 'signin' | 'signup'
  const [role, setRole] = useState('buyer') // 'buyer' | 'farmer'

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

        <div className="auth-card">
          <div className="tabs">
            <button className={`tab ${tab === 'signin' ? 'on' : ''}`} onClick={() => setTab('signin')}>Sign in</button>
            <button className={`tab ${tab === 'signup' ? 'on' : ''}`} onClick={() => setTab('signup')}>Create account</button>
          </div>

          <div className="role-row">
            <button className={`role ${role === 'buyer' ? 'on' : ''}`} onClick={() => setRole('buyer')}>🛒 I'm a buyer</button>
            <button className={`role ${role === 'farmer' ? 'on' : ''}`} onClick={() => setRole('farmer')}>🌾 I'm a farmer</button>
          </div>

          {tab === 'signup' && (
            <div className="field">
              <label>Full name</label>
              <input type="text" placeholder="Your name" />
            </div>
          )}

          <div className="field">
            <label>Phone number or email</label>
            <input type="text" placeholder="e.g. 98765 43210" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="btn-pin-lg">{tab === 'signin' ? 'Sign in' : `Create ${role} account`}</button>
          <div className="fine">
            {tab === 'signin' ? (
              <>New here? <a href="#" onClick={(e) => { e.preventDefault(); setTab('signup') }}>Create a free account</a></>
            ) : (
              <>Already on the board? <a href="#" onClick={(e) => { e.preventDefault(); setTab('signin') }}>Sign in</a></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
