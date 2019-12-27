import { Injectable } from "@angular/core";
import * as csv from "csvtojson";
import * as moment from "moment";
import { Observable } from "rxjs";
import { isSameDate, isSameOrBeforeDate } from "../helpers/moment-pipes";
import { sum, where, log } from "../helpers/pipes";
import { Transaction } from "../models/Transaction";
import { EntityService } from "./entity.service";
import { tap, map, take } from "rxjs/operators";
import { PayeeService } from "./payee.service";
import { AccountService } from "./account.service";
import { CategoryMatchService } from "./category-match.service";

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

  constructor(
    private _payeeService: PayeeService,
    private _accountService: AccountService,
    private _categoryMatchService: CategoryMatchService
  ) {
    super("transaction");
  }

  uncategorized$ = this.entities$.pipe(where({ categoryId: "" }));

  getForCategory$(categoryId?: string): Observable<Transaction[]> {
    return this.entities$.pipe(where({ categoryId }));
  }

  saldoForAccount$ = (accountId: string) =>
    this.selectByProp$({ accountId }).pipe(sum(x => x.amount));

  getSpent$(filters: {
    categoryId?: string;
    month?: Date;
    maxMonth?: Date;
  }): Observable<number> {
    return this.getForCategory$(filters.categoryId).pipe(
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
        items = items.map(item => this.mapCsvItem(item));
        this.add(items);
      });
  }

  mapCsvItem(item: Transaction): Transaction {
    const account = this._accountService.findOrCreate(
      x => x.id === item.accountId,
      {
        id: item.accountId,
        name: item.accountId
      }
    );

    const payee = this._payeeService.findOrCreate(
      x => x.name === item.payeeName,
      {
        name: item.payeeName || ""
      }
    );

    return {
      ...item,
      categoryId: "",
      payeeId: payee.id,
      accountId: account.id
    };
  }

  createEntity(): Transaction {
    return super.createEntity({
      date: new Date(),
      accountId: "",
      amount: 0,
      categoryId: "",
      payeeId: ""
    });
  }

  matchUncategorized(): void {
    const uncategorized = this._entities$.value.filter(
      x => x.categoryId === ""
    );
    const matched = this._categoryMatchService.match(uncategorized);
    this.update(matched);
  }
}
