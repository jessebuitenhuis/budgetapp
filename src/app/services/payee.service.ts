import { Injectable } from "@angular/core";
import { EntityService } from "./entity.service";
import { Payee } from "../models/Payee";
import { PAYEES } from "../mocks";

@Injectable({
  providedIn: "root"
})
export class PayeeService extends EntityService<Payee> {
  constructor() {
    super("payee", PAYEES);
  }
}
