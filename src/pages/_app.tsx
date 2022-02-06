import type { AppProps } from 'next/app';
import { Layout } from '@/components/Layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Auth } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import { TodoContextProvider } from '@/components/Context';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <TodoContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </TodoContextProvider>
      </Auth.UserContextProvider>
    </DndProvider>
  );
}

export default MyApp;
