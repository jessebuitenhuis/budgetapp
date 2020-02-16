import { Injectable } from "@angular/core";
import { Account, assetsFilter, liabilitiesFilter } from "../models/Account";
import { EntityService } from "./entity.service";
import { TransactionService } from "./transaction.service";
import { map } from "rxjs/operators";
import { sum, where } from "../helpers/pipes";
import { FireEffects } from "../fire/fire.service";

@Injectable({
  providedIn: "root"
})
export class AccountService extends FireEffects<Account> {
  constructor() {
    super("account");
  }

  // assetAccounts$ =
  //   this.entities$.pipe(
  //     assetsFilter
  //   );

  // liabilityAccounts$ =
  //   this.entities$.pipe(
  //     liabilitiesFilter
  //   );
}
