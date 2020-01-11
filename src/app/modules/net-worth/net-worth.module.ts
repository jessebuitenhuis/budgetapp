import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NetWorthComponent } from "./net-worth.component";
import { ChartsModule } from "ng2-charts";
import { NetWorthChartComponent } from "./net-worth-chart/net-worth-chart.component";
import { AccountsModule } from "../accounts/accounts.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, ChartsModule, FormsModule, AccountsModule],
  declarations: [NetWorthComponent, NetWorthChartComponent]
})
export class NetWorthModule {}
