import { Fragment, useState, useEffect } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { User } from '@supabase/supabase-js';
import { searchForCurrentValue } from '@/lib/searchForCurrenValue';
import { useTodos } from './Context';
import { addTodo } from '@/lib/addTodo';

interface Props {
  user: User | null;
}

export const CommandPalette = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [combolist, setCombolist] = useState<any>(null);
  const [query, setQuery] = useState('');
  const { todos, setTodos } = useTodos();

  function closeModal() {
    setIsOpen(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setSelected(data);
    if (data.length > 0) {
      addTodo(data, todos, setTodos, user);
    }
    closeModal();
  };

  useEffect(() => {
    function onKeyDown(event: any) {
      if (event.key === 'ö' && event.ctrlKey) {
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
                <Combobox value={selected} onChange={data => onSubmit(data)}>
                  <div className="relative">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                      <Combobox.Input
                        className="w-full border-none py-2 pl-10 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        placeholder="Search..."
                        autoFocus
                        autoComplete="off"
                        displayValue={(customer: any) => (customer.name ? customer.name : '')}
                        onChange={async event => {
                          setQuery(event.target.value);
                          const data = await searchForCurrentValue(event.target.value);
                          if (data) setCombolist(data);
                        }}
                      />
                      <Combobox.Button className="absolute inset-y-0 left-2 flex items-center pr-2">
                        <SearchIcon />
                      </Combobox.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterLeave={() => setQuery('')}
                    >
                      <Combobox.Options
                        static
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        {combolist?.length === 0 && query !== '' ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
                        ) : (
                          combolist?.map((customer: any) => (
                            <Combobox.Option
                              key={customer.value}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-sky-600 text-white' : 'text-gray-900'}`
                              }
                              value={customer.value}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{customer.name}</span>
                                  {selected ? (
                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-sky-800'}`}>
                                      <CheckIcon />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
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
