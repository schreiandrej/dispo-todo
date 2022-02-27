import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { ICity, ITodo, IWeatherForcast } from '../types';
import { Todo } from './Todo';
import { useDrop } from 'react-dnd';
import { ItemTypes, cities } from '@/lib/Constants';
import { fetchTodos } from '@/lib/fetchTodos';
import { DayOfTheWeek } from './DayOfTheWeek';
import { weekdays } from '@/lib/Constants';
import { useTodos } from './Context';
import { supabase, todoTable } from '@/lib/initSupabase';
import { fetchWeather } from '@/lib/fetchWeather';
import { SearchInput } from './SearchSelect';
import { InputField } from './InputField';
import { CityListbox } from './CityListbox';
import { CommandPalette } from './CommandPalette';

type TodosProps = {
  user: User | null;
};

export const TodoPlan = ({ user }: TodosProps) => {
  const { todos, setTodos } = useTodos();
  const [weather, setWeather] = useState<IWeatherForcast[] | null>(null);
  const [cityWeather, setCityWeather] = useState<ICity>(cities[0]);

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
      <div className="flex h-screen w-screen flex-col items-center justify-start px-12">
        {todos && (
          <div className="my-auto flex h-4/5 w-full gap-1">
            <div className="h-full w-1/4">
              <div className="h-full w-full rounded-md border border-slate-800 p-1" ref={drop}>
                <ul className="flex flex-col pl-2">{todos.map((todo: ITodo) => todo.planned_day === 'not_planned' && <Todo key={todo.id} todo={todo} />)}</ul>
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
