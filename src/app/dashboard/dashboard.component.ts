import { CategoryService } from "../services/category.service";
import { DashboardService } from "./services/dashboard.service";
import { Component } from "@angular/core";
import { AccountService } from "../services/account.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  providers: [DashboardService]
})
export class DashboardComponent {
  selectedMonth$ = this._dashboardService.selectedMonth$;
  categories$ = this._categoryService.entities$;
  accounts$ = this._accountService.entities$;

  constructor(
    private _dashboardService: DashboardService,
    private _categoryService: CategoryService,
    private _accountService: AccountService
  ) {}
}
