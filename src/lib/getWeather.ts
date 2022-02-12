import { fromUnixTime, getDay, format } from 'date-fns';
import { de } from 'date-fns/locale';
import { icons } from '@/components/SVG';
import { IWeatherForcast, IWeatherState } from 'src/types';
import { Dispatch, SetStateAction } from 'react';

export const getWeather = (weekday: number, weather: IWeatherForcast[], setWeatherState: Dispatch<SetStateAction<IWeatherState | null>>) => {
  const day = weather?.filter(day => getDay(fromUnixTime(day.dt)) === weekday);
  const weatherDescription = day[0].weather[0].description;
  const weatherMain = day[0].weather[0].main;

  const weatherIcon = icons.filter(icon => icon.id === weatherMain)[0].icon;
  const temperature = `${Math.floor(day[0].temp.morn)}°C`;

  const formatDate = format(fromUnixTime(day[0]?.dt), 'eeee, dd.MM.yy', { locale: de });

  setWeatherState({ weatherMain, weatherDescription, weatherIcon, temperature, formatDate });
};
