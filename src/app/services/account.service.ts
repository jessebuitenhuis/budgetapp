import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from "@ngrx/data";
import { Account, assetsFilter, liabilitiesFilter } from "../models/Account";

@Injectable({
  providedIn: "root"
})
export class AccountService extends EntityCollectionServiceBase<Account> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super("Account", factory);
  }

  assetAccounts$ = this.entities$.pipe(assetsFilter);
  liabilityAccounts$ = this.entities$.pipe(liabilitiesFilter);
}
