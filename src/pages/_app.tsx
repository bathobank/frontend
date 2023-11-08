import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import {InitComponentData} from "@/components/Init";
import type {AppProps} from 'next/app';
import {Open_Sans} from "next/font/google";
import Head from 'next/head';
import {wrapper} from "@/stores/store";
import {FC} from "react";
import createEmotionCache from '@emotion/cache';
import {QueryClient, QueryClientProvider} from "react-query";
import {Provider} from "react-redux";
import {CacheProvider} from "@emotion/react";
import {ToastContainer} from "react-toastify";
import Loading from "@/components/layouts/Loading";

const opensans = Open_Sans({
  weight: '400',
  subsets: ['vietnamese']
});

const clientSideEmotionCache = createEmotionCache({key: 'app-cached'});
const queryClient = new QueryClient();

const App: FC<AppProps> = ({Component, ...rest}: AppProps) => {
  const {store, props} = wrapper.useWrappedStore(rest);
  const {emotionCache = clientSideEmotionCache, pageProps} = props;

  return (
    <div id="root_app" className={opensans.className}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={emotionCache}>
            <InitComponentData fontClass={opensans.className}>
              <Head>
                <title>Bát Họ Bank</title>
                <link rel="shortcut icon" href="/images/logo/favicon.ico"/>
              </Head>
              <Component {...pageProps} />
              <ToastContainer />
              <Loading />
            </InitComponentData>
          </CacheProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
