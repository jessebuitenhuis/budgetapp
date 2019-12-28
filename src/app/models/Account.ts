import { BaseModel } from "./BaseModel";

export interface Account extends BaseModel {
  name: string;
  accountNumber?: string;
  startSaldo?: number;
}
