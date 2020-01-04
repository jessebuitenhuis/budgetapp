import { BaseModel } from "./BaseModel";
import { pipe } from "rxjs";
import { map, tap } from "rxjs/operators";

export type TransactionType = "income" | "expense" | "transfer";

export interface Transaction extends BaseModel {
  date: Date;
  accountId: string;

  categoryId: string;
  amount: number;
  description?: string;

  payeeId: string;
  payeeAccountNumber?: string;
  payeeName?: string;

  raw?: string;
  type?: TransactionType;
}

export function isIncome(x: Transaction): boolean {
  return x.amount > 0;
}

export function isExpense(x: Transaction): boolean {
  return x.amount <= 0;
}

export function includeInCalculations(x: Transaction): boolean {
  return x.type === undefined || x.type !== "transfer";
}

export const includeInCalcFilter = pipe(
  map((t: Transaction[]) => t.filter(x => includeInCalculations(x)))
);

export const incomeFilter = pipe(
  includeInCalcFilter,
  map((t: Transaction[]) => t.filter(x => isIncome(x)))
);

export const expensesFilter = pipe(
  includeInCalcFilter,
  map((t: Transaction[]) => t.filter(x => isExpense(x)))
);
