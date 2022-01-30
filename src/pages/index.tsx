import { supabase } from '../lib/initSupabase';
import { Auth } from '@supabase/ui';
import TodoList from '../components/TodoList';

export default function Home() {
  const { user } = Auth.useUser();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {!user ? (
        <div className="w-1/3 flex justify-center bg-slate-700 items-center p-4 rounded-lg border border-emerald-300">
          <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge" />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center p-4" style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}>
          <TodoList user={supabase.auth.user()} />
          <button
            className="absolute top-3 right-3 px-6 py-2 text-black font-semibold transition-colors duration-300 ease-in-out bg-transparent border rounded-md border-black hover:text-opacity-60 hover:border-opacity-60"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) console.log('Error logging out:', error.message);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
