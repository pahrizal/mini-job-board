import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Creates a Supabase client for use in Server Components with proper cookie handling
 */
export async function createServerComponentClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle edge cases where cookies cannot be set
            console.warn('Could not set cookie', error)
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle edge cases where cookies cannot be removed
            console.warn('Could not remove cookie', error)
          }
        }
      }
    }
  )
}

// Export for backward compatibility
export const createMiddlewareClient = () => {
  throw new Error('createMiddlewareClient() has been removed. Please use the middleware from @supabase/ssr directly.')
}