import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";

import {
  switchMap,
  flatMap,
  mergeMap,
  map,
  catchError,
  tap
} from "rxjs/operators";
import { AccountService } from "src/app/services/account.service";
import { EMPTY } from "rxjs";
import { AccountActionsEnum, getAccountsSuccess } from "./account.actions";

@Injectable()
export class AccountEffects {
  getAccounts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AccountActionsEnum.GetAccounts),
      switchMap(() => this._accountService.$all()),
      map(accounts => getAccountsSuccess({ accounts })),
      catchError(() => EMPTY)
    )
  );

  getAccount$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AccountActionsEnum.GetAccount),
      switchMap(() => this._accountService.$find()),
      map(account => ({
        type: AccountActionsEnum.GetAccountSucces,
        payload: account
      })),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private _actions$: Actions,
    private _accountService: AccountService
  ) {}
}
