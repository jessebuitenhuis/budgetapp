import {
  Component,
  OnInit,
  HostBinding,
  Renderer2,
  ElementRef,
  ViewChild
} from "@angular/core";
import { AbstractValueAccessor } from "src/app/helpers/AbstractValueAccessor";

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.css"]
})
export class CheckboxComponent extends AbstractValueAccessor<boolean> {
  @HostBinding("class.form-check") formCheckClass = true;
}
