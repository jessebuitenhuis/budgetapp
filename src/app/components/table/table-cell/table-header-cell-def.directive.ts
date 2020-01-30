import { Directive, TemplateRef } from "@angular/core";

@Directive({
  selector: "[appTableHeaderCellDef]"
})
export class TableHeaderCellDefDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
