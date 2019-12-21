import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  store$ = new BehaviorSubject({});

  constructor() {}
}
