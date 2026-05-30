'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status, router])

  if (status === 'loading') return (
    <div className="min-h-screen bg-[#050a18] flex items-center justify-center">
      <div className="text-white/40 text-sm">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050a18] text-white p-8">
      <div className="absolute w-[420px] h-[420px] rounded-full bg-[#1a3a8f] opacity-40 blur-[80px] -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[340px] h-[340px] rounded-full bg-[#0d4fd6] opacity-40 blur-[80px] -bottom-16 -right-10 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[#38bdf8]/50 bg-[#0a143c]/70 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 38 38" fill="none">
                <path d="M19 4 L22 13 L31 13 L24 19 L27 28 L19 22 L11 28 L14 19 L7 13 L16 13 Z" stroke="#38bdf8" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-lg">CODE<span className="text-[#38bdf8]">Quest</span></span>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/' })}
            className="text-white/40 hover:text-white/70 text-sm transition-colors">
            Sign out
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Welcome back, {session?.user?.name ?? 'Coder'}</h1>
          <p className="text-white/40 text-sm">Ready to level up today?</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'XP', value: '0' },
            { label: 'Level', value: '1' },
            { label: 'Challenges', value: '0' },
            { label: 'Rank', value: 'Initiate' },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-4 border border-white/10"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
              <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-xl font-bold text-[#38bdf8]">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-6 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
            <h2 className="font-semibold mb-4 text-white/80">Daily challenge</h2>
            <p className="text-white/40 text-sm">No daily challenge yet. Check back soon!</p>
          </div>
          <div className="rounded-2xl p-6 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
            <h2 className="font-semibold mb-4 text-white/80">Recent activity</h2>
            <p className="text-white/40 text-sm">No activity yet. Start a challenge!</p>
          </div>
        </div>
      </div>
    </div>
  )
}