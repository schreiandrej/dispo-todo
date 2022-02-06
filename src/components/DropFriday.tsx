import { ItemTypes, WeekDays } from '@/lib/Constants';
import { setPlanendDay } from '@/lib/setPlannedDay';
import { useDrop } from 'react-dnd';
import { ITodo } from 'src/types';
import { Todo } from './Todo';

interface Props {
  update: boolean;
  setUpdate: any;
  todos: ITodo[];
}

export const DropFriday = (props: Props) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item: any) => setPlanendDay(item.id, WeekDays.FREITAG, props.update, props.setUpdate)
  }));

  return (
    <div className="w-full h-full border border-gray-600 text-slate-500 rounded-lg" ref={drop}>
      <ul className="flex flex-col gap-2 p-4">
        {props.todos.map((todo: ITodo) => todo.planned_day === WeekDays.FREITAG && <Todo key={todo.id} todo={todo} />)}
      </ul>
    </div>
  );
};
