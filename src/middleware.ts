import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || ''
  const path = request.nextUrl.pathname
  let isPublicpath = path === '/signin' || path === 'signup' || path === 'verifyemail' || path === '/resetpassword' || path === '/createnewpassword'

  if (token && isPublicpath) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (!token && !isPublicpath) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

// See "Matching Paths" below to learn more
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