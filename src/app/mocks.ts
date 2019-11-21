import { Transaction } from "./models/Transaction";
import { Category } from "./models/Category";
import { Budget } from "./models/Budget";

export const CATEGORIES: Category[] = [
  new Category({ name: "Category A", id: "A" }),
  new Category({ name: "Category B", id: "B" }),
  new Category({ name: "Category C", id: "C" }),
  new Category({ name: "Category D", id: "D" }),
  new Category({ name: "Category E", id: "E" })
];

export const BUDGETS: Budget[] = [
  new Budget({
    categoryId: "A",
    amount: 100,
    id: "1",
    month: new Date(2019, 10, 1)
  }),
  new Budget({
    categoryId: "B",
    amount: 200,
    id: "2",
    month: new Date(2019, 10, 1)
  }),
  new Budget({
    categoryId: "C",
    amount: 400,
    id: "3",
    month: new Date(2019, 10, 1)
  })
];

export const TRANSACTIONS: Transaction[] = [
  new Transaction({
    id: "1",
    amount: 100,
    date: new Date(),
    categoryId: "A"
  }),
  new Transaction({
    id: "2",
    amount: 9999,
    date: new Date(),
    categoryId: "A"
  }),
  new Transaction({
    id: "3",
    amount: 300,
    date: new Date(),
    categoryId: "B"
  }),
  new Transaction({
    id: "4",
    amount: 400,
    date: new Date(),
    categoryId: "C"
  })
];
