import { BaseModel } from "./BaseModel";

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
}
