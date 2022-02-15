import { IWeatherObject } from 'src/types';

export const fetchWeather = async (coordinaten: { lat: string; lon: string }) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinaten.lat}&lon=${coordinaten.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER}`
  );

  const data: IWeatherObject = await response.json();
  return data.daily;
};
