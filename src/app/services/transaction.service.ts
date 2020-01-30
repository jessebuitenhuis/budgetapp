import { Injectable } from "@angular/core";
import * as csv from "csvtojson";
import * as moment from "moment";
import { Observable, pipe } from "rxjs";
import {
  isSameDate,
  isSameOrBeforeDate,
  groupByMonth
} from "../helpers/moment-pipes";
import { sum, where, log, groupBy, sumDict } from "../helpers/pipes";
import { EntityService } from "./entity.service";
import {
  tap,
  map,
  take,
  share,
  shareReplay,
  switchMap,
  filter
} from "rxjs/operators";
import { PayeeService } from "./payee.service";
import { AccountService } from "./account.service";
import { Category } from "../models/Category";
import { sort, SortDirection } from "../helpers/helpers";
import {
  Transaction,
  incomeFilter,
  expensesFilter,
  includeInCalcFilter,
  filterTransactionByAccounts
} from "../models/Transaction";
import { assetsFilter, accountsFilter } from "../models/Account";

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

  uncategorized$ = this.entities$.pipe(where({ categoryId: "" }));

  constructor(
    private _payeeService: PayeeService,
    private _accountService: AccountService
  ) {
    super("transaction");
  }

  income$ = this.entities$.pipe(incomeFilter);
  expenses$ = this.entities$.pipe(expensesFilter);

  getForAccount$ = (accountId: string) =>
    this.entities$.pipe(where({ accountId }), shareReplay(1));

  getForAccounts$ = (accountIds: string[] = []) =>
    this.entities$.pipe(where(x => accountIds.includes(x.accountId)));

  getForCategory$ = (
    categoryId?: string,
    accountIds: string[] = []
  ): Observable<Transaction[]> =>
    this.entities$.pipe(
      filterTransactionByAccounts(accountIds),
      where({ categoryId }),
      shareReplay(1)
    );

  getForPayee$ = (
    payeeId: string,
    accountIds: string[]
  ): Observable<Transaction[]> =>
    this.entities$.pipe(
      filterTransactionByAccounts(accountIds),
      where({ payeeId }),
      shareReplay(1)
    );

  getForMonth$ = (month: Date, accountIds: string[] = []) =>
    this.entities$.pipe(
      filterTransactionByAccounts(accountIds),
      isSameDate(x => x.date, month, "month")
    );

  saldoForAccount$ = (accountId: string) =>
    this.selectByProp$({ accountId }).pipe(sum(x => x.amount));

  assetsSaldoByMonth$ = (accountIds: string[] = []) =>
    this._accountService.assetAccounts$.pipe(
      accountsFilter(accountIds),
      switchMap(accounts => this.getForAccounts$(accounts.map(x => x.id))),
      groupByMonth(x => x.date),
      sumDict(x => x.amount, true)
    );

  liabilitiesSaldoByMonth$ = (accountIds: string[] = []) =>
    this._accountService.liabilityAccounts$.pipe(
      accountsFilter(accountIds),
      switchMap(accounts => this.getForAccounts$(accounts.map(x => x.id))),
      groupByMonth(x => x.date),
      sumDict(x => x.amount, true)
    );

  saldoByMonth$ = (accountIds: string[] = []) =>
    this.entities$.pipe(
      filterTransactionByAccounts(accountIds),
      groupByMonth(x => x.date),
      sumDict(x => x.amount, true)
    );

  incomeForMonth$ = (month: Date, accountIds: string[] = []) =>
    this.getForMonth$(month).pipe(
      filterTransactionByAccounts(accountIds),
      incomeFilter,
      sum(x => x.amount)
    );

  incomeByMonth$ = (accountIds: string[] = []) =>
    this.entities$.pipe(
      filterTransactionByAccounts(accountIds),
      incomeFilter,
      groupByMonth(x => x.date),
      sumDict(x => x.amount)
    );

  incomeForMonthByCategory$ = (month: Date, accountIds: string[] = []) =>
    this.getForMonth$(month).pipe(
      filterTransactionByAccounts(accountIds),

      incomeFilter,
      groupBy("categoryId"),
      sumDict(x => x.amount)
    );

  expensesForMonth$ = (month: Date, accountIds: string[] = []) =>
    this.getForMonth$(month).pipe(
      filterTransactionByAccounts(accountIds),
      expensesFilter,
      sum(x => x.amount)
    );

  expensesByMonth$ = (accountIds: string[] = []) =>
    this.entities$.pipe(
      filterTransactionByAccounts(accountIds),

      expensesFilter,
      groupByMonth(x => x.date),
      sumDict(x => x.amount)
    );

  expensesForMonthByCategory$ = (month: Date, accountIds: string[] = []) =>
    this.getForMonth$(month).pipe(
      filterTransactionByAccounts(accountIds),
      expensesFilter,
      groupBy("categoryId"),
      sumDict(x => x.amount)
    );

  nettoForMonth$ = (month: Date, accountIds: string[] = []) =>
    this.getForMonth$(month).pipe(
      filterTransactionByAccounts(accountIds),

      includeInCalcFilter,
      sum(x => x.amount)
    );

  nettoByMonth$ = (accountIds: string[] = []) =>
    this.entities$.pipe(
      filterTransactionByAccounts(accountIds),
      includeInCalcFilter,
      groupByMonth(x => x.date),
      sumDict(x => x.amount)
    );

  /**
   * DEPRECATED
   */
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
        items = items.filter(
          item =>
            this._entities$.value.findIndex(
              x => x.raw && x.raw === item.raw
            ) === -1
        );
        items = items.map(item => this.mapCsvItem(item));
        this.add(items);
      });
  }

  mapCsvItem(item: Transaction): Transaction {
    const account =
      item.accountId &&
      this._accountService.findOrCreate(x => x.id === item.accountId, {
        id: item.accountId,
        name: item.accountId
      });

    const payee =
      item.payeeName &&
      this._payeeService.findOrCreate(x => x.name === item.payeeName, {
        name: item.payeeName || ""
      });

    return {
      ...item,
      categoryId: "",
      payeeId: payee ? payee.id : "",
      accountId: account ? account.id : ""
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

  getUncategorizedMatches(): Transaction[] {
    const uncategorized = this.getUncategorized();
    const matched: Transaction[] = [];

    uncategorized.forEach(transaction => {
      const categoryId = this.getCategoryMatch(transaction);
      if (categoryId) {
        matched.push({
          ...transaction,
          categoryId
        });
      }
    });

    return matched;
  }

  getUncategorized(): Transaction[] {
    return this._entities$.value.filter(x => x.categoryId === "");
  }

  getCategorized(): Transaction[] {
    return this._entities$.value.filter(x => !!x.categoryId);
  }

  getCategoryMatch(transaction: Transaction): Category["id"] | undefined {
    const categorized = this.getCategorized();

    // Find match by description && payee
    let matches = categorized.filter(
      x =>
        !!x.description &&
        x.description === transaction.description &&
        !!x.payeeId &&
        x.payeeId === transaction.payeeId
    );

    // Find match by payee
    if (matches.length === 0) {
      matches = categorized.filter(
        x => !!x.payeeId && x.payeeId === transaction.payeeId
      );
    }

    // Find match by exact description
    if (matches.length === 0) {
      matches = categorized.filter(
        x => !!x.description && x.description === transaction.description
      );
    }

    // TODO add more fuzzy searches
    const sorted = sort(matches, x => x.date, SortDirection.DESCENDING);
    const categoryId = (sorted[0] && sorted[0].categoryId) || undefined;
    return categoryId;
  }
}
