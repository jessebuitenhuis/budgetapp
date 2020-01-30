import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "src/app/models/Transaction";
import { TransactionService } from "src/app/services/transaction.service";
import { SortFnSync, SortFnAsync } from "src/app/helpers/helpers";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatchTransactionsComponent } from "../match-transactions/match-transactions.component";
import { ActivatedRoute } from "@angular/router";
import { PayeeService } from "src/app/services/payee.service";
import { Dictionary } from "underscore";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-transactions-table",
  templateUrl: "./transactions-table.component.html",
  styleUrls: ["./transactions-table.component.css"]
})
export class TransactionsTableComponent {
  selected: string[] = [];

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

  sortByPayeeFn = this._payeeService.sortByProperty$<Transaction>(
    "name",
    x => x.payeeId
  );
  sortByCategoryFn = this._categoryService.sortByProperty$<Transaction>(
    "name",
    x => x.categoryId
  );

  newTransaction: Transaction = this._transactionService.createEntity();
  sortFn: SortFnSync<Transaction> = item => item.date;

  constructor(
    private _transactionService: TransactionService,
    private _payeeService: PayeeService,
    private _categoryService: CategoryService,
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
