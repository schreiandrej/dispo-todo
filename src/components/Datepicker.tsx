import { Fragment, useState } from 'react';
import { DatePicker } from 'react-widgets';
import { Listbox, Transition } from '@headlessui/react';

const timeList = [
  { id: 8, name: '8:00' },
  { id: 9, name: '9:00' },
  { id: 10, name: '10:00' },
  { id: 11, name: '11:00' }
];

const initValue = {
  date: new Date(),
  time: '8:00'
};

export const DatepickerComponent = () => {
  const [timerValue, setTimerValue] = useState(initValue);

  function setDate(date: Date | null | undefined) {
    date &&
      setTimerValue(prev => {
        return { ...prev, date };
      });
  }

  function setTime(time: string) {
    time &&
      setTimerValue(prev => {
        return { ...prev, time };
      });
  }

  console.log(timerValue);

  return (
    <>
      <div className="flex w-full gap-2 pt-2">
        <DatePicker defaultValue={new Date()} onChange={e => setDate(e)} className="w-full" containerClassName="rounded-lg" />
        <Listbox value={timerValue.time} onChange={e => setTime(e)}>
          <div className="relative w-1/2">
            <Listbox.Button className="relative flex w-full cursor-default justify-center rounded-lg bg-slate-800 p-3 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              {timerValue.time}
            </Listbox.Button>
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {timeList.map((time, timeIdx) => (
                  <Listbox.Option key={timeIdx} className={({ active }) => `relative flex cursor-pointer select-none justify-center py-2 `} value={time.name}>
                    {({ selected }) => <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{time.name}</span>}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </>
  );
};
