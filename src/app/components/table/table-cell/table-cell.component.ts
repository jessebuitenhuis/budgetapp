import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Directive,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { CdkColumnDef } from "@angular/cdk/table";
import { TableComponent } from "../table.component";

@Component({
  selector: "app-table-cell",
  templateUrl: "./table-cell.component.html"
})
export class TableCellDirective implements OnInit, AfterViewInit {
  hello = "world";
  @ViewChild(CdkColumnDef) columnDef!: CdkColumnDef;

  constructor(private table: TableComponent<any>) {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    this.table.table.addColumnDef(this.columnDef);
    this.table.displayedColumns.push(this.columnDef.name);
  }
}
