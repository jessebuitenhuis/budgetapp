import { Component, ContentChild, Input, OnDestroy } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map, debounceTime, throttleTime } from "rxjs/operators";
import { paginate, SortFn, sort, SearchFn } from "src/app/helpers/helpers";
import { TableRowDirective } from "./table-row.directive";
import { filterPipe, sortPipe, paginatePipe } from "src/app/helpers/pipes";
import { ObservableInput } from "src/app/_decorators/ObservableInput";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent<T> {
  @ObservableInput() @Input("data") data$!: Observable<T[]>;
  @ObservableInput(10) @Input("pageSize") pageSize$!: Observable<number>;
  @ObservableInput(false) @Input("sortDesc") sortDesc$!: Observable<boolean>;

  @Input() searchFn: SearchFn<T> = this._getDefaultSearchFn();
  @Input() sortFn?: SortFn<T>;

  @Input() showSearch = true;
  @Input() title: string = "";

  page$ = new BehaviorSubject(0);

  searchTerm$ = new BehaviorSubject<string>("");

  filteredData$ = combineLatest([
    this.data$,
    this.searchTerm$.pipe(throttleTime(200))
  ]).pipe(filterPipe(this.searchFn));

  sortedData$ = combineLatest([this.filteredData$, this.sortDesc$]).pipe(
    sortPipe(this.sortFn)
  );

  paginatedData$ = combineLatest([
    this.filteredData$,
    this.page$,
    this.pageSize$
  ]).pipe(paginatePipe());

  @ContentChild(TableRowDirective)
  rowTpl?: TableRowDirective;

  constructor() {}

  private _getDefaultSearchFn(): SearchFn<T> {
    return (item: T, searchTerm: string) => {
      const data = JSON.stringify(item).toLowerCase();
      return data.indexOf(searchTerm.toLowerCase()) > -1;
    };
  }
}
