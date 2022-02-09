import { ItemTypes } from '@/lib/Constants';
import { supabase, todoTable } from '@/lib/initSupabase';
import { fromUnixTime, getDay, format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useDrop } from 'react-dnd';
import { ITodo, IWeatherForcast } from 'src/types';
import { useTodos } from './Context';
import { Todo } from './Todo';

interface Props {
  weekday: number;
  weather: IWeatherForcast[];
}

export const DayOfTheWeek = (props: Props) => {
  const { todos, setTodos } = useTodos();

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const getFormatDate = (weekday: number, weather: IWeatherForcast[]) => {
    const day = weather?.filter(day => getDay(fromUnixTime(day.dt)) === weekday);

    const unixTime = day[0]?.dt;
    const formatDate = format(fromUnixTime(unixTime), 'eeee, dd.MM.yy', { locale: de });
    return formatDate;
  };

  const getWeatherDescripton = (weekday: number, weather: IWeatherForcast[]) => {
    const day = weather?.filter(day => getDay(fromUnixTime(day.dt)) === weekday);
    const weatherDescription = day[0].weather[0].description;
    return weatherDescription;
  };
  const getTemprature = (weekday: number, weather: IWeatherForcast[]) => {
    const day = weather?.filter(day => getDay(fromUnixTime(day.dt)) === weekday);
    const temperature = `${Math.floor(day[0].temp.morn)}°C`;
    return temperature;
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg border border-gray-700 text-slate-400" ref={drop}>
      <div className="flex flex-row items-center justify-between">
        <h2 className="w-full pt-1 pl-2 text-left text-slate-600">{getFormatDate(props.weekday, props.weather)}</h2>
        <div className="flex w-full flex-row gap-2 pr-2 text-right text-sm text-slate-600">
          <div className="w-full">{getWeatherDescripton(props.weekday, props.weather)}</div>
          <div>{getTemprature(props.weekday, props.weather)}</div>
        </div>
      </div>
      <ul className="flex flex-col gap-2 p-2 px-4">
        {todos.map((todo: ITodo) => todo.planned_day === props.weekday.toString() && <Todo key={todo.id} todo={todo} />)}
      </ul>
    </div>
  );
};
