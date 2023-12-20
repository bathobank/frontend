import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import createEmotionCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { wrapper } from "@/stores/store";

const clientSideEmotionCache = createEmotionCache({ key: "app-cached" });
const queryClient = new QueryClient();

const App: FC<AppProps> = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <div id="root_app" className="root_app">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={emotionCache}>
            <Component {...pageProps} />
            <ToastContainer />
          </CacheProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
};

export default App;
