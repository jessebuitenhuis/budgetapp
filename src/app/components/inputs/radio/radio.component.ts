import { Component, OnInit, Input, HostBinding } from "@angular/core";
import { AbstractValueAccessor } from "src/app/helpers/AbstractValueAccessor";

@Component({
  selector: "app-radio",
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.css"]
})
export class RadioComponent<T> extends AbstractValueAccessor<T> {
  @HostBinding("class.form-check") formCheckClass = true;
  @Input() val?: T;
  @Input() name: string = "";
}
