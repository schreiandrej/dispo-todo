import { User } from '@supabase/supabase-js';
import { useState, useLayoutEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import { ITodo } from '../types';
import { Todo } from './Todo';
import { InputField } from './InputField';
import { Title } from './Title';
import { useDrop } from 'react-dnd';
import { ItemTypes, WeekDays } from '@/lib/Constants';
import { DropMonday } from './DropMonday';
import { setPlanendDay } from '@/lib/setPlannedDay';
import { addTodo } from '@/lib/addTodo';
import { DropTuesday } from './DropTuesday';
import { DropWensday } from './DropWensday';
import { DropThursday } from './DropThursday';
import { DropFriday } from './DropFriday';
import { DropSaturday } from './DropSaturday';

type TodosProps = {
  user: User | null;
};

const todoTable = process.env.NODE_ENV === 'development' ? 'dev-todos' : 'todos';

export default function Todos({ user }: TodosProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [update, setUpdate] = useState<boolean>(true);

  useLayoutEffect(() => {
    fetchTodos();
    console.log(todos);
  }, [update]);

  const fetchTodos = async () => {
    const { data: todos, error } = await supabase.from(todoTable).select('*').order('id', { ascending: true });
    if (error) console.log('error', error);
    else if (todos === null) console.log('No data found!');
    else setTodos(todos);
  };

  const deleteTodo = async (id: string) => {
    try {
      await supabase.from(todoTable).delete().eq('id', id);
      setTodos(todos.filter((x: ITodo) => x.id != id));
    } catch (error) {
      console.log('error', error);
    }
  };

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item: any) => setPlanendDay(item.id, 'not_planned', update, setUpdate)
  }));

  return (
    <div className="w-screen h-screen flex flex-col justify-start p-5 items-center">
      <InputField user={user} todos={todos} setTodos={setTodos} />

      <div className="flex w-full h-full gap-8 pt-5 px-24">
        <div className="w-full h-full">
          <div className="w-full h-full border border-gray-600 rounded-lg" ref={drop}>
            <ul className="flex flex-col gap-2 p-4">{todos.map((todo: ITodo) => todo.planned_day === 'not_planned' && <Todo key={todo.id} todo={todo} />)}</ul>
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-2">
          <div className="flex flex-row w-full h-full gap-4 items-center">
            <h2 className="w-9 text-slate-600">MO:</h2>
            <DropMonday update={update} setUpdate={setUpdate} todos={todos} />
          </div>
          <div className="flex flex-row w-full h-full gap-4 items-center">
            <h2 className="w-9 text-slate-600">DI:</h2>
            <DropTuesday update={update} setUpdate={setUpdate} todos={todos} />
          </div>
          <div className="flex flex-row w-full h-full gap-4 items-center">
            <h2 className="w-9 text-slate-600">MI:</h2>
            <DropWensday update={update} setUpdate={setUpdate} todos={todos} />
          </div>
          <div className="flex flex-row w-full h-full gap-4 items-center">
            <h2 className="w-9 text-slate-600">DO:</h2>
            <DropThursday update={update} setUpdate={setUpdate} todos={todos} />
          </div>
          <div className="flex flex-row w-full h-full gap-4 items-center">
            <h2 className="w-9 text-slate-600">FR:</h2>
            <DropFriday update={update} setUpdate={setUpdate} todos={todos} />
          </div>
          <div className="flex flex-row w-full h-full gap-4 items-center">
            <h2 className="w-9 text-slate-600">SA:</h2>
            <DropSaturday update={update} setUpdate={setUpdate} todos={todos} />
          </div>
        </div>
      </div>
    </div>
  );
}
