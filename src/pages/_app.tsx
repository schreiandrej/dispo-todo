import type { AppProps } from 'next/app';
import { Layout } from '@/components/Layout';
import { Auth } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Auth.UserContextProvider>
  );
}

export default MyApp;
