import { Component, OnInit, HostBinding } from "@angular/core";

@Component({
  selector: "card-footer",
  templateUrl: "./card-footer.component.html",
  styleUrls: ["./card-footer.component.css"]
})
export class CardFooterComponent implements OnInit {
  @HostBinding("class.card-footer") cardFooterClass = true;

  constructor() {}

  ngOnInit() {}
}
