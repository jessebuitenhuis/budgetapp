import { Component, OnInit, Input } from "@angular/core";
import { Account } from "src/app/models/Account";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: "tr[app-accounts-table-row]",
  templateUrl: "./accounts-table-row.component.html",
  styleUrls: ["./accounts-table-row.component.css"]
})
export class AccountsTableRowComponent {
  @Input() account!: Account;

  constructor(private _accountService: AccountService) {}

  update(props: Partial<Account>): void {
    this._accountService.update({
      id: this.account.id,
      ...props
    });
  }
}
