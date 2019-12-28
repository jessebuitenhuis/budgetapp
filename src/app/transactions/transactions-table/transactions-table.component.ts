import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "src/app/models/Transaction";
import { TransactionService } from "src/app/services/transaction.service";
import { SortFn } from "src/app/helpers/helpers";
import { BehaviorSubject } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatchTransactionsComponent } from "../match-transactions/match-transactions.component";

@Component({
  selector: "app-transactions-table",
  templateUrl: "./transactions-table.component.html",
  styleUrls: ["./transactions-table.component.css"]
})
export class TransactionsTableComponent {
  onlyShowUncategorized$ = new BehaviorSubject(false);

  transactions$ = this.onlyShowUncategorized$.pipe(
    switchMap(onlyShowUncategorized =>
      onlyShowUncategorized
        ? this._transactionService.uncategorized$
        : this._transactionService.entities$
    )
  );

  newTransaction: Transaction = this._transactionService.createEntity();
  sortFn: SortFn<Transaction> = item => item.date;

  constructor(
    private _transactionService: TransactionService,
    private ngbModal: NgbModal
  ) {}

  update(transaction: Transaction, props: Partial<Transaction>): void {
    console.log(transaction, props);
    this._transactionService.update({
      ...transaction,
      ...props
    });

    if (!!props.categoryId) {
      const matches = this._transactionService.getUncategorizedMatches();
      if (matches.length) {
        this.ngbModal.open(MatchTransactionsComponent, { size: "xl" });
      }
    }
  }

  add(): void {
    this._transactionService.add(this.newTransaction);
    this.newTransaction = this._transactionService.createEntity();
  }
}
