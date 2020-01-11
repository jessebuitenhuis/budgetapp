import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from 'src/app/models/Account';

@Injectable({
  providedIn: 'root'
})
export class NetWorthService {
  selectedAccounts$ = new BehaviorSubject<string[]>([]);

constructor() { }

}
