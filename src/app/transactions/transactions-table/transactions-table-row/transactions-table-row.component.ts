import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Transaction } from "src/app/models/Transaction";
import { TransactionService } from "src/app/services/transaction.service";

@Component({
  selector: "[app-transactions-table-row]",
  templateUrl: "./transactions-table-row.component.html",
  styleUrls: ["./transactions-table-row.component.css"]
})
export class TransactionsTableRowComponent {
  @Input() transaction = this._transactionService.createEntity();
  @Input() showSaveBtn = false;
  @Output() update = new EventEmitter<Partial<Transaction>>();

  constructor(private _transactionService: TransactionService) {}

  add(): void {
    this._transactionService.add(this.transaction);
    this.transaction = this._transactionService.createEntity();
  }

  remove(): void {
    if (confirm("Are you sure?")) {
      this._transactionService.delete(this.transaction);
    }
  }
}
