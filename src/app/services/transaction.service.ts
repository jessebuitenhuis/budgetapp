import { Injectable } from "@angular/core";
import { StoreService } from "./store.service";
import { Transaction } from "../models/Transaction";
import { Observable, from } from "rxjs";
import { where, sum, groupBy, sumDict } from "../helpers/pipes";
import { isSameOrBeforeDate, isSameDate } from "../helpers/moment-pipes";
import { shareReplay } from "rxjs/operators";
import * as csv from "csvtojson";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  static asnColParser = {
    date: (item: string) => moment(item, "DD-MM-YYYY").toDate(),
    field5: "omit",
    field6: "omit",
    field7: "omit",
    field8: "omit",
    field9: "omit",
    field10: "omit",
    field12: "omit",
    field13: "omit",
    field14: "omit",
    field15: "omit",
    field16: "omit",
    field17: "omit",
    field19: "omit",
    saldo: "number",
    amount: "number",
    raw: (item: string, head: any, resultRow: any, row: string[]) =>
      row.toString()
  };

  static asnColHeaders: (keyof Transaction | "")[] = [
    "date",
    "accountNumber",
    "payeeAccountNumber",
    "payeeName",
    "",
    "",
    "",
    "",
    "",
    "",
    "amount",
    "",
    "",
    "",
    "",
    "",
    "",
    "description",
    "raw"
  ];

  store = this._storeService.transactions;
  transactions$ = this.store.items$;

  constructor(private _storeService: StoreService) {}

  getForCategory$(categoryId: string): Observable<Transaction[]> {
    return this.transactions$.pipe(where(x => x.categoryId === categoryId));
  }

  getSpent$(filters: {
    categoryId?: string;
    month?: Date;
    maxMonth?: Date;
  }): Observable<number> {
    return this.transactions$.pipe(
      where({ categoryId: filters.categoryId }),
      isSameDate(x => x.date, filters.month, "month"),
      isSameOrBeforeDate(x => x.date, filters.maxMonth, "month"),
      sum(x => x.amount)
    );
  }

  update(transaction: Transaction): void {
    this.store.update(transaction);
  }

  uploadCsv(csvContent: string): void {
    csv({
      noheader: true,
      colParser: TransactionService.asnColParser,
      headers: TransactionService.asnColHeaders
    })
      .fromString(csvContent)
      .then((items: Transaction[]) => {
        this.store.add(items);
        console.log(items);
      });
  }
}
