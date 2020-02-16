import { BaseModel } from "../models/BaseModel";
import { createReducer, on, Action, ActionReducer } from "@ngrx/store";
import { fireGetAllSuccess } from "./fire.actions";

export interface State {
  [name: string]: BaseModel[];
}

const initialState: State = {};

const fireReducer = createReducer(
  initialState,
  on(fireGetAllSuccess, (state, { entityName, data }) => ({
    ...state,
    [entityName]: data
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return fireReducer(state, action);
}
