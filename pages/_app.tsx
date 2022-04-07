import type { AppProps } from 'next/app'
import { Provider } from "react-redux"

import { configureStore } from "$/app/configureStore";
import { ErrorBoundary } from "$/utils/ErrorBoundary";
import { Theme } from "$/theme/Theme";

const store = configureStore();

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Theme>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Theme>
  </Provider>
}
export default MyApp