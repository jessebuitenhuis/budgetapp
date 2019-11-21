import { Injectable } from "@angular/core";
import { StoreService } from "./store.service";
import { Viewmodel } from "../models/types";
import { Budget } from "../models/Budget";
import { Observable } from "rxjs";
import { sum, where, groupBy, sumDict } from "../helpers/pipes";
import { isSameOrBeforeDate } from "../helpers/moment-pipes";
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BudgetService {
  budgets$ = this._store.budgets.items$;

  budgetedByCategory$(month?: Date) {
    return this.budgets$.pipe(
      isSameOrBeforeDate(x => x.month, month, "month"),
      groupBy("categoryId"),
      sumDict(x => x.amount),
      shareReplay(1)
    );
  }

  constructor(private _store: StoreService) {}

  create(data: Viewmodel<Budget>): Budget {
    const budget = new Budget(data);
    this._store.budgets.add(budget);
    return budget;
  }

  find$(filters: { month?: Date; categoryId?: string }): Observable<Budget[]> {
    return this.budgets$.pipe(where(filters));
  }

  getBudgeted$(
    filters: { month?: Date; categoryId?: string } = {}
  ): Observable<number> {
    return this.budgets$.pipe(
      where(filters),
      sum(x => x.amount)
    );
  }
}
