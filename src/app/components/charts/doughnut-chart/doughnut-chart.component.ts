import { Component, OnInit, Input } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: "app-doughnut-chart",
  templateUrl: "./doughnut-chart.component.html",
  styleUrls: ["./doughnut-chart.component.css"]
})
export class DoughnutChartComponent {
  @Input() labels: Label[] = [];
  @Input() data: ChartDataSets[] = [{ data: [] }];
  @Input() options: ChartOptions = {};

  constructor() {}
}
