import React, { Dispatch, SetStateAction } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { CityListbox } from '@/components/CityListbox';
import { ICity } from 'src/types';
import Clock from 'react-digital-clock';

interface Props {
  cityWeather: ICity;
  setCityWeather: Dispatch<SetStateAction<ICity>>;
}

export const DateComponent = ({ cityWeather, setCityWeather }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const date: Date = new Date();

  return (
    <div className="flex w-full flex-row items-center justify-between text-white">
      <div className="flex flex-col gap-1">
        <div className="w-full">{format(date, 'cccc dd. MMMM', { locale: de })}</div>
        <div className="-ml-1 flex">
          <Clock format={'hh-mm'} hour12={false} />
          <span className="">Uhr</span>
        </div>
      </div>
      <CityListbox cityWeather={cityWeather} setCityWeather={setCityWeather} />
    </div>
  );
};
