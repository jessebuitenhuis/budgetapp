import { Dictionary, mapObject } from "underscore";

export function sum<T>(
  items: T[],
  amountFn: (item: T) => number,
  start = 0
): number {
  return items.reduce((total, item) => {
    return total + amountFn(item);
  }, start);
}

export function sumDictFn<T>(
  dict: Dictionary<T[]>,
  amountFn: (item: T) => number
): { [key: string]: number } {
  return mapObject(dict, group => sum(group, amountFn));
}

export function paginate<T>(
  arr: T[],
  page: number,
  pageSize: number = 10
): T[] {
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  return arr.slice(start, end);
}

export type SortFn<T> = (item: T) => any;

export function sort<T>(
  list: T[],
  sortFn: SortFn<T>,
  descending: boolean = false
): T[] {
  return list.sort((a: T, b: T) => {
    const aKey = sortFn(a);
    const bKey = sortFn(b);

    if (aKey > bKey) {
      return descending ? -1 : 1;
    } else if (bKey > aKey) {
      return descending ? 1 : -1;
    } else {
      return 0;
    }
  });
}
