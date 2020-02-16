import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { fireGetAllSuccess, fireGetAll } from "./fire.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { EMPTY, Observable } from "rxjs";

@Injectable()
export class FireEffects {
  $valueChanges = createEffect(() =>
    this.$actions.pipe(
      ofType(fireGetAll),
      switchMap(action =>
        this._getAll$(action.entityName).pipe(
          map(entities =>
            fireGetAllSuccess({
              entityName: action.entityName,
              data: entities
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private _firestore: AngularFirestore,
    private $actions: Actions
  ) {}

  private _getAll$(entityName: string): Observable<any[]> {
    return this._firestore.collection(entityName).valueChanges();
  }
}
