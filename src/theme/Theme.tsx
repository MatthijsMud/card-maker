import "@fontsource/roboto/400.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useMemo, FC } from "react";
import Head from "next/head";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { DynamicModuleLoader } from "redux-dynamic-modules";
import { useSelector } from "react-redux";

import { getThemeModule } from "./themeModule";

const ThemeFromState: FC = (props) => {
  const themeSettings = useSelector(s => s);
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: "dark",
      }
    });
  }, [themeSettings]);
   theme.palette.primary.main
  return <ThemeProvider theme={theme}>
    <Head>
      <meta name="theme-color" content={theme.palette.primary.main} />
    </Head>
    <CssBaseline enableColorScheme />
    {props.children}
  </ThemeProvider>
}

export const Theme: FC = (props) => {
  return <DynamicModuleLoader modules={[getThemeModule()]}>
    <ThemeFromState>
      {props.children}
    </ThemeFromState>
  </DynamicModuleLoader>
}