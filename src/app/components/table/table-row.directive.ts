import { Directive, TemplateRef } from "@angular/core";

@Directive({
  selector: "[tableRow]"
})
export class TableRowDirective {
  constructor(public templateRef: TemplateRef<{ $implicit: any }>) {}
}
