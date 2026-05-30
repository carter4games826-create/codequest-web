'use client'

import { signOut } from 'next-auth/react'
import { BotUser } from '@/lib/botApi'
import { Session } from 'next-auth'

interface Props {
  session: Session
  botUser: BotUser | null
}

function RankProgressBar({ botUser }: { botUser: BotUser }) {
  if (!botUser.next_rank) {
    return (
      <div className="mt-2">
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span>Master rank achieved</span>
          <span>{botUser.xp} XP</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#38bdf8] w-full" />
        </div>
      </div>
    )
  }
  const { xp_from_prev, xp_needed, name } = botUser.next_rank
  const pct = Math.min((xp_from_prev / xp_needed) * 100, 100)
  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-white/40 mb-1">
        <span>Next: {name}</span>
        <span>{xp_from_prev} / {xp_needed} XP</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#38bdf8] transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function DashboardClient({ session, botUser }: Props) {
  const name = session.user?.name ?? 'Coder'
  const stats = [
    { label: 'XP',         value: botUser ? botUser.xp.toLocaleString() : '—' },
    { label: 'Level',      value: botUser ? String(botUser.level) : '—' },
    { label: 'Challenges', value: botUser ? String(botUser.challenges_completed) : '—' },
    { label: 'Rank',       value: botUser ? botUser.rank : 'No rank yet' },
  ]
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
          <button onClick={() => signOut({ callbackUrl: '/' })} className="text-white/40 hover:text-white/70 text-sm transition-colors">Sign out</button>
        </div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Welcome back, {name}</h1>
          <p className="text-white/40 text-sm">{botUser ? `Rank: ${botUser.rank} · Ready to level up?` : 'Link your Discord to see your stats.'}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="rounded-2xl p-4 border border-white/10" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
              <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-xl font-bold text-[#38bdf8]">{stat.value}</div>
            </div>
          ))}
        </div>
        {botUser && (
          <div className="rounded-2xl p-5 border border-white/10 mb-8" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-semibold text-white/80">Rank progress</h2>
              <span className="text-xs text-[#38bdf8] font-medium">{botUser.rank}</span>
            </div>
            <RankProgressBar botUser={botUser} />
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
            <h2 className="font-semibold mb-4 text-white/80">Daily challenge</h2>
            <p className="text-white/40 text-sm">Use <code className="text-[#38bdf8]">/daily</code> in Discord to get today&apos;s challenge.</p>
          </div>
          <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
            <h2 className="font-semibold mb-4 text-white/80">Stats</h2>
            {botUser ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/40">Quizzes completed</span><span className="font-medium">{botUser.quizzes_completed}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Challenges completed</span><span className="font-medium">{botUser.challenges_completed}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Total XP</span><span className="font-medium text-[#38bdf8]">{botUser.xp.toLocaleString()}</span></div>
              </div>
            ) : (
              <p className="text-white/40 text-sm">Connect your Discord account to see your stats here.</p>
            )}
          </div>
        </div>
        {!botUser && (
          <div className="mt-4 rounded-2xl p-4 border border-[#38bdf8]/20 bg-[#38bdf8]/5 text-sm text-white/60 text-center">
            No Discord data found. Use the bot commands in your server to start earning XP, then your stats will appear here.
          </div>
        )}
      </div>
    </div>
  )
}
