import React from 'react';

interface Props {
  title: string;
}

export const Title = (props: Props) => {
  return <h2 className="w-full text-center text-slate-500 font-semibold pb-4">{props.title}</h2>;
};
