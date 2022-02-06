import { User } from '@supabase/supabase-js';
import { ITodo } from 'src/types';
import { supabase } from './initSupabase';

const todoTable = process.env.NODE_ENV === 'development' ? 'dev-todos' : 'todos';

export const addTodo = async (taskText: string, todos: ITodo[], setTodos: any, user: User | null) => {
  const task = taskText.trim();
  if (task.length) {
    const { data: todo, error } = await supabase.from(todoTable).insert({ task, user_id: user?.id, planned_day: 'not_planned' }).single();
    if (error) console.log(error.message);
    else setTodos([...todos, todo]);
  }
};
