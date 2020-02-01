import { Component, OnInit } from "@angular/core";
import { AccountService } from "./services/account.service";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Budget";

  constructor(
    private db: AngularFirestore,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.getAll();
    this.accountService.getAll();
    this.accountService.getAll();
  }
}
