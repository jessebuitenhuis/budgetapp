import { Injectable } from "@angular/core";
import { Category } from "../models/Category";
import { StoreService } from "./store.service";
import { Viewmodel } from "../models/types";
import { TransactionService } from "./transaction.service";
import { BudgetService } from "./budget.service";
import { combineLatest, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  categories$ = this._store.categories.items$;

  constructor(
    private _store: StoreService,
    private _transactionService: TransactionService,
    private _budgetService: BudgetService
  ) {}

  create(category: Viewmodel<Category>): void {
    this._store.categories.add(category);
  }

  delete(category: Category): void {
    this._store.categories.remove(category);
  }

  getAvailable$(month?: Date) {
    const spent$ = this._transactionService.totalSpentByCategory$(month);
    const budgeted$ = this._budgetService.totalBudgetedByCategory$(month);

    return this.categories$.pipe(
      combineLatest(spent$, budgeted$),
      map(([categories, spent, budgeted]) => {
        console.log(categories, spent, budgeted);
        return categories.reduce((obj, cat) => {
          const catBudgeted = budgeted[cat.id] || 0;
          const spentBudgeted = spent[cat.id] || 0;
          return {
            ...obj,
            [cat.id]: catBudgeted - spentBudgeted || 0
          };
        }, {} as { [key: string]: number });
      })
    );
  }
}
