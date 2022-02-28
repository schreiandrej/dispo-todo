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

  return (
    <li
      className={`flex w-full cursor-pointer flex-row justify-between transition duration-150 ease-in-out focus:outline-none ${
        isDragging ? 'opacity-30' : 'opacity-100'
      }`}
      ref={drag}
    >
      <TodoPopover id={todo.id} todos={todos} setTodos={setTodos}>
        <div className={`truncate text-sm`}>{`${todo.task} ${todo?.additional_task_text ? `=> ${todo.additional_task_text}` : ''}`}</div>
      </TodoPopover>
    </li>
  );
};
