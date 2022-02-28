import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { ICity, ITodo, IWeatherForcast } from '../types';
import { Todo } from './Todo';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/lib/Constants';
import { fetchTodos } from '@/lib/fetchTodos';
import { DayOfTheWeek } from './DayOfTheWeek';
import { weekdays } from '@/lib/Constants';
import { useTodos } from './Context';
import { supabase, todoTable } from '@/lib/initSupabase';
import { fetchWeather } from '@/lib/fetchWeather';
import { CommandPalette } from './CommandPalette';
import { InputField } from './InputField';

type TodosProps = {
  user: User | null;
  cityWeather: ICity;
};

export const TodoPlan = ({ user, cityWeather }: TodosProps) => {
  const { todos, setTodos } = useTodos();
  const [weather, setWeather] = useState<IWeatherForcast[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchTodos();
      data && setTodos(data);
    })();
  }, [setTodos]);

  useEffect(() => {
    (async () => {
      const weatherData = await fetchWeather(cityWeather.coordinaten);
      weatherData && setWeather(weatherData);
    })();
  }, [cityWeather]);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: async (item: { id: string; todos: ITodo[] }) => {
      try {
        console.log(item);
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
    <>
      <CommandPalette user={user} />
      <InputField user={user} />
      <div className="flex h-screen w-full flex-col items-center justify-start">
        {todos && (
          <div className="my-6 flex h-full w-full gap-1">
            <div className="h-full w-2/4">
              <div className="h-full w-full overflow-hidden rounded-md border border-gray-700 p-3" ref={drop}>
                <ul className="flex flex-col">{todos.map((todo: ITodo) => todo.planned_day === null && <Todo key={todo.id} todo={todo} />)}</ul>
              </div>
            </div>
            <div className=" flex h-full w-full flex-col gap-1">
              {weather && weekdays.map(day => <DayOfTheWeek key={day} weekday={day} weather={weather} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
