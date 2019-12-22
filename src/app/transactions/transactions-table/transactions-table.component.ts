import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "src/app/models/Transaction";
import { TransactionService } from "src/app/services/transaction.service";

@Component({
  selector: "app-transactions-table",
  templateUrl: "./transactions-table.component.html",
  styleUrls: ["./transactions-table.component.css"]
})
export class TransactionsTableComponent implements OnInit {
  @Input() transactions: Transaction[] = [];

  constructor(private _transactionService: TransactionService) {}

  ngOnInit() {}

  update(transaction: Transaction, props: Partial<Transaction>): void {
    this._transactionService.update({
      ...transaction,
      ...props
    });
  }
}
