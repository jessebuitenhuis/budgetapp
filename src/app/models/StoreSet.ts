import { BaseModel } from "./BaseModel";
import { BehaviorSubject, Observable } from "rxjs";
import { take, shareReplay } from "rxjs/operators";
import { Viewmodel } from "./types";
import { FilterFn, find } from "../helpers/pipes";

type FindFn<T> = string | ((item: T) => boolean);

export class StoreSet<T extends BaseModel> {
  private _items$: BehaviorSubject<T[]> = new BehaviorSubject(
    this._initialValue
  );
  items$ = this._items$.asObservable().pipe(shareReplay(1));

  constructor(private _initialValue: T[] = []) {
    this.items$.subscribe(x => {
      console.log("State updated", x);
    });
  }

  // CREATE
  add(item: Viewmodel<T>): void {
    const newItem = {
      id: item.id || this.generateId(),
      ...item
    } as T;

    this._items$.next([...this._items$.value, newItem]);
  }

  // READ
  find(findFn: FindFn<T>): T | undefined {
    findFn =
      findFn instanceof Function ? findFn : (item: T) => item.id === findFn;
    return this._items$.value.find(findFn);
  }

  findIndex(id?: string): number {
    if (!id) {
      return -1;
    }
    return this._items$.value.findIndex(x => x.id === id);
  }

  // UPDATE
  update(updatedItem: T): void {
    const newList = this._items$.value.map(item => {
      if (item.id !== updatedItem.id) {
        return item;
      }
      return { ...updatedItem };
    });
    this._items$.next(newList);
  }

  // DELETE
  remove(item: T) {
    const listWithoutItem = this._items$.value.filter(x => x.id !== item.id);
    this._items$.next(listWithoutItem);
  }

  generateId() {
    return new Date().getTime() + "";
  }
}
