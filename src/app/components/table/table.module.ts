import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule as NgFormsModule } from "@angular/forms";
import { TableComponent } from "./table.component";
import { TableRowDirective } from "./table-row.directive";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { TableHeaderComponent } from "./table-header/table-header.component";
import { FormsModule } from "../forms/forms.module";
import { TableButtonDirective } from "./table-button.directive";
import { CdkTableModule } from "@angular/cdk/table";
import { InputsModule } from "../inputs/inputs.module";

const components = [TableComponent, TableRowDirective, TableHeaderComponent];

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    NgFormsModule,
    NgbPaginationModule,
    FormsModule,
    InputsModule
  ],
  declarations: [...components, TableButtonDirective],
  exports: [...components, CdkTableModule]
})
export class TableModule {}
