import { SupabaseClient } from '@supabase/supabase-js';
import React from 'react';

interface Props {
  supabase: SupabaseClient;
}

export const LogoutButton = ({ supabase }: Props) => {
  return (
    <button
      className="absolute top-3 right-3 px-6 py-2 text-black opacity-30 font-semibold transition-opacity duration-300 ease-in-out bg-transparent border rounded-md border-black hover:opacity-100"
      onClick={async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log('Error logging out:', error.message);
      }}
    >
      Logout
    </button>
  );
};
