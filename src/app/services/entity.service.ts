import { Observable, BehaviorSubject, pipe, of } from "rxjs";
import { map, take } from "rxjs/operators";
import { BaseModel } from "../models/BaseModel";
import { EntityDataService } from "./entity-data.service";
import { createSelector } from "../entity/EntityHelpers";
import { where } from "../helpers/pipes";
import * as uuid from "uuid/v1";
import { Viewmodel } from "../models/types";

export interface EntityMap<T> {
  [key: string]: T;
}

const toEntitymap = pipe(
  map(
    <T extends BaseModel>(entities: T[]): EntityMap<T> => {
      const entityMap: EntityMap<T> = {};
      entities.forEach(e => (entityMap[e.id] = e));
      return entityMap;
    }
  )
);

const toKeys = pipe(
  map(<T extends BaseModel>(entities: T[]): string[] => {
    return entities.map(x => x.id);
  })
);

export abstract class EntityService<T extends BaseModel> {
  private _entities$ = new BehaviorSubject<T[]>([]);
  private _entityDataService = new EntityDataService<T>(this._name);

  entities$ = this._entities$.asObservable();
  entityMap$ = this._entities$.pipe(toEntitymap);
  entityKeys$ = this._entities$.pipe(toKeys);

  selectById$ = (id: T["id"]) => createSelector(this.entityMap$, x => x[id]);
  selectByProp$ = (prop: Partial<T>) => this.entities$.pipe(where(prop));

  constructor(private _name: string) {
    this.getAll();
  }

  getAll(): void {
    this._entityDataService
      .get()
      .pipe(take(1))
      .subscribe(x => this._entities$.next(x));
  }

  add(entity: Viewmodel<T>): T;
  add(entities: Viewmodel<T>[]): T[];
  add(entities: Viewmodel<T> | Viewmodel<T>[]): T | T[] {
    const vmArr = Array.isArray(entities) ? entities : [entities];
    const arr = vmArr.map(item => ({
      id: this._generateId(),
      ...item
    })) as T[];

    this._addToCollection(arr);
    this._entityDataService.post(arr);
    return Array.isArray(entities) ? arr : arr[0];
  }

  update(entity: T): T;
  update(entities: T[]): T[];
  update(entities: T | T[]): T | T[] {
    const arr = Array.isArray(entities) ? entities : [entities];
    this._updateCollection(arr);
    this._entityDataService.put(arr);
    return Array.isArray(entities) ? arr : arr[0];
  }

  delete(entities: T | T[]): void {
    const arr = Array.isArray(entities) ? entities : [entities];
    this._removeFromCollection(arr);
    this._entityDataService.delete(arr);
  }

  private _addToCollection(items: T[]): void {
    this._entities$.next([...this._entities$.value, ...items]);
  }

  private _updateCollection(items: T[]): void {
    this._entities$.next([...this._getFilteredEntities(items), ...items]);
  }

  private _removeFromCollection(items: T[]): void {
    this._entities$.next([...this._getFilteredEntities(items)]);
  }

  private _getKeys(): string[] {
    return this._entities$.value.map(x => x.id);
  }

  private _generateId(): string {
    return uuid();
  }

  private _getFilteredEntities(excludeItems: T[]): T[] {
    const excludeKeys = excludeItems.map(x => x.id);
    return this._entities$.value.filter(x => excludeKeys.indexOf(x.id) === -1);
  }
}
