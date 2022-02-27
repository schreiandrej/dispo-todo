import React, { Dispatch, SetStateAction } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { CityListbox } from '@/components/CityListbox';
import { ICity } from 'src/types';

interface Props {
  cityWeather: ICity;
  setCityWeather: Dispatch<SetStateAction<ICity>>;
}

export const DateComponent = ({ cityWeather, setCityWeather }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const date: Date = new Date();

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="w-full">{format(date, 'cccc dd. MMMM yyyy', { locale: de })}</div>
      <CityListbox cityWeather={cityWeather} setCityWeather={setCityWeather} />
    </div>
  );
};
