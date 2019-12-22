import { Component, OnInit, Self, Optional } from "@angular/core";
import { Payee } from "src/app/models/Payee";
import { AbstractValueAccessor } from "src/app/helpers/AbstractValueAccessor";
import { NgControl } from "@angular/forms";
import { PayeeService } from "src/app/services/payee.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-select-payee",
  templateUrl: "./select-payee.component.html",
  styleUrls: ["./select-payee.component.scss"]
})
export class SelectPayeeComponent extends AbstractValueAccessor<string> {
  payees$ = this._payeeService.entities$;

  constructor(
    @Optional() @Self() control: NgControl,
    private _payeeService: PayeeService
  ) {
    super(control);
  }

  addTagFn = (name: string): Payee => {
    return this._payeeService.add({
      name
    });
  };
}
