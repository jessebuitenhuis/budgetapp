import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AccountService } from "src/app/services/account.service";
import { NetWorthService } from './services/net-worth.service';

@Component({
  selector: "app-net-worth",
  templateUrl: "./net-worth.component.html",
  styleUrls: ["./net-worth.component.css"]
})
export class NetWorthComponent {
  accounts$ = this._accountService.entities$;
  selectedAccounts$ = this._netWorthService.selectedAccounts$;

  constructor(private _accountService: AccountService, private _netWorthService: NetWorthService) {}
}
