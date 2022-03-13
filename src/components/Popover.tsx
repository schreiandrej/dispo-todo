import { Dispatch, Fragment, ReactNode, SetStateAction, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { deleteTodo } from '@/lib/deleteTodo';
import { ITodo } from 'src/types';
import { useForm } from 'react-hook-form';
import { updateTodo } from '@/lib/updateTodo';
import { CopyIcon, TrashIcon } from './SVG';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DatepickerComponent } from './Datepicker';

interface Props {
  children: ReactNode;
  id: string;
  customerID: string;
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export const TodoPopover = ({ children, id, customerID, todos, setTodos }: Props) => {
  const { register, handleSubmit } = useForm();
  const [todoTimer, setTodoTimer] = useState(false);

  const onSubmit = async (data: any) => {
    if (data) await updateTodo(id, todos, setTodos, data.additionalText);
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="w-full focus:outline-none">{children}</Popover.Button>
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
                <div className="flex flex-col bg-black">
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
                    <div className="flex flex-row gap-1">
                      <input
                        className="focus:ring-none appearance-none rounded-sm border-gray-600 bg-transparent checked:bg-transparent hover:cursor-pointer hover:border-gray-200 checked:hover:bg-slate-500 focus:border-gray-600 focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-gray-500 checked:focus:bg-transparent"
                        type="checkbox"
                        name="reminder"
                        checked={todoTimer}
                        onChange={e => setTodoTimer((e.target as HTMLInputElement).checked)}
                      />
                      <CopyToClipboard text={customerID}>
                        <button onClick={() => close()}>
                          <CopyIcon />
                        </button>
                      </CopyToClipboard>
                      <button className="" onClick={() => deleteTodo(id, todos, setTodos)}>
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                  {todoTimer && <DatepickerComponent />}
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
