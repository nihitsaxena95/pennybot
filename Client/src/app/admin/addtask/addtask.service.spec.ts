import { TestBed, inject } from '@angular/core/testing';

import { AddtaskService } from './addtask.service';

describe('AddtaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddtaskService]
    });
  });

  it('should be created', inject([AddtaskService], (service: AddtaskService) => {
    expect(service).toBeTruthy();
  }));
});
