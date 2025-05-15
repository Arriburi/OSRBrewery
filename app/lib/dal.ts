import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import sqlite3 from "sqlite3"
import { open } from "sqlite"

async function openDB() {
  return open({
    filename: "./app/db/database.db",
    driver: sqlite3.Database,
  })
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/login')
  }

  return { isAuth: true, userId: session.userId, username: session.username }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null

  try {
    const db = await openDB()
    const user = await db.get(
      'SELECT id, username, email FROM users WHERE id = ?',
      [session.userId]
    )

    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return null
  }
})

export const updateUser = cache(async (userId: number, data: { username?: string; email?: string }) => {
  const session = await verifySession()
  if (!session || session.userId !== userId) {
    throw new Error('Unauthorized')
  }

  try {
    const db = await openDB()
    const updates = []
    const values = []

    if (data.username) {
      updates.push('username = ?')
      values.push(data.username)
    }
    if (data.email) {
      updates.push('email = ?')
      values.push(data.email)
    }

    if (updates.length === 0) return null

    values.push(userId)
    await db.run(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    )

    return await getUser()
  } catch (error) {
    console.error('Failed to update user:', error)
    return null
  }
}) 