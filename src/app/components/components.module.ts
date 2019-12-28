import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonthPickerComponent } from "./month-picker/month-picker.component";
import { MomentModule } from "ngx-moment";
import { InputCurrencyComponent } from "./input-currency/input-currency.component";
import { FormsModule } from "@angular/forms";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { CardModule } from "./card/card.module";
import { TableModule } from "./table/table.module";
import { InputDateComponent } from "./input-date/input-date.component";

const components = [
  MonthPickerComponent,
  InputCurrencyComponent,
  FileUploadComponent,
  InputDateComponent
];

@NgModule({
  imports: [CommonModule, MomentModule, FormsModule, CardModule, TableModule],
  declarations: [...components],
  exports: [...components, CardModule, TableModule]
})
export class ComponentsModule {}
