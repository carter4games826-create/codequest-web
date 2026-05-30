import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { username, email, password } = await req.json()

  if (!username || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const exists = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  })

  if (exists) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: { username, email, password: hashed },
  })

  return NextResponse.json({ success: true })
}