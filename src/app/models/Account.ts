import { BaseModel } from "./BaseModel";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

export type AccountType = "asset" | "liability";

export interface Account extends BaseModel {
  name: string;
  accountNumber?: string;
  startSaldo?: number;
  type?: AccountType;
}

export const assetsFilter = pipe(
  map((accounts: Account[]) =>
    accounts.filter(x => x.type === undefined || x.type === "asset")
  )
);

export const liabilitiesFilter = pipe(
  map((accounts: Account[]) => accounts.filter(x => x.type === "liability"))
);
