import type { AppProps } from 'next/app'
import { Provider } from "react-redux"

import { CacheProvider } from "@emotion/react";
import createEmotionCache, { EmotionCache } from "@emotion/cache";

import { configureStore } from "$/app/configureStore";
import { ErrorBoundary } from "$/utils/ErrorBoundary";
import { Theme } from "$/theme/Theme";

const { store } = configureStore();
const clientCache = createEmotionCache({ key: "css" });

declare namespace MyApp {
  export type Props = {
    readonly cache: EmotionCache;
  }
}

function MyApp({ Component, pageProps, cache }: AppProps & { cache?: EmotionCache }) {
  return <CacheProvider value={cache || clientCache}>
    <Provider store={store}>
      <Theme>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Theme>
    </Provider>
  </CacheProvider>
}
export default MyApp