import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MomentModule } from "ngx-moment";
import { CardModule } from "./card/card.module";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { InputCurrencyComponent } from "./input-currency/input-currency.component";
import { InputDateComponent } from "./input-date/input-date.component";
import { MonthPickerComponent } from "./month-picker/month-picker.component";
import { TableModule } from "./table/table.module";
import { RadioComponent } from "./radio/radio.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";

const components = [
  MonthPickerComponent,
  InputCurrencyComponent,
  FileUploadComponent,
  InputDateComponent,
  CheckboxComponent,
  RadioComponent
];

const modules = [FormsModule, CardModule, TableModule];

@NgModule({
  imports: [CommonModule, MomentModule, ...modules],
  declarations: [...components],
  exports: [...components, CardModule, ...modules]
})
export class ComponentsModule {}
