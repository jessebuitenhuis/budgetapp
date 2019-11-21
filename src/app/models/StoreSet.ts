import { BaseModel } from "./BaseModel";
import { BehaviorSubject, Observable } from "rxjs";
import { take, shareReplay } from "rxjs/operators";

export class StoreSet<T extends BaseModel<T>> {
  private _items$: BehaviorSubject<T[]> = new BehaviorSubject([] as T[]);
  items$ = this._items$.asObservable().pipe(shareReplay(1));

  set(items: T[]) {
    this._items$.next([...items]);
  }

  // CREATE
  add(item: T): void {
    this._items$.next([...this._items$.value, item]);
  }

  // READ
  find(id: string): T | undefined {
    return this._items$.value.find(x => x.id === id);
  }

  findIndex(id?: string): number {
    if (!id) {
      return -1;
    }
    return this._items$.value.findIndex(x => x.id === id);
  }

  // UPDATE
  update(item: T): void {
    const index = this.findIndex(item.id);

    if (index === -1) {
      throw new Error("Item not found.");
    }

    this._items$.next([
      ...this._items$.value.slice(0, index),
      item.clone(),
      ...this._items$.value.slice(index + 1)
    ]);
  }

  // DELETE
  remove(item: T) {
    const index = this.findIndex(item.id);

    if (index > -1) {
      this._items$.next([
        ...this._items$.value.slice(0, index),
        ...this._items$.value.slice(index + 1)
      ]);
    }
  }
}
