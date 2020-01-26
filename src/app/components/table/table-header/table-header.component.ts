import { Component, OnInit, OnDestroy } from "@angular/core";
import { TableComponent } from "../table.component";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-table-header",
  templateUrl: "./table-header.component.html",
  styleUrls: ["./table-header.component.css"]
})
export class TableHeaderComponent<T> implements OnDestroy, OnInit {
  private _alive = true;
  searchTerm$ = this.table.searchTerm$;

  constructor(private table: TableComponent<T>) {}

  ngOnInit(): void {}

  onSearchChange(term: string): void {
    this.searchTerm$.next(term);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
