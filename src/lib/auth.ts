'use client';

import { createClientComponentClient } from './supabase';

/**
 * DEPRECATED: Use createClientComponentClient() or createServerComponentClient() directly
 * This helper is kept for backward compatibility
 */
export async function getUserSession() {
  console.warn('getUserSession() is deprecated. Use createClientComponentClient() or createServerComponentClient() directly.');
  
  try {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Auth error:', error.message);
      return null;
    }
    
    return data.session;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error getting user session:', errorMessage);
    return null;
  }
}

/**
 * DEPRECATED: Use supabase.auth.signOut() directly
 * This helper is kept for backward compatibility
 */
export async function signOut() {
  console.warn('signOut() is deprecated. Use createClientComponentClient().auth.signOut() directly.');
  
  try {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    // Clear localStorage and sessionStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('sb-auth-token');
        sessionStorage.clear();
      } catch (e) {
        console.error('Error clearing storage:', e);
      }
    }
    
    return true;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error signing out:', errorMessage);
    return false;
  }
}