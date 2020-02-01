import { createSelector } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";

const selectAccountState = (state: IAppState) => state.accounts;

export const selectAccounts = createSelector(
  selectAccountState,
  state => state.accounts
);
