import { Component, OnInit, HostBinding } from "@angular/core";

@Component({
  selector: "app-form-group",
  templateUrl: "./form-group.component.html",
  styleUrls: ["./form-group.component.css"]
})
export class FormGroupComponent implements OnInit {
  @HostBinding("class.form-group") formGroupClass = true;

  constructor() {}

  ngOnInit() {}
}
