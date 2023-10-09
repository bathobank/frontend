import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import {InitComponentData} from "@/components/Init";
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {Comfortaa} from 'next/font/google'
import Loading from "@/components/layouts/Loading";
import {wrapper} from "@/stores/store";
import {FC} from "react";
import createEmotionCache from '@emotion/cache'
import {QueryClient, QueryClientProvider} from "react-query";
import {Provider} from "react-redux";
import {CacheProvider} from "@emotion/react";
import {ToastContainer} from "react-toastify";

const comfortaa = Comfortaa({
  weight: '400',
  subsets: ['latin'],
});

const clientSideEmotionCache = createEmotionCache({key: 'app-cached'});
const queryClient = new QueryClient();

const App: FC<AppProps> = ({Component, ...rest}: AppProps) => {
  const {store, props} = wrapper.useWrappedStore(rest);
  const {emotionCache = clientSideEmotionCache, pageProps} = props;

  return (
    <div id="root_app" className={comfortaa.className}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={emotionCache}>
            <InitComponentData>
              <Head>
                <title>Bát Họ Bank</title>
                <link rel="shortcut icon" href="/images/logo/favicon.ico"/>
              </Head>
              <Component {...pageProps} />
              <ToastContainer />
            </InitComponentData>
          </CacheProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
