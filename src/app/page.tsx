import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CodeQuest — Level Up Your Coding Skills',
  description: 'A Discord bot that turns coding practice into a game. Quizzes, challenges, daily missions, and a rank system.',
}

const ADD_BOT_URL = 'https://discord.com/oauth2/authorize?client_id=1510105279969103962&scope=bot+applications.commands&permissions=8'

const features = [
  { icon: '⚡', title: 'Daily Challenges', desc: 'A new coding challenge every day. Solve it, earn XP, climb the ranks.' },
  { icon: '🧠', title: 'Quiz Mode', desc: 'Test your knowledge across Python, JS, algorithms, and more.' },
  { icon: '🏆', title: 'Leaderboard', desc: "Compete with your server. See who's earning the most XP." },
  { icon: '📈', title: 'Rank System', desc: 'Rise from Initiate to Master as you complete challenges and quizzes.' },
  { icon: '💡', title: 'Hints', desc: 'Stuck? Use a hint without losing your progress.' },
  { icon: '👤', title: 'Profiles', desc: 'Track your XP, level, rank, and challenge history.' },
]

const ranks = [
  { name: 'Initiate', xp: '0', color: '#94a3b8' },
  { name: 'Apprentice', xp: '100', color: '#60a5fa' },
  { name: 'Developer', xp: '300', color: '#34d399' },
  { name: 'Engineer', xp: '600', color: '#a78bfa' },
  { name: 'Architect', xp: '1000', color: '#f59e0b' },
  { name: 'Veteran', xp: '1500', color: '#f97316' },
  { name: 'Elite', xp: '2200', color: '#ef4444' },
  { name: 'Master', xp: '3000', color: '#38bdf8' },
]

const commands = [
  { cmd: '/quiz', desc: 'Get a random coding question' },
  { cmd: '/challenge', desc: 'Start a coding challenge' },
  { cmd: '/daily', desc: "View today's daily challenge" },
  { cmd: '/submit', desc: 'Submit your answer' },
  { cmd: '/hint', desc: 'Get a hint for the current challenge' },
  { cmd: '/leaderboard', desc: 'View the server leaderboard' },
  { cmd: '/profile', desc: 'View your stats and rank' },
  { cmd: '/setup', desc: 'Set up CodeQuest in your server' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050a18] text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#1a3a8f] opacity-20 blur-[120px] -top-40 -left-40" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#0d4fd6] opacity-15 blur-[120px] top-1/2 -right-40" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#38bdf8] opacity-10 blur-[120px] bottom-0 left-1/3" />
      </div>
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#38bdf8]/50 bg-[#0a143c]/70 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 38 38" fill="none">
              <path d="M19 4 L22 13 L31 13 L24 19 L27 28 L19 22 L11 28 L14 19 L7 13 L16 13 Z" stroke="#38bdf8" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">CODE<span className="text-[#38bdf8]">Quest</span></span>
        </div>
        <a href={ADD_BOT_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium px-4 py-2 rounded-lg bg-[#38bdf8] text-[#050a18] hover:bg-[#7dd3fc] transition-colors">Add to Discord</a>
      </nav>
      <section className="relative z-10 text-center px-8 pt-24 pb-32 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/10 text-[#38bdf8] text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />Free Discord Bot
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">Level up your<br /><span className="text-[#38bdf8]">coding skills</span></h1>
        <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">CodeQuest turns your Discord server into a coding arena. Daily challenges, quizzes, XP, and ranks — all in a bot.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={ADD_BOT_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#38bdf8] text-[#050a18] font-semibold text-lg hover:bg-[#7dd3fc] transition-all hover:scale-105">Add to Discord</a>
          <a href="#commands" className="px-8 py-4 rounded-xl border border-white/10 text-white/70 font-medium text-lg hover:border-white/30 hover:text-white transition-all">See commands</a>
        </div>
      </section>
      <section className="relative z-10 px-8 pb-24 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12 text-white/80">Everything you need to grind</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map(f => (
            <div key={f.title} className="rounded-2xl p-6 border border-white/10 hover:border-[#38bdf8]/30 transition-colors" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="relative z-10 px-8 pb-24 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-3 text-white/80">Rank system</h2>
        <p className="text-center text-white/40 text-sm mb-10">Earn XP to climb through 8 ranks</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {ranks.map(r => (
            <div key={r.name} className="rounded-xl p-3 border border-white/10 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="text-xs font-bold mb-1" style={{ color: r.color }}>{r.name}</div>
              <div className="text-white/30 text-xs">{r.xp} XP</div>
            </div>
          ))}
        </div>
      </section>
      <section id="commands" className="relative z-10 px-8 pb-24 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-3 text-white/80">Commands</h2>
        <p className="text-center text-white/40 text-sm mb-10">Everything available right in Discord</p>
        <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
          {commands.map((c, i) => (
            <div key={c.cmd} className={`flex items-center justify-between px-6 py-4 ${i !== commands.length - 1 ? 'border-b border-white/5' : ''}`}>
              <code className="text-[#38bdf8] font-mono text-sm font-medium">{c.cmd}</code>
              <span className="text-white/40 text-sm">{c.desc}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="relative z-10 px-8 pb-32 max-w-2xl mx-auto text-center">
        <div className="rounded-3xl p-12 border border-[#38bdf8]/20" style={{ background: 'rgba(56,189,248,0.05)', backdropFilter: 'blur(12px)' }}>
          <h2 className="text-3xl font-bold mb-3">Ready to start grinding?</h2>
          <p className="text-white/40 mb-8">Add CodeQuest to your server in one click.</p>
          <a href={ADD_BOT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#38bdf8] text-[#050a18] font-semibold text-lg hover:bg-[#7dd3fc] transition-all hover:scale-105">Add to Discord — it's free</a>
        </div>
      </section>
      <footer className="relative z-10 border-t border-white/5 px-8 py-8 max-w-6xl mx-auto flex items-center justify-between">
        <span className="text-white/30 text-sm">CodeQuest</span>
        <span className="text-white/20 text-xs">Not affiliated with Discord Inc.</span>
      </footer>
    </div>
  )
}
