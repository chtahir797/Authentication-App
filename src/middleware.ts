import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || ''
  const path = request.nextUrl.pathname
  const isPublicPath = ['/signin', '/signup', '/verifyemail', '/resetpassword', '/createnewpassword'].includes(path)

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/signin',
    '/signup',
    '/verifyemail',
    '/resetpassword',
    '/createnewpassword'
  ],
}
