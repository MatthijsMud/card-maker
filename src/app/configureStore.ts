import { createStore } from "redux-dynamic-modules";
import { getObservableExtension } from "redux-dynamic-modules-observable";
import { persistStore } from "redux-persist";

import { getCommonModule } from "./commonModule";
import { getPersistModule } from "./persistModule";

export const configureStore = () => {
  const store = createStore({
    
    extensions: [getObservableExtension()]
  }, getCommonModule());
  
  // Storage solution is only available client side.
  if (typeof window !== "undefined") {
    const persistor = persistStore(store);
    store.addModule(getPersistModule(persistor));
  }

  return { store };
}