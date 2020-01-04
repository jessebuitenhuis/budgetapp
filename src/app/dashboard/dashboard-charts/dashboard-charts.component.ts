import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Label } from "ng2-charts";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { TransactionService } from "src/app/services/transaction.service";
import { Dictionary } from "underscore";
import { DashboardService } from "../services/dashboard.service";
import { CategoryService } from "src/app/services/category.service";

interface ChartData {
  labels?: Label[];
  data?: ChartDataSets[];
}

@Component({
  selector: "app-dashboard-charts",
  templateUrl: "./dashboard-charts.component.html",
  styleUrls: ["./dashboard-charts.component.css"]
})
export class DashboardChartsComponent implements OnInit {
  selectedMonth$ = this._dashboardService.selectedMonth$;

  income$ = this.selectedMonth$.pipe(
    switchMap(month => this._transactionService.incomeForMonth$(month))
  );

  incomeByCategory$ = this.selectedMonth$.pipe(
    switchMap(month =>
      this._transactionService.incomeForMonthByCategory$(month)
    )
  );

  expenses$ = this.selectedMonth$.pipe(
    switchMap(month => this._transactionService.expensesForMonth$(month))
  );

  expensesByCategory$ = this.selectedMonth$.pipe(
    switchMap(month =>
      this._transactionService.expensesForMonthByCategory$(month)
    )
  );

  netto$ = this.selectedMonth$.pipe(
    switchMap(month => this._transactionService.nettoForMonth$(month))
  );

  incomeChartData$ = this.incomeByCategory$.pipe(
    map(x => this.mapToChartData(x))
  );
  expensesChartData$ = this.expensesByCategory$.pipe(
    map(x => this.mapToChartData(x))
  );

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 80
  };

  constructor(
    private _dashboardService: DashboardService,
    private _transactionService: TransactionService,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {}

  mapToChartData(groupedByCat: Dictionary<number>): ChartData {
    const labels = Object.keys(groupedByCat).map(
      id => this._categoryService.getProp(id, "name") || ""
    );
    const data = [{ data: Object.values(groupedByCat) }];
    return { labels, data };
  }
}
