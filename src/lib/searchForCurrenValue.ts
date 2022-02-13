import { SelectSearchOption } from 'react-select-search';
import { supabase } from './initSupabase';

export const searchForCurrentValue = async (query: string): Promise<SelectSearchOption[]> => {
  if (query.length < 1) return [];

  const typeCheck = parseInt(query);

  if (!isNaN(typeCheck)) {
    const { data, error } = await supabase.from('data').select('id, name, plz, ort').like('id', `%${query}%`).limit(8);
    if (data) {
      const showResult = data.map(item => {
        return { name: `${item.id}, ${item.name}`, value: `${[...Object.values(item)]}`.replaceAll(',', ' ') };
      });
      return showResult;
    } else {
      console.log(error);
      return [];
    }
  } else {
    const { data, error } = await supabase.from('data').select('id, name, plz, ort').ilike('name', `%${query}%`).limit(8);
    if (data) {
      const showResult = data.map(item => {
        return { name: `${item.id}, ${item.name}`, value: `${[...Object.values(item)]}`.replaceAll(',', ' ') };
      });
      return showResult;
    } else {
      console.log(error);
      return [];
    }
  }
};
