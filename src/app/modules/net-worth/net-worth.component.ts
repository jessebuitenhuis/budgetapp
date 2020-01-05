import { Component, OnInit } from "@angular/core";
import { TransactionService } from "src/app/services/transaction.service";
import { Observable, combineLatest } from "rxjs";
import { ChartData, ChartDataSets } from "chart.js";
import { combineAll, map } from "rxjs/operators";
import { Dictionary, unique } from "underscore";
import { sort } from "src/app/helpers/helpers";

@Component({
  selector: "app-net-worth",
  templateUrl: "./net-worth.component.html",
  styleUrls: ["./net-worth.component.css"]
})
export class NetWorthComponent {
  chartData$ = this._getChartData();

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
      label: "Assets",
      data: months.map(month => dicts[0][month])
    });

    datasets.push({
      label: "Liabilities",
      data: months.map(month => dicts[1][month] * -1)
    });

    datasets.push({
      type: "line",
      label: "Saldo",
      data: months.map(month => dicts[2][month])
    });

    return {
      labels: months,
      datasets
    };
  }
}
