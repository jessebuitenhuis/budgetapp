import { Component, OnInit } from "@angular/core";
import { TransactionService } from "src/app/services/transaction.service";
import { Observable, combineLatest } from "rxjs";
import { ChartData, ChartDataSets, ChartOptions } from "chart.js";
import { map } from "rxjs/operators";
import { Dictionary, unique } from "underscore";

@Component({
  selector: "app-spending-report",
  templateUrl: "./spending-report.component.html",
  styleUrls: ["./spending-report.component.css"]
})
export class SpendingReportComponent {
  chartData$ = this._getChartData();

  chartOptions: ChartOptions = {
    tooltips: {
      mode: "index"
    }
  };

  constructor(private _transactionService: TransactionService) {}

  private _getChartData(): Observable<ChartData> {
    return combineLatest([
      this._transactionService.incomeByMonth$(),
      this._transactionService.expensesByMonth$(),
      this._transactionService.nettoByMonth$()
    ]).pipe(map(x => this._mapToChartData(...x)));
  }

  private _mapToChartData(
    income: Dictionary<number>,
    expenses: Dictionary<number>,
    netto: Dictionary<number>
  ): ChartData {
    const months = unique([
      ...Object.keys(income),
      ...Object.keys(expenses),
      ...Object.keys(netto)
    ]).sort();

    const incomeDataSet: ChartDataSets = {
      type: "bar",
      label: "Income",
      data: months.map(month => income[month])
    };

    const expensesDataSet: ChartDataSets = {
      type: "bar",
      label: "Expenses",
      data: months.map(month => expenses[month] * -1)
    };

    const nettoDataSet: ChartDataSets = {
      type: "line",
      label: "Netto",
      data: months.map(month => netto[month])
    };

    return {
      labels: months,
      datasets: [incomeDataSet, expensesDataSet, nettoDataSet]
    };
  }
}
