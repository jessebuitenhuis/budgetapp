import { Account } from "src/app/models/Account";
import { createReducer, on, Action } from "@ngrx/store";
import { getAllSuccess } from "./accounts.actions";

export interface State {
  items: Account[];
}

const initialState: State = {
  items: []
};

const accountReducer = createReducer(
  initialState,
  on(getAllSuccess, (state, { items }) => ({ ...state, items }))
);

export function reducer(state: State = initialState, action: Action): State {
  return accountReducer(state, action);
}
