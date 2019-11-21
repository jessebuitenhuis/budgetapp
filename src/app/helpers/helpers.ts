import { Dictionary, mapObject } from "underscore";

export function sum<T>(items: T[], amountFn: (item: T) => number) {
  return items.reduce((total, item) => {
    return total + amountFn(item);
  }, 0);
}

export function sumDictFn<T>(
  dict: Dictionary<T[]>,
  amountFn: (item: T) => number
): { [key: string]: number } {
  return mapObject(dict, group => sum(group, amountFn));
}
