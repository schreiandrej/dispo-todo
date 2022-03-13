import { ITodo } from '../types';
import { ItemTypes } from '@/lib/Constants';
import { useDrag } from 'react-dnd';
import { useTodos } from './Context';
import { TodoPopover } from '@/components/Popover';

type TodoProps = {
  todo: ITodo;
};

export const Todo = ({ todo }: TodoProps) => {
  const { todos, setTodos } = useTodos();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: todo.id, todos: todos },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const splitTask = (task: string) => {
    const items = task.replaceAll(' ', '').split(',');

    if (items.length > 1) {
      return { id: items[0], customer: items[1], city: items[2] };
    }

    return { id: '', customer: items[0], city: '' };
  };

  return (
    <TodoPopover id={todo.id} customerID={splitTask(todo.task).id} todos={todos} setTodos={setTodos}>
      <li
        className={`flex w-full cursor-pointer flex-row justify-between transition duration-150 ease-in-out hover:opacity-50 focus:outline-none ${
          isDragging ? 'opacity-30' : 'opacity-100'
        }`}
        ref={drag}
      >
        <div className={`text-md truncate`}>
          <span className="font-semibold">{splitTask(todo.task).customer}</span> <span className="text-sm text-gray-400">{splitTask(todo.task).city}</span>{' '}
          <span className="text-sm text-gray-400">{splitTask(todo.task).id}</span>
          {todo?.additional_task_text ? (
            <span>
              <span className="text-gray-400">{' => '}</span> <span>{todo.additional_task_text}</span>
            </span>
          ) : (
            ''
          )}
        </div>
      </li>
    </TodoPopover>
  );
};
