import { createStore } from "redux-dynamic-modules";
import { getObservableExtension } from "redux-dynamic-modules-observable";

import { getCommonModule } from "./commonModule";

export const configureStore = () => {
  return createStore({
    
    extensions: [getObservableExtension()]
  }, getCommonModule());
}