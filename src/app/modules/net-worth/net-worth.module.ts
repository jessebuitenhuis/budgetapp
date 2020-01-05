import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NetWorthComponent } from "./net-worth.component";
import { ChartsModule } from "ng2-charts";

@NgModule({
  imports: [CommonModule, ChartsModule],
  declarations: [NetWorthComponent]
})
export class NetWorthModule {}
