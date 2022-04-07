import type { IEpicModule } from "redux-dynamic-modules-observable";
import type { Persistor } from "redux-persist";
import { ignoreElements, tap, filter } from "rxjs/operators";

export const getPersistModule = (persistor: Persistor): IEpicModule<{}> => {
  return {
    id: "persistent",
    epics: [
      (action$) => action$.pipe(
        filter(action => ["@@Internal/ModuleManager/ModuleAdded", "@@Internal/ModuleManager/ModuleRemoved"].indexOf(action.type) !== -1),
        tap(() => { persistor.persist(); }),
        ignoreElements(),
      ),
    ],
  }
}