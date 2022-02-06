import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { ITodo } from 'src/types';

interface InputProviderProps {
  children: React.ReactNode;
}

const TodoContext = createContext<any>([]);

export const TodoContextProvider = ({ children }: InputProviderProps) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  return <TodoContext.Provider value={{ todos, setTodos }}>{children}</TodoContext.Provider>;
};

interface UseTodos {
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export const useTodos = (): UseTodos => useContext(TodoContext);
