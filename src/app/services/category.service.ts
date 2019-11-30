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
}
