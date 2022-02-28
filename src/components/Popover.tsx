import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { deleteTodo } from '@/lib/deleteTodo';
import { ITodo } from 'src/types';
import { useForm } from 'react-hook-form';
import { updateTodo } from '@/lib/udateTodo';
import { TrashIcon } from './SVG';

interface Props {
  children: ReactNode;
  id: string;
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export const TodoPopover = ({ children, id, todos, setTodos }: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    if (data) await updateTodo(id, todos, setTodos, data.additionalText);
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="focus:outline-none">{children}</Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-0 z-10 mt-3 w-96">
              {({ close }) => (
                <div className="flex flex-row items-center overflow-hidden rounded-lg bg-slate-800 px-2 shadow-lg ring-1 ring-black ring-opacity-5">
                  <form
                    onSubmit={handleSubmit(data => {
                      onSubmit(data);
                      close();
                    })}
                    className="w-full"
                  >
                    <input
                      type="text"
                      className="w-full border-none bg-transparent focus:outline-none focus:ring-0"
                      autoFocus
                      autoComplete="off"
                      {...register('additionalText')}
                    />
                  </form>
                  <button className="" onClick={() => deleteTodo(id, todos, setTodos)}>
                    <TrashIcon />
                  </button>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
