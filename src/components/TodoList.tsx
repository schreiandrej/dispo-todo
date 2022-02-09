import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { ITodo, IWeatherForcast } from '../types';
import { Todo } from './Todo';
import { InputField } from './InputField';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/lib/Constants';
import { fetchTodos } from '@/lib/fetchTodos';
import { DayOfTheWeek } from './DayOfTheWeek';
import { weekdays } from '@/lib/Constants';
import { useTodos } from './Context';
import { supabase, todoTable } from '@/lib/initSupabase';
import { fetchWeather } from '@/lib/fetchWeather';

type TodosProps = {
  user: User | null;
};

export default function Todos({ user }: TodosProps) {
  const { todos, setTodos } = useTodos();
  const [weather, setWeather] = useState<IWeatherForcast[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchTodos();
      data && setTodos(data);

      if (weather === null) {
        const weatherData = await fetchWeather();
        weatherData && setWeather(weatherData);
      }
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
    <div className="flex h-screen w-screen flex-col items-center justify-start p-5">
      <InputField user={user} />

      {todos && (
        <div className="flex h-full w-full gap-8 pt-5">
          <div className="h-full w-1/4">
            <div className="h-full w-full rounded-lg border border-gray-600" ref={drop}>
              <ul className="flex flex-col gap-2 p-4">
                {todos.map((todo: ITodo) => todo.planned_day === 'not_planned' && <Todo key={todo.id} todo={todo} />)}
              </ul>
            </div>
          </div>
          <div className="grid-cols-fr grid h-full w-full grid-cols-3 grid-rows-2 gap-2">
            {weather && weekdays.map(day => <DayOfTheWeek key={day} weekday={day} weather={weather} />)}
          </div>
        </div>
      )}
    </div>
  );
}
