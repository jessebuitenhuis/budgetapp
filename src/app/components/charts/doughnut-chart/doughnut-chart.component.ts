import { Component } from "@angular/core";
import { AbstractChartComponent } from "../AbstractChartComponent";

@Component({
  selector: "app-doughnut-chart",
  templateUrl: "./doughnut-chart.component.html",
  styleUrls: ["./doughnut-chart.component.css"]
})
export class DoughnutChartComponent extends AbstractChartComponent {}
