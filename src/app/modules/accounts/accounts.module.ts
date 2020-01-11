import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountsComponent } from "./accounts.component";
import { SelectAccountComponent } from "./select-account/select-account.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { AccountsTableComponent } from "./accounts-table/accounts-table.component";
import { AccountsTableRowComponent } from "./accounts-table/accounts-table-row/accounts-table-row.component";
import { ComponentsModule } from "../../components/components.module";
import { AccountSummaryComponent } from "./account-summary/account-summary.component";
import { RouterModule } from "@angular/router";
import { SelectAccountsComponent } from './select-accounts/select-accounts.component';

const components = [
  SelectAccountComponent,
  SelectAccountsComponent,
  AccountSummaryComponent
];

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ComponentsModule,
    RouterModule
  ],
  declarations: [
    AccountsComponent,
    AccountsTableComponent,
    AccountsTableRowComponent,
    ...components
  ],
  exports: [...components]
})
export class AccountsModule {}
