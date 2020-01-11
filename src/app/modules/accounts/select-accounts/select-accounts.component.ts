import { Component, OnInit, Input, Self, Optional } from "@angular/core";
import { Account } from "src/app/models/Account";
import { AbstractValueAccessor } from "src/app/helpers/AbstractValueAccessor";
import { NgControl } from "@angular/forms";
import { mapObject, Dictionary } from "underscore";

@Component({
  selector: "app-select-accounts",
  templateUrl: "./select-accounts.component.html",
  styleUrls: ["./select-accounts.component.css"]
})
export class SelectAccountsComponent extends AbstractValueAccessor<
  Account["id"][]
> {
  @Input() accounts: Account[] = [];

  states: { [accountId: string]: boolean } = {};

  constructor(@Self() @Optional() control: NgControl) {
    super(control);
  }

  select(accountId: string, isSelected: boolean): void {
    this.states[accountId] = isSelected;
    this._updateValue();
  }

  writeValue(val: string[]): void {
    const dict: Dictionary<boolean> = {};
    if (val) {
      val.forEach(id => (dict[id] = true));
    }
    this.states = dict;
    super.writeValue(val);
  }

  private _updateValue(): void {
    const selected = [];

    for (const key in this.states) {
      if (this.states[key]) {
        selected.push(key);
      }
    }

    this.value = selected;
  }
}
