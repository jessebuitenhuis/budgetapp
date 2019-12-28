import { Pipe, PipeTransform } from "@angular/core";
import { PayeeService } from "src/app/services/payee.service";

@Pipe({
  name: "payee"
})
export class PayeePipe implements PipeTransform {
  constructor(private _payeeService: PayeeService) {}

  transform(payeeId: string): string {
    return this._payeeService.getName(payeeId);
  }
}
