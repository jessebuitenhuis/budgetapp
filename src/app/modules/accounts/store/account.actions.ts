import { createAction, props } from "@ngrx/store";
import { Account } from "../../../models/Account";

export enum AccountActionsEnum {
  GetAccounts = "[Account] Get Accounts",
  GetAccountsSuccess = "[Account] Get Accounts Success",
  GetAccount = "[Account] Get Account",
  GetAccountSucces = "[Account] Get Account Success"
}

export const getAccounts = createAction(AccountActionsEnum.GetAccounts);
export const getAccountsSuccess = createAction(
  AccountActionsEnum.GetAccountsSuccess,
  props<{ accounts: Account[] }>()
);
export const getAccount = createAction(AccountActionsEnum.GetAccount);
export const getAccountSuccess = createAction(
  AccountActionsEnum.GetAccountSucces,
  props<{ account: Account }>()
);
