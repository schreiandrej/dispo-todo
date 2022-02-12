import { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ITodo } from '../types';
import { ItemTypes } from '@/lib/Constants';
import { useDrag } from 'react-dnd';
import { useTodos } from './Context';
import { deleteTodo } from '@/lib/deleteTodo';

type TodoProps = {
  todo: ITodo;
};

export const Todo = ({ todo }: TodoProps) => {
  const { todos, setTodos } = useTodos();
  const [copiedState, setCopiedState] = useState<boolean>(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: todo.id, todos: todos },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <li
      className={`block w-full cursor-pointer transition duration-150 ease-in-out hover:text-gray-400 focus:bg-gray-600 focus:outline-none ${
        isDragging ? 'opacity-30' : 'opacity-100'
      }`}
      ref={drag}
    >
      <div className="flex items-center py-1">
        <div className="group flex w-full flex-1 items-center justify-between">
          <CopyToClipboard text={todo.task.slice(0, 7)} onCopy={() => setCopiedState(true)}>
            <div data-tip data-for={todo.task} className={`truncate text-sm leading-5`} onMouseLeave={() => setCopiedState(false)}>
              {todo.task}
            </div>
          </CopyToClipboard>
          <div className={copiedState ? 'opacity-100' : 'opacity-0'}>
            <ReactTooltip id={todo.task} type="info" effect="float" place="top">
              copied!
            </ReactTooltip>
          </div>
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              deleteTodo(todo.id, todos, setTodos);
            }}
            className={`opacity-0 group-hover:opacity-100`}
          >
            <svg
              className="h-4 w-4 opacity-30 transition-opacity duration-150 ease-out hover:opacity-100"
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
      </div>
    </li>
  );
};
