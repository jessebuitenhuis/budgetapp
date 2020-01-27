import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Transaction } from "src/app/models/Transaction";
import { TransactionService } from "src/app/services/transaction.service";

@Component({
  selector: "[app-transactions-table-row]",
  templateUrl: "./transactions-table-row.component.html",
  styleUrls: ["./transactions-table-row.component.css"]
})
export class TransactionsTableRowComponent {
  private _transaction: Transaction = this._transactionService.createEntity();
  @Input() set transaction(val: Transaction) {
    this._transaction = { ...val };
  }
  get transaction(): Transaction {
    return this._transaction;
  }
  @Input() showSaveBtn = false;
  @Output() update = new EventEmitter<Partial<Transaction>>();
  @Output() save = new EventEmitter<void>();

  constructor(private _transactionService: TransactionService) {}
}
