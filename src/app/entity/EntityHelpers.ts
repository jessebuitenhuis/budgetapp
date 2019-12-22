import { Observable, pipe } from "rxjs";

import { map } from "rxjs/operators";

export function createSelector<T, P, R>(
  obs: Observable<T>,
  selector: (item: T) => R
): Observable<R> {
  return obs.pipe(map(selector));
}
