import { TestBed, inject } from '@angular/core/testing';

import { IntentFormService } from './intent-form.service';

describe('IntentFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntentFormService]
    });
  });

  it('should be created', inject([IntentFormService], (service: IntentFormService) => {
    expect(service).toBeTruthy();
  }));
});
