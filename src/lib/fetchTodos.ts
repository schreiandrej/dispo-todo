import { ITodo } from 'src/types';
import { supabase } from './initSupabase';

const todoTable = process.env.NODE_ENV === 'development' ? 'dev-todos' : 'todos';

export const fetchTodos = async (): Promise<ITodo[] | null> => {
  const { data, error } = await supabase.from(todoTable).select('*').order('id', { ascending: true });

  error && console.log(error.message);

  if (data) return data;

  return null;
};
