import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountsComponent } from "./accounts.component";
import { SelectAccountComponent } from "./select-account/select-account.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  imports: [CommonModule, NgSelectModule, FormsModule],
  declarations: [AccountsComponent, SelectAccountComponent],
  exports: [SelectAccountComponent]
})
export class AccountsModule {}
