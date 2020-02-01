import {
  IAccountState,
  initialAccountState
} from "src/app/modules/accounts/store/account.state";

export interface IAppState {
  accounts: IAccountState;
}

export const initialAppState: IAppState = {
  accounts: initialAccountState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
