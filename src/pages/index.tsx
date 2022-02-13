import { supabase } from '../lib/initSupabase';
import { Auth } from '@supabase/ui';
import { TodoPlan } from '../components/TodoPlan';
import { DateComponent } from '@/components/DateComponent';
import { LogoutButton } from '@/components/LogoutButton';

export default function Home() {
  const { user } = Auth.useUser();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {!user ? (
        <div className="flex w-1/3 items-center justify-center rounded-lg border border-emerald-300 bg-slate-700 p-4">
          <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge" />
        </div>
      ) : (
        <div className="flex h-screen w-full flex-col items-center justify-center p-4">
          <DateComponent />
          <LogoutButton supabase={supabase} />
          <TodoPlan user={supabase.auth.user()} />
        </div>
      )}
    </div>
  );
}
