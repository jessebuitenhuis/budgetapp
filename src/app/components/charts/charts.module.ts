import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule as Ng2ChartsModule } from "ng2-charts";
import { DoughnutChartComponent } from "./doughnut-chart/doughnut-chart.component";

const components = [DoughnutChartComponent];

@NgModule({
  imports: [CommonModule, Ng2ChartsModule],
  declarations: [...components],
  exports: [...components]
})
export class ChartsModule {}
