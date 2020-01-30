import { Component, OnInit, OnDestroy, Input, Optional } from "@angular/core";
import { TableComponent } from "../table.component";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-table-header",
  templateUrl: "./table-header.component.html",
  styleUrls: ["./table-header.component.css"]
})
export class TableHeaderComponent<T extends { id: string }>
  implements OnDestroy, OnInit {
  private _alive = true;
  searchTerm$ = this.table && this.table.searchTerm$;
  showSearch = this.table && this.table.showSearch;

  @Input() title: string = "";

  constructor(@Optional() private table?: TableComponent<T>) {}

  ngOnInit(): void {}

  onSearchChange(term: string): void {
    if (this.searchTerm$) {
      this.searchTerm$.next(term);
    }
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
