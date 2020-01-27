import { Directive } from "@angular/core";
import { CdkColumnDef } from "@angular/cdk/table";

@Directive({
  selector: "[appTableSort]"
})
export class TableSortDirective {
  constructor(private columnDef: CdkColumnDef) {
    console.log(columnDef.name);
  }
}
