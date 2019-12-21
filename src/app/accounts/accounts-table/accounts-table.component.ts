import { Component, OnInit, Input } from "@angular/core";
import { Account } from "src/app/models/Account";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: "app-accounts-table",
  templateUrl: "./accounts-table.component.html",
  styleUrls: ["./accounts-table.component.css"]
})
export class AccountsTableComponent {
  @Input() accounts: Account[] = [];

  newAccount: string = "";

  constructor(private _accountService: AccountService) {}

  create(): void {
    this._accountService.add({
      name: this.newAccount
    } as Account);
    this.newAccount = "";
  }
}
