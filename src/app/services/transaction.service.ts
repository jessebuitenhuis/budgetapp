import { Injectable } from "@angular/core";
import { StoreService } from "./store.service";
import { Transaction } from "../models/Transaction";
import { Observable } from "rxjs";
import { where, sum, groupBy, sumDict } from "../helpers/pipes";
import { isSameOrBeforeDate, isSameDate } from "../helpers/moment-pipes";
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  transactions$ = this._store.transactions.items$;

  spentByCategory$ = (month: Date) =>
    this.transactions$.pipe(
      isSameDate(x => x.date, month, "month"),
      groupBy("categoryId"),
      sumDict(x => x.amount),
      shareReplay(1)
    );

  totalSpentByCategory$ = (maxMonth?: Date) =>
    this.transactions$.pipe(
      isSameOrBeforeDate(x => x.date, maxMonth, "month"),
      groupBy("categoryId"),
      sumDict(x => x.amount),
      shareReplay(1)
    );

  constructor(private _store: StoreService) {}

  getForCategory$(categoryId: string): Observable<Transaction[]> {
    return this.transactions$.pipe(where(x => x.categoryId === categoryId));
  }

  getSpent$(filters: {
    categoryId?: string;
    month?: Date;
    maxDate?: Date;
  }): Observable<number> {
    return this.transactions$.pipe(
      where({ categoryId: filters.categoryId }),
      isSameDate(x => x.date, filters.month, "month"),
      isSameOrBeforeDate(x => x.date, filters.maxDate, "day"),
      sum(x => x.amount)
    );
  }
}
