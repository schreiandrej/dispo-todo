import { User } from '@supabase/supabase-js';
import { useState, useLayoutEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import { ITodo } from '../types';
import { Todo } from './Todo';
import { InputField } from './InputField';
import { Title } from './Title';

type TodosProps = {
  user: User | null;
};

const todoTable = process.env.NODE_ENV === 'development' ? 'dev-todos' : 'todos';

export default function Todos({ user }: TodosProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [errorText, setError] = useState('');
  const [update, setUpdate] = useState<boolean>(true);

  useLayoutEffect(() => {
    fetchTodos();
    console.log(todos);
  }, [update]);

  const fetchTodos = async () => {
    const { data: todos, error } = await supabase.from(todoTable).select('*').order('id', { ascending: true });
    if (error) console.log('error', error);
    else if (todos === null) console.log('No data found!');
    else setTodos(todos);
  };
  const addTodo = async (taskText: string) => {
    const task = taskText.trim();
    if (task.length) {
      const { data: todo, error } = await supabase.from(todoTable).insert({ task, user_id: user?.id }).single();
      if (error) setError(error.message);
      else setTodos([...todos, todo]);
    }
  };
  const deleteTodo = async (id: string) => {
    try {
      await supabase.from(todoTable).delete().eq('id', id);
      setTodos(todos.filter((x: ITodo) => x.id != id));
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start p-5 items-center">
      <InputField addTodo={addTodo} />

      <div className="flex w-full h-full gap-8 py-24 px-56">
        <div className="w-full h-full">
          <Title title="offene Aufträge" />
          <div className="w-full h-full border border-gray-600 rounded-lg">
            <ul className="flex flex-col gap-2 p-4">
              {todos.map(
                (todo: ITodo) =>
                  !todo.is_complete && <Todo key={todo.id} todo={todo} onDelete={() => deleteTodo(todo.id)} update={update} setUpdate={setUpdate} />
              )}
            </ul>
          </div>
        </div>
        <div className="w-full h-full">
          <Title title="verplante Aufträge" />
          <div className="w-full h-full border border-gray-600 text-slate-500 rounded-lg">
            <ul className="flex flex-col gap-2 p-4">
              {todos.map(
                (todo: ITodo) =>
                  todo.is_complete && <Todo key={todo.id} todo={todo} onDelete={() => deleteTodo(todo.id)} update={update} setUpdate={setUpdate} />
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const Alert = ({ text }: { text: string }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
);
