import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { TableComponent } from "../table.component";
import { BehaviorSubject } from "rxjs";
import { BaseModel } from "src/app/models/BaseModel";

@Component({
  selector: "app-table-header",
  templateUrl: "./table-header.component.html",
  styleUrls: ["./table-header.component.css"]
})
export class TableHeaderComponent<T extends BaseModel>
  implements OnDestroy, OnInit {
  private _alive = true;
  searchTerm$ = this.table.searchTerm$;
  showSearch = this.table.showSearch;

  @Input() title: string = "";

  constructor(private table: TableComponent<T>) {}

  ngOnInit(): void {}

  onSearchChange(term: string): void {
    this.searchTerm$.next(term);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
