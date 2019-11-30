import { Component, OnInit, Optional, Self } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import { StoreService } from "src/app/services/store.service";
import { AbstractValueAccessor } from "src/app/helpers/AbstractValueAccessor";
import { NgControl } from "@angular/forms";

@Component({
  selector: "app-select-account",
  templateUrl: "./select-account.component.html",
  styleUrls: ["./select-account.component.scss"]
})
export class SelectAccountComponent extends AbstractValueAccessor<string> {
  accounts$ = this._storeService.accounts.items$;

  constructor(
    @Optional() @Self() control: NgControl,
    private _storeService: StoreService
  ) {
    super(control);
  }

  addTagFn = (name: string) => {
    this._storeService.accounts.add({
      name
    });
  };
}
