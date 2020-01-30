import { CdkTableModule } from "@angular/cdk/table";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule as NgFormsModule } from "@angular/forms";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "../forms/forms.module";
import { InputsModule } from "../inputs/inputs.module";
import { TableButtonDirective } from "./table-button.directive";
import { TableCellDefDirective } from "./table-cell/table-cell-def.directive";
import { TableCellComponent } from "./table-cell/table-cell.component";
import { TableHeaderCellDefDirective } from "./table-cell/table-header-cell-def.directive";
import { TableHeaderComponent } from "./table-header/table-header.component";
import { TableRowDirective } from "./table-row.directive";
import { TableSortDirective } from "./table-sort.directive";
import { TableComponent } from "./table.component";

const components = [
  TableComponent,
  TableButtonDirective,
  TableRowDirective,
  TableHeaderComponent,
  TableSortDirective,
  TableCellComponent,
  TableCellDefDirective,
  TableHeaderCellDefDirective
];

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    NgFormsModule,
    NgbPaginationModule,
    FormsModule,
    InputsModule
  ],
  declarations: [...components, TableSortDirective],
  exports: [...components, CdkTableModule]
})
export class TableModule {}
