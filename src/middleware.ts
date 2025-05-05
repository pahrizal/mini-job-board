import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Supabase Auth Middleware
 * 
 * This middleware:
 * 1. Refreshes the user's session on each request
 * 2. Protects routes that require authentication
 * 3. Redirects users based on authentication state
 */
export async function middleware(request: NextRequest) {
  try {
    // Create a response to modify its cookies
    let response = NextResponse.next()

    // Create a Supabase client using server components
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: { expires?: Date; path?: string; domain?: string; secure?: boolean; sameSite?: 'strict' | 'lax' | 'none' }) {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: { path?: string; domain?: string }) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )

    // Add cache control headers to prevent caching for auth-dependent pages
    response.headers.set('Cache-Control', 'no-store, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

    // Refresh the session
    const { data: { session } } = await supabase.auth.getSession()

    // Define paths that require authentication
    const protectedPaths = ['/dashboard', '/jobs/new', '/jobs/edit']
    const path = request.nextUrl.pathname

    // Check if the current path requires authentication
    const isProtectedPath = protectedPaths.some(protectedPath =>
      path === protectedPath || path.startsWith(`${protectedPath}/`))

    // Redirect unauthenticated users from protected routes
    if (isProtectedPath && !session) {
      const redirectUrl = new URL('/auth/signin', request.url)
      redirectUrl.searchParams.set('message', 'Please sign in to access this page')
      redirectUrl.searchParams.set('next', path)
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect authenticated users away from auth pages
    if ((path.startsWith('/auth/signin') || path.startsWith('/auth/signup')) && session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    // In case of error, proceed to the page without session refresh
    return NextResponse.next()
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Apply middleware to all routes except static assets, API routes, and the auth callback
    '/((?!_next/static|_next/image|favicon.ico|public|api|auth/callback).*)',
  ],
}