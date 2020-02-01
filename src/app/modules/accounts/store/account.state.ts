import { Account } from "src/app/models/Account";

export interface IAccountState {
  accounts: Account[];
}

export const initialAccountState: IAccountState = {
  accounts: []
};
