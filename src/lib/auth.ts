import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Discord from 'next-auth/providers/discord'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })
        if (!user || !user.password) return null
        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )
        if (!valid) return null
        return { id: user.id, name: user.username, email: user.email }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account, profile }) {
      if (user) token.name = user.name
      // When signing in with Discord, store the Discord user ID
      if (account?.provider === 'discord' && profile) {
        token.discordId = (profile as any).id
      }
      return token
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      if (token.name) session.user.name = token.name
      // Pass Discord ID to session so dashboard can fetch bot data
      if (token.discordId) (session.user as any).discordId = token.discordId
      return session
    },
  },
})