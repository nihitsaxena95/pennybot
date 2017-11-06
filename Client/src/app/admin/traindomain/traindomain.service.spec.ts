import { TestBed, inject } from '@angular/core/testing';

import { TraindomainService } from './traindomain.service';

describe('TraindomainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TraindomainService]
    });
  });

  it('should be created', inject([TraindomainService], (service: TraindomainService) => {
    expect(service).toBeTruthy();
  }));
});
