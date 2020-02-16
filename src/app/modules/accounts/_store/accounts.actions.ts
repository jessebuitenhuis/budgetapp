import { createAction, props } from "@ngrx/store";
import { Account } from "src/app/models/Account";

export const getAll = createAction("[Account API] Get All");
export const getAllSuccess = createAction(
  "[Account API] Get All Success",
  props<{ items: Account[] }>()
);
