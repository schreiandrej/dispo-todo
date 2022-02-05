import Head from 'next/head';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';

type Props = {
  children?: ReactNode;
};

export function Layout({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />

        <link rel="manifest" href="/manifest.json" />
        {/* <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" /> */}
        {/* <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" /> */}
        {/* <link rel="apple-touch-icon" href="icons/apple-icon-57x57.png"></link> */}
        <meta name="theme-color" content="#000000" />

        <title>next-app</title>
      </Head>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <main className="w-screen text-gray-100 bg-slate-900">{children}</main>
      </ThemeProvider>
    </>
  );
}
