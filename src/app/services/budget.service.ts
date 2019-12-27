import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { isSameDate, isSameOrBeforeDate } from "../helpers/moment-pipes";
import { sum, where } from "../helpers/pipes";
import { Budget } from "../models/Budget";
import { EntityService } from "./entity.service";

@Injectable({
  providedIn: "root"
})
export class BudgetService extends EntityService<Budget> {
  constructor() {
    super("budget");
  }

  getForCategory$ = (categoryId?: string) =>
    this.entities$.pipe(where({ categoryId }));

  create(budget: Budget): void {
    this.add(budget);
  }

  getBudgeted$(filters: {
    month?: Date;
    categoryId: string;
    maxMonth?: Date;
  }): Observable<number> {
    return this.getForCategory$(filters.categoryId).pipe(
      isSameDate(x => x.month, filters.month, "month"),
      isSameOrBeforeDate(x => x.month, filters.maxMonth, "month"),
      sum(x => x.amount)
    );
  }
}
