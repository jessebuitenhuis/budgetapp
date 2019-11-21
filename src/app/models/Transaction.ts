import { Viewmodel } from "./types";
import { BaseModel } from "./BaseModel";

export class Transaction extends BaseModel<Transaction> {
  date: Date = this.data.date;
  categoryId: string = this.data.categoryId;
  amount: number = this.data.amount;

  constructor(private data: Viewmodel<Transaction>) {
    super(data);
  }

  clone(): Transaction {
    const vm = JSON.parse(JSON.stringify(this));
    return new Transaction(vm);
  }
}
