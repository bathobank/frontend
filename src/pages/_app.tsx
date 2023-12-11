import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import createEmotionCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import InitComponentData from "@/components/Init";
import Loading from "@/components/layouts/Loading";
import { wrapper } from "@/stores/store";

const opensans = Open_Sans({
  weight: "400",
  subsets: ["vietnamese"],
});

const clientSideEmotionCache = createEmotionCache({ key: "app-cached" });
const queryClient = new QueryClient();

const App: FC<AppProps> = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <div id="root_app" className={opensans.className}>
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
