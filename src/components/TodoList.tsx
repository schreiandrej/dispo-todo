import { User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import { useForm } from 'react-hook-form';
import { ITodo } from '../types';
import { Todo } from './Todo';

type TodosProps = {
  user: User | null;
};

export default function Todos({ user }: TodosProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [done, setDone] = useState<ITodo[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [errorText, setError] = useState('');
  const { handleSubmit, register, resetField, setFocus } = useForm();

  useEffect(() => {
    fetchTodos();
  }, []);

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

  const onSubmit = (data: any) => {
    addTodo(data.task);
    resetField('task');
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start p-5 items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 flex flex-col items-center justify-center gap-2 my-2">
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="..."
          autoComplete="off"
          value={newTaskText}
          {...register('task', { required: true })}
          onChange={e => {
            setError('');
            setNewTaskText(e.target.value);
          }}
        />
        <button type="submit" className="button-outlined">
          Add
        </button>
      </form>
      {!!errorText && <Alert text={errorText} />}
      <div className=" w-full flex justify-evenly mt-10">
        <div className="bg-white shadow overflow-hidden rounded-md w-1/3">
          <ul>{todos.map((todo: ITodo) => !todo.is_complete && <Todo key={todo.id} todo={todo} onDelete={() => deleteTodo(todo.id)} />)}</ul>
        </div>
        <div className="bg-white shadow overflow-hidden rounded-md w-1/3">
          <ul>{todos.map((todo: ITodo) => todo.is_complete && <Todo key={todo.id} todo={todo} onDelete={() => deleteTodo(todo.id)} />)}</ul>
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
