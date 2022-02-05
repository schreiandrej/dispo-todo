import { supabase } from '@/lib/initSupabase';
import { Dispatch, SetStateAction, useState } from 'react';
import { ITodo } from '../types';

type TodoProps = {
  todo: ITodo;
  onDelete: () => Promise<void>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};

export const Todo = ({ todo, onDelete, update, setUpdate }: TodoProps) => {
  const [isCompleted, setIsCompleted] = useState(todo.is_complete);

  const toggle = async () => {
    try {
      const { data, error } = await supabase.from('todos').update({ is_complete: !isCompleted }).eq('id', todo.id).single();
      if (error) {
        throw new Error(error.message);
      }
      setIsCompleted(data.is_complete);
      setUpdate(!update);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <li
      onClick={toggle}
      className="w-full block cursor-pointer hover:text-gray-400 focus:outline-none focus:bg-gray-600 transition duration-150 ease-in-out shadow-sm "
    >
      <div className="flex items-center py-1 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className={`text-sm leading-5 truncate `}>{todo.task}</div>
        </div>
        <button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          className="w-4 h-4 ml-2"
        >
          <svg
            className="opacity-30 transition-opacity duration-150 ease-out hover:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gray"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};
