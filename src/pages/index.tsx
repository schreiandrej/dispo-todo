import { useState } from 'react';
import { supabase } from '../lib/initSupabase';
import { Auth } from '@supabase/ui';
import { TodoPlan } from '../components/TodoPlan';
import { DateComponent } from '@/components/DateComponent';
import { ICity } from 'src/types';
import { cities } from '@/lib/Constants';

export default function Home() {
  const { user } = Auth.useUser();
  const [cityWeather, setCityWeather] = useState<ICity>(cities[0]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {!user ? (
        <div className="flex w-1/3 items-center justify-center rounded-lg border border-emerald-300 bg-slate-700 p-4">
          <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge" />
        </div>
      ) : (
        <div className="flex h-screen w-screen flex-col items-center justify-center p-6">
          <DateComponent cityWeather={cityWeather} setCityWeather={setCityWeather} />
          <TodoPlan user={supabase.auth.user()} cityWeather={cityWeather} />
        </div>
      )}
    </div>
  );
}
