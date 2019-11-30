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

  getBudgeted$(filters: {
    month?: Date;
    categoryId: string;
    maxMonth?: Date;
  }): Observable<number> {
    return this.budgets$.pipe(
      where({ categoryId: filters.categoryId }),
      isSameDate(x => x.month, filters.month, "month"),
      isSameOrBeforeDate(x => x.month, filters.maxMonth, "month"),
      sum(x => x.amount)
    );
  }
}
