import { Injectable } from "@angular/core";
import { Payee } from "../models/Payee";
import { EntityService } from "./entity.service";

@Injectable({
  providedIn: "root"
})
export class PayeeService extends EntityService<Payee> {
  constructor() {
    super("payee");
  }

  getName(id: string): string {
    const payee = this.find(x => x.id === id);
    return (payee && payee.name) || id;
  }
}
