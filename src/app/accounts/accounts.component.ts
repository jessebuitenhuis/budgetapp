import { Component, OnInit } from "@angular/core";
import { AccountService } from "../services/account.service";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.css"]
})
export class AccountsComponent implements OnInit {
  accounts$ = this._accountService.entities$;

  constructor(private _accountService: AccountService) {}

  ngOnInit() {}
}
