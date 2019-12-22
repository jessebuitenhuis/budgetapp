import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table.component";
import { TableRowDirective } from "./table-row.directive";

const components = [TableComponent, TableRowDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...components],
  exports: [...components]
})
export class TableModule {}
