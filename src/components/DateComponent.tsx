import React from 'react';
import { format } from 'date-fns';

export const DateComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const date: Date = new Date();

  return <div className="absolute left-5 top-5 text-slate-500">{format(date, 'cccc dd. MMMM yyyy')}</div>;
};
