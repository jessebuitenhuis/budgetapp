import { CommonModule, registerLocaleData } from "@angular/common";
import localeNl from "@angular/common/locales/nl";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { DefaultDataServiceFactory, EntityDataModule } from "@ngrx/data";
import { EffectsModule } from "@ngrx/effects";
import {
  routerReducer,
  RouterState,
  StoreRouterConnectingModule
} from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { MomentModule } from "ngx-moment";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";
import { AccountsModule } from "./modules/accounts/accounts.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { NetWorthModule } from "./modules/net-worth/net-worth.module";
import { SpendingReportModule } from "./modules/spending-report/spending-report.module";
import { MatchTransactionsComponent } from "./modules/transactions/match-transactions/match-transactions.component";
import { TransactionsModule } from "./modules/transactions/transactions.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { PipesModule } from "./pipes/pipes.module";
import { FirestoreEffects } from "./store/effects/firestore.effects";
import { EntityFirestoreDataServiceFactory } from "./store/entity-firestore-data.service";
import { entityConfig } from "./store/entity-metadata";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { HttpClient, HttpClientModule } from "@angular/common/http";

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
    HttpClientModule,
    AccountsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(
      {
        router: routerReducer
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true
        }
      }
    ),
    EffectsModule.forRoot([FirestoreEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [
    {
      provide: DefaultDataServiceFactory,
      useClass: EntityFirestoreDataServiceFactory
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatchTransactionsComponent]
})
export class AppModule {}
