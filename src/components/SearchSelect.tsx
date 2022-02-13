import { addTodo } from '@/lib/addTodo';
import { supabase } from '@/lib/initSupabase';
import { User } from '@supabase/supabase-js';
import { Dispatch, SetStateAction } from 'react';
import SelectSearch, { SelectSearchOption } from 'react-select-search';
import { useTodos } from './Context';

interface Props {
  inputValue: string | undefined;
  setInputValue: Dispatch<SetStateAction<string | undefined>>;
  user: User | null;
}

export const SearchInput = ({ inputValue, setInputValue, user }: Props): JSX.Element => {
  const { todos, setTodos } = useTodos();

  const searchForCurrentValue = async (query: string): Promise<SelectSearchOption[]> => {
    if (query.length > 2) {
      const { data, error } = await supabase.from('data').select('id, name, plz, ort').like('id', `%${query}%`).limit(8);

      if (data) {
        const showResult = data.map((item, index) => {
          return { name: `${item.id}, ${item.name}`, value: `${[...Object.values(item)]}`.replaceAll(',', ' '), index };
        });
        return showResult;
      } else {
        console.log(error);
        return [];
      }
    }
    return [];
  };

  const onSubmit = (data: any) => {
    if (data.length > 0) {
      setInputValue(data);
      addTodo(data, todos, setTodos, user);
    }
  };

  return (
    <div className="relative flex h-10 w-full justify-center">
      <SelectSearch
        options={[]}
        autoFocus
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
