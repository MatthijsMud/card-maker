import type { IEpicModule } from "redux-dynamic-modules-observable";
import type { Persistor } from "redux-persist";
import { ignoreElements, tap, filter, debounceTime } from "rxjs/operators";

export const getPersistModule = (persistor: Persistor): IEpicModule<{}> => {
  return {
    id: "persistent",
    epics: [
      (action$) => action$.pipe(
        filter(action => ["@@Internal/ModuleManager/ModuleAdded", "@@Internal/ModuleManager/ModuleRemoved"].indexOf(action.type) !== -1),
        debounceTime(100),
        tap(() => { persistor.persist(); }),
        ignoreElements(),
      ),
    ],
  }
}