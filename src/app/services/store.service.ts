import { Injectable } from "@angular/core";
import { Category } from "../models/Category";
import { Budget } from "../models/Budget";
import { Transaction } from "../models/Transaction";
import { StoreSet } from "../models/StoreSet";
import { BUDGETS, CATEGORIES, TRANSACTIONS, ACCOUNTS, PAYEES } from "../mocks";
import { Account } from "../models/Account";
import { Payee } from "../models/Payee";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  accounts = new StoreSet<Account>(ACCOUNTS);
  budgets = new StoreSet<Budget>(BUDGETS);
  categories = new StoreSet<Category>(CATEGORIES);
  transactions = new StoreSet<Transaction>(TRANSACTIONS);
  payees = new StoreSet<Payee>(PAYEES);

  constructor() {}
}
