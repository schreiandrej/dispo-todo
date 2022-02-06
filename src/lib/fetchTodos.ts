import { supabase } from './initSupabase';

const todoTable = process.env.NODE_ENV === 'development' ? 'dev-todos' : 'todos';

export const fetchTodos = async (setTodos: any) => {
  const { data: todos, error } = await supabase.from(todoTable).select('*').order('id', { ascending: true });
  if (error) console.log('error', error);
  else if (todos === null) console.log('No data found!');
  else setTodos([...todos]);
};
