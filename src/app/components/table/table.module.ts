import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule as NgFormsModule } from "@angular/forms";
import { TableComponent } from "./table.component";
import { TableRowDirective } from "./table-row.directive";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { TableHeaderComponent } from "./table-header/table-header.component";
import { FormsModule } from "../forms/forms.module";

const components = [TableComponent, TableRowDirective, TableHeaderComponent];

@NgModule({
  imports: [NgFormsModule, CommonModule, NgbPaginationModule, FormsModule],
  declarations: [...components],
  exports: [...components]
})
export class TableModule {}
