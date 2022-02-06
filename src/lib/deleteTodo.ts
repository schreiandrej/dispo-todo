import { ITodo } from 'src/types';
import { supabase, todoTable } from './initSupabase';

export const deleteTodo = async (id: string, todos: ITodo[], setTodos: any) => {
  try {
    await supabase.from(todoTable).delete().eq('id', id);
    setTodos(todos.filter((x: ITodo) => x.id != id));
  } catch (error) {
    console.log('error', error);
  }
};
