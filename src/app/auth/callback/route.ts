import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * Auth callback handler
 * 
 * This route is called by Supabase Auth after a user signs in with a third-party provider
 * or when they click on the confirmation link in the email.
 * 
 * It exchanges the code for a session and redirects the user to the home page or a 
 * specific URL provided in the redirect query parameter.
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (code) {
    const cookieStore = await cookies()

    // Create a Supabase client for the server context with cookie handling
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            try {
              cookieStore.set({ name, value, ...options })
            } catch (error) {
              console.warn('Could not set cookie', error)
            }
          },
          remove(name: string, options: any) {
            try {
              cookieStore.set({ name, value: '', ...options })
            } catch (error) {
              console.warn('Could not remove cookie', error)
            }
          },
        },
      }
    )
    
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)
  }
  
  // Get the redirect URL or default to the home page
  const redirectTo = requestUrl.searchParams.get('next') || '/'
  
  // Redirect the user to the specified URL
  return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
}