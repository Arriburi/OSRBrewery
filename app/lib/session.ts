import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/app/lib/definitions'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
  throw new Error('SESSION_SECRET is not set in environment variables')
}
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  console.log('Encrypting session for user:', payload.userId);
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  if (!session) {
    console.log('No session token provided');
    return null;
  }
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    console.log('Session decrypted for user:', payload.userId);
    return payload
  } catch (error) {
    console.log('Session verification failed:', error);
    return null
  }
}

export async function createSession(payload: SessionPayload) {
  console.log('Creating session for user:', payload.userId);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt(payload)
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export const verifySession = async (): Promise<SessionPayload | null> => {
  const cookie = (await cookies()).get('session')?.value
  console.log('Verifying session, cookie exists:', !!cookie);

  const session = await decrypt(cookie)
  if (!session) {
    console.log('No valid session found');
    return null;
  }

  const sessionPayload: SessionPayload = {
    userId: session?.userId as number,
    username: session?.username as string,
  }
  return sessionPayload;
}

export const getUserSession = async (): Promise<SessionPayload | null> => {
  const session = await verifySession()
  console.log('User session status:', session ? 'Found' : 'Not found');
  return session;
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    console.log('No session to update');
    return null
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  console.log('Deleting session');
  const cookieStore = await cookies()
  cookieStore.delete('session')
}



