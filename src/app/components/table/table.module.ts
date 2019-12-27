import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table.component";
import { TableRowDirective } from "./table-row.directive";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

const components = [TableComponent, TableRowDirective];

@NgModule({
  imports: [CommonModule, NgbPaginationModule],
  declarations: [...components],
  exports: [...components]
})
export class TableModule {}
