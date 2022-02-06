import { User } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { ITodo } from '../types';
import { Todo } from './Todo';
import { InputField } from './InputField';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/lib/Constants';
import { fetchTodos } from '@/lib/fetchTodos';
import { DropWeekday } from './DayOfTheWeek';
import { weekdays } from '@/lib/Constants';
import { useTodos } from './Context';
import { supabase, todoTable } from '@/lib/initSupabase';

type TodosProps = {
  user: User | null;
};

export default function Todos({ user }: TodosProps) {
  const { todos, setTodos } = useTodos();

  useEffect(() => {
    (async () => {
      const data = await fetchTodos();
      data && setTodos(data);
    })();
  }, [setTodos]);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: async (item: any) => {
      try {
        const { data, error } = await supabase.from(todoTable).update({ planned_day: 'not_planned' }).eq('id', item.id).single();
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
    <div className="w-screen h-screen flex flex-col justify-start p-5 items-center">
      <InputField user={user} />

      {todos && (
        <div className="flex w-full h-full gap-8 pt-5">
          <div className="w-1/4 h-full">
            <div className="w-full h-full border border-gray-600 rounded-lg" ref={drop}>
              <ul className="flex flex-col gap-2 p-4">
                {todos.map((todo: ITodo) => todo.planned_day === 'not_planned' && <Todo key={todo.id} todo={todo} />)}
              </ul>
            </div>
          </div>
          <div className="w-full h-full grid grid-cols-3 grid-cols-fr grid-rows-2 gap-2">
            {weekdays.map(day => (
              <DropWeekday key={day} weekday={day} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
