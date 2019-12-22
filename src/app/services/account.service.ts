import { Injectable } from "@angular/core";
import { Account } from "../models/Account";
import { EntityService } from "./entity.service";
import { TransactionService } from "./transaction.service";
import { map } from "rxjs/operators";
import { sum } from "../helpers/pipes";

@Injectable({
  providedIn: "root"
})
export class AccountService extends EntityService<Account> {
  constructor(private _transactionService: TransactionService) {
    super("account");
  }

  saldoForAccount$ = (accountId: string) =>
    this._transactionService
      .selectByProp$({ accountId })
      .pipe(sum(x => x.amount));
}
