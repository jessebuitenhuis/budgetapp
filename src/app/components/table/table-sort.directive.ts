import {
  Directive,
  Input,
  HostBinding,
  HostListener,
  OnInit,
  ElementRef
} from "@angular/core";
import { TableComponent } from "./table.component";
import { SortFnSync, SortDirection } from "src/app/helpers/helpers";
import { TableCellComponent } from "./table-cell/table-cell.component";

@Directive({
  selector: "[appTableSort]"
})
export class TableSortDirective<T extends { id: string }> implements OnInit {
  @HostBinding("class.th-sort") get isSortable(): boolean {
    return !!this.sortFn;
  }

  @HostBinding("class.th-sorted-asc")
  get isSortedAsc(): boolean {
    return (
      this._isActive &&
      this._table.sortDirection$.value === SortDirection.ASCENDING
    );
  }

  @HostBinding("class.th-sorted-desc")
  get isSortedDesc(): boolean {
    return (
      this._isActive &&
      this._table.sortDirection$.value === SortDirection.DESCENDING
    );
  }

  sortFn?: SortFnSync<T> | null;

  @Input("appTableSort") set sortBy(
    val: SortFnSync<T> | keyof T | null | undefined
  ) {
    if (typeof val === "string" || typeof val === "number") {
      this.sortFn = (item: T) => item[val];
    } else if (typeof val === "function") {
      this.sortFn = val;
    } else if (val === null) {
      this.sortFn = null;
    } else {
      this.sortFn = this._getDefaultSortFn();
    }
  }

  @Input() appTableSortDefault: boolean = false;
  @Input() appTableSortDirection: SortDirection = SortDirection.ASCENDING;

  constructor(
    private _table: TableComponent<T>,
    private _tableCell: TableCellComponent<T>
  ) {}

  ngOnInit(): void {
    if (this.appTableSortDefault) {
      this._activateSortFn();
    }
  }

  @HostListener("click", ["$event"])
  onClick(event: any): void {
    if (!this.sortFn) {
      this._table.sortDirection$.next(SortDirection.ASCENDING);
    } else if (this._isActive) {
      this._reverseDirection();
    } else {
      this._activateSortFn();
    }
  }

  private get _isActive(): boolean {
    return this.sortFn === this._table.sortFn$.value;
  }

  private _activateSortFn(): void {
    if (this.sortFn) {
      this._table.sortFn$.next(this.sortFn);
      this._table.sortDirection$.next(this.appTableSortDirection);
    }
  }

  private _reverseDirection(): void {
    const curVal = this._table.sortDirection$.value;
    const newDirection =
      curVal === SortDirection.DESCENDING
        ? SortDirection.ASCENDING
        : SortDirection.DESCENDING;
    this._table.sortDirection$.next(newDirection);
  }

  private _getDefaultSortFn(): SortFnSync<T> {
    return (item: T) =>
      item[this._tableCell && (this._tableCell.name as keyof T)];
  }
}
