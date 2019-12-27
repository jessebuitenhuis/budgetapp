import { Component, OnInit, Input } from "@angular/core";
import { Account } from "src/app/models/Account";
import { AccountService } from "src/app/services/account.service";
import { Observable } from "rxjs";
import { TransactionService } from "src/app/services/transaction.service";

@Component({
  selector: "app-account-summary",
  templateUrl: "./account-summary.component.html",
  styleUrls: ["./account-summary.component.css"]
})
export class AccountSummaryComponent implements OnInit {
  @Input() account!: Account;
  saldo$?: Observable<number>;

  constructor(private _transactionService: TransactionService) {}

  ngOnInit(): void {
    this.saldo$ = this._transactionService.saldoForAccount$(this.account.id);
  }
}
