import type { IEpicModule } from "redux-dynamic-modules-observable";
import { ignoreElements, tap } from "rxjs/operators";

export const getCommonModule = (): IEpicModule<{}> => {
  return {
    id: "common",
    epics: [
      (action$) => action$.pipe(tap(console.log), ignoreElements())
    ],
  }
}