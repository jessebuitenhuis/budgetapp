import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Transaction } from "src/app/models/Transaction";
import { TransactionService } from "src/app/services/transaction.service";

@Component({
  selector: "app-match-transactions",
  templateUrl: "./match-transactions.component.html",
  styleUrls: ["./match-transactions.component.css"]
})
export class MatchTransactionsComponent implements OnInit {
  items: { transaction: Transaction; selected: boolean }[] = [];

  constructor(
    private activeModal: NgbActiveModal,
    private _transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    const matches = this._transactionService.getUncategorizedMatches();
    this.items = matches.map(transaction => ({
      transaction,
      selected: true
    }));
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  match(): void {
    const itemsToMatch = this.items
      .filter(x => !!x.selected)
      .map(x => x.transaction);
    this._transactionService.update(itemsToMatch);
    this.activeModal.close();
  }
}
