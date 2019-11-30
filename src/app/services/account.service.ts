import { Injectable } from "@angular/core";
import { StoreService } from "./store.service";
import { Account } from "../models/Account";
import { Viewmodel } from "../models/types";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  store = this._storeService.accounts;

  constructor(private _storeService: StoreService) {}
}
