const BOT_API_URL = process.env.BOT_API_URL!;
const BOT_API_SECRET = process.env.BOT_API_SECRET!;

async function botFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BOT_API_URL}${path}`, {
    headers: { "X-API-Secret": BOT_API_SECRET },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Bot API error: ${res.status}`);
  return res.json();
}

export interface BotUser {
  user_id: number;
  username: string;
  xp: number;
  level: number;
  rank: string;
  next_rank: { name: string; xp_required: number; xp_current: number; xp_from_prev: number; xp_needed: number } | null;
  challenges_completed: number;
  quizzes_completed: number;
}

export interface LeaderboardEntry {
  position: number;
  user_id: number;
  username: string;
  xp: number;
  rank: string;
  challenges_completed: number;
  quizzes_completed: number;
}

export interface BotStats {
  total_users: number;
  total_xp: number;
  top_user: { username: string; xp: number } | null;
}

export const botApi = {
  getUser: (discordId: string) => botFetch<BotUser>(`/user/${discordId}`),
  getLeaderboard: (limit = 10) => botFetch<{ leaderboard: LeaderboardEntry[] }>(`/leaderboard?limit=${limit}`),
  getStats: () => botFetch<BotStats>("/stats"),
};
