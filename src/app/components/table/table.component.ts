import { Component, ContentChild, Input } from "@angular/core";
import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { paginate, SortFn, sort } from "src/app/helpers/helpers";
import { TableRowDirective } from "./table-row.directive";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent<T> {
  data$ = new BehaviorSubject<T[]>([]);
  page$ = new BehaviorSubject(0);
  tableData$ = combineLatest([this.data$, this.page$]).pipe(
    map(([data, page]) => {
      const sorted = this.sortFn
        ? sort(data, this.sortFn, this.sortDesc)
        : data;
      return paginate(sorted, page, this.pageSize);
    })
  );

  @Input() set data(val: T[]) {
    this.data$.next(val);
  }
  @Input() pageSize: number = 10;
  @Input() sortFn?: SortFn<T>;
  @Input() sortDesc = false;

  @ContentChild(TableRowDirective)
  rowTpl?: TableRowDirective;

  constructor() {}
}
