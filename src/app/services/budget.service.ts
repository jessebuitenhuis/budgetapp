import { Injectable } from "@angular/core";
import { StoreService } from "./store.service";
import { Viewmodel } from "../models/types";
import { Budget } from "../models/Budget";
import { Observable, of, from } from "rxjs";
import { sum, where, groupBy, sumDict, find } from "../helpers/pipes";
import { isSameOrBeforeDate, isSameDate } from "../helpers/moment-pipes";
import { shareReplay, take, flatMap, map } from "rxjs/operators";
import * as moment from "moment";
import { isSame } from "../helpers/dates";

@Injectable({
  providedIn: "root"
})
export class BudgetService {
  budgets$ = this._store.budgets.items$;

  budgetedByCategory$ = (month: Date) =>
    this.budgets$.pipe(
      isSameDate(x => x.month, month, "month"),
      groupBy("categoryId"),
      sumDict(x => x.amount),
      shareReplay(1)
    );

  totalBudgetedByCategory$(maxMonth?: Date) {
    return this.budgets$.pipe(
      isSameOrBeforeDate(x => x.month, maxMonth, "month"),
      groupBy("categoryId"),
      sumDict(x => x.amount),
      shareReplay(1)
    );
  }

  constructor(private _store: StoreService) {}

  create(budget: Viewmodel<Budget>): void {
    this._store.budgets.add(budget);
  }

  update(month: Date, categoryId: string, amount: number): void {
    const budget = this.find(month, categoryId);

    if (budget) {
      if (amount !== budget.amount) {
        budget.amount = amount;
        this._store.budgets.update(budget);
      }
    } else {
      this.create({
        month,
        categoryId,
        amount
      });
    }
  }

  find(month: Date, categoryId: string): Budget | undefined {
    return this._store.budgets.find(
      x => x.categoryId === categoryId && isSame(month, x.month, "month")
    );
  }

  find$(month: Date, categoryId: string): Observable<Budget | undefined> {
    return this.budgets$.pipe(
      find(x => x.categoryId === categoryId && isSame(month, x.month, "month"))
    );
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
