import { Component, OnInit, Input } from "@angular/core";
import { Category } from "src/app/models/Category";
import { DashboardService } from "../services/dashboard.service";
import { switchMap, map } from "rxjs/operators";
import { TransactionService } from "src/app/services/transaction.service";
import { BudgetService } from "src/app/services/budget.service";
import { log } from "src/app/helpers/pipes";

@Component({
  selector: "[app-dashboard-table-row]",
  templateUrl: "./dashboard-table-row.component.html",
  styleUrls: ["./dashboard-table-row.component.css"]
})
export class DashboardTableRowComponent {
  @Input() category!: Category;
  selectedMonth$ = this._dashboardService.selectedMonth$;

  constructor(
    private _dashboardService: DashboardService,
    private _transactionService: TransactionService,
    private _budgetService: BudgetService
  ) {}

  available$ = this.selectedMonth$.pipe(
    switchMap(month =>
      this._dashboardService.getAvailable$(month, this.category.id)
    )
  );

  spent$ = this.selectedMonth$.pipe(
    switchMap(month =>
      this._transactionService.getSpent$({
        month,
        categoryId: this.category.id
      })
    ),
    map(x => x * -1)
  );

  budgeted$ = this.selectedMonth$.pipe(
    switchMap(month =>
      this._budgetService.getBudgeted$({
        month,
        categoryId: this.category.id
      })
    )
  );

  updateBudget(amount: number) {
    const month = this.selectedMonth$.value;
    // this._budgetService.update(month, this.category.id, amount);
  }
}
