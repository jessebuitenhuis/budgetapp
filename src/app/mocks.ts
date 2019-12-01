import { Transaction } from "./models/Transaction";
import { Category } from "./models/Category";
import { Budget } from "./models/Budget";
import { Account } from "./models/Account";
import { Payee } from "./models/Payee";

export const ACCOUNTS: Account[] = [
  { id: "A", name: "Account A", accountNumber: "1234" },
  { id: "B", name: "Account B", accountNumber: "3456" }
];

export const CATEGORIES: Category[] = [
  { name: "Category A", id: "A" },
  { name: "Category B", id: "B" },
  { name: "Category C", id: "C" },
  { name: "Category D", id: "D" },
  { name: "Category E", id: "E" }
];

export const BUDGETS: Budget[] = [
  {
    categoryId: "A",
    amount: 100,
    id: "1",
    month: new Date(2019, 10, 1)
  },
  {
    categoryId: "B",
    amount: 200,
    id: "2",
    month: new Date(2019, 10, 1)
  },
  {
    categoryId: "C",
    amount: 400,
    id: "3",
    month: new Date(2019, 10, 1)
  }
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    amount: 100,
    date: new Date(),
    categoryId: "A"
  },
  {
    id: "2",
    amount: 9999,
    date: new Date(),
    categoryId: "A"
  },
  {
    id: "3",
    amount: 300,
    date: new Date(),
    categoryId: "B"
  },
  {
    id: "4",
    amount: 400,
    date: new Date(),
    categoryId: "C"
  }
];

export const PAYEES: Payee[] = [
  { id: "1", name: "Payee 1" },
  { id: "2", name: "Payee 2" }
];
