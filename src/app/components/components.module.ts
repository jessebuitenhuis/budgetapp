import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule as NgFormsModule } from "@angular/forms";
import { MomentModule } from "ngx-moment";
import { CardModule } from "./card/card.module";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FormsModule } from "./forms/forms.module";
import { InputsModule } from "./inputs/inputs.module";
import { MonthPickerComponent } from "./month-picker/month-picker.component";
import { TableModule } from "./table/table.module";

const components = [MonthPickerComponent, FileUploadComponent];

const modules = [CardModule, TableModule, FormsModule, InputsModule];

@NgModule({
  imports: [NgFormsModule, CommonModule, MomentModule, ...modules],
  declarations: [...components],
  exports: [...components, CardModule, ...modules]
})
export class ComponentsModule {}
