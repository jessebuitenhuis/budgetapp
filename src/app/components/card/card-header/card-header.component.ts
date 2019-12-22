import { Component, OnInit, HostBinding } from "@angular/core";

@Component({
  selector: "card-header",
  templateUrl: "./card-header.component.html",
  styleUrls: ["./card-header.component.css"]
})
export class CardHeaderComponent implements OnInit {
  @HostBinding("class.card-header") cardHeaderClass = true;

  constructor() {}

  ngOnInit() {}
}
