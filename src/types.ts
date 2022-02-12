export interface ITodo {
  id: string;
  user_id: string;
  task: string;
  planned_day: string;
}

export interface IWeatherObject {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: IWeatherForcast[];
}

export interface IWeatherForcast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: ITemp;
  feels_like: IFeelslike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IWeather[];
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
  snow?: number;
}

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IFeelslike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface ITemp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface IWeatherState {
  weatherMain: string;
  weatherDescription: string;
  weatherIcon: JSX.Element;
  temperature: string;
  formatDate: string;
}
