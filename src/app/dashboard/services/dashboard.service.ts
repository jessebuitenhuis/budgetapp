import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";
import { TransactionService } from "src/app/services/transaction.service";
import { BudgetService } from "src/app/services/budget.service";
import { map } from "rxjs/operators";
import { log } from "src/app/helpers/pipes";

@Injectable()
export class DashboardService {
  selectedMonth$ = new BehaviorSubject<Date>(new Date());

  constructor(
    private _transactionService: TransactionService,
    private _budgetService: BudgetService
  ) {}

  getAvailable$(maxMonth: Date, categoryId: string): Observable<number> {
    const spent$ = this._transactionService.getSpent$({
      maxMonth,
      categoryId
    });

    const budgeted$ = this._budgetService.getBudgeted$({
      maxMonth,
      categoryId
    });

    return combineLatest([spent$, budgeted$]).pipe(
      map(([spent, budgeted]) => budgeted + spent)
    );
  }
}
