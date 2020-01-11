/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NetWorthService } from './net-worth.service';

describe('Service: NetWorth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetWorthService]
    });
  });

  it('should ...', inject([NetWorthService], (service: NetWorthService) => {
    expect(service).toBeTruthy();
  }));
});
