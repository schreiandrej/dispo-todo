import { ITodo } from 'src/types';
import { supabase, todoTable } from './initSupabase';

export const updateTodo = async (id: string, todos: ITodo[], setTodos: any, additionalTaskText: string) => {
  const { data: todo, error } = await supabase.from(todoTable).update({ additional_task_text: additionalTaskText }).eq('id', id);
  if (todo) {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos([...filteredTodos, ...todo]);
  } else {
    console.log(error);
  }
};
