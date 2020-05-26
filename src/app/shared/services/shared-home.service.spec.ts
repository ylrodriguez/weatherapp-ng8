import { TestBed } from '@angular/core/testing';

import { SharedHomeService } from './shared-home.service';

describe('SharedHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedHomeService = TestBed.get(SharedHomeService);
    expect(service).toBeTruthy();
  });
});
