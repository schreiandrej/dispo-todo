import { ItemTypes } from '@/lib/Constants';
import { supabase, todoTable } from '@/lib/initSupabase';
import { useDrop } from 'react-dnd';
import { ITodo } from 'src/types';
import { useTodos } from './Context';
import { Todo } from './Todo';

interface Props {
  weekday: string;
}

export const DropWeekday = (props: Props) => {
  const { todos, setTodos } = useTodos();

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: async (item: any) => {
      try {
        const { data, error } = await supabase.from(todoTable).update({ planned_day: props.weekday }).eq('id', item.id).single();
        if (error) {
          throw new Error(error.message);
        }
        setTodos(prev => [...prev.filter(todo => todo.id !== item.id), data]);
      } catch (error) {
        console.log('error', error);
      }
    }
  }));

  return (
    <div className="text-slate-400 flex flex-col w-full h-full border border-gray-700 rounded-lg" ref={drop}>
      <h2 className="w-full text-center pr-2 pt-1 text-slate-600">{props.weekday}</h2>
      <ul className="flex flex-col gap-2 p-2 px-4">{todos.map((todo: ITodo) => todo.planned_day === props.weekday && <Todo key={todo.id} todo={todo} />)}</ul>
    </div>
  );
};
