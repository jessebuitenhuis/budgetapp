import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "src/app/models/Transaction";
import { TransactionService } from "src/app/services/transaction.service";
import { SortFn } from "src/app/helpers/helpers";

@Component({
  selector: "app-transactions-table",
  templateUrl: "./transactions-table.component.html",
  styleUrls: ["./transactions-table.component.css"]
})
export class TransactionsTableComponent {
  transactions$ = this._transactionService.entities$;
  newTransaction: Transaction = this._transactionService.createEntity();
  sortFn: SortFn<Transaction> = item => item.date;

  constructor(private _transactionService: TransactionService) {}

  update(transaction: Transaction, props: Partial<Transaction>): void {
    this._transactionService.update({
      ...transaction,
      ...props
    });
  }

  add(): void {
    this._transactionService.add(this.newTransaction);
    this.newTransaction = this._transactionService.createEntity();
  }
}
