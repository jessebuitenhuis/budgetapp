import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { ComponentsModule } from "../components/components.module";
import { DashboardTableRowComponent } from "./dashboard-table-row/dashboard-table-row.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, ComponentsModule, FormsModule],
  declarations: [DashboardComponent, DashboardTableRowComponent]
})
export class DashboardModule {}
