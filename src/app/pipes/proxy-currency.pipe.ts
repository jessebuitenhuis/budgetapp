import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyPipe } from "@angular/common";

@Pipe({
  name: "currency"
})
export class ProxyCurrencyPipe extends CurrencyPipe implements PipeTransform {
  constructor() {
    super("nl");
  }

  transform(
    value: any,
    code = "EUR",
    display = "symbol",
    digitsInfo = "1.2-2",
    locale = "nl"
  ): string | null {
    return super.transform(value, code, display, digitsInfo, locale);
  }
}
