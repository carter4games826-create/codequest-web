import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { botApi, BotUser } from '@/lib/botApi'
import DashboardClient from './DashboardClient'

async function getBotUser(discordId: string | undefined): Promise<BotUser | null> {
  if (!discordId) return null
  try {
    return await botApi.getUser(discordId)
  } catch {
    return null
  }
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/')

  const discordId = (session.user as any)?.discordId as string | undefined
  const botUser = await getBotUser(discordId)

  return <DashboardClient session={session} botUser={botUser} />
}