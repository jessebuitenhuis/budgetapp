import { CommonModule } from "@angular/common";
import { FormsModule as NgFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { FormGroupComponent } from "./form-group/form-group.component";
import { InputTextDirective } from "./input-text.directive";
import { InputSearchComponent } from "./input-search/input-search.component";
import { InputGroupComponent } from "./input-group/input-group.component";

const components = [
  InputTextDirective,
  InputSearchComponent,
  FormGroupComponent,
  InputGroupComponent
];

@NgModule({
  imports: [CommonModule, NgFormsModule],
  declarations: [...components],
  exports: [...components]
})
export class FormsModule {}
