export interface ChartElementModel {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderAlign: string;
  x: number;
  y: number;
  startAngle: number;
  endAngle: number;
  circumference: number;
  outerRadius: number;
  innerRadius: number;
  label: string;
}

export interface ChartElementOptions {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderAlign: string;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  hoverBorderWidth?: number;
}

export interface ChartElement {
  _chart: Chart;
  _dataSetIndex: number;
  _index: number;
  _model: ChartElementModel;
  _options: ChartElementOptions;
}

export interface ChartMouseEvent {
  event: MouseEvent;
  active: ChartElement[];
}
