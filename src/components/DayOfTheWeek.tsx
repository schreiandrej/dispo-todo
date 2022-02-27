/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ItemTypes } from '@/lib/Constants';
import { supabase, todoTable } from '@/lib/initSupabase';
import { useDrop } from 'react-dnd';
import { ITodo, IWeatherForcast, IWeatherState } from 'src/types';
import { useTodos } from './Context';
import { Todo } from './Todo';
import { useEffect, useState } from 'react';
import { getWeather } from '@/lib/getWeather';

interface Props {
  weekday: number;
  weather: IWeatherForcast[];
}

export const DayOfTheWeek = ({ weekday, weather }: Props) => {
  const { todos, setTodos } = useTodos();
  const [weatherState, setWeatherState] = useState<IWeatherState | null>(null);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    drop: async (item: any) => {
      try {
        const { data, error } = await supabase.from(todoTable).update({ planned_day: weekday }).eq('id', item.id).single();
        if (error) {
          throw new Error(error.message);
        }
        setTodos(prev => [...prev.filter(todo => todo.id !== item.id), data]);
      } catch (error) {
        console.log('error', error);
      }
    }
  }));

  useEffect(() => {
    getWeather(weekday, weather, setWeatherState);
  }, [weather, weekday]);

  return (
    <div className="w-fulljustify-between relative flex h-full rounded-md border border-gray-700 p-1" ref={drop}>
      <ul className="mr-56 flex flex-grow flex-col pl-2">
        {todos.map((todo: ITodo) => todo.planned_day === weekday.toString() && <Todo key={todo.id} todo={todo} />)}
      </ul>
      <div className="flex h-full flex-col items-end pr-2 text-right text-sm">
        <h2 className="mb-2 w-full pl-2 text-left">{weatherState?.formatDate}</h2>
        <div className="flex flex-row justify-end">
          <div className={`${weatherState?.temperature && parseInt(weatherState?.temperature) < 0 && 'text-red-600 opacity-100'}`}>
            {weatherState?.temperature}
          </div>
          <div className="">{weatherState?.weatherIcon}</div>
        </div>
        <div className="">{weatherState?.weatherDescription}</div>
      </div>
    </div>
  );
};
