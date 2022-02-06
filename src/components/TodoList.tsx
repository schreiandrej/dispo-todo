import { User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { ITodo } from '../types';
import { Todo } from './Todo';
import { InputField } from './InputField';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/lib/Constants';
import { fetchTodos } from '@/lib/fetchTodos';
import { setPlanendDay } from '@/lib/setPlannedDay';
import { DropWeekday } from './DayOfTheWeek';
import { weekdays } from '@/lib/Constants';

type TodosProps = {
  user: User | null;
};

export default function Todos({ user }: TodosProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchTodos(setTodos);
  }, []);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item: any) => setPlanendDay(item.id, 'not_planned', todos, setTodos)
  }));

  return (
    <div className="w-screen h-screen flex flex-col justify-start p-5 items-center">
      <InputField user={user} todos={todos} setTodos={setTodos} />

      <div className="flex w-full h-full gap-8 pt-5">
        <div className="w-1/4 h-full">
          <div className="w-full h-full border border-gray-600 rounded-lg" ref={drop}>
            <ul className="flex flex-col gap-2 p-4">{todos.map((todo: ITodo) => todo.planned_day === 'not_planned' && <Todo key={todo.id} todo={todo} />)}</ul>
          </div>
        </div>
        <div className="w-full h-full grid grid-cols-3 grid-cols-fr grid-rows-2 gap-2">
          {weekdays.map(day => (
            <DropWeekday key={day} weekday={day} todos={todos} setTodos={setTodos} />
          ))}
        </div>
      </div>
    </div>
  );
}
