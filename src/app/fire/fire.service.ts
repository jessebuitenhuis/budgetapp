import { Injectable } from "@angular/core";
import { BaseModel } from "../models/BaseModel";
import { createSelector, Store } from "@ngrx/store";
import {
  selectFirestore,
  FireState,
  selectEntitiesFactory
} from "./fire.reducer";
import { fireGetAll } from "./fire.actions";

@Injectable()
export abstract class FireService<T extends BaseModel> {
  abstract name: string;

  selectEntities = selectEntitiesFactory<T>(this._entityName);

  entities$ = createSelector(selectFirestore, this.selectEntities);

  constructor(private _entityName: string, private _store: Store<any>) {}

  // TODO: make it possible to stop listening to the collection
  getAll(): void {
    this._store.dispatch(fireGetAll({ entityName: this._entityName }));
  }
}
