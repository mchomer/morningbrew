import { TestBed } from '@angular/core/testing';

import { MorningbrewService } from './morningbrew.service';

describe('MorningbrewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MorningbrewService = TestBed.get(MorningbrewService);
    expect(service).toBeTruthy();
  });
});
