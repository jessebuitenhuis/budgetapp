import { Component, OnInit, HostBinding } from "@angular/core";

@Component({
  selector: "card-body",
  templateUrl: "./card-body.component.html",
  styleUrls: ["./card-body.component.css"]
})
export class CardBodyComponent implements OnInit {
  @HostBinding("class.card-body") cardBodyClass = true;

  constructor() {}

  ngOnInit() {}
}
