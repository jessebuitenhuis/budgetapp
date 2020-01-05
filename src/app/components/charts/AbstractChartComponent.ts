import { Input, Output, EventEmitter } from "@angular/core";
import { Label } from "ng2-charts";
import {
  ChartDataSets,
  ChartOptions,
  ChartTooltipModel,
  ChartPoint
} from "chart.js";
import { ChartMouseEvent } from "./ChartElement.interface";
import { BehaviorSubject } from "rxjs";

export interface TooltipLabel {
  label?: string;
  value?: number | string;
}

export abstract class AbstractChartComponent {
  private _defaultOptions: ChartOptions = {
    tooltips: {
      enabled: false,
      custom: event => {
        this._onTooltip(event);
      }
    }
  };

  @Input() name?: string;
  @Input() value?: number;
  @Input() tooltipFn?: (label: TooltipLabel) => TooltipLabel;
  @Input() labels: string[] = [];
  @Input() data: ChartDataSets[] = [{ data: [] }];
  private _options: ChartOptions = {};
  @Input() set options(val: ChartOptions) {
    this._options = {
      ...this._defaultOptions,
      ...val
    };
  }
  get options(): ChartOptions {
    return this._options;
  }

  tooltipLabel?: TooltipLabel;

  get displayValue(): string | number | undefined {
    if (this.tooltipLabel && this.tooltipLabel.value !== undefined) {
      return this.tooltipLabel.value;
    }
    return this.value;
  }

  get displayName(): string | undefined {
    if (this.tooltipLabel && this.tooltipLabel.label !== undefined) {
      return this.tooltipLabel.label;
    }
    return this.name;
  }

  constructor() {}

  private _onTooltip(tooltip: ChartTooltipModel): void {
    const dataPoint = tooltip.dataPoints && tooltip.dataPoints[0];

    let label;
    let value;
    const dataSetIndex = dataPoint && dataPoint.datasetIndex;
    const index = dataPoint && dataPoint.index;

    if (index !== undefined && dataSetIndex !== undefined) {
      label = this.labels[index];
      const dataSet = this.data[dataSetIndex];
      const data = dataSet && dataSet.data;
      value = data && (data[index] as number);

      this.tooltipLabel = this.tooltipFn
        ? this.tooltipFn({ label, value })
        : { label, value };
    } else {
      this.tooltipLabel = { label, value };
    }
  }
}
