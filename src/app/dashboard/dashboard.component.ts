import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import { map, combineLatest, switchMap, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { BudgetService } from "../services/budget.service";
import * as moment from "moment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  selectedMonth$ = new BehaviorSubject<moment.Moment>(moment());
  categories$ = this._categoryService.categories$;

  available$ = this.selectedMonth$.pipe(
    switchMap(month => this._categoryService.getAvailable$(month.toDate()))
  );

  spent$ = this.selectedMonth$.pipe(
    switchMap(month =>
      this._transactionService.spentByCategory$(month.toDate())
    )
  );

  budgeted$ = this.selectedMonth$.pipe(
    switchMap(month => this._budgetService.budgetedByCategory$(month.toDate()))
  );

  data$ = this.categories$.pipe(
    combineLatest(this.available$, this.spent$, this.budgeted$),
    tap(x => console.log("changed")),
    map(([cats, available, spent, budgeted]) =>
      cats.map(cat => ({
        category: cat,
        budgeted: budgeted[cat.id] || 0,
        spent: spent[cat.id] || 0,
        available: available[cat.id] || 0
      }))
    )
  );

  constructor(
    private _categoryService: CategoryService,
    private _transactionService: TransactionService,
    private _budgetService: BudgetService
  ) {}

  ngOnInit() {}

  prevMonth() {
    this.selectedMonth$.next(
      this.selectedMonth$.value.subtract(1, "month").clone()
    );
  }

  nextMonth() {
    this.selectedMonth$.next(this.selectedMonth$.value.add(1, "month").clone());
  }
}
