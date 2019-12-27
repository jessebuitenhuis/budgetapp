/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryMatchService } from './category-match.service';

describe('Service: CategoryMatch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryMatchService]
    });
  });

  it('should ...', inject([CategoryMatchService], (service: CategoryMatchService) => {
    expect(service).toBeTruthy();
  }));
});
