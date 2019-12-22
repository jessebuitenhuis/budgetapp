import { Injectable } from "@angular/core";
import * as csv from "csvtojson";
import * as moment from "moment";
import { Observable } from "rxjs";
import { isSameDate, isSameOrBeforeDate } from "../helpers/moment-pipes";
import { sum, where } from "../helpers/pipes";
import { Transaction } from "../models/Transaction";
import { EntityService } from "./entity.service";

@Injectable({
  providedIn: "root"
})
export class TransactionService extends EntityService<Transaction> {
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
    "accountId",
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

  constructor() {
    super("transaction");
  }

  getForCategory$(categoryId: string): Observable<Transaction[]> {
    return this.entities$.pipe(where(x => x.categoryId === categoryId));
  }

  getSpent$(filters: {
    categoryId?: string;
    month?: Date;
    maxMonth?: Date;
  }): Observable<number> {
    return this.entities$.pipe(
      where({ categoryId: filters.categoryId }),
      isSameDate(x => x.date, filters.month, "month"),
      isSameOrBeforeDate(x => x.date, filters.maxMonth, "month"),
      sum(x => x.amount)
    );
  }

  uploadCsv(csvContent: string): void {
    csv({
      noheader: true,
      colParser: TransactionService.asnColParser,
      headers: TransactionService.asnColHeaders
    })
      .fromString(csvContent)
      .then((items: Transaction[]) => {
        this.add(items);
      });
  }
}
