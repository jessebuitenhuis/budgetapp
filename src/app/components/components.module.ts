import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonthPickerComponent } from "./month-picker/month-picker.component";
import { MomentModule } from "ngx-moment";
import { InputCurrencyComponent } from "./input-currency/input-currency.component";
import { FormsModule } from "@angular/forms";
import { FileUploadComponent } from "./file-upload/file-upload.component";

const components = [
  MonthPickerComponent,
  InputCurrencyComponent,
  FileUploadComponent
];

@NgModule({
  imports: [CommonModule, MomentModule, FormsModule],
  declarations: [...components],
  exports: [...components]
})
export class ComponentsModule {}