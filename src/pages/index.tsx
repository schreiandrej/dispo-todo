import { supabase } from '../lib/initSupabase';
import { Auth } from '@supabase/ui';
import TodoList from '../components/TodoList';
import { DateComponent } from '@/components/DateComponent';
import { LogoutButton } from '@/components/LogoutButton';

export default function Home() {
  const { user } = Auth.useUser();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {!user ? (
        <div className="w-1/3 flex justify-center bg-slate-700 items-center p-4 rounded-lg border border-emerald-300">
          <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge" />
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col justify-center items-center p-4" style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}>
          <DateComponent />
          <LogoutButton supabase={supabase} />
          <TodoList user={supabase.auth.user()} />
        </div>
      )}
    </div>
  );
}
