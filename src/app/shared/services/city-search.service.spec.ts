import { TestBed } from '@angular/core/testing';

import { CitySearchService } from './city-search.service';

describe('CitySearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitySearchService = TestBed.get(CitySearchService);
    expect(service).toBeTruthy();
  });
});
