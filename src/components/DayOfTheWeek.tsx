import { ItemTypes } from '@/lib/Constants';
import { setPlanendDay } from '@/lib/setPlannedDay';
import { useDrop } from 'react-dnd';
import { ITodo } from 'src/types';
import { Todo } from './Todo';

interface Props {
  weekday: string;
  todos: ITodo[];
  setTodos: any;
}

export const DropWeekday = (props: Props) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item: any) => setPlanendDay(item.id, props.weekday, props.todos, props.setTodos)
  }));

  return (
    <div className="text-slate-300 flex flex-col w-full h-full border border-gray-600 rounded-lg" ref={drop}>
      <h2 className="w-full text-left pl-2 pt-1 text-slate-600">{props.weekday}</h2>
      <ul className="flex flex-col gap-2 p-2 px-4">
        {props.todos.map((todo: ITodo) => todo.planned_day === props.weekday && <Todo key={todo.id} todo={todo} />)}
      </ul>
    </div>
  );
};
