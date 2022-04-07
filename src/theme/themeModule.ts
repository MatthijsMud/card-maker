import type { IEpicModule } from "redux-dynamic-modules-observable"

export const getThemeModule = (): IEpicModule<{}> => {
  return {
    id: "theme",
  };
}