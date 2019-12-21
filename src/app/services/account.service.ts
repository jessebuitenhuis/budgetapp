import { Injectable } from "@angular/core";
import { StoreService } from "./store.service";
import { Account } from "../models/Account";
import { Viewmodel } from "../models/types";
import { EntityService } from "./entity.service";
import { EntityDataService } from "./entity-data.service";
import { ACCOUNTS } from "../mocks";

@Injectable({
  providedIn: "root"
})
export class AccountService extends EntityService<Account> {
  constructor() {
    super("account", ACCOUNTS);
  }
}
