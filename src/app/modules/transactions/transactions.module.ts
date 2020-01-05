import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransactionsComponent } from "./transactions.component";
import { TransactionsTableComponent } from "./transactions-table/transactions-table.component";
import { TransactionsTableRowComponent } from "./transactions-table/transactions-table-row/transactions-table-row.component";
import { ComponentsModule } from "../../components/components.module";
import { FormsModule } from "@angular/forms";
import { AccountsModule } from "../accounts/accounts.module";
import { PayeesModule } from "../payees/payees.module";
import { CategoriesModule } from "../categories/categories.module";
import { MatchTransactionsComponent } from "./match-transactions/match-transactions.component";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    AccountsModule,
    PayeesModule,
    CategoriesModule
  ],
  declarations: [
    TransactionsComponent,
    TransactionsTableComponent,
    TransactionsTableRowComponent,
    MatchTransactionsComponent
  ]
})
export class TransactionsModule {}
