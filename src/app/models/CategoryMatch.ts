import { BaseModel } from "./BaseModel";

export interface CategoryMatch extends BaseModel {
  categoryId: string;
  payeeName?: string;
  description?: string;
}
