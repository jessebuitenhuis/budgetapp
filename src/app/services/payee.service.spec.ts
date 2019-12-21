/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PayeeService } from './payee.service';

describe('Service: Payee', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayeeService]
    });
  });

  it('should ...', inject([PayeeService], (service: PayeeService) => {
    expect(service).toBeTruthy();
  }));
});
