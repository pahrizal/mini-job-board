import { createServerClient } from '@supabase/ssr'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!


// Export for backward compatibility
export const createMiddlewareClient = () => {
  throw new Error('createMiddlewareClient() has been removed. Please use the middleware from @supabase/ssr directly.')
}

export const supabase = (cookieStore:ReadonlyRequestCookies) => createServerClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  }
);
