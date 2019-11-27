import { pipe } from "rxjs";
import { map } from "rxjs/operators";
import { sum as sumFn, sumDictFn } from "./helpers";
import {
  where as _where,
  groupBy as _groupBy,
  Dictionary,
  findWhere as _findWhere
} from "underscore";
import * as moment from "moment";

export type FilterFn<T> = (item: T) => boolean;
export type FilterObj<T> = { [P in keyof T]?: T[P] };

export const sumDict = <T>(amountFn: (item: T) => number) =>
  pipe(map((dict: Dictionary<T[]>) => sumDictFn(dict, amountFn)));

export const sum = <T>(amountFn: (item: T) => number) =>
  pipe(map((list: T[]) => sumFn(list, amountFn)));

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

export const find = <T>(filter: FilterFn<T>) =>
  pipe(map((list: T[]) => list.find(filter)));

export const groupBy = <T>(key: keyof T & string) =>
  pipe(map((list: T[]) => _groupBy(list, key)));
