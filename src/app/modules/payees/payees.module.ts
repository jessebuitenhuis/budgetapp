import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PayeesComponent } from "./payees.component";
import { SelectPayeeComponent } from "./select-payee/select-payee.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { PayeePipe } from "./pipes/payee.pipe";

const publicComponents = [SelectPayeeComponent, PayeePipe];

@NgModule({
  imports: [CommonModule, NgSelectModule, FormsModule],
  declarations: [PayeesComponent, ...publicComponents],
  exports: [...publicComponents]
})
export class PayeesModule {}
