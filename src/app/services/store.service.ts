import { Injectable } from "@angular/core";
import { Category } from "../models/Category";
import { Budget } from "../models/Budget";
import { Transaction } from "../models/Transaction";
import { StoreSet } from "../models/StoreSet";
import { BUDGETS, CATEGORIES, TRANSACTIONS } from "../mocks";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  budgets = new StoreSet<Budget>(BUDGETS);
  categories = new StoreSet<Category>(CATEGORIES);
  transactions = new StoreSet<Transaction>(TRANSACTIONS);

  constructor() {}
}
