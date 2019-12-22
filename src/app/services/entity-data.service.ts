import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { BaseModel } from "../models/BaseModel";

export class EntityDataService<T extends BaseModel> {
  constructor(private _name: string) {}

  get(): Observable<T[]> {
    return of(this._db);
  }

  find(key: string): Observable<T> {
    return throwError("Not implemented.");
  }

  put(items: T[]): Observable<T[]> {
    const keys = items.map(x => x.id);
    this._updateDb([
      ...this._db.filter(x => keys.indexOf(x.id) === -1),
      ...items
    ]);
    return of(items);
  }

  post(items: T[]): Observable<T[]> {
    const arr = items.map(x => ({ id: this._generateId(), ...x }));
    this._updateDb([...this._db, ...arr]);
    return of(arr);
  }

  delete(items: T[]): Observable<void> {
    const keys = items.map(x => x.id);
    this._updateDb({
      ...this._db.filter(x => keys.indexOf(x.id) === -1)
    });
    return of();
  }

  private get _db(): T[] {
    const stored = localStorage.getItem(this._name) || "[]";
    return JSON.parse(stored);
  }

  private _updateDb(entities: T[]): void {
    localStorage.setItem(this._name, JSON.stringify(entities));
  }

  private _generateId(): string {
    return new Date().getTime().toString();
  }
}
