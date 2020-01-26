import { pipe } from "rxjs";
import { map, tap } from "rxjs/operators";
import {
  sum as sumFn,
  sumDictFn,
  SearchFn,
  SortFn,
  sort,
  paginate
} from "./helpers";
import {
  where as _where,
  groupBy as _groupBy,
  Dictionary,
  findWhere as _findWhere
} from "underscore";
import * as moment from "moment";
import { paginate as paginateFn } from "./helpers";

export type FilterFn<T> = (item: T) => boolean;
export type FilterObj<T> = { [P in keyof T]?: T[P] };

export const sumDict = <T>(
  amountFn: (item: T) => number,
  cumulative: boolean = false,
  digits = 2
) =>
  pipe(
    map((dict: Dictionary<T[]>) =>
      sumDictFn(dict, amountFn, cumulative, digits)
    )
  );

export const sum = <T>(amountFn: (item: T) => number, start = 0, digits = 2) =>
  pipe(map((list: T[]) => sumFn(list, amountFn, start, digits)));

export const where = <T, U extends FilterObj<T>>(filter: FilterFn<T> | U) =>
  pipe(
    map((list: T[]) => {
      if (filter instanceof Function) {
        return list.filter(filter);
      } else {
        return _where(list, filter);
      }
    })
  );

export const filterPipe = <T>(searchFn: SearchFn<T>) =>
  pipe(
    map(([data, searchTerm]: [T[], string]) =>
      searchTerm ? data.filter(x => searchFn(x, searchTerm)) : data
    )
  );

export const sortPipe = <T>(sortFn?: SortFn<T>) =>
  pipe(
    map(([data, desc]: [T[], boolean]) =>
      sortFn ? sort(data, sortFn, desc) : data
    )
  );

export const paginatePipe = <T>() =>
  pipe(
    map(([data, page, pageSize]: [T[], number, number]) =>
      paginate(data, page, pageSize)
    )
  );

export const find = <T>(filter: FilterFn<T>) =>
  pipe(map((list: T[]) => list.find(filter)));

export const groupBy = <T>(key: keyof T & string) =>
  pipe(map((list: T[]) => _groupBy(list, key)));

export const log = <T>(name: string = "") =>
  pipe(tap((x: T) => console.log(name, x)));
