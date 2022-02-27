import { Dispatch, Fragment, SetStateAction } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { cities } from '@/lib/Constants';
import { ICity } from 'src/types';

interface Props {
  cityWeather: ICity;
  setCityWeather: Dispatch<SetStateAction<ICity>>;
}

export const CityListbox = ({ cityWeather, setCityWeather }: Props) => {
  return (
    <div className="z-10 w-36 text-gray-600">
      <Listbox value={cityWeather} onChange={setCityWeather}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-slate-800 bg-transparent py-2 text-center shadow-md focus:outline-none sm:text-sm">
            <span className="block truncate">{cityWeather.name}</span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {cities.map((city, cityIndex) => (
                <Listbox.Option
                  key={cityIndex}
                  className={({ active }) =>
                    `${active ? 'bg-slate-600 text-slate-200' : 'text-slate-400'}
                          relative cursor-pointer select-none py-2 text-center`
                  }
                  value={city}
                >
                  {({ selected, active }) => <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>{city.name}</span>}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export const SelectorIcon = () => {
  return (
    <svg className="h-5 w-5 text-gray-400" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
  );
};

export const CheckIcon = () => {
  return (
    <svg className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
};
