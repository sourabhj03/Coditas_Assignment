import { TestBed, inject } from '@angular/core/testing';

import { HttpCallerService } from './http-caller.service';

describe('HttpCallerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCallerService]
    });
  });

  it('should be created', inject([HttpCallerService], (service: HttpCallerService) => {
    expect(service).toBeTruthy();
  }));
});
