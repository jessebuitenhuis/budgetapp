import { Component, OnInit, HostBinding, Input } from "@angular/core";

@Component({
  selector: "app-input-group",
  templateUrl: "./input-group.component.html",
  styleUrls: ["./input-group.component.css"]
})
export class InputGroupComponent {
  @HostBinding("class.input-group") inputGroupClass = true;

  @Input() appendText?: string;
  @Input() appendIcon?: string;
  @Input() prependText?: string;
  @Input() prependIcon?: string;

  constructor() {}
}
