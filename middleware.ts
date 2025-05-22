import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = ['/upload', '/profile']
const publicRoutes = ['/login', '/register', '/', '/about']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  //const isProtectedRoute = protectedRoutes.includes(path)
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route)) //-> redirecting to login if profile/something

  const isPublicRoute = publicRoutes.includes(path)

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  // 4. Redirect to /login if the user is not authenticated and trying to access a protected route
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 5. Redirect to / if the user is authenticated and trying to access login/register
  if (isPublicRoute && session?.userId && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}