import { BaseModel } from "./BaseModel";
import { Viewmodel } from "./types";

export interface Budget extends BaseModel {
  month: Date;
  categoryId: string;
  amount: number;
}
