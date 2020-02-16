import { BaseModel } from "../models/BaseModel";
import { createReducer, on, Action, ActionReducer } from "@ngrx/store";
import { fireGetAllSuccess } from "./fire.actions";

export interface FireState {
  [name: string]: BaseModel[];
}

const initialState: FireState = {};

const fireReducer = createReducer(
  initialState,
  on(fireGetAllSuccess, (state, { entityName, data }) => ({
    ...state,
    [entityName]: data
  }))
);

export function reducer(
  state: FireState | undefined,
  action: Action
): FireState {
  return fireReducer(state, action);
}

export const selectFirestore = (state: { fireStore: FireState }) =>
  state.fireStore;

export const selectEntitiesFactory = <T extends BaseModel>(
  entityName: string
) => (state: FireState) => state[entityName] as T[];
