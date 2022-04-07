import "@fontsource/roboto/400.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useMemo, FC } from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { DynamicModuleLoader } from "redux-dynamic-modules";
import { useSelector } from "react-redux";
import { AnimateSharedLayout } from "framer-motion";

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

  return <ThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />
    {props.children}
  </ThemeProvider>
}

export const Theme: FC = (props) => {
  return <DynamicModuleLoader modules={[getThemeModule()]}>
    <AnimateSharedLayout>
      <ThemeFromState>
        {props.children}
      </ThemeFromState>
    </AnimateSharedLayout>
  </DynamicModuleLoader>
}