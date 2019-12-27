import { Injectable } from "@angular/core";
import { EntityService } from "./entity.service";
import { CategoryMatch } from "../models/CategoryMatch";
import { Transaction } from "../models/Transaction";
import { PayeeService } from "./payee.service";
import { TransactionService } from "./transaction.service";
import { truncateSync } from "fs";

@Injectable({
  providedIn: "root"
})
export class CategoryMatchService extends EntityService<CategoryMatch> {
  constructor(private _payeeService: PayeeService) {
    super("category_match");
  }

  match(transactions: Transaction[]): Transaction[] {
    const matches = this._entities$.value;
    return transactions.map(transaction => {
      for (const match of matches) {
        if (this.isMatch(match, transaction)) {
          return {
            ...transaction,
            categoryId: match.categoryId
          };
        } else {
          return transaction;
        }
      }
      return transaction;
    });
  }

  private isMatch(match: CategoryMatch, transaction: Transaction): boolean {
    if (match.payeeName) {
      const payee = this._payeeService.find(x => x.name === match.payeeName);
      return !!payee;
    } else if (match.description) {
      return (
        !!transaction.description &&
        transaction.description.indexOf(match.description) > -1
      );
    }

    return false;
  }
}
