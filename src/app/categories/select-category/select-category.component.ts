import { Component, OnInit, Optional, Self } from "@angular/core";
import { AbstractValueAccessor } from "src/app/helpers/AbstractValueAccessor";
import { NgControl } from "@angular/forms";
import { Category } from "src/app/models/Category";
import { CategoryService } from "src/app/services/category.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-select-category",
  templateUrl: "./select-category.component.html",
  styleUrls: ["./select-category.component.css"]
})
export class SelectCategoryComponent extends AbstractValueAccessor<string> {
  categories$ = this._categoryService.entities$;

  constructor(
    @Optional() @Self() control: NgControl,
    private _categoryService: CategoryService
  ) {
    super(control);
  }

  addTagFn = (name: string): Observable<Category> => {
    return this._categoryService.add({
      name
    } as Category);
  };
}
