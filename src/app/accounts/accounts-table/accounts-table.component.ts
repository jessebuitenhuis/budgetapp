import { Component, OnInit, Input } from "@angular/core";
import { Account } from "src/app/models/Account";
import { AccountService } from "src/app/services/account.service";
import { Viewmodel } from "src/app/models/types";

@Component({
  selector: "app-accounts-table",
  templateUrl: "./accounts-table.component.html",
  styleUrls: ["./accounts-table.component.css"]
})
export class AccountsTableComponent {
  @Input() accounts: Account[] = [];

  newAccount = this.createModel();

  constructor(private _accountService: AccountService) {}

  create(): void {
    this._accountService.add(this.newAccount);
    this.newAccount = this.createModel();
  }

  createModel(): Account {
    return {
      name: "",
      id: ""
    };
  }
}
