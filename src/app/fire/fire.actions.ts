import { createAction, props, Action } from "@ngrx/store";
import { pipe, OperatorFunction } from "rxjs";
import { ofType } from "@ngrx/effects";
import { filter } from "rxjs/operators";
import { BaseModel } from "../models/BaseModel";

export interface FirePayload {
  entityName: string;
}

export interface FirePayloadWithData {
  entityName: string;
  data: BaseModel[];
}

export interface FireAction<P = any> extends Action {
  type: string;
  payload?: FirePayload;
}

export function ofEntityType<T extends FireAction>(
  entityName: string
): OperatorFunction<FireAction, T> {
  return filter(
    (action: FireAction): action is T =>
      !!action.payload && action.payload.entityName === entityName
  );
}

export function ofFireOp<T extends FireAction>(
  entityName: string
): OperatorFunction<Action, T> {
  return filter(
    (action: FireAction): action is T =>
      !!action.payload && action.payload.entityName === entityName
  );
}
export const fireGetAll = createAction("[Fire] Get All", props<FirePayload>());
export const fireGetAllSuccess = createAction(
  "[Fire] Get All Success",
  props<FirePayloadWithData>()
);
