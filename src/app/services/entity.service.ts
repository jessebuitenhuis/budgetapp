import { Observable, BehaviorSubject, pipe } from "rxjs";
import { map, take } from "rxjs/operators";
import { BaseModel } from "../models/BaseModel";
import { EntityDataService } from "./entity-data.service";

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

  entities$ = this._entities$.asObservable();
  entityMap$ = this._entities$.pipe(toEntitymap);
  entityKeys$ = this._entities$.pipe(toKeys);

  private _entityDataService = new EntityDataService<T>(
    this._name,
    this._initialData
  );

  constructor(private _name: string, private _initialData: T[] = []) {
    this.getAll();
  }

  getAll(): void {
    this._entityDataService
      .get()
      .pipe(take(1))
      .subscribe(x => this._entities$.next(x));
  }

  add(entity: T): Observable<T>;
  add(entities: T[]): Observable<T[]>;
  add(entities: T | T[]): Observable<T | T[]> {
    const arr = Array.isArray(entities) ? entities : [entities];

    return this._entityDataService.post(arr).pipe(
      map(savedItems => {
        this._addToCollection(savedItems);
        return arr;
      })
    );
  }

  update(entity: T): Observable<T>;
  update(entities: T[]): Observable<T[]>;
  update(entities: T | T[]): Observable<T | T[]> {
    const arr = Array.isArray(entities) ? entities : [entities];

    return this._entityDataService.put(arr).pipe(
      map(savedItems => {
        this._updateCollection(savedItems);
        return savedItems;
      })
    );
  }

  delete(entities: T | T[]): Observable<void> {
    const arr = Array.isArray(entities) ? entities : [entities];

    return this._entityDataService.delete(arr).pipe(
      map(() => {
        this._removeFromCollection(arr);
      })
    );
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

  private _getFilteredEntities(excludeItems: T[]): T[] {
    const excludeKeys = excludeItems.map(x => x.id);
    return this._entities$.value.filter(x => excludeKeys.indexOf(x.id) === -1);
  }
}
