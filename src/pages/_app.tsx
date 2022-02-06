import type { AppProps } from 'next/app';
import { Layout } from '@/components/Layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Auth } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <DndProvider backend={HTML5Backend}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DndProvider>
    </Auth.UserContextProvider>
  );
}

export default MyApp;
