import { addTodo } from '@/lib/addTodo';
import { User } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTodos } from './Context';

interface Props {
  user: User | null;
}

export const InputField = ({ user }: Props) => {
  const { handleSubmit, register, resetField, setFocus } = useForm();
  const { todos, setTodos } = useTodos();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    addTodo(data.task, todos, setTodos, user);
    resetField('task');
  };

  useEffect(() => {
    setFocus('task');
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-2 flex w-1/3 flex-row items-center justify-center gap-2">
      <input
        className="w-full rounded-lg bg-transparent p-2 focus:border-black focus:ring-1 focus:ring-gray-300"
        type="text"
        placeholder="..."
        autoComplete="off"
        {...register('task', { required: true })}
      />
    </form>
  );
};
