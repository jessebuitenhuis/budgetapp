import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { RadioComponent } from "./radio/radio.component";
import { InputCurrencyComponent } from "./input-currency/input-currency.component";
import { InputDateComponent } from "./input-date/input-date.component";
import { FormsModule } from "@angular/forms";

const components = [
  CheckboxComponent,
  RadioComponent,
  InputCurrencyComponent,
  InputDateComponent
];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [...components],
  exports: [...components]
})
export class InputsModule {}
