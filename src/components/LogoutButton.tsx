import { SupabaseClient } from '@supabase/supabase-js';
import React from 'react';

interface Props {
  supabase: SupabaseClient;
}

export const LogoutButton = ({ supabase }: Props) => {
  return (
    <button
      className="absolute top-3 right-12 rounded-md border border-gray-600 bg-transparent px-6 py-2 font-semibold opacity-30 transition-opacity duration-300 ease-in-out hover:opacity-100"
      onClick={async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log('Error logging out:', error.message);
      }}
    >
      Logout
    </button>
  );
};
