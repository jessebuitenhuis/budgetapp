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
  budgets = new StoreSet<Budget>();
  categories = new StoreSet<Category>();
  transactions = new StoreSet<Transaction>();

  constructor() {
    this.setMockData();
  }

  setMockData() {
    this.budgets.set(BUDGETS);
    this.categories.set(CATEGORIES);
    this.transactions.set(TRANSACTIONS);
  }
}
