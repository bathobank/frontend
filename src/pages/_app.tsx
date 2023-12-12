import "react-toastify/dist/ReactToastify.css";
import "../_metronic/plugins/global/plugins.bundle.css";
import "../_metronic/css/style.css";
import "../_metronic/css/custom.css";

import createEmotionCache, { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { NextFont } from "next/dist/compiled/@next/font";
import { Open_Sans } from "next/font/google";
import { FC, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import InitComponentData from "@/components/Init";
import Loading from "@/components/layouts/Loading";
import { wrapper } from "@/stores/store";

declare global {
  interface Window {
    defaultThemeMode: string;
    themeMode: string;
  }
}

const openSansFont: NextFont = Open_Sans({
  weight: "400",
  subsets: ["vietnamese"],
});

const clientSideEmotionCache: EmotionCache = createEmotionCache({
  key: "app-cached",
});

const queryClient: QueryClient = new QueryClient();

const App: FC<AppProps> = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    document.querySelector("body")!.classList.add(openSansFont.className);
  }, []);

  return (
    <div id="root_app">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={emotionCache}>
            <InitComponentData>
              <Component {...pageProps} />
              <ToastContainer />
              <Loading />
            </InitComponentData>
          </CacheProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
};

export default App;
