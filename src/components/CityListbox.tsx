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
    <div className="fixed top-16 w-72">
      <Listbox value={cityWeather} onChange={setCityWeather}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-transparent py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm">
            <span className="block truncate">{cityWeather.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {cities.map((city, cityIndex) => (
                <Listbox.Option
                  key={cityIndex}
                  className={({ active }) =>
                    `${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}
                          relative cursor-default select-none py-2 pl-10 pr-4`
                  }
                  value={city}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>{city.name}</span>
                      {selected ? (
                        <span
                          className={`${active ? 'text-amber-600' : 'text-amber-600'}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon />
                        </span>
                      ) : null}
                    </>
                  )}
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
