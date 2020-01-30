import { CdkColumnDef, CdkTable } from "@angular/cdk/table";
import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { shareReplay, take, throttleTime, tap } from "rxjs/operators";
import {
  SearchFn,
  SortFnSync,
  SortDirection,
  SortFn
} from "src/app/helpers/helpers";
import { filterPipe, paginatePipe, sortPipe } from "src/app/helpers/pipes";
import { ObservableInput } from "src/app/_decorators/ObservableInput";
import { Dictionary } from "underscore";
import { TableRowDirective } from "./table-row.directive";
import { Transaction } from "src/app/models/Transaction";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent<T extends { id: string }> {
  displayedColumns: string[] = [];
  @ViewChild(CdkTable, { static: true }) table!: CdkTable<T>;
  @ContentChildren(CdkColumnDef) columnDefs!: QueryList<CdkColumnDef>;

  @ObservableInput() @Input("data") data$!: Observable<T[]>;
  @ObservableInput(10) @Input("pageSize") pageSize$!: Observable<number>;

  @Input() searchFn: SearchFn<T> = this._getDefaultSearchFn();

  @Input() set showSelect(val: boolean) {
    if (val) {
      this.displayedColumns = ["select", ...this.displayedColumns];
    } else {
      this.displayedColumns = this.displayedColumns.filter(x => x !== "select");
    }
  }
  @Input() showSearch = true;
  @Input() title: string = "";

  @Input() set selectedIds(val: string[]) {
    const selected: Dictionary<boolean> = {};
    val.forEach(id => (selected[id] = true));
    this.selected = selected;
  }
  @Output() selectedIdsChange = new EventEmitter<string[]>();

  sortFn$ = new BehaviorSubject<SortFn<T> | null>(null);
  sortDirection$ = new BehaviorSubject<SortDirection>(SortDirection.DESCENDING);
  page$ = new BehaviorSubject(0);

  searchTerm$ = new BehaviorSubject<string>("");

  filteredData$ = combineLatest([
    this.data$,
    this.searchTerm$.pipe(throttleTime(200))
  ]).pipe(filterPipe(this.searchFn), shareReplay(1));

  sortedData$ = combineLatest([
    this.filteredData$,
    this.sortFn$,
    this.sortDirection$
  ]).pipe(sortPipe());

  paginatedData$ = combineLatest([
    this.sortedData$,
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

  private _selected: Dictionary<boolean> = {};
  get selected(): Dictionary<boolean> {
    return this._selected;
  }
  set selected(val: Dictionary<boolean>) {
    this._selected = val;
    this.selectedIdsChange.emit(this.getSelectedIds(val));
  }

  getSelectedIds(val: Dictionary<boolean>): string[] {
    return Object.entries(val)
      .filter(([id, selected]) => selected)
      .map(([id, selected]) => id);
  }

  select(id: string, selected: boolean): void {
    this.selected = {
      ...this.selected,
      [id]: selected
    };
  }

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
