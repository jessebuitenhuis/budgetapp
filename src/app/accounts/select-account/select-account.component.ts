import { Component, OnInit, Optional, Self } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import { AbstractValueAccessor } from "src/app/helpers/AbstractValueAccessor";
import { NgControl } from "@angular/forms";
import { Account } from "src/app/models/Account";
import { Observable } from "rxjs";

@Component({
  selector: "app-select-account",
  templateUrl: "./select-account.component.html",
  styleUrls: ["./select-account.component.scss"]
})
export class SelectAccountComponent extends AbstractValueAccessor<string> {
  accounts$ = this._accountService.entities$;

  constructor(
    @Optional() @Self() control: NgControl,
    private _accountService: AccountService
  ) {
    super(control);
  }

  addTagFn = (name: string): Observable<Account> => {
    return this._accountService.add({
      name
    } as Account);
  };
}
