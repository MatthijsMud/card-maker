import type { AppProps } from 'next/app'
import { AnimateSharedLayout } from "framer-motion";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <AnimateSharedLayout>
    <Component {...pageProps} />
  </AnimateSharedLayout>
}
export default MyApp