import { addTodo } from '@/lib/addTodo';
import { User } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ITodo } from 'src/types';
import { useTodos } from './Context';

interface Props {
  user: User | null;
}

export const InputField = ({ user }: Props) => {
  const { handleSubmit, register, resetField, setFocus } = useForm();
  const { todos, setTodos } = useTodos();

  const onSubmit = (data: any) => {
    addTodo(data.task, todos, setTodos, user);
    resetField('task');
  };

  useEffect(() => {
    setFocus('task');
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 flex flex-row items-center justify-center gap-2 my-2">
      <input
        className="rounded-lg w-full p-2 focus:ring-1 focus:ring-gray-300 focus:border-black bg-transparent"
        type="text"
        placeholder="..."
        autoComplete="off"
        {...register('task', { required: true })}
      />
    </form>
  );
};
