import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { ComponentsModule } from "../components/components.module";
import { DashboardTableRowComponent } from "./dashboard-table-row/dashboard-table-row.component";
import { FormsModule } from "@angular/forms";
import { AccountsModule } from "../accounts/accounts.module";
import { TableModule } from "../components/table/table.module";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    AccountsModule,
    TableModule
  ],
  declarations: [DashboardComponent, DashboardTableRowComponent]
})
export class DashboardModule {}
