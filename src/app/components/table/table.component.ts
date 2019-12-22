import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  ContentChild
} from "@angular/core";
import { Observable } from "rxjs";
import { TableRowDirective } from "./table-row.directive";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent<T> implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input("data") data?: T[];
  @ContentChild(TableRowDirective, { static: false })
  rowTpl?: TableRowDirective;

  constructor() {}

  ngOnInit() {}
}
