import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import {
  map,
  combineLatest,
  switchMap,
  tap,
  take,
  flatMap
} from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { BudgetService } from "../services/budget.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  selectedMonth$ = new BehaviorSubject<Date>(new Date());
  categories$ = this._categoryService.categories$;

  available$ = this.selectedMonth$.pipe(
    switchMap(month => this._categoryService.getAvailable$(month))
  );

  spent$ = this.selectedMonth$.pipe(
    switchMap(month => this._transactionService.spentByCategory$(month))
  );

  budgeted$ = this.selectedMonth$.pipe(
    switchMap(month => this._budgetService.budgetedByCategory$(month))
  );

  data$ = this.categories$.pipe(
    combineLatest(this.available$, this.spent$, this.budgeted$),
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

  updateBudget(categoryId: string, amount: number) {
    const month = this.selectedMonth$.value;
    this._budgetService.update(month, categoryId, amount);
  }
}
