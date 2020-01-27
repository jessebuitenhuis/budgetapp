import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "src/app/models/Transaction";
import { TransactionService } from "src/app/services/transaction.service";
import { SortFn } from "src/app/helpers/helpers";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatchTransactionsComponent } from "../match-transactions/match-transactions.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-transactions-table",
  templateUrl: "./transactions-table.component.html",
  styleUrls: ["./transactions-table.component.css"]
})
export class TransactionsTableComponent {
  onlyShowUncategorized$ = new BehaviorSubject(false);
  accountId$ = this._activatedRoute.paramMap.pipe(
    map(x => x.get("id") || null)
  );

  transactions$ = this.accountId$.pipe(
    switchMap(accountId => {
      return accountId
        ? this._transactionService.getForAccount$(accountId)
        : this._transactionService.entities$;
    })
  );

  newTransaction: Transaction = this._transactionService.createEntity();
  sortFn: SortFn<Transaction> = item => item.date;

  constructor(
    private _transactionService: TransactionService,
    private _activatedRoute: ActivatedRoute,
    private ngbModal: NgbModal
  ) {}

  onUpload(content: string): void {
    this._transactionService.uploadCsv(content);
  }

  update(transaction: Transaction, props: Partial<Transaction>): void {
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

  add(transaction: Transaction): void {
    this._transactionService.add(transaction);
    this.newTransaction = this._transactionService.createEntity();
  }

  remove(transaction: Transaction): void {
    if (confirm("Are you sure?")) {
      this._transactionService.delete(transaction);
    }
  }
}
