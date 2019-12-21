import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "src/app/models/Transaction";
import { TransactionService } from "src/app/services/transaction.service";

@Component({
  selector: "[app-transactions-table-row]",
  templateUrl: "./transactions-table-row.component.html",
  styleUrls: ["./transactions-table-row.component.css"]
})
export class TransactionsTableRowComponent {
  @Input() transaction!: Transaction;

  constructor(private _transactionService: TransactionService) {}

  update(props: Partial<Transaction>): void {
    this._transactionService.update({
      ...this.transaction,
      ...props
    });
  }
}
