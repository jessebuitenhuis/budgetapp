import { Component, OnInit } from "@angular/core";
import { AbstractValueAccessor } from "src/app/helpers/AbstractValueAccessor";
import { ControlValueAccessor } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-input-date",
  templateUrl: "./input-date.component.html",
  styleUrls: ["./input-date.component.css"]
})
export class InputDateComponent extends AbstractValueAccessor<Date> {
  private _date: string = "";
  get date(): string {
    return this._date;
  }
  set date(val: string) {
    this._date = val;
    this.value = this.parse(val);
  }

  writeValue(val: Date): void {
    this._date = val ? this.format(val) : "";
  }

  parse(val: string): Date {
    return moment(val, "YYYY-MM-DD").toDate();
  }

  format(val: Date): string {
    return moment(val).format("YYYY-MM-DD");
  }
}
