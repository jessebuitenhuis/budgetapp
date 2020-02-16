import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getAll, getAllSuccess } from "./accounts.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, EMPTY } from "rxjs";
import { Account } from "src/app/models/Account";

@Injectable()
export class AccountEffects {
  name = "accounts";

  // HOW TO MAKE THIS REUSABLE???
  $getAll = createEffect(() =>
    this.$actions.pipe(
      ofType(getAll),
      switchMap(() =>
        this._getAll().pipe(
          map(items => getAllSuccess({ items })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private $actions: Actions,
    private _fireStore: AngularFirestore
  ) {}

  // MOVE THIS TO GENERIC DATA SERVICE
  private _getAll(): Observable<Account[]> {
    return this._fireStore.collection<Account>(this.name).valueChanges();
  }
}
