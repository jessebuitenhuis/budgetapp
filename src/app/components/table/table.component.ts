import {
  Component,
  ContentChild,
  Input,
  OnDestroy,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild
} from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import {
  map,
  debounceTime,
  throttleTime,
  startWith,
  shareReplay,
  take
} from "rxjs/operators";
import { paginate, SortFn, sort, SearchFn } from "src/app/helpers/helpers";
import { TableRowDirective } from "./table-row.directive";
import { filterPipe, sortPipe, paginatePipe } from "src/app/helpers/pipes";
import { ObservableInput } from "src/app/_decorators/ObservableInput";
import {
  CdkColumnDef,
  CdkCellDef,
  CdkCell,
  CdkTable
} from "@angular/cdk/table";
import { mapObject, Dictionary } from "underscore";
import { TableCellDirective } from "./table-cell/table-cell.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent<T extends { id: string }>
  implements AfterContentInit {
  displayedColumns: string[] = [];
  @ViewChild(CdkTable, { static: true }) table!: CdkTable<T>;

  // above cdk

  @ObservableInput() @Input("data") data$!: Observable<T[]>;
  @ObservableInput(10) @Input("pageSize") pageSize$!: Observable<number>;
  @ObservableInput(false) @Input("sortDesc") sortDesc$!: Observable<boolean>;

  @Input() searchFn: SearchFn<T> = this._getDefaultSearchFn();
  @Input() sortFn?: SortFn<T>;

  // TODO: make options input?
  @Input() set showSelect(val: boolean) {
    if (val) {
      this.displayedColumns.push("select");
    }
  }
  @Input() showSearch = true;

  @Input() title: string = "";

  page$ = new BehaviorSubject(0);

  searchTerm$ = new BehaviorSubject<string>("");

  filteredData$ = combineLatest([
    this.data$,
    this.searchTerm$.pipe(throttleTime(200))
  ]).pipe(filterPipe(this.searchFn), shareReplay(1));

  sortedData$ = combineLatest([this.filteredData$, this.sortDesc$]).pipe(
    sortPipe(this.sortFn)
  );

  paginatedData$ = combineLatest([
    this.filteredData$,
    this.page$,
    this.pageSize$
  ]).pipe(paginatePipe(), shareReplay(1));

  private _allSelected = false;
  get allSelected(): boolean {
    return this._allSelected;
  }
  set allSelected(val: boolean) {
    this.filteredData$.pipe(take(1)).subscribe(data => {
      const selected: Dictionary<boolean> = {};
      data.forEach(x => (selected[x.id] = val));
      this.selected = selected;
    });
    this._allSelected = true;
  }

  selected: Dictionary<boolean> = {};

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
