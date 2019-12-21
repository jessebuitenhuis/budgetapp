import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { isSameDate, isSameOrBeforeDate } from "../helpers/moment-pipes";
import { sum, where } from "../helpers/pipes";
import { Budget } from "../models/Budget";
import { EntityService } from "./entity.service";
import { BUDGETS } from "../mocks";

@Injectable({
  providedIn: "root"
})
export class BudgetService extends EntityService<Budget> {
  constructor() {
    super("budget", BUDGETS);
  }

  create(budget: Budget): void {
    this.add(budget);
  }

  // update(month: Date, categoryId: string, amount: number): void {
  //   const budget = this.find(month, categoryId);

  //   if (budget) {
  //     if (amount !== budget.amount) {
  //       budget.amount = amount;
  //       this.update(budget);
  //     }
  //   } else {
  //     this.create({
  //       month,
  //       categoryId,
  //       amount
  //     });
  //   }
  // }

  getBudgeted$(filters: {
    month?: Date;
    categoryId: string;
    maxMonth?: Date;
  }): Observable<number> {
    return this.entities$.pipe(
      where({ categoryId: filters.categoryId }),
      isSameDate(x => x.month, filters.month, "month"),
      isSameOrBeforeDate(x => x.month, filters.maxMonth, "month"),
      sum(x => x.amount)
    );
  }
}
