import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { ComponentsModule } from "../components/components.module";
import { DashboardTableRowComponent } from "./dashboard-table-row/dashboard-table-row.component";
import { FormsModule } from "@angular/forms";
import { AccountsModule } from "../accounts/accounts.module";
import { TableModule } from "../components/table/table.module";
import { DashboardChartsComponent } from "./dashboard-charts/dashboard-charts.component";
import { ChartsModule } from "../components/charts/charts.module";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    AccountsModule,
    TableModule,
    ChartsModule,
    PipesModule
  ],
  declarations: [
    DashboardComponent,
    DashboardTableRowComponent,
    DashboardChartsComponent
  ]
})
export class DashboardModule {}
