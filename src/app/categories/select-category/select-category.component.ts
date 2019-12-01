import { Component, OnInit, Optional, Self } from "@angular/core";
import { AbstractValueAccessor } from "src/app/helpers/AbstractValueAccessor";
import { StoreService } from "src/app/services/store.service";
import { NgControl } from "@angular/forms";
import { Category } from "src/app/models/Category";

@Component({
  selector: "app-select-category",
  templateUrl: "./select-category.component.html",
  styleUrls: ["./select-category.component.css"]
})
export class SelectCategoryComponent extends AbstractValueAccessor<string> {
  categories$ = this._store.categories.items$;

  constructor(
    @Optional() @Self() control: NgControl,
    private _store: StoreService
  ) {
    super(control);
  }

  addTagFn = (name: string): Category => {
    return this._store.categories.add({
      name
    });
  };
}
