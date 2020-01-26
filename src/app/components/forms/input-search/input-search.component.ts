import { Component, OnInit } from "@angular/core";
import { AbstractValueAccessor } from "src/app/helpers/AbstractValueAccessor";

@Component({
  selector: "app-input-search",
  templateUrl: "./input-search.component.html",
  styleUrls: ["./input-search.component.css"]
})
export class InputSearchComponent extends AbstractValueAccessor<string>
  implements OnInit {
  ngOnInit(): void {}
}
