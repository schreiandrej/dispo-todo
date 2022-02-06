import { supabase } from './initSupabase';

const todoTable = process.env.NODE_ENV === 'development' ? 'dev-todos' : 'todos';

export const setPlanendDay = async (id: string, day: string, update: boolean, setUpdate: any) => {
  try {
    const { data, error } = await supabase.from(todoTable).update({ planned_day: day }).eq('id', id).single();
    if (error) {
      throw new Error(error.message);
    }
    setUpdate(!update);
    console.log(day);
  } catch (error) {
    console.log('error', error);
  }
};
