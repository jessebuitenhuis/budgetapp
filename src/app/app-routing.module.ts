import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TransactionsComponent } from "./transactions/transactions.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "transactions", component: TransactionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
