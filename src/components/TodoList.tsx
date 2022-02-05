import { User } from '@supabase/supabase-js';
import { useState, useEffect, useLayoutEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import { useForm } from 'react-hook-form';
import { ITodo } from '../types';
import { customers } from '@/lib/customers';
import { Todo } from './Todo';

type TodosProps = {
  user: User | null;
};

export default function Todos({ user }: TodosProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [errorText, setError] = useState('');
  const { handleSubmit, register, resetField, setFocus } = useForm();
  const [update, setUpdate] = useState<boolean>(true);

  useLayoutEffect(() => {
    fetchTodos();
    console.log(todos);
  }, [update]);

  useEffect(() => {
    setFocus('task');
  }, [setFocus]);

  const fetchTodos = async () => {
    const { data: todos, error } = await supabase.from('todos').select('*').order('id', { ascending: true });
    if (error) console.log('error', error);
    else setTodos(todos);
  };
  const addTodo = async (taskText: string) => {
    const task = taskText.trim();
    if (task.length) {
      const { data: todo, error } = await supabase.from('todos').insert({ task, user_id: user?.id }).single();
      if (error) setError(error.message);
      else setTodos([...todos, todo]);
    }
  };
  const deleteTodo = async (id: string) => {
    try {
      await supabase.from('todos').delete().eq('id', id);
      setTodos(todos.filter((x: ITodo) => x.id != id));
    } catch (error) {
      console.log('error', error);
    }
  };

  const addWeekly = () => {
    customers.forEach(async (customer: string) => {
      await addTodo(customer);
    });
  };

  const onSubmit = (data: any) => {
    addTodo(data.task);
    resetField('task');
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start p-5 items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 flex flex-row items-center justify-center gap-2 my-2">
        <input
          className="rounded-lg w-full p-2 focus:ring-1 focus:ring-gray-300 focus:border-black"
          type="text"
          placeholder="..."
          autoComplete="off"
          {...register('task', { required: true })}
        />
        <button type="submit" className="rounded-lg border border-black py-2 px-4">
          +
        </button>
      </form>
      {!!errorText && <Alert text={errorText} />}
      {/* <button type="button" className="absolute top-10 left-5" onClick={addWeekly}>
        add weekly
      </button> */}
      <div className="flex w-full h-full gap-8 py-24 px-56">
        <div className="w-full h-full">
          <h2 className="w-full text-center font-semibold pb-4">Offen</h2>
          <div className="w-full h-full border border-gray-400 rounded-lg">
            <ul className="flex flex-col gap-2 p-4">
              {todos.map(
                (todo: ITodo) =>
                  !todo.is_complete && <Todo key={todo.id} todo={todo} onDelete={() => deleteTodo(todo.id)} update={update} setUpdate={setUpdate} />
              )}
            </ul>
          </div>
        </div>
        <div className="w-full h-full">
          <h2 className="w-full text-center font-semibold pb-4">Verplant</h2>
          <div className="w-full h-full border border-gray-400 rounded-lg">
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
