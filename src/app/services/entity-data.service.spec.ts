/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EntityDataService } from './entity-data.service';

describe('Service: EntityData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityDataService]
    });
  });

  it('should ...', inject([EntityDataService], (service: EntityDataService) => {
    expect(service).toBeTruthy();
  }));
});
