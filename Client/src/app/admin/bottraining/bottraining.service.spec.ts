import { TestBed, inject } from '@angular/core/testing';

import { BottrainingService } from './bottraining.service';

describe('BottrainingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BottrainingService]
    });
  });

  it('should be created', inject([BottrainingService], (service: BottrainingService) => {
    expect(service).toBeTruthy();
  }));
});
