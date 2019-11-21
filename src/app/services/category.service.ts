import { Injectable } from "@angular/core";
import { Category } from "../models/Category";
import { StoreService } from "./store.service";
import { Viewmodel } from "../models/types";
import { TransactionService } from "./transaction.service";
import { BudgetService } from "./budget.service";
import { combineLatest, map } from "rxjs/operators";
import { groupBy } from "../helpers/pipes";
import { mapObject } from "underscore";

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

  create(data: Viewmodel<Category>): Category {
    const category = new Category(data);
    this._store.categories.add(category);
    return category;
  }

  delete(category: Category): void {
    this._store.categories.remove(category);
  }

  getAvailable$(month?: Date) {
    const spent$ = this._transactionService.spentByCategory$(month);
    const budgeted$ = this._budgetService.budgetedByCategory$(month);

    return this.categories$.pipe(
      combineLatest(spent$, budgeted$),
      map(([categories, spent, budgeted]) => {
        return categories.reduce((obj, cat) => {
          return {
            ...obj,
            [cat.id]: budgeted[cat.id] - spent[cat.id] || 0
          };
        }, {} as { [key: string]: number });
      })
    );
  }
}
