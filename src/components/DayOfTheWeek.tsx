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
    <div className="relative flex h-full w-full flex-col rounded-md border border-slate-800 p-1" ref={drop}>
      <div className="mb-2 flex items-start justify-between">
        <h2 className="w-full pl-2 text-left text-sm text-slate-600 underline">{weatherState?.formatDate}</h2>
        <div className="absolute top-1 right-1 flex flex-row pr-2 text-right text-sm text-slate-600">
          <div className={`-mr-1 ${parseInt(weatherState!.temperature) < 0 && 'text-red-600 opacity-100'}`}>{weatherState?.temperature}</div>
          <div className="-mt-3 -mr-5">{weatherState?.weatherIcon}</div>
        </div>
      </div>
      <ul className="flex flex-col pl-2">{todos.map((todo: ITodo) => todo.planned_day === weekday.toString() && <Todo key={todo.id} todo={todo} />)}</ul>
    </div>
  );
};
