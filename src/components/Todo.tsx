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

    return { id: items[0], customer: items[1], city: items[2] };
  };

  return (
    <li
      className={`flex w-full cursor-pointer flex-row justify-between transition duration-150 ease-in-out focus:outline-none ${
        isDragging ? 'opacity-30' : 'opacity-100'
      }`}
      ref={drag}
    >
      <TodoPopover id={todo.id} todos={todos} setTodos={setTodos}>
        <div className={`truncate text-sm`}>
          <span className="text-gray-500">{splitTask(todo.task).id}</span> <span className="">{splitTask(todo.task).customer}</span>
          {todo?.additional_task_text ? (
            <span>
              <span className="text-gray-500">{' => '}</span> <span>{todo.additional_task_text}</span>
            </span>
          ) : (
            ''
          )}
        </div>
      </TodoPopover>
    </li>
  );
};
