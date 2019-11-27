import { BaseModel } from "./BaseModel";

export interface Transaction extends BaseModel {
  date: Date;
  categoryId: string;
  amount: number;
}
