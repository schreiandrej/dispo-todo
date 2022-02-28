import { addTodo } from '@/lib/addTodo';
import { useForm } from 'react-hook-form';
import { useTodos } from './Context';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { User } from '@supabase/supabase-js';

interface Props {
  user: User | null;
}

export const InputField = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, register, resetField, setFocus } = useForm();
  const { todos, setTodos } = useTodos();

  function closeModal() {
    setIsOpen(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    addTodo(data.task, todos, setTodos, user);
    resetField('task');
    closeModal();
  };

  useEffect(() => {
    function onKeyDown(event: any) {
      if (event.key === 'ä' && event.ctrlKey) {
        setIsOpen(!isOpen);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.addEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto pt-[25vh]" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500/50" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl transform rounded-2xl bg-white text-left align-middle shadow-xl ring-black/5 transition-all">
                <form onSubmit={handleSubmit(onSubmit)} className="my-2 flex w-full flex-row items-center justify-center gap-2">
                  <input
                    className="w-full border-none bg-transparent focus:ring-0"
                    type="text"
                    placeholder="custom text..."
                    autoComplete="off"
                    {...register('task', { required: true })}
                  />
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export const SearchIcon = () => {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
};

export const CheckIcon = () => {
  return (
    <svg className="h-5 w-5" fill="none" aria-hidden="true" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
};
