import { Injectable } from "@angular/core";
import { FireService } from "../fire/fire.service";
import { Account, assetsFilter, liabilitiesFilter } from "../models/Account";
import { createSelector } from "@ngrx/store";

@Injectable({
  providedIn: "root"
})
export class AccountService extends FireService<Account> {
  name = "account";

  selectAssetAccounts = createSelector(this.entities$, assetsFilter);
  selectLiabilityAccount$ = createSelector(this.entities$, liabilitiesFilter);
}
