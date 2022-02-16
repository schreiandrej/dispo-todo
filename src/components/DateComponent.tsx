import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export const DateComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const date: Date = new Date();

  return <div className="absolute left-12 top-5 text-slate-500">{format(date, 'cccc dd. MMMM yyyy', { locale: de })}</div>;
};
