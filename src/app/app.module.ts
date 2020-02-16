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
import { AccountsModule } from "./modules/accounts/accounts.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AccountEffects } from "./modules/accounts/_store/accounts.effects";
import { FireModule } from "./fire/fire.module";

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
    SpendingReportModule,
    AccountsModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AccountEffects]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FireModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MatchTransactionsComponent]
})
export class AppModule {}
