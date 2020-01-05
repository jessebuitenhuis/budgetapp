import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SpendingReportComponent } from "./spending-report.component";
import { ChartsModule } from "ng2-charts";

@NgModule({
  imports: [CommonModule, ChartsModule],
  declarations: [SpendingReportComponent]
})
export class SpendingReportModule {}
