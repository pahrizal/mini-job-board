'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@/lib/supabase';

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);    
    try {
      const supabase = createClientComponentClient();
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }      
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="text-sm font-medium text-slate-700 hover:text-slate-900 disabled:opacity-50"
      aria-label="Sign out"
    >
      {isLoading ? 'Signing out...' : 'Sign out'}
    </button>
  );
}