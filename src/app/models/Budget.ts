import { BaseModel } from "./BaseModel";
import { Viewmodel } from "./types";

export class Budget extends BaseModel<Budget> {
  month: Date = this._data.month;
  categoryId: string = this._data.categoryId;
  amount: number = this._data.amount;

  constructor(private _data: Viewmodel<Budget>) {
    super(_data);
  }

  clone(): Budget {
    const vm = JSON.parse(JSON.stringify(this));
    return new Budget(vm);
  }
}
