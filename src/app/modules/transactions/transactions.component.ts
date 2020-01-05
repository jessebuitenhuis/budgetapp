import { Component, OnInit } from "@angular/core";
import { TransactionService } from "../../services/transaction.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.css"]
})
export class TransactionsComponent {
  constructor(private _transactionService: TransactionService) {}

  onUpload(content: string): void {
    this._transactionService.uploadCsv(content);
  }
}