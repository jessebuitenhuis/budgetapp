import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommonModule, registerLocaleData } from "@angular/common";
import { ComponentsModule } from "./components/components.module";
import { MomentModule } from "ngx-moment";
import localeNl from "@angular/common/locales/nl";
import { NavbarComponent } from "./navbar/navbar.component";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { TransactionsModule } from "./modules/transactions/transactions.module";
import { MatchTransactionsComponent } from "./modules/transactions/match-transactions/match-transactions.component";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { PipesModule } from "./pipes/pipes.module";
import { NetWorthModule } from "./modules/net-worth/net-worth.module";
import { SpendingReportModule } from "./modules/spending-report/spending-report.module";

registerLocaleData(localeNl, "nl");

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    MomentModule,
    DashboardModule,
    TransactionsModule,
    NgbModalModule,
    PipesModule,
    NetWorthModule,
    SpendingReportModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MatchTransactionsComponent]
})
export class AppModule {}
