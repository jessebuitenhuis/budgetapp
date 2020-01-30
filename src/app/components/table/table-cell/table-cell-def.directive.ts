import { Directive, TemplateRef } from "@angular/core";

@Directive({
  selector: "[appTableCellDef]"
})
export class TableCellDefDirective<T> {
  constructor(public templateRef: TemplateRef<{ $implicit: T }>) {}
}
