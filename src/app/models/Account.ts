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

export const assetsFilter = (accounts: Account[]) =>
  accounts.filter(x => x.type === undefined || x.type === "asset");

export const liabilitiesFilter = (accounts: Account[]) =>
  accounts.filter(x => x.type === "liability");

export const accountsFilter = (accountIds: string[]) => (accounts: Account[]) =>
  accountIds.length === 0
    ? accounts
    : accounts.filter(x => accountIds.includes(x.id));
