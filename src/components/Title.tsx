import React from 'react';

interface Props {
  title: string;
}

export const Title = (props: Props) => {
  return <h2 className="w-full pb-4 text-center font-semibold text-slate-500">{props.title}</h2>;
};
