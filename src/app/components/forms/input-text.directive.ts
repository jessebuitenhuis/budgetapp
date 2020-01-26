import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: "[appInputText]"
})
export class InputTextDirective {
  @HostBinding("class.form-control") formControlClass = true;
  @HostBinding("type") type = "text";

  constructor() {}
}
