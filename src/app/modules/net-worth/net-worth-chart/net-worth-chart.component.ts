import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartData, ChartDataSets } from "chart.js";
import { TransactionService } from "src/app/services/transaction.service";
import { Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Dictionary, unique } from "underscore";

@Component({
  selector: "app-net-worth-chart",
  templateUrl: "./net-worth-chart.component.html",
  styleUrls: ["./net-worth-chart.component.css"]
})
export class NetWorthChartComponent {
  chartData$ = this._getChartData();
  chartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      mode: "index"
    }
  };

  constructor(private _transactionService: TransactionService) {}

  private _getChartData(): Observable<ChartData> {
    return combineLatest([
      this._transactionService.assetsSaldoByMonth$(),
      this._transactionService.liabilitiesSaldoByMonth$(),
      this._transactionService.saldoByMonth$()
    ]).pipe(map(x => this._mapToChartData(...x)));
  }

  private _mapToChartData(...dicts: Dictionary<number>[]): ChartData {
    const months = unique([
      ...Object.keys(dicts[0]),
      ...Object.keys(dicts[1]),
      ...Object.keys(dicts[2])
    ]).sort();

    const datasets: ChartDataSets[] = [];

    datasets.push({
      type: "line",
      label: "Saldo",
      data: months.map(month => dicts[2][month])
    });

    datasets.push({
      label: "Assets",
      data: months.map(month => dicts[0][month])
    });

    datasets.push({
      label: "Liabilities",
      data: months.map(month => dicts[1][month] * -1)
    });

    return {
      labels: months,
      datasets
    };
  }
}
