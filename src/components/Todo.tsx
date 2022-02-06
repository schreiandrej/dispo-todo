import { ITodo } from '../types';

import { ItemTypes } from '@/lib/Constants';
import { useDrag } from 'react-dnd';

type TodoProps = {
  todo: ITodo;
};

export const Todo = ({ todo }: TodoProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: todo.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <li className={`w-full block cursor-pointer shadow-sm ${isDragging ? 'opacity-50' : 'opacity-100'}`} ref={drag} id="test">
      <div className="flex items-center py-1 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div
            className={`text-sm leading-5 cursor-text truncate hover:text-gray-400 focus:outline-none focus:bg-gray-600 transition duration-150 ease-in-out`}
          >
            {todo.task}
          </div>
        </div>
      </div>
    </li>
  );
};
