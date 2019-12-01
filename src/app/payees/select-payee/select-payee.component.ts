import { Component, OnInit, Self, Optional } from "@angular/core";
import { Payee } from "src/app/models/Payee";
import { StoreService } from "src/app/services/store.service";
import { AbstractValueAccessor } from "src/app/helpers/AbstractValueAccessor";
import { NgControl } from "@angular/forms";

@Component({
  selector: "app-select-payee",
  templateUrl: "./select-payee.component.html",
  styleUrls: ["./select-payee.component.scss"]
})
export class SelectPayeeComponent extends AbstractValueAccessor<string> {
  payees$ = this._store.payees.items$;

  constructor(
    @Optional() @Self() control: NgControl,
    private _store: StoreService
  ) {
    super(control);
  }

  addTagFn = (name: string): Payee => {
    return this._store.payees.add({
      name
    });
  };
}
