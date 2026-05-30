'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function Home() {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    if (res?.error) setError('Invalid email or password')
    else window.location.href = '/dashboard'
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
    if (res.ok) window.location.href = '/dashboard'
    else setError('Something went wrong')
  }

  return (
    <div className="min-h-screen bg-[#050a18] flex items-center justify-center relative overflow-hidden p-4">
      <div className="absolute w-[420px] h-[420px] rounded-full bg-[#1a3a8f] opacity-55 blur-[80px] -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[340px] h-[340px] rounded-full bg-[#0d4fd6] opacity-55 blur-[80px] -bottom-16 -right-10 pointer-events-none" />
      <div className="absolute w-[200px] h-[200px] rounded-full bg-[#38bdf8] opacity-20 blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative w-full max-w-sm rounded-3xl p-8 border border-white/10"
        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(28px)', boxShadow: '0 2px 0 0 rgba(255,255,255,0.12) inset, 0 32px 64px rgba(0,0,0,0.5)' }}>

        <div className="flex flex-col items-center gap-2 mb-7">
          <div className="w-16 h-16 rounded-full border border-[#38bdf8]/50 bg-[#0a143c]/70 flex items-center justify-center"
            style={{ boxShadow: '0 0 24px rgba(56,189,248,0.25)' }}>
            <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
              <path d="M19 4 L22 13 L31 13 L24 19 L27 28 L19 22 L11 28 L14 19 L7 13 L16 13 Z" stroke="#38bdf8" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M13 18 L16 21 L22 15" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-white font-bold text-xl tracking-wide">CODE<span className="text-[#38bdf8]">Quest</span></div>
          <div className="text-white/40 text-xs">Level up your coding skills</div>
        </div>

        <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 mb-6 gap-1">
          {(['login', 'signup'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setError('') }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30' : 'text-white/40'}`}>
              {t === 'login' ? 'Sign in' : 'Create account'}
            </button>
          ))}
        </div>

        {error && <p className="text-red-400 text-xs mb-4 text-center">{error}</p>}

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider mb-1.5 block">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-[#38bdf8]/50 focus:bg-[#38bdf8]/5" />
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider mb-1.5 block">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-[#38bdf8]/50 focus:bg-[#38bdf8]/5" />
            </div>
            <button type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold text-sm mt-1"
              style={{ background: 'linear-gradient(135deg, #1d6fe8, #0ea5e9)', boxShadow: '0 4px 20px rgba(14,165,233,0.35)' }}>
              Sign in
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider mb-1.5 block">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                placeholder="YourUsername" required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-[#38bdf8]/50 focus:bg-[#38bdf8]/5" />
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider mb-1.5 block">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-[#38bdf8]/50 focus:bg-[#38bdf8]/5" />
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider mb-1.5 block">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-[#38bdf8]/50 focus:bg-[#38bdf8]/5" />
            </div>
            <button type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold text-sm mt-1"
              style={{ background: 'linear-gradient(135deg, #1d6fe8, #0ea5e9)', boxShadow: '0 4px 20px rgba(14,165,233,0.35)' }}>
              Create account
            </button>
          </form>
        )}

        <div className="flex items-center gap-2.5 my-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-xs">or continue with</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
          className="w-full py-2.5 rounded-xl border border-[#5865F2]/40 bg-[#5865F2]/15 text-indigo-300 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#5865F2]/25 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
          </svg>
          Continue with Discord
        </button>
      </div>
    </div>
  )
}