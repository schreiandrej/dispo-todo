import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  addTodo: (taskText: string) => Promise<void>;
}

export const InputField = (props: Props) => {
  const { handleSubmit, register, resetField, setFocus } = useForm();

  const onSubmit = (data: any) => {
    props.addTodo(data.task);
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
