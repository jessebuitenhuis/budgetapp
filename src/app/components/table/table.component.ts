import { Component, ContentChild, Input } from "@angular/core";
import { BehaviorSubject, combineLatest } from "rxjs";
import { map, debounceTime } from "rxjs/operators";
import { paginate, SortFn, sort, SearchFn } from "src/app/helpers/helpers";
import { TableRowDirective } from "./table-row.directive";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent<T> {
  data$ = new BehaviorSubject<T[]>([]);
  page$ = new BehaviorSubject(0);
  searchTerm$ = new BehaviorSubject<string>("");

  tableData$ = combineLatest([
    this.data$,
    this.page$,
    this.searchTerm$.pipe(debounceTime(200))
  ]).pipe(
    map(([data, page, searchTerm]) => {
      const filtered = searchTerm
        ? data.filter(x => this.searchFn(x, searchTerm))
        : data;

      const sorted = this.sortFn
        ? sort(filtered, this.sortFn, this.sortDesc)
        : filtered;
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

  @Input() searchFn: SearchFn<T> = (item: T, searchTerm: string) => {
    const data = JSON.stringify(item).toLowerCase();
    return data.indexOf(searchTerm.toLowerCase()) > -1;
  };
}
