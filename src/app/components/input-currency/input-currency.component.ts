import {
  Component,
  OnInit,
  ViewChild,
  Optional,
  Self,
  ElementRef
} from "@angular/core";
import { AbstractValueAccessor } from "src/app/helpers/AbstractValueAccessor";
import { NgControl } from "@angular/forms";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-input-currency",
  templateUrl: "./input-currency.component.html",
  styleUrls: ["./input-currency.component.scss"]
})
export class InputCurrencyComponent extends AbstractValueAccessor<number> {
  @ViewChild("inputEl", { static: true }) inputEl!: ElementRef<
    HTMLInputElement
  >;

  currencyPipe = new CurrencyPipe("nl-NL");

  set inputValue(val: number) {
    const string = val.toLocaleString("nl-NL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    if (this.inputEl.nativeElement.value !== string) {
      this.inputEl.nativeElement.value = string;
    }
  }

  get inputValue(): number {
    const val = this.inputEl.nativeElement.value || "0";
    const string = val.replace(/\./g, "").replace(/\,/g, ".");
    return parseFloat(string);
  }

  constructor(@Self() @Optional() control: NgControl) {
    super(control);
  }

  writeValue(val: number | undefined) {
    super.writeValue(val);
    this.inputValue = val || 0;
  }

  onChange(event: any) {
    const val: string = event.target.value;
    const string = val.replace(/\./g, "").replace(/\,/g, ".") || "0";
    const float = parseFloat(string);
    const mainPart = Math.floor(float);

    const digitPart = val.match(/\,(.*)/);

    let formattedString = mainPart.toLocaleString("nl-NL");
    if (digitPart) {
      formattedString += digitPart[0].slice(0, 3);
    }

    this.inputEl.nativeElement.value = formattedString;
  }

  onBlur() {
    this.value = this.inputValue;
    this.inputValue = this.inputValue;
    super.onTouched();
  }

  onFocus(): void {
    this.inputEl.nativeElement.select();
  }

  onEnter(): void {
    this.inputEl.nativeElement.blur();
  }
}
