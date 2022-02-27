import { ITodo } from 'src/types';
import { supabase, todoTable } from './initSupabase';

export const updateTodo = async (id: string, todos: ITodo[], setTodos: any, newTaskText: string) => {
  console.log(id);

  const { data, error } = await supabase.from(todoTable).update({ tast: newTaskText }).eq('id', id);

  if (data) {
    console.log(data);
  } else {
    console.log(error?.message);
  }
};
