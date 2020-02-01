import { createReducer, on, Action } from "@ngrx/store";
import { createEntityAdapter } from "@ngrx/entity";
import { initialAccountState, IAccountState } from "./account.state";
import { getAccountsSuccess, getAccountSuccess } from "./account.actions";
import { Account } from "src/app/models/Account";

export const accountsReducerFeatureKey = "accounts";
export const accountsEntityAdapter = createEntityAdapter<Account>();

const _accountsReducer = createReducer(
  initialAccountState,
  on(getAccountsSuccess, (state, { accounts }) => ({
    ...state,
    accounts
  })),
  on(getAccountSuccess, (state, { account }) => ({
    ...state,
    accounts: [...state.accounts.filter(x => x.id === account.id), account]
  }))
);

export function accountsReducer(
  state: IAccountState,
  action: Action
): IAccountState {
  return _accountsReducer(state, action);
}
