import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "app-month-picker",
  templateUrl: "./month-picker.component.html",
  styleUrls: ["./month-picker.component.css"]
})
export class MonthPickerComponent implements OnInit {
  selectedMonth = moment();

  @Input() set month(val: Date) {
    this.selectedMonth = moment(val);
  }
  @Output() monthChanged = new EventEmitter<Date>();

  constructor() {}

  ngOnInit() {}

  emit() {
    this.monthChanged.emit(this.selectedMonth.toDate());
  }

  prev() {
    this.selectedMonth = this.selectedMonth.subtract(1, "month").clone();
    this.emit();
  }

  next() {
    this.selectedMonth = this.selectedMonth.add(1, "month").clone();
    this.emit();
  }
}
