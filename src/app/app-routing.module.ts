import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { TransactionsComponent } from "./modules/transactions/transactions.component";
import { AccountsComponent } from "./modules/accounts/accounts.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "transactions", component: TransactionsComponent },
  { path: "transactions/:id", component: TransactionsComponent },
  { path: "accounts", component: AccountsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
