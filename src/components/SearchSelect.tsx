import { addTodo } from '@/lib/addTodo';
import { searchForCurrentValue } from '@/lib/searchForCurrenValue';
import { User } from '@supabase/supabase-js';
import SelectSearch from 'react-select-search';
import { useTodos } from './Context';

interface Props {
  user: User | null;
}

export const SearchInput = ({ user }: Props): JSX.Element => {
  const { todos, setTodos } = useTodos();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    if (data.length > 0) {
      addTodo(data, todos, setTodos, user);
    }
  };

  return (
    <div className="relative flex h-10 w-full justify-center">
      <SelectSearch
        options={[]}
        autoFocus
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(data: any) => onSubmit(data)}
        getOptions={(query: string) => {
          return new Promise((resolve, reject) => {
            try {
              resolve(searchForCurrentValue(query));
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
              // eslint-disable-next-line no-console
              reject(console.log(error.messag));
            }
          });
        }}
        search
        placeholder="..."
      />
    </div>
  );
};
