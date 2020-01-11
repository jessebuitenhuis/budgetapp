import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SpendingReportComponent } from "./spending-report.component";
import { ChartsModule } from "ng2-charts";
import { AccountsModule } from "../accounts/accounts.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, ChartsModule, AccountsModule, FormsModule],
  declarations: [SpendingReportComponent]
})
export class SpendingReportModule {}
