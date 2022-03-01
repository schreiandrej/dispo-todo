import { IWeatherState } from 'src/types';

interface Props {
  weatherState: IWeatherState | null;
}

export const WeatherDisplay = ({ weatherState }: Props) => {
  return (
    <div className="flex h-full flex-col items-end pr-2 text-right text-sm">
      <h2 className="my-1 w-full pl-2 text-left">{weatherState?.formatDate}</h2>
      <div className="flex flex-row justify-end">
        <div className={`${weatherState?.temperature && parseInt(weatherState?.temperature) < 0 && 'text-red-600 opacity-100'}`}>
          {weatherState?.temperature}
        </div>
        <div className="">{weatherState?.weatherIcon}</div>
      </div>
      <div className="mb-1 text-gray-600">{weatherState?.weatherDescription}</div>
    </div>
  );
};
