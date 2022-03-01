/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ItemTypes } from '@/lib/Constants';
import { supabase, todoTable } from '@/lib/initSupabase';
import { useDrop } from 'react-dnd';
import { ITodo, IWeatherForcast, IWeatherState } from 'src/types';
import { useTodos } from './Context';
import { Todo } from './Todo';
import { useEffect, useState } from 'react';
import { getWeather } from '@/lib/getWeather';
import { WeatherDisplay } from './WeatherDisplay';

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
    <div className="w-fulljustify-between relative flex h-full rounded-md border border-gray-800 p-1" ref={drop}>
      <ul className="mr-56 flex flex-grow flex-col p-2">
        {todos.map((todo: ITodo) => todo.planned_day === weekday.toString() && <Todo key={todo.id} todo={todo} />)}
      </ul>
      <WeatherDisplay weatherState={weatherState} />
    </div>
  );
};
