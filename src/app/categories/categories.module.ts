import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesComponent } from "./categories.component";
import { SelectCategoryComponent } from "./select-category/select-category.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, NgSelectModule, FormsModule],
  declarations: [SelectCategoryComponent, CategoriesComponent],
  exports: [SelectCategoryComponent]
})
export class CategoriesModule {}
