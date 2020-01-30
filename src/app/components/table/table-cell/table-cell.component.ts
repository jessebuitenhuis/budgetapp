import {
  Component,
  OnInit,
  Input,
  ContentChild,
  AfterContentInit,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { TableComponent } from "../table.component";
import { TableCellDefDirective } from "./table-cell-def.directive";
import { TableHeaderCellDefDirective } from "./table-header-cell-def.directive";
import { CdkColumnDef } from "@angular/cdk/table";
import { SortFnSync, SortDirection } from "src/app/helpers/helpers";

@Component({
  selector: "app-table-cell",
  templateUrl: "./table-cell.component.html",
  styleUrls: ["./table-cell.component.css"]
})
export class TableCellComponent<T> implements OnInit, AfterViewInit {
  @Input() name: string = "";
  @Input() sortBy?: SortFnSync<T> | string | null;
  @Input() sortDefault?: boolean = false;
  @Input() sortDirection?: SortDirection = SortDirection.ASCENDING;

  @ViewChild(CdkColumnDef) columnDef!: CdkColumnDef;
  @ContentChild(TableCellDefDirective) cellDef?: TableCellDefDirective<T>;
  @ContentChild(TableHeaderCellDefDirective)
  headerCellDef?: TableHeaderCellDefDirective;

  constructor(private _table: TableComponent<any>) {}

  ngAfterViewInit(): void {
    this._table.table.addColumnDef(this.columnDef);
    this._table.displayedColumns.push(this.name);
  }

  ngOnInit(): void {}
}
