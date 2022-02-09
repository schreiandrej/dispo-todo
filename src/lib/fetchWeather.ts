import { IWeatherObject } from 'src/types';

export const fetchWeather = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=51.93310631044528&lon=8.879081244720963&units=metric&exclude=current,minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER}`
  );

  const data: IWeatherObject = await response.json();
  return data.daily;
};
